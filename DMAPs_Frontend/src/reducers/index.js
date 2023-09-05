import { combineReducers } from 'redux';
import companyReducer from './companyReducer';

const rootReducer = combineReducers({
  company: companyReducer,
});

export default rootReducer;
