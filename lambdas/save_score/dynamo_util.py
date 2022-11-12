import boto3
import random
import boto3
from boto3.dynamodb.conditions import Key
import uuid
import logging

logging.basicConfig(format='%(asctime)s %(message)s',level=logging.DEBUG)
logger = logging.getLogger(__name__)

def save_score(name: str, score: int):
    """Creates a random hash key and saves player's name and score to GameScores table"""
    dynamodb = boto3.resource('dynamodb')
    scoress_table = dynamodb.Table('GameScores')

    new_id = str(uuid.uuid4())
    item_to_put = {"GameScoreId": new_id, "score": score, "name": name}
    logger.info(f"putting item: {item_to_put}")
    response = scoress_table.put_item(Item=item_to_put)
    logger.info(f"Done putting item, response: {str(response)}")
