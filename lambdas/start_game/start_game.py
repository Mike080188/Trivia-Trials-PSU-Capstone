import json
import requests
import boto3
import dynamo_util
import logging

logging.basicConfig(format='%(asctime)s %(message)s',level=logging.DEBUG)
logger = logging.getLogger(__name__)

def handler(event, context):

    try:
        questions = dynamo_util.get_random_questions(6)

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
        logger.error('An error occured: ' + e)
        return {
            "statusCode": 500,
            "body": json.dumps('The following error occured: ' + e),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }
