import sys
import boto3
sys.path.insert(0,'..')
# import dynamo_util_save_score

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
def test_save_score_low_score_not_saved():
    import dynamo_util_save_score # Mocking Dynamo only seems to work with import here
    setup()
    dynamo_util_save_score.save_score("Steve", 55)

    dynamodb = boto3.resource('dynamodb')
    scores_table = dynamodb.Table('GameScores')
    results = scores_table.scan()
    scores = results['Items']

    # Assert Steve's score was not persisted since it was lower than 25th score
    assert not any(score['name'] == 'Steve' for score in scores)

@mock_dynamodb
def test_save_score_made_top_25_update_low_score():
    import dynamo_util_save_score # Mocking Dynamo only seems to work with import here
    setup()
    low_score_name = "user_1"
    dynamo_util_save_score.save_score("John", 500)

    dynamodb = boto3.resource('dynamodb')
    scores_table = dynamodb.Table('GameScores')
    results = scores_table.scan()
    scores = results['Items']

    # Still 25 scores
    assert 25 == len(scores)

    # Assert John's score was persisted since it was lower than 25th score
    assert any(score['name'] == 'John' for score in scores)

    # The lowest score is gone because it was overwritten by John's
    assert not any(score['name'] == low_score_name for score in scores)

@mock_dynamodb
def test_save_score_less_than_25_in_db(num_of_scores_to_load=5):
    import dynamo_util_save_score # Mocking Dynamo only seems to work with import here
    setup(num_of_scores_to_load=5)
    low_score_name = "user_1"
    dynamo_util_save_score.save_score("Joe", 777)

    dynamodb = boto3.resource('dynamodb')
    scores_table = dynamodb.Table('GameScores')
    results = scores_table.scan()
    scores = results['Items']

    # Now 6 scores since score was added not overwritten
    assert 6 == len(scores)

    # Assert Joe's score was persisted since there are < 25 scores in DB
    assert any(score['name'] == 'Joe' for score in scores)

