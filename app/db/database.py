from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_DB_URI = os.getenv("MONGO_DB_URI")

client = MongoClient(MONGO_DB_URI, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged Successfully. Database Online!")
except Exception as e:
    print(e)


# client = MongoClient(MONGO_DB_URI)
# db = client['BandUp']
