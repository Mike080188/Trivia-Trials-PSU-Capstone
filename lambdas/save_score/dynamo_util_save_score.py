import boto3
import random
import boto3
from boto3.dynamodb.conditions import Key
import uuid
import logging

logging.basicConfig(format='%(asctime)s %(message)s')
logging.getLogger().setLevel(logging.INFO)
logger = logging.getLogger(__name__)

dynamodb = boto3.resource('dynamodb')
scores_table = dynamodb.Table('GameScores')
table_size = None

def save_score(name: str, score: int):
    """Creates a random hash key and saves player's name and score to GameScores table"""
    min_score_obj = get_min_score()
    min_score = int(min_score_obj['score'])

    is_high_score = score >= min_score
    if is_high_score or table_size < 25:
        if table_size < 25:
            # Simply add the new item
            add_new_score(name, score)
        elif is_high_score:
            # Update/replace the min score with this score
            min_score_key = min_score_obj['GameScoreId']
            update_score(min_score_key, name, score)

    else:
        logger.info(f"Score {score} did not make the leaderboard, not saving")

def get_min_score():
    """Gets the lowest score obj from the GameScores table"""

    results = scores_table.scan()
    scores = results['Items']
    global table_size
    table_size = len(scores)
    sorted_scores = sorted(scores, key=lambda d: int(d['score'])) 
    return sorted_scores[0]

def update_score(key, name, score):

    UpdateExpression = 'SET #nm = :name, score = :score'
    ExpressionAttributeValues = {
            ':name': name,
            ':score': score
    }
    ExpressionAttributeNames={
        "#nm": "name"
    }
    update = scores_table.update_item(
        Key={
            'GameScoreId': key
        },
        UpdateExpression=UpdateExpression,
        ExpressionAttributeValues=ExpressionAttributeValues,
        ExpressionAttributeNames=ExpressionAttributeNames
    )

def add_new_score(name, score):
        new_id = str(uuid.uuid4())
        item_to_put = {"GameScoreId": new_id, "score": score, "name": name}
        logger.info(f"putting item: {item_to_put}")
        response = scores_table.put_item(Item=item_to_put)
        logger.info(f"Done putting item, response: {str(response)}")
