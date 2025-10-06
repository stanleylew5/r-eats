import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime, timedelta
from urllib.parse import quote
import os

food_dietary_map = {}

BASE_URL = "https://foodpro.ucr.edu/foodpro/shortmenu.aspx?sName=University+of+California%2c+Riverside+Dining+Services&locationNum={location_num}&locationName={location_name}&naFlag=1&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate={date}"
BASE_NUTRITION_URL = "https://foodpro.ucr.edu/foodpro/"

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

    for column in columns: # This is for each column/meal time
        mealTime = column.find("h3", class_="shortmenumeals").text.strip()
        menu_data[mealTime] = {}

        station = None
        food_items = []

        for tr in column.find_all("tr"): # Each tr is a station like Wok Kitchen 
            station_div = tr.find("div", class_="shortmenucats")
            if station_div: # if the food station exists...
                if station and food_items:
                    menu_data[mealTime][station] = food_items
                station = station_div.text.strip()
                food_items = []
            for wrapper in tr.find_all("div", class_="menuItemWrapper"):
                # Get the food name
                food_name_div = wrapper.find("div", class_="shortmenurecipes")
                if not food_name_div:
                    continue
                food_item = food_name_div.find("a")
                if not food_item:
                    continue
                food_name = food_item.text.strip()
                nutrition_href = food_item.get("href", "").strip()
                nutrition = BASE_NUTRITION_URL + nutrition_href if nutrition_href else ""
                # Get dietary icons
                dietary_options = []
                dietary_div = wrapper.find("div", class_="menuItemPieceIcons")
                if dietary_div:
                    for icon in dietary_div.find_all("img", class_="menuIcon"):
                        alt_text = icon.get("alt", "").strip()
                        if alt_text:
                            dietary_options.append(alt_text)

                # Add to menu
                food_items.append({
                    "name": food_name,
                    "nutrition": nutrition,
                    "dietary": dietary_options
                })

                # Add to global map if not already present
                if food_name not in food_dietary_map:
                    food_dietary_map[food_name] = dietary_options
            
        if station and food_items:
            menu_data[mealTime][station] = food_items

    return menu_data

script_dir = os.path.dirname(os.path.abspath(__file__))
repo_root = os.path.dirname(script_dir)
output_dir = os.path.join(repo_root, 'frontend', 'src', 'data')
os.makedirs(output_dir, exist_ok=True)

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

with open(os.path.join(output_dir, "lothian.json"), "w") as f:
    json.dump(lothian, f, indent=4)

with open(os.path.join(output_dir, "glasgow.json"), "w") as f:
    json.dump(glasgow, f, indent=4)

with open(os.path.join(output_dir, "foodDietaryMap.json"), "w") as f:
    json.dump(food_dietary_map, f, indent=4)

print(f"Menu data for 14 days saved to {output_dir}")