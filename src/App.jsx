import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { CircularProgress } from '@mui/material';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/dashboard/Users';

// pages for lazy load
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));

function WaitWhileLoad({ children }) {
  return <Suspense fallback={<CircularProgress size="small" />}>{children}</Suspense>;
}

function App() {
  return (
    <Suspense fallback={<CircularProgress size="small" />}>
      <Routes>
        <Route
          path="/admin-login"
          element={(
            <WaitWhileLoad>
              <AdminLogin />
            </WaitWhileLoad>
            )}
        />

        <Route
          path="/"
          element={(
            <WaitWhileLoad>
              <Dashboard />
            </WaitWhileLoad>
            )}
        >
          <Route
            index
            element={(
              <WaitWhileLoad>
                <Users />
              </WaitWhileLoad>
              )}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
