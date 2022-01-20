from flask import Flask

app = Flask(__name__)

# Read settings from config module (app/config.py)
app.config.from_object("app.config")

from app import routes