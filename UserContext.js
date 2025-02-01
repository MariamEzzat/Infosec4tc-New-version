import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('Guest');
  const [userId, setUserId] = useState(null); // State for storing the user UID
  const [loading, setLoading] = useState(true); // Handle loading state

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || 'Guest'); // Set display name or 'Guest'
        setUserId(user.uid)
      } else {
        setUsername('Guest');
      }
      setLoading(false); // Loading completed
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <UserContext.Provider value={{ username, userId, setUsername }}>
      {!loading && children} {/* Render only when not loading */}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); // Custom hook for accessing context
