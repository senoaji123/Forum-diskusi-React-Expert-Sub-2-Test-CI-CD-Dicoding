import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  GET_THREAD_DETAIL: 'GET_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
};

function getThreadDetailActionCreator(payload) {
  return {
    type: ActionType.GET_THREAD_DETAIL,
    payload,
  };
}

function addCommentActionCreator(payload) {
  return {
    type: ActionType.ADD_COMMENT,
    payload,
  };
}

function asyncGetThreadDetail(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.getThreadDetail(id);
      dispatch(addCommentActionCreator(false));
      dispatch(getThreadDetailActionCreator(response));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment(param) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.createComment(param);
      dispatch(addCommentActionCreator(true));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  getThreadDetailActionCreator,
  addCommentActionCreator,
  asyncGetThreadDetail,
  asyncAddComment,
};
