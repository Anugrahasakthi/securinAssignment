# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from models import Recipe, db
# from db import init_db
# import re
# from sqlalchemy import cast, Integer

# app = Flask(__name__)
# CORS(app)
# init_db(app)

# # --------- API Endpoint 1: Get All Recipes (Paginated) ----------
# @app.route("/api/recipes", methods=["GET"])
# def get_recipes():
#     page = int(request.args.get("page", 1))
#     limit = int(request.args.get("limit", 10))
#     query = Recipe.query.order_by(Recipe.rating.desc())
#     total = query.count()
#     recipes = query.paginate(page=page, per_page=limit, error_out=False).items

#     return jsonify({
#         "page": page,
#         "limit": limit,
#         "total": total,
#         "data": [serialize_recipe(r) for r in recipes]
#     })


# # --------- API Endpoint 2: Search Recipes (Advanced Filters) ----------
# @app.route("/api/recipes/search", methods=["GET"])
# def search_recipes():
#     query = Recipe.query

#     title = request.args.get("title")
#     cuisine = request.args.get("cuisine")
#     rating = request.args.get("rating")
#     total_time = request.args.get("total_time")
#     calories = request.args.get("calories")

#     if title:
#         query = query.filter(Recipe.title.ilike(f"%{title}%"))
#     if cuisine:
#         query = query.filter(Recipe.cuisine.ilike(f"%{cuisine}%"))

#     # Handle rating filters (>=, <=, =)
#     if rating:
#         match = re.match(r"(>=|<=|=)(\d+(\.\d+)?)", rating)
#         if match:
#             op, value, _ = match.groups()
#             value = float(value)
#             if op == ">=":
#                 query = query.filter(Recipe.rating >= value)
#             elif op == "<=":
#                 query = query.filter(Recipe.rating <= value)
#             elif op == "=":
#                 query = query.filter(Recipe.rating == value)

#     # Handle total_time filters
#     if total_time:
#         match = re.match(r"(>=|<=|=)(\d+)", total_time)
#         if match:
#             op, value = match.groups()
#             value = int(value)
#             if op == ">=":
#                 query = query.filter(Recipe.total_time >= value)
#             elif op == "<=":
#                 query = query.filter(Recipe.total_time <= value)
#             elif op == "=":
#                 query = query.filter(Recipe.total_time == value)

#     # Handle calories filter (inside nutrients JSON)
#     if calories:
#         match = re.match(r"(>=|<=|=)(\d+)", calories)
#         if match:
#             op, value = match.groups()
#             value = int(value)
#             # nutrients is JSON, extract calories as integer
#             query = query.filter(
#                 cast(db.func.json_extract(Recipe.nutrients, '$.calories'), Integer).op(op)(value)
#             )

#     results = query.all()
#     return jsonify({"data": [serialize_recipe(r) for r in results]})


# # --------- Serialize Helper ----------
# def serialize_recipe(r):
#     return {
#         "id": r.id,
#         "title": r.title,
#         "cuisine": r.cuisine,
#         "rating": r.rating,
#         "prep_time": r.prep_time,
#         "cook_time": r.cook_time,
#         "total_time": r.total_time,
#         "description": r.description,
#         "nutrients": r.nutrients,
#         "serves": r.serves
#     }


# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from models import Recipe, db
from db import init_db
import re
from sqlalchemy import cast, Integer

app = Flask(__name__)
CORS(app)
init_db(app)

def serialize_recipe(r):
    return {
        "id": r.id,
        "title": r.title,
        "cuisine": r.cuisine,
        "rating": r.rating,
        "prep_time": r.prep_time,
        "cook_time": r.cook_time,
        "total_time": r.total_time,
        "description": r.description,
        "nutrients": r.nutrients,
        "serves": r.serves
    }

@app.route("/")
def home():
    return redirect("/api/recipes")

@app.route("/api/recipes", methods=["GET"])
def get_recipes():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    query = Recipe.query.order_by(Recipe.rating.desc())
    total = query.count()
    recipes = query.paginate(page=page, per_page=limit, error_out=False).items

    return jsonify({
        "page": page,
        "limit": limit,
        "total": total,
        "data": [serialize_recipe(r) for r in recipes]
    })

@app.route("/api/recipes/search", methods=["GET"])
def search_recipes():
    query = Recipe.query
    title = request.args.get("title")
    cuisine = request.args.get("cuisine")
    rating = request.args.get("rating")
    total_time = request.args.get("total_time")
    calories = request.args.get("calories")

    if title:
        query = query.filter(Recipe.title.ilike(f"%{title}%"))
    if cuisine:
        query = query.filter(Recipe.cuisine.ilike(f"%{cuisine}%"))

    if rating:
        match = re.match(r"(>=|<=|=)(\d+(\.\d+)?)", rating)
        if match:
            op, value, _ = match.groups()
            value = float(value)
            if op == ">=":
                query = query.filter(Recipe.rating >= value)
            elif op == "<=":
                query = query.filter(Recipe.rating <= value)
            elif op == "=":
                query = query.filter(Recipe.rating == value)

    if total_time:
        match = re.match(r"(>=|<=|=)(\d+)", total_time)
        if match:
            op, value = match.groups()
            value = int(value)
            if op == ">=":
                query = query.filter(Recipe.total_time >= value)
            elif op == "<=":
                query = query.filter(Recipe.total_time <= value)
            elif op == "=":
                query = query.filter(Recipe.total_time == value)

    if calories:
        match = re.match(r"(>=|<=|=)(\d+)", calories)
        if match:
            op, value = match.groups()
            value = int(value)
            query = query.filter(
                cast(db.func.json_extract(Recipe.nutrients, '$.calories'), Integer).op(op)(value)
            )

    results = query.all()
    return jsonify({"data": [serialize_recipe(r) for r in results]})

if __name__ == "__main__":
    app.run(debug=True)
