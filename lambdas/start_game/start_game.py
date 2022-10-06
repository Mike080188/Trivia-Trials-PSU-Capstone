import json
import requests
import boto3

def handler(event, context):
    # p_version = pd.__version__
    # r = requests.get("https://www.google.com")
    # status_code = r.status_code

    # return_statement = "Google status code: " + status_code + "\nPandas version: " + p_version
    body = [
        {
            'q': 'Who killed Alexander Hamilton?',
            'correctAnswer': 'Vice President Aaaron Burr',
            'wrongAnswer1': 'Patrick Henry',
            'wrongAnswer2': 'Himself',
            'wrongAnswer3': 'Benedict Arnold',
        },
        {
            'q': 'What is 37 x 4 x 5?',
            'correctAnswer': '740',
            'wrongAnswer1': '620',
            'wrongAnswer2': '988',
            'wrongAnswer3': '580',
        }
    ]

    return {
        "statusCode": 200,
        "body": json.dumps(body),
        # 'headers': {
        #     'Content-Type': 'application/json',
        # },
    }
    # return "Hello World!!"
