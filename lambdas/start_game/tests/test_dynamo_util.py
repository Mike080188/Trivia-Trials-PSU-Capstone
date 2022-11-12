import sys, os
import boto3

file_path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, file_path + '/../')

import dynamo_util

from moto import mock_dynamodb

@mock_dynamodb
def setup():
    """Setup mock Dynamo Questions table and insert mock data"""
    client = boto3.client('dynamodb', region_name='us-east-1')

    client.create_table(
        AttributeDefinitions=[
            {"AttributeName": "QuestionId", "AttributeType": "S"},
        ],
        TableName="Questions",
        KeySchema=[
            {"AttributeName": "QuestionId", "KeyType": "HASH"},
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        }
    )
    questions_to_put = [
        {
            'QuestionId':{'S':'1'},
            'Question':{'S':'Q1'}
        },
        {
            'QuestionId':{'S':'2'},
            'Question':{'S':'Q2'}
        },
        {
            'QuestionId':{'S':'3'},
            'Question':{'S':'Q3'}
        },
        {
            'QuestionId':{'S':'4'},
            'Question':{'S':'Q4'}
        },
        {
            'QuestionId':{'S':'5'},
            'Question':{'S':'Q5'}
        },
        {
            'QuestionId':{'S':'6'},
            'Question':{'S':'Q6'}
        }
    ]

    for question in questions_to_put:
        client.put_item(TableName="Questions", Item=question)

@mock_dynamodb
def test_get_random_questions():
    setup()
    dynamo_util.MAX_QUESTION_ID = 6 # 6 questions have been loaded in the mock db
    response = dynamo_util.get_random_questions(3)

    unique_questions = set()
    for question in response:
        unique_questions.add(question['Question'])

    # Assert there were no duplicates and length is 3. Extracting all questions
    # and converting to a set would remove any duplicates, changing the length
    assert 3 == len(unique_questions)
