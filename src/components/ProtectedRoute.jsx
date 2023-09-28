// import { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContextComponent';

// function ProtectedRoute({ children }) {
//   const { isLoggedIn } = useContext(AuthContext);

//   if (isLoggedIn) {
//     return children;
//   } 
//   // update logic so that your /auth/signin and /auth/signup routes are not protected routes.
//   // the way the if statement is written means that the initial value is not true because by default you are not logged in
//   // the current else statement makes it so that if you are not logged in, you are redirected to the signin page
//   // figure out the relevant logic so the navigate doesn't work for the signin and signup pages
//   else {
//     return <Navigate to="/auth/signin"  />;
//   }
// }


// export default ProtectedRoute;

import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  // Check if the current route is /auth/signin or /auth/signup
  const isAuthRoute = location.pathname === '/auth/signin' || location.pathname === '/auth/signup';

  if (isLoggedIn || isAuthRoute) {
    return children;
  } else {
    return <Navigate to="/auth/signin" />;
  }
}

export default ProtectedRoute;


