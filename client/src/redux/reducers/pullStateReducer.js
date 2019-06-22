import { PULLS } from '../constants';

const pullStateReducer = (
 state = { pullsState: ['open', 'closed', 'all'], currentPullState: 'all' },
 action
) => {
 if (action.type === PULLS.CURRENT) {
  return {
   ...state,
   currentPullState: action.pullState
  };
 }

 return state;
};

export default pullStateReducer;
