from mock import patch
import pytest
import sys, os

file_path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, file_path + '/../')

import save_score

@patch("save_score.save_score")
def test_handler(save_score_patch):
    event = {}
    event['headers'] = {}
    event['headers']['name'] = "Jim"
    event['headers']['score'] = "200"
    response = save_score.handler(event, 'context')

    save_score_patch.assert_called()
    assert 200 == response['statusCode']
    assert 'successfully' in response['body']

@patch("save_score.logger.error")
@patch("save_score.save_score", side_effect=Exception('Dynamo Error'))
def test_handler_error(save_score_patch, logger_error_patch):
    event = {}
    event['headers'] = {}
    event['headers']['name'] = "Steve"
    event['headers']['score'] = "500"
    response = save_score.handler(event, 'context')

    save_score_patch.assert_called()

    # Assert error logged
    logger_error_patch.assert_called()

    # Return 500 with specific error
    assert 500 == response['statusCode']
    assert 'Dynamo Error' in response['body']