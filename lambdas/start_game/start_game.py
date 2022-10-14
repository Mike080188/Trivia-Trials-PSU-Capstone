import json
import requests
import boto3
import dynamo_util

def handler(event, context):

    body = [
        {
            'q': 'Who killed Alexander Hamilton?',
            'answers': [
                {
                    'answer': 'Vice President Aaaron Burr',
                    'isCorrect': True
                },
                {
                    'answer': 'Patrick Henry',
                    'isCorrect': False
                },
                {
                    'answer': 'Himself',
                    'isCorrect': False
                },
                {
                    'answer': 'Benedict Arnold',
                    'isCorrect': False
                }
            ]
        },
        {
            'q': 'What is 37 x 4 x 5?',
            'answers': [
                {
                    'answer': '740',
                    'isCorrect': True
                },
                {
                    'answer': '620',
                    'isCorrect': False
                },
                {
                    'answer': '988',
                    'isCorrect': False
                },
                {
                    'answer': '580',
                    'isCorrect': False
                }
            ]
        },
        {
            'q': 'What year was Jurassic Park released?',
            'answers': [
                {
                    'answer': '1997',
                    'isCorrect': False
                },
                {
                    'answer': '1995',
                    'isCorrect': False
                },
                {
                    'answer': '1993',
                    'isCorrect': True
                },
                {
                    'answer': '1991',
                    'isCorrect': False
                }
            ]
        }
    ]
    questions = dynamo_util.get_random_questions(6)

    print('returning following questions: ' + str(questions))

    return {
        "statusCode": 200,
        "body": json.dumps(questions),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }
    # return "Hello World!!"
