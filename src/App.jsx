import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { CircularProgress } from '@mui/material';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/dashboard/Users';
import Courses from './pages/dashboard/Courses';
import ScheduledSlots from './pages/dashboard/ScheduledSlots';
import Vouchers from './pages/dashboard/Vouchers';
import Initial from './pages/Initial';

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
          index
          element={(
            <WaitWhileLoad>
              <Initial />
            </WaitWhileLoad>
          )}
        />

        <Route
          path="/admin-login"
          element={(
            <WaitWhileLoad>
              <AdminLogin />
            </WaitWhileLoad>
          )}
        />

        <Route
          path="/dashboard"
          element={(
            <WaitWhileLoad>
              <Dashboard />
            </WaitWhileLoad>
          )}
        >
          {/* <Route
            index
            element={(
              <WaitWhileLoad>
                <Users />
              </WaitWhileLoad>
            )}
          /> */}
          <Route
            path="users"
            element={(
              <WaitWhileLoad>
                <Users />
              </WaitWhileLoad>
            )}
          />
          <Route
            path="courses"
            element={(
              <WaitWhileLoad>
                <Courses />
              </WaitWhileLoad>
            )}
          />
          <Route
            path="scheduled-slots"
            element={(
              <WaitWhileLoad>
                <ScheduledSlots />
              </WaitWhileLoad>
            )}
          />
          <Route
            path="vouchers"
            element={(
              <WaitWhileLoad>
                <Vouchers />
              </WaitWhileLoad>
            )}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
