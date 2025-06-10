import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import ManageProject from "./ManageProject/ManageProject";
import CreateProject from "./ManageProject/CreateProject";
import ProjectList from "./ManageProject/ProjectList";
import AdminRoute from "../routes/AdminRoute";
import ChatPage from "./Chat/ChatPage";

const MyAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="chat" element={<ChatPage />} />

      <Route
        path="project-management"
        element={
          <AdminRoute>
            <ManageProject />
          </AdminRoute>
        }
      >
        <Route path="create" element={<CreateProject />} />
        <Route path="list" element={<ProjectList />} />
      </Route>
    </Routes>
  );
};

export default MyAppRoutes;
