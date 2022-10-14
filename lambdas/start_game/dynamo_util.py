import os
import boto3
import random
import boto3, json
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
questions_table = table = dynamodb.Table('Questions')

def get_max_question_id():
    # Get Question 1 holding table count
    resp = questions_table.query(KeyConditionExpression=Key('QuestionId').eq('1'))
    question = resp['Items'][0]

    max_id = int(question['MaxQuestionId'])

    return max_id

def get_random_questions(num_questions) -> list:
    questions = []

    # table = dynamodb.Table('Questions')
    counted_ids = []
    max_id = get_max_question_id()

    # Loop until desired number of unique questions
    while len(counted_ids) < num_questions-1:
        rand = random.randint(2,max_id)
        # Don't want duplicates
        if(rand in counted_ids): 
            continue
        counted_ids.append(rand)

        # Get Question based on random id
        resp = questions_table.query(KeyConditionExpression=Key('QuestionId').eq(str(rand)))
        question = resp['Items']

        questions.append(question)

    return questions

# x = get_random_questions(4)
# print(x)
