import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import MinimalLayout from '../layout/MinimalLayout';
import ProtectedRoutes from './ProtectedRoutes';
import { Navigate } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';

// render - pages
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));
const AuthPhone = Loadable(lazy(() => import('../pages/authentication/Register')));

const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));
const History = Loadable(lazy(() => import('../pages/history')));

// ==============================|| ROUTING RENDER ||============================== //

const routes = (isAuthenticated: boolean) => [
  {
    path: '*',
    element: <NotFoundPage />
  },
  {
    path: '/',
    element: isAuthenticated ? <MainLayout /> : <MinimalLayout />,
    children: [
      // ======== Not Authenticated ========
      {
        path: '',
        element: isAuthenticated && <Navigate to="/dashboard" replace />
      },
      {
        path: 'login',
        element: isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthLogin />
      },
      {
        path: 'register',
        element: isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPhone />
      },
      // ======== Authenticated ========
      {
        path: 'dashboard',
        element: (
          <ProtectedRoutes isSignedIn={isAuthenticated}>
            <Dashboard />
          </ProtectedRoutes>
        )
      },
      {
        path: 'history',
        element: (
          <ProtectedRoutes isSignedIn={isAuthenticated}>
            <History />
          </ProtectedRoutes>
        )
      }
    ]
  }
]

export default routes