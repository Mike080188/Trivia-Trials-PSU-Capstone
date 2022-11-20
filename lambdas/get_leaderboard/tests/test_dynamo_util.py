import sys
import boto3
sys.path.insert(0,'..')
# import dynamo_util

from moto import mock_dynamodb

@mock_dynamodb
def setup(num_of_scores_to_load=25):
    """Setup mock Dynamo GameScores table and insert mock data"""
    client = boto3.client('dynamodb', region_name='us-east-1')

    client.create_table(
        AttributeDefinitions=[
            {"AttributeName": "GameScoreId", "AttributeType": "S"},
        ],
        TableName="GameScores",
        KeySchema=[
            {"AttributeName": "GameScoreId", "KeyType": "HASH"},
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        }
    )

    items_to_put = []

    # Load db with scores
    for i in range(1, num_of_scores_to_load + 1):
        item =  {
            'GameScoreId':{'S': str(i)},
            'name':{'S': 'user' + '_' + str(i)},
            'score':{'N': str(i * 100)}
        }
        items_to_put.append(item)


    for item in items_to_put:
        client.put_item(TableName="GameScores", Item=item)

@mock_dynamodb
def test_get_leaderboard():
    import dynamo_util # Mocking Dynamo only seems to work with import here
    setup()
    leaderboard = dynamo_util.get_leaderboard()

    assert len(leaderboard) == 25
    assert leaderboard[-1]['score'] == 100 # Lowest score last
    assert leaderboard[0]['score'] == 2500 # Highest score first

