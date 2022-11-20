import json
import requests
import boto3
from dynamo_util import get_leaderboard
import logging

logging.basicConfig(format='%(asctime)s %(message)s',level=logging.DEBUG)
logger = logging.getLogger(__name__)

def handler(event, context):

    try:
        print(f"event {str(event)}")
        leaderboard = get_leaderboard()

        logger.info('returning following leaderboard: ' + str(leaderboard))

        return {
            "statusCode": 200,
            "body": json.dumps(leaderboard),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }
    except Exception as e:
        logger.error('An error occured: ' + str(e))
        return {
            "statusCode": 500,
            "body": json.dumps('The following error occured: ' + str(e)),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }

