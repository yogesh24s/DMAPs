/**
 * owner :
 * author : 
 */
import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoutes from "./ProtectedRoutes";

const LandingPage = lazy(() => import('./components/LandingPage'));

const Login = lazy(() => import('./components/Login'));

const ChangePassword = lazy(() => import('./components/ChangePassword'));

const ForgotPassword = lazy(() => import('./components/ForgotPassword'));

const SignUp = lazy(() => import('./components/SignUp'));

const TermsandConditions = lazy(() => import('./components/TermsandConditions'));



export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback=''>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"></Redirect>
          </Route>

          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route path="/changepassword" component={ChangePassword} />
         
          <Route exact path="/signup" component={SignUp} />

          <Route exact path="/termsandconditions" component={TermsandConditions} />

          <ProtectedRoutes exact path="/landingpage" component={LandingPage} />

        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
