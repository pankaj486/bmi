import { combineReducers } from 'redux';
import BmiReducer from './BmiReducer';


const reducers = combineReducers({
      bmiConverter: BmiReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;