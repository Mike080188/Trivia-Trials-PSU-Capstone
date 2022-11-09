import json
import requests
import boto3
from dynamo_util import save_score
import logging

logging.basicConfig(format='%(asctime)s %(message)s',level=logging.DEBUG)
logger = logging.getLogger(__name__)

def handler(event, context):

    try:
        logger.info(f"event {str(event)}")
        questions = save_score("s900", 900)

        logger.info('returning following questions: ' + str(questions))

        return {
            "statusCode": 200,
            "body": json.dumps(questions),
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
