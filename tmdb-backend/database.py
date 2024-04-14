from pymongo import MongoClient
import json


class Database:
    def __init__(self, db_name, collection_name):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

    def find_one(self, query):
        return self.collection.find_one(query)

    def custom_query(self, pipeline_name):
        with open('config.json') as f:
            config = json.load(f)

        if pipeline_name in config:
            pipeline = config[pipeline_name]
            result = self.collection.aggregate(pipeline)
            return list(result)
        else:
            raise ValueError(f"Pipeline '{pipeline_name}' not found in config file.")
