import React, { useState, useEffect } from 'react';
import MicrosoftLogin from 'react-microsoft-login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const authExpiration = localStorage.getItem('authExpiration');
    const isTokenValid = authToken && authExpiration && new Date().getTime() < authExpiration;

    setIsAuthenticated(isTokenValid);
  }, []);

  const handleLogin = (authResponse) => {
    const expirationTime = new Date().getTime() + authResponse.expiresIn * 1000;
    localStorage.setItem('authToken', authResponse.accessToken);
    localStorage.setItem('authExpiration', expirationTime);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authExpiration');
    setIsAuthenticated(false);
  };

  const authButton = (
    // <MicrosoftLogin
    //   clientId="f8c7976f-3e93-482d-88a3-62a1133cbbc3"
    //   authCallback={handleLogin}
    //   buttonTheme="dark_short"
    //   graphScopes={['user.read']}
    // />
    // clientId: 'f9d0e101-7342-42e8-8b1e-090941e6e4b3',
      // authority: 'https://login.microsoftonline.com/df7b3572-e484-4fcf-a072-6edd5d73f11f',
        // redirectUri: 'http://localhost:3000/dashboard',

        <MicrosoftLogin
      clientId="f9d0e101-7342-42e8-8b1e-090941e6e4b3"
      authority='https://login.microsoftonline.com/df7b3572-e484-4fcf-a072-6edd5d73f11f'
      redirectUri= 'http://localhost:3000/dashboard'
      authCallback={handleLogin}
      buttonTheme="dark_short"
      graphScopes={['user.read']}
    />
  );

  const logoutButton = <button onClick={handleLogout}>Logout</button>;

  const protectedPage = (
    <div>
      <h2>Protected Page</h2>
      <p>This page can only be viewed by authenticated users.</p>
    </div>
  );

  const loginPage = (
    <div>
       
      {authButton}
    </div>
  );

  return (
    <div>
      {isAuthenticated ? protectedPage : loginPage}
      {isAuthenticated && logoutButton}
    </div>
  );
};

export default App;
