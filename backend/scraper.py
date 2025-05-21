import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime, timedelta
from urllib.parse import quote

BASE_URL = "https://foodpro.ucr.edu/foodpro/shortmenu.aspx?sName=University+of+California%2c+Riverside+Dining+Services&locationNum={location_num}&locationName={location_name}&naFlag=1&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate={date}"

DINING_HALLS = [
    {"num": "02", "name": "Lothian"},
    {"num": "03", "name": "Glasgow"},
]

def fetch_menu(location_num, location_name, date):
    encoded_date = quote(date, safe="")
    url = BASE_URL.format(location_num=location_num, location_name=location_name, date=encoded_date)
    
    response = requests.get(url)

    if response.status_code != 200:
        print(f"❌ Error: {response.status_code} - Failed to fetch {url}")
        return None
    print(f"✅ Successfully accessed {url}")

    soup = BeautifulSoup(response.text, "html.parser")

    if not soup.find("div", class_="shortmenucats"):
        print(f"⚠️ Warning: No menu found for {location_name} on {date}")
        return None

    columns = soup.find_all("td", class_="shortmenuMealCell")
    menu_data = {}

    for column in columns:
        mealTime = column.find("h3", class_="shortmenumeals").text.strip()
        menu_data[mealTime] = {}

        station = None
        food_items = []

        for tr in column.find_all("tr"):
            station_div = tr.find("div", class_="shortmenucats")
            if station_div:
                if station and food_items:
                    menu_data[mealTime][station] = food_items
                station = station_div.text.strip()
                food_items = []
            food_item = tr.find("a")
            if food_item:
                food_name = food_item.text.strip()
                food_items.append(food_name)
        if station and food_items:
            menu_data[mealTime][station] = food_items

    return menu_data

lothian = {}
glasgow = {}

for i in range(14):
    date = (datetime.today() + timedelta(days=i)).strftime("%m/%d/%Y")
    lothian[date] = {}
    glasgow[date] = {}

    for hall in DINING_HALLS:
        menu = fetch_menu(location_num=hall["num"], location_name=hall["name"], date=date)
        if menu:
            if hall["num"] == "02":
                lothian[date][hall["name"]] = menu
            if hall["num"] == "03":
                glasgow[date][hall["name"]] = menu

with open("lothian.json", "w") as f:
    json.dump(lothian, f, indent=4)

with open("glasgow.json", "w") as f:
    json.dump(glasgow, f, indent=4)

print("Menu data for 14 days saved to lothian.json and glasgow.json")
