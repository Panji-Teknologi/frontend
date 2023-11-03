import { lazy } from 'react';
import { RequireAuth } from 'react-auth-kit';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import MinimalLayout from '../layout/MinimalLayout';
import { Navigate } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';

// render - pages
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));
const AuthPhone = Loadable(lazy(() => import('../pages/authentication/Register')));

const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));
const Project = Loadable(lazy(() => import('../pages/project')));
const ProjectDetail = Loadable(lazy(() => import('../sections/project/ProjectDetail')));
const Profile = Loadable(lazy(() => import('../pages/profile')));

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
          <RequireAuth loginPath='/login'>
            <Dashboard />
          </RequireAuth>
        )
      },
      {
        path: 'project',
        element: (
          <RequireAuth loginPath='/login'>
            <Project />
          </RequireAuth>
        )
      },
      {
        path: 'project/:userId',
        element: (
          <RequireAuth loginPath='/login'>
            <ProjectDetail />
          </RequireAuth>
        )
      },
      {
        path: 'profile',
        element: (
          <RequireAuth loginPath='/login'>
            <Profile />
          </RequireAuth>
        )
      },
    ]
  }
]

export default routes