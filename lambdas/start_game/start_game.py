import json
from dynamo_util import get_random_questions
import logging

logging.basicConfig(format='%(asctime)s %(message)s')
logging.getLogger().setLevel(logging.INFO)
logger = logging.getLogger(__name__)

def handler(event, context):

    try:
        questions = get_random_questions(10)

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
