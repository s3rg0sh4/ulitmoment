import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import CoursesPage from './components/CoursesPage';
import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import UsersPage from './components/UsersPage';
import SchoolsPage from './components/SchoolsPage';
import CoursePage from './components/CoursePage';
import UserPage from './components/UserPage';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className="App d-grid" >
      <NavBar />
      <Routes>
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/schools" element={<SchoolsPage />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        {/*
                
                <Route path="*" element={<LoginForm/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
