import boto3
import random
import boto3
from boto3.dynamodb.conditions import Key
import logging

logging.basicConfig(format='%(asctime)s %(message)s',level=logging.DEBUG)
logger = logging.getLogger(__name__)

session = boto3.Session(
    aws_access_key_id='AKIAQXG2QO662RS7C5OB', # os.environ['ACCESS_KEY'],
    aws_secret_access_key='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' # os.environ['SECRET_KEY'],
)

MAX_QUESTION_ID = 14

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
