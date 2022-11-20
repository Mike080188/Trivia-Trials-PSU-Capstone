from mock import patch
import pytest
import sys, os

file_path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, file_path + '/../')

import get_leaderboard

@patch("get_leaderboard.get_leaderboard", return_value=[{"name": "Steve", "score": "340"},{"name": "Bob", "score": "500"}])
def test_handler(save_score_patch):

    response = get_leaderboard.handler("event", 'context')

    save_score_patch.assert_called()
    assert 200 == response['statusCode']
    assert 'Steve' and 'Bob' in response['body']

@patch("get_leaderboard.logger.error")
@patch("get_leaderboard.get_leaderboard", side_effect=Exception('Dynamo Error'))
def test_handler_error(get_leaderboard_patch, logger_error_patch):
    # event = {}
    # event['headers'] = {}
    # event['headers']['name'] = "Steve"
    # event['headers']['score'] = "500"
    response = get_leaderboard.handler('event', 'context')

    get_leaderboard_patch.assert_called()

    # Assert error logged
    logger_error_patch.assert_called()

    # Return 500 with specific error
    assert 500 == response['statusCode']
    assert 'Dynamo Error' in response['body']