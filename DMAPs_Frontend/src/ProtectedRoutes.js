/**
 * owner : 
 * author : 
 */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import helper from "./services/tokenStore";

// receives component and any other props represented by ...rest
export default function ProtectedRoutes({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = helper.fetchToken();
        const userRole = helper.getRole();
        const refToken = helper.fetchRefreshToken();

        /*uncomment below code once login is integrated*/

        // return route if there is a valid token set
        if ((token || refToken) && userRole) {
          return <Component {...props} />;
        } else {
          // return the user to the landing page if there is no valid token set
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  // sets the location a user was about to assess before being redirected to login
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
