# import json
# from flask import Flask
# from models import Recipe, db
# from db import init_db

# # Create Flask app
# app = Flask(__name__)
# init_db(app)

# # Load data into DB
# with app.app_context():
#     with open("US_recipes.json", "r", encoding="utf-8") as f:
#         data = json.load(f)

#     for item in data.values():   # since JSON is a dict with "0","1","2",...
#         recipe = Recipe(
#             cuisine=item.get("cuisine"),
#             title=item.get("title"),
#             rating=None if (isinstance(item.get("rating"), str) and item["rating"] == "NaN") else item.get("rating"),
#             prep_time=None if str(item.get("prep_time")).lower() == "nan" else item.get("prep_time"),
#             cook_time=None if str(item.get("cook_time")).lower() == "nan" else item.get("cook_time"),
#             total_time=None if str(item.get("total_time")).lower() == "nan" else item.get("total_time"),
#             description=item.get("description"),
#             nutrients=item.get("nutrients"),
#             serves=item.get("serves")
#         )
#         db.session.add(recipe)

#     db.session.commit()
#     print(f"✅ Data loaded successfully! Inserted {len(data)} recipes.")


# import json
# from flask import Flask
# from models import Recipe, db
# from db import init_db

# # Create Flask app
# app = Flask(__name__)
# init_db(app)

# # Helper to convert NaN / None
# def to_none(value):
#     if value is None:
#         return None
#     if isinstance(value, str) and value.lower() == "nan":
#         return None
#     return value

# # Load data into DB
# with app.app_context():
#     with open("US_recipes.json", "r", encoding="utf-8") as f:
#         data = json.load(f)

#     for item in data.values():
#         nutrients = item.get("nutrients")
#         if isinstance(nutrients, dict):
#             nutrients = nutrients  # store as dict (JSON supported by SQLAlchemy)

#         recipe = Recipe(
#             cuisine=item.get("cuisine"),
#             title=item.get("title"),
#             rating=to_none(item.get("rating")),
#             prep_time=to_none(item.get("prep_time")),
#             cook_time=to_none(item.get("cook_time")),
#             total_time=to_none(item.get("total_time")),
#             description=item.get("description"),
#             nutrients=nutrients,
#             serves=to_none(item.get("serves"))
#         )
#         db.session.add(recipe)

#     db.session.commit()
#     print(f"✅ Data loaded successfully! Inserted {len(data)} recipes.")

import json
import math
from flask import Flask
from models import Recipe, db
from db import init_db

app = Flask(__name__)
init_db(app)

def to_none(value):
    if value is None:
        return None
    if isinstance(value, str) and value.lower() == "nan":
        return None
    if isinstance(value, float) and math.isnan(value):
        return None
    return value

with app.app_context():
    with open("US_recipes.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    count = 0
    for item in data.values():
        title = to_none(item.get("title"))
        if not title:
            continue

        nutrients = item.get("nutrients") if isinstance(item.get("nutrients"), dict) else None

        recipe = Recipe(
            cuisine=to_none(item.get("cuisine")),
            title=title,
            rating=to_none(item.get("rating")),
            prep_time=to_none(item.get("prep_time")),
            cook_time=to_none(item.get("cook_time")),
            total_time=to_none(item.get("total_time")),
            description=to_none(item.get("description")),
            nutrients=nutrients,
            serves=to_none(item.get("serves"))
        )
        db.session.add(recipe)
        count += 1

    db.session.commit()
    print(f"✅ Data loaded successfully! Inserted {count} recipes.")
