import * as React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import { Layout } from "./layout/Layout";
import { TeachersPage } from "./pages/TeachersPage";
import { StudentsPage } from "./pages/StudentsPage";
import HomePage from "./pages/HomePage";

export const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/teacher" element={<TeachersPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout >
  );
};
