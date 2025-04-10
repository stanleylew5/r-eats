import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime, timedelta
from urllib.parse import quote

# URL Template
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

    # Check if page content is actually present
    if not soup.find("div", class_="col-1of1"):
        print(f"⚠️ Warning: No menu found for {location_name} on {date}")
        return None

    meal_sections = soup.find_all("div", class_="shortmenucats")
    menu_data = {}

    for section in meal_sections:
        meal_type = section.find("div", class_="shortmenumealheader").text.strip()
        menu_data[meal_type] = {}

        sub_sections = section.find_all("div", class_="shortmenugroup")
        for sub_section in sub_sections:
            sub_location_name = sub_section.find("div", class_="shortmenugrouptitle").text.strip()
            menu_data[meal_type][sub_location_name] = []

            food_items = sub_section.find_all("tr", class_="shortmenuItemRow")
            for item in food_items:
                food_name = item.find("a").text.strip()
                attributes = [img["alt"] for img in item.find_all("img", class_="menuIcon")]
                menu_data[meal_type][sub_location_name].append({
                    "name": food_name,
                    "attributes": attributes
                })

    return menu_data

# Fetch data for the next 14 days
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

# Save to a JSON file
with open("lothian.json", "w") as f:
    json.dump(lothian, f, indent=4)

with open("glasgow.json", "w") as f:
    json.dump(glasgow, f, indent=4)

print("Menu data for 14 days saved to lothian.json and glasgow.json")
