import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Loading from './components/common/Loading';

// pages for lazy load
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const Users = React.lazy(() => import('./pages/dashboard/Users'));
const Courses = React.lazy(() => import('./pages/dashboard/Courses'));
const ScheduledSlots = React.lazy(() => import('./pages/dashboard/ScheduledSlots'));
const Vouchers = React.lazy(() => import('./pages/dashboard/Vouchers'));
const Initial = React.lazy(() => import('./pages/Initial'));
const Course = React.lazy(() => import('./components/courses/course/Course'));

function WaitWhileLoad({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
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
            path="courses/course/:id"
            element={(
              <WaitWhileLoad>
                <Course />
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
