import boto3
import random
import boto3
from boto3.dynamodb.conditions import Key
import logging

logging.basicConfig(format='%(asctime)s %(message)s')
logging.getLogger().setLevel(logging.INFO)
logger = logging.getLogger(__name__)

MAX_QUESTION_ID = 15

def get_random_questions(num_questions) -> list:
    """Returns unique random questions from Dynamo"""
    dynamodb = boto3.resource('dynamodb')
    questions_table = dynamodb.Table('Questions')
    questions = []
    counted_ids = []

    logger.info('Getting ' + str(num_questions) + ' random questions')

    # Loop until desired number of unique questions
    while len(counted_ids) < num_questions:
        rand = random.randint(1,MAX_QUESTION_ID)
        # Don't want duplicates
        if(rand in counted_ids):
            continue
        counted_ids.append(rand)

        # Get Question based on random id
        resp = questions_table.query(KeyConditionExpression=Key('QuestionId').eq(str(rand)))
        logger.info('response from Dynamo: ' + str(resp))
        question = resp['Items'][0]

        questions.append(question)

    return questions

# x = get_random_questions(4)
# print(x)
