from mock import patch
import pytest
import sys
sys.path.insert(0,'..')
from start_game import start_game

@patch("start_game.start_game.get_random_questions", return_value=['q1', 'q2'])
def test_handler(get_random_patch):
    response = start_game.handler('event', 'context')

    get_random_patch.assert_called()
    assert 200 == response['statusCode']
    assert 'q1' and 'q2' in response['body']

@patch("start_game.start_game.logger.error")
@patch("start_game.start_game.get_random_questions", side_effect=Exception('Dynamo Error'))
def test_handler_error(get_random_patch, logger_error_patch):
    response = start_game.handler('event', 'context')

    # Assert error logged
    logger_error_patch.assert_called()

    # Return 500 with specific error
    assert 500 == response['statusCode']
    assert 'Dynamo Error' in response['body']