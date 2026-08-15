import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import AppLayout from '../components/AppLayout';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/Dashboard';
import CreateUser from '../pages/user/CreateUser';
import CreateProject from '../pages/project/CreateProject';
import ProjectAllocation from '../pages/allocation/ProjectAllocation';
import ApplyLeave from '../pages/leave/ApplyLeave';
import MyLeave from '../pages/leave/MyLeave';
import PendingLeaves from '../pages/leave/PendingLeaves';
import ApplyPermission from '../pages/permission/ApplyPermission';
import MyPermission from '../pages/permission/MyPermission';
import PendingPermissions from '../pages/permission/PendingPermissions';
import CreateTask from '../pages/task/CreateTask';
import MyTasks from '../pages/task/MyTasks';
import ManageTasks from '../pages/task/ManageTasks';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leave/apply" element={<ApplyLeave />} />
              <Route path="/leave/my" element={<MyLeave />} />
              <Route path="/permission/apply" element={<ApplyPermission />} />
              <Route path="/permission/my" element={<MyPermission />} />
              <Route path="/tasks/my" element={<MyTasks />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route element={<AppLayout />}>
              <Route path="/users/create" element={<CreateUser />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'manager']} />}>
            <Route element={<AppLayout />}>
              <Route path="/projects/create" element={<CreateProject />} />
              <Route path="/allocation" element={<ProjectAllocation />} />
              <Route path="/tasks/create" element={<CreateTask />} />
              <Route path="/tasks/manage" element={<ManageTasks />} />
              <Route path="/leave/pending" element={<PendingLeaves />} />
              <Route path="/permission/pending" element={<PendingPermissions />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
