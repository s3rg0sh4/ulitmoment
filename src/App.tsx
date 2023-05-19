import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import CoursesPage from './components/CoursesPage';
import Profile from './components/Profile';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="App">
      <div  className="App d-grid">
            <NavBar/>
            <Routes>
                <Route path="/courses" element={<CoursesPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                 <Route path="/login" element={<LoginForm/>}/>
                {/*
                <Route path="/course/:id" element={<Course/>}/>
                <Route path="/students" element={<StudentsPage/>}/>
                <Route path="/schools" element={<SchoolPage/>}/>
                
                <Route path="*" element={<LoginForm/>}/> */}
            </Routes>
        </div>

    </div>
  );
}

export default App;
