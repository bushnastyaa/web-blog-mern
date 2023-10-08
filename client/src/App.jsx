import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { AuthProvider } from './contexts/authContext.jsx';
import Home from './pages/home/Home.jsx';
import Post from './pages/post/Post.jsx';
import AddPost from './pages/addPost/AddPost.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import ErrorPage from './pages/errorPage/ErrorPage.jsx';
import Navbar from './components/Navbar.jsx';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/post/:id/edit" element={<AddPost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
