import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  GET_LEADERBOARDS: 'GET_LEADERBOARDS',
};

function AsyncGetLeaderBoards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(GetLeaderBoards(leaderboards));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, AsyncGetLeaderBoards, GetLeaderBoards };
