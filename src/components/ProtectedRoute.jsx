import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/auth/signin" replace />;
  }
}


export default ProtectedRoute;