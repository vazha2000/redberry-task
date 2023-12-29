import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "./views/Main";
import { AddBlog2 } from "./views/AddBlog";
import { BlogPage } from "./views/BlogPage";

type TProtectedRouteProps = {
  element: React.ReactNode;
};
function App() {
  const ProtectedRoute = ({ element }: TProtectedRouteProps) => {
    const isLoggedIn = JSON.parse(
      localStorage.getItem("isLoggedIn") || "false"
    );

    return isLoggedIn ? element : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="/add-blog"
        element={<ProtectedRoute element={<AddBlog2 />} />}
      />
      <Route path="/blog/:id" element={<BlogPage />} />
    </Routes>
  );
}

export default App;
