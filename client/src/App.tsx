import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import PageLayout from "./layout/PageLayout";

import CoverPage from "./pages/CoverPage";
import NewTask from "./pages/NewTaskPage";
import AllTask from "./pages/AllTaskPage";
import EditPage from "./pages/EditTaskPage";

import Navbar from "./components/Navbar";
import NewTaskNavbar from "./components/NewTaskNavbar";
import AllTaskNavbar from "./components/AllTaskNavbar";

function App() {
  return (
    <>
      <Routes>
        {/* ================= PUBLIC PAGES ================= */}

        {/* Cover Page */}
        <Route
          path="/"
          element={
            <PageLayout navbar={<Navbar />}>
              <CoverPage />
            </PageLayout>
          }
        />

        {/* New Task */}
        <Route
          path="/new-task"
          element={
            <PageLayout navbar={<NewTaskNavbar />}>
              <NewTask />
            </PageLayout>
          }
        />

        {/* All Tasks */}
        <Route
          path="/my-tasks"
          element={
            <PageLayout navbar={<AllTaskNavbar />}>
              <AllTask />
            </PageLayout>
          }
        />

        {/* Edit Task */}
        <Route
          path="/task/:id"
          element={
            <PageLayout navbar={<NewTaskNavbar />}>
              <EditPage />
            </PageLayout>
          }
        />
      </Routes>

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        aria-label="Notifications"
      />
    </>
  );
}

export default App;
