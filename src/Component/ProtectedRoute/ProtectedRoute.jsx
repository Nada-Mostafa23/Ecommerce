
import { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { userContext } from '../Context/Usercontext';

export default function ProtectedRoute(props) {
    const { userToken } = useContext(userContext);

  if (!userToken) {
    return <Navigate to="/" replace />;
  }

  return props.children;
}

