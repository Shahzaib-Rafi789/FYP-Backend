from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_DB_URI = os.getenv("MONGO_DB_URI")

client = MongoClient(MONGO_DB_URI)
db = client['BandUp']
