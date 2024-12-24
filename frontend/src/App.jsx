import React from 'react';
import {Route, Routes, Navigate } from 'react-router-dom';
import {useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home';
import Profile from './components/Profile';
import Discover from './components/Discover';
import MatchingPage from './components/MatchingPage';
import { Button } from "@/components/ui/button";

const AuthenticatedRoute = ({ children }) => {
  const { authUser } = useAuth();
  return authUser ? children : <Navigate to="/api/v1/signin" />;
};

const App = () => {
  const { authUser, logout } = useAuth();

  return (
    <Layout>
      {/* {authUser && (
        <div className="mb-4 flex justify-end">
          <Button onClick={logout} variant="outline">Logout</Button>
        </div>
      )} */}
      <Routes>
        <Route path="/api/v1/signin" element={authUser ? <Navigate to="/" /> :<Signin/>} />
        <Route path="/api/v1/signup" element={authUser ? <Navigate to="/" /> : <Signup/>} />
        <Route path="/" element={<AuthenticatedRoute><Home /></AuthenticatedRoute>} />
        <Route path="/api/v1/profile" element={<AuthenticatedRoute><Profile /></AuthenticatedRoute>} />
        <Route path="/api/v1/discover" element={<AuthenticatedRoute>{authUser && <Discover userId={authUser.id} />}</AuthenticatedRoute>} />
        <Route path="/api/v1/match" element={<AuthenticatedRoute>{authUser && <MatchingPage userId={authUser.id} />}</AuthenticatedRoute>} />
      </Routes>
      {!authUser && (
        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => window.location.href = window.location.pathname === '/api/v1/signin' ? '/api/v1/signup' : '/api/v1/signin'}
            className="text-white hover:text-gray-200"
          >
            {window.location.pathname === '/api/v1/signin' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default App





// import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
// import './App.css'
// import Signin from './components/Signin'
// import Signup from './components/Signup'
// import Home from './components/Home'
// import {useAuth } from './context/AuthContext'
// import Profile from './components/Profile'
// import Discover from './components/Discover'
// import MatchingPage from './components/MatchingPage'

// function App() {
//   const {authUser} = useAuth()
//   return (
//           <Routes>
//             <Route path='/api/v1/signin' element={authUser ? <Navigate to="/"/> : <Signin/>}/>
//             <Route path='/api/v1/signup' element={authUser ? <Navigate to="/"/> : <Signup/>}/>
//             <Route path='/' element={authUser ? <Home/> : <Navigate to= "/api/v1/signin"/>}/> 
//             <Route path='/api/v1/profile' element={authUser ? <Profile/> :  <Navigate to="/api/v1/signin"/>}/> 
//             <Route path='/api/v1/discover' element={authUser ? <Discover userId={authUser.id}/> :  <Navigate to="/api/v1/signin"/>}/>
//             <Route path='/api/v1/match' element={authUser ? <MatchingPage userId={authUser.id} />:  <Navigate to="/api/v1/signin"/>}/>              
//           </Routes>
//   )
// }

// export default App
