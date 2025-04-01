import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

def get_menu(location_num, location_name, month, day, year):
    
    url = f"https://foodpro.ucr.edu/foodpro/shortmenu.aspx?sName=University+of+California%2c+Riverside+Dining+Services&locationNum={location_num}&locationName={location_name}&naFlag=1&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate={month}%2f{day}%2f{year}"
    
    response = requests.get(url)
    
    if response.status_code != 200:
        print("Failed to retrieve the menu.")
        return None
    
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Extract menu items
    menu_items = []
    for item in soup.find_all("td", class_="shortmenurecipes"):
        menu_items.append(item.text.strip())

    # Structure the data
    menu_data = {
        "date": f"{month}/{day}/{year}",
        "location": location_name,
        "menu": menu_items
    }

    # Save to JSON file
    with open("menu.json", "w") as json_file:
        json.dump(menu_data, json_file, indent=4)
    
    return menu_data

# Example Usage (Scrape April 1, 2025, Lothian)
if __name__ == "__main__":
    menu = get_menu(location_num="02", location_name="Lothian", month=4, day=1, year=2025)
    print(json.dumps(menu, indent=4))
