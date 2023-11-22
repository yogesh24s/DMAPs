/**
 * owner :
 * author : 
 */
import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoutes from "./ProtectedRoutes";
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePasswords';

const LandingPage = lazy(() => import('./components/LandingPage'));

const Login = lazy(() => import('./components/Login'));


export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback=''>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"></Redirect>
          </Route>

          <Route exact path="/login" component={Login} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/changePassword" component={ChangePassword} />

          <ProtectedRoutes exact path="/landingpage" component={LandingPage} />

        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
