import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  GET_THREAD_AND_USER: 'GET_THREAD_AND_USER',
  ADD_THREAD: 'ADD_THREAD',
};

function getThreadsAndUsersActionCreator(payload) {
  return {
    type: ActionType.GET_THREAD_AND_USER,
    payload,
  };
}

function addThreadsActionCreator(payload) {
  return {
    type: ActionType.ADD_THREAD,
    payload,
  };
}

function asyncGetThreadAndUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const Threads = await api.getAllThreads();
      const Users = await api.getAllUsers();
      dispatch(getThreadsAndUsersActionCreator({ threads: Threads, users: Users }));
      dispatch(addThreadsActionCreator(false));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.createThread({ title, body, category });
      dispatch(addThreadsActionCreator(true));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  getThreadsAndUsersActionCreator,
  addThreadsActionCreator,
  asyncGetThreadAndUsers,
  asyncAddThread,
};
