import { ActionType } from './action';

const initState = {
  threadDetail: {},
  commentCreated: false,
};

function ThreadDetailReducer(state = initState, action) {
  switch (action.type) {
    case ActionType.GET_THREAD_DETAIL:
      return {
        ...state,
        threadDetail: action.payload,
      };
    case ActionType.ADD_COMMENT:
      return {
        ...state,
        commentCreated: action.payload,
      };
    default:
      return state;
  }
}

export default ThreadDetailReducer;
