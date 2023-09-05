import unitService from '../services/unitService'; 

export const FETCH_COMPANY_UNITS_REQUEST = 'FETCH_COMPANY_UNITS_REQUEST';
export const FETCH_COMPANY_UNITS_SUCCESS = 'FETCH_COMPANY_UNITS_SUCCESS';
export const FETCH_COMPANY_UNITS_FAILURE = 'FETCH_COMPANY_UNITS_FAILURE';

export const fetchCompanyUnits = () => (dispatch) => {
  dispatch({ type: FETCH_COMPANY_UNITS_REQUEST });
  return unitService
    .get("/getCompanyUnits")
    .then((response) => {
      dispatch({ type: FETCH_COMPANY_UNITS_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: FETCH_COMPANY_UNITS_FAILURE, error: err.message });
    });
};
