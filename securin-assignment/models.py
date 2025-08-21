# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

# class Recipe(db.Model):
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     cuisine = db.Column(db.String(100))
#     title = db.Column(db.String(255))
#     rating = db.Column(db.Float, nullable=True)
#     prep_time = db.Column(db.Integer, nullable=True)
#     cook_time = db.Column(db.Integer, nullable=True)
#     total_time = db.Column(db.Integer, nullable=True)
#     description = db.Column(db.Text)
#     nutrients = db.Column(db.JSON)   # JSONB equivalent
#     serves = db.Column(db.String(50))

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cuisine = db.Column(db.String, nullable=True)
    title = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float, nullable=True)
    prep_time = db.Column(db.Integer, nullable=True)
    cook_time = db.Column(db.Integer, nullable=True)
    total_time = db.Column(db.Integer, nullable=True)
    description = db.Column(db.Text, nullable=True)
    nutrients = db.Column(db.JSON, nullable=True)
    serves = db.Column(db.String, nullable=True)

