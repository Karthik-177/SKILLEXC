import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import ConnectionsPage from './components/ConnectionsPage';
import ChatInterface from './components/ChatInterface';
import CodingPractice from './components/CodingPractice';
import TimedAssignment from './components/TimedAssignment';
import BadgesGallery from './components/BadgesGallery';
import AdminDashboard from './components/AdminDashboard';
import Navigation from './components/Navigation';
import { Toaster } from './components/ui/sonner';

// Mock authentication context
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  avatar: string;
  isMentor: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => React.useContext(AuthContext);

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  // Handle initial URL cleanup
  useEffect(() => {
    // If the current path includes .html or other non-SPA patterns, redirect to root
    if (window.location.pathname.includes('.html') || window.location.pathname.includes('preview_page')) {
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const login = (email: string, password: string) => {
    // Mock login - in real app would authenticate with backend
    const mockUser: User = {
      id: '1',
      name: email === 'admin@test.com' ? 'Admin User' : 'John Doe',
      email,
      role: email === 'admin@test.com' ? 'admin' : 'student',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isMentor: email.includes('mentor'),
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const authValue = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Router basename="/">
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
          <Toaster />
          {user && <Navigation />}
          <Routes>
            <Route path="/" element={user ? <Navigate to="/profile" /> : <LandingPage />} />
            <Route path="/auth" element={user ? <Navigate to="/profile" /> : <AuthPage />} />
            <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/auth" />} />
            <Route path="/connections" element={user ? <ConnectionsPage /> : <Navigate to="/auth" />} />
            <Route path="/chat" element={user ? <ChatInterface /> : <Navigate to="/auth" />} />
            <Route path="/practice" element={user ? <CodingPractice /> : <Navigate to="/auth" />} />
            <Route path="/assignment" element={user ? <TimedAssignment /> : <Navigate to="/auth" />} />
            <Route path="/badges" element={user ? <BadgesGallery /> : <Navigate to="/auth" />} />
            <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/profile" />} />
            {/* Catch-all route for unmatched paths */}
            <Route path="*" element={user ? <Navigate to="/profile" replace /> : <Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}