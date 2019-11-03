import { PULLS, PULL_STATE } from '../constants';

const pullStateReducer = (state = PULL_STATE.OPEN, action) => {
  if (action.type === PULLS.CURRENT) {
    return action.pullState;
  }

  return state;
};

export default pullStateReducer;
