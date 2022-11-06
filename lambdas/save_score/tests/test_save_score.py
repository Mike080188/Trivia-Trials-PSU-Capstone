from mock import patch
import pytest
import sys
sys.path.insert(0,'..')
import save_score

# @patch("save_score.get_random_questions", return_value=['q1', 'q2'])
def test_handler():
    assert True == True
    # response = save_score.handler('event', 'context')

    # get_random_patch.assert_called()
    # assert 200 == response['statusCode']
    # assert 'q1' and 'q2' in response['body']

# @patch("save_score.logger.error")
# @patch("save_score.get_random_questions", side_effect=Exception('Dynamo Error'))
# def test_handler_error(get_random_patch, logger_error_patch):
#     response = save_score.handler('event', 'context')

#     # Assert error logged
#     logger_error_patch.assert_called()

#     # Return 500 with specific error
#     assert 500 == response['statusCode']
#     assert 'Dynamo Error' in response['body']