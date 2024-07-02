import { ActionType } from './action';

const initState = {
  threads: [],
  users: [],
  addThread: false,
};

function ThreadandUsersReducer(state = initState, action) {
  switch (action.type) {
    case ActionType.GET_THREAD_AND_USER:
      return {
        ...state,
        threads: action.payload.threads,
        users: action.payload.users,
      };
    case ActionType.ADD_THREAD:
      return {
        ...state,
        addThread: action.payload,
      };
    default:
      return state;
  }
}

export default ThreadandUsersReducer;
