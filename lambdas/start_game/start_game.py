import json
import requests
import boto3
import dynamo_util

def handler(event, context):

    questions = dynamo_util.get_random_questions(3)

    return {
        "statusCode": 200,
        "body": json.dumps(questions),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }
