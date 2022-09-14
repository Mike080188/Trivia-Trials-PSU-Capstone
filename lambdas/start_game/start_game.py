import json
import pandas as pd
import requests

def handler(event, context):
    # p_version = pd.__version__
    # r = requests.get("https://www.google.com")
    # status_code = r.status_code

    # return_statement = "Google status code: " + status_code + "\nPandas version: " + p_version

    return {
        "statusCode": 200,
        "body": json.dumps("Hello World5555!!")
    }
    # return "Hello World!!"
