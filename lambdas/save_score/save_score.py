import json
import requests
import boto3
from dynamo_util import save_score
import logging

logging.basicConfig(format='%(asctime)s %(message)s')
logging.getLogger().setLevel(logging.INFO)
logger = logging.getLogger(__name__)

def handler(event, context):
    logger.info(f"event {str(event)}")
    try:
        name = event['headers']['Name']
        score = event['headers']['Score']

        save_score(name, score)

        logger.info('Score saved')

        return {
            "statusCode": 200,
            "body": json.dumps("Score saved successfully"),
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
