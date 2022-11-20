import boto3
import random
import boto3
from boto3.dynamodb.conditions import Key
import uuid
import logging

logging.basicConfig(format='%(asctime)s %(message)s',level=logging.DEBUG)
logger = logging.getLogger(__name__)

def get_leaderboard():
    """Get the leaderboard from GameScores table return sorted descending"""
    dynamodb = boto3.resource('dynamodb')
    scores_table = dynamodb.Table('GameScores')

    results = scores_table.scan()
    scores = results['Items']

    for score in scores:
        score['score'] = int(score['score'])

    sorted_scores = sorted(scores, key=lambda d: int(d['score']), reverse=True) 
    return sorted_scores


