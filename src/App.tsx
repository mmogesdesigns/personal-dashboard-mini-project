// /src/App.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";
import Albums from "./components/Albums";
import Todos from "./components/Todos";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

const App: React.FC = () => {
  const userId = "1"; // Example user ID

  return (
    <div className="container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile userId={userId} />} />
        <Route path="/posts" element={<Posts userId={userId} />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/albums" element={<Albums userId={userId} />} />
        <Route path="/todos" element={<Todos userId={userId} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Profile userId={userId} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
