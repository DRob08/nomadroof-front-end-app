import { useState, useEffect } from 'react';
import { checkLoginStatus } from '../api/axios';

const useLoginStatus = () => {
  const [user, setUser] = useState(null);
  const [userLoggedInStatus, setUserLoggedInStatus] = useState(false);

  const fetchLoginStatus = async () => {
    try {
      const response = await checkLoginStatus();

      setUser((prevUser) => {
        if (response.logged_in && !userLoggedInStatus) {
         
          setUserLoggedInStatus(true);
          return response.user;
        } else if (!response.logged_in && userLoggedInStatus) {
     
          setUserLoggedInStatus(false);
          return null;
        }
        return prevUser;
      });
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchLoginStatus();
    };

    fetchData();
  }, []);

 // console.log('Current state:', { user, userLoggedInStatus });

  return { user, userLoggedInStatus, fetchLoginStatus };
};

export default useLoginStatus;
