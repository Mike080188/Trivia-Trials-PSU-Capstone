import boto3
import random
import boto3
from boto3.dynamodb.conditions import Key
import uuid
import logging

logging.basicConfig(format='%(asctime)s %(message)s',level=logging.DEBUG)
logger = logging.getLogger(__name__)

def get_leaderboard():
    """Get the leaderboard from GameScores table"""
    return [{"name": "Steve", "score": "340"},{"name": "Bob", "score": "500"}]
    # dynamodb = boto3.resource('dynamodb')
    # scoress_table = dynamodb.Table('GameScores')

    # questions = []
    # counted_ids = []

    # logger.info('Getting ' + str(num_questions) + ' random questions')

    # # Loop until desired number of unique questions
    # while len(counted_ids) < num_questions:
    #     rand = random.randint(1,MAX_QUESTION_ID)
    #     # Don't want duplicates
    #     if(rand in counted_ids):
    #         continue
    #     counted_ids.append(rand)

    #     # Get Question based on random id
    #     resp = questions_table.query(KeyConditionExpression=Key('QuestionId').eq(str(rand)))
    #     logger.info('response from Dynamo: ' + str(resp))
    #     question = resp['Items'][0]

    #     questions.append(question)

    # return questions


    # new_id = str(uuid.uuid4())
    # item_to_put = {"GameScoreId": new_id, "score": score, "name": name}
    # logger.info(f"putting item: {item_to_put}")
    # scoress_table.put_item(Item=item_to_put)
    # logger.info("done")

