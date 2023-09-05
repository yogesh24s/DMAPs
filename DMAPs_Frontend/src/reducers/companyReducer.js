import {
    FETCH_COMPANY_UNITS_REQUEST,
    FETCH_COMPANY_UNITS_SUCCESS,
    FETCH_COMPANY_UNITS_FAILURE,
  } from '../actions/companyActions';
  
  const initialState = {
    units: [],
    loading: false,
    error: null,
  };
  
  const companyReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COMPANY_UNITS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_COMPANY_UNITS_SUCCESS:
        return { ...state, loading: false, units: action.payload, error: null };
      case FETCH_COMPANY_UNITS_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default companyReducer;
  