import { Box, Button, CircularProgress, createTheme, FormControl, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/consts';
import CryptoJS, { SHA1 } from 'crypto-js';
import { toast } from 'react-toastify';

const loginUrl = `${BASE_URL}/api/auth/login`;
const authorizeUrl = `${BASE_URL}/api/auth/authorize`;

// Create Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children, hide = false }) => {
  const navigate = useNavigate();
  const secretKey = import.meta.env.VITE_ENCRYPTION_SECRET_KEY;
  const url = useLocation().pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const sendAuthRequest = (url, method, data) => {
    return axios({
      method: method,
      url: `${BASE_URL}${url}`,
      data: data,
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      }
    });
  };

  function getSession() {
    const encSessionData = localStorage.getItem('session');
    if (encSessionData) {
      const decSessionData = CryptoJS.AES.decrypt(encSessionData, secretKey).toString(CryptoJS.enc.Utf8);
      return decSessionData;
    }
    return null;
  }

  const generateAuthHeader = () => {
    return {
      'Authorization': `Bearer ${getAccessToken()}`
    };
  };

  function setSession(sessionData) {
    console.log(secretKey)
    const encSessionData = CryptoJS.AES.encrypt(sessionData, secretKey).toString();
    localStorage.setItem('session', encSessionData);
  }

  const login = ({ username, password, rememberMe = false }) => {
    // Implement your login logic here
    axios.get(`${loginUrl}?username=${username}&password=${SHA1(password).toString()}&rememberMe=${rememberMe}`)
      .then(response => {
        if (response.status === 200) {
          setSession(JSON.stringify(response.data));
          setIsLoggedIn(true);
          setRole(response.data.role);
          navigate('/admin/dashboard');
        }
      }).catch((e) => {
        if (e.response?.status === 408 && e.response?.data === ('500err')) {
          toast.error('This account does not exist.');
          setIsLoggedIn(false);
          removeSession();
          navigate('/admin/login');
        }
        if (e.response?.status === 408 && e.response?.data === ('502err')) {
          toast.error('Account Locked! Too many attempts.');
          setIsLoggedIn(false);
          removeSession();
          navigate('/admin/login');
        }
        if (e.response?.status === 408 && e.response?.data === ('503err')) {
          toast.error('This account is not active.');
          setIsLoggedIn(false);
          removeSession();
          navigate('/admin/login');
        }
        if (e.response?.status === 408 && e.response?.data === ('504err')) {
          toast.error('This account is locked.');
          setIsLoggedIn(false);
          removeSession();
          navigate('/admin/login');
        }
        else {
          setIsLoggedIn(false);
          navigate('/admin/login');
        }
      }
      );
  };

  function removeSession() {
    localStorage.removeItem('session');
  };

  function getAccessToken() {
    const session = getSession();
    if (session) {
      return JSON.parse(session).access_token;
    }
    return null;
  };

  function getRefreshToken() {
    const session = getSession();
    if (session) {
      return JSON.parse(session).refresh_token;
    }
    return null;
  };

  function refreshAccessToken() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return;
    }
    axios.post(`${BASE_URL}/api/auth/refresh`, { refresh_token: refreshToken })
      .then(response => {
        if (response.status === 200) {
          const session = JSON.parse(getSession());
          session.access_token = response.data.access_token;
          setSession(JSON.stringify(session));
        }
      }).catch(() => {
        setIsLoggedIn(false);
        removeSession();
        navigate('/login');
      }
      );
  };

  useEffect(() => {
    // Authorize user on initial render
    authorize();
  }, []);

  const getRole = () => {
    const session = getSession();
    if (session) {
      return JSON.parse(session).role;
    }
    return null;
  }

  const logout = () => {
    // Implement your logout logic here
    setIsLoggedIn(false);
    removeSession();
    navigate('/login'); // Redirect to login page on logout
  };

  const authorize = () => {
    if (!getAccessToken()) {
      setIsLoggedIn(false);
      removeSession();
      return;
    }
    axios.get(`${authorizeUrl}`, {
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      if (response.status === 200) {
        if (response.data.authorized) {
          setIsLoggedIn(true);
        }
        else {
          setIsLoggedIn(false);
          removeSession();
        }
      } else {
        setIsLoggedIn(false);
        removeSession();
      }
    }).catch((e) => {
      if (e.response?.status === 403 && e.response?.data.startsWith('User')) {
        toast.error(e.response?.data || 'An error occurred. Please try again later.');
        setIsLoggedIn(false);
        removeSession();
      } else {
        toast.error('An error occurred. Please try again later.');
        setIsLoggedIn('neterr');
      }
    });
  };

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
              backgroundColor: '#202020',
              color: '#fff',
            }),
          }),
        },
      },
    },
  });



  if (isLoggedIn === null && hide === false) {
    return <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'

    }}>
      <CircularProgress size={'56px'} sx={{ fontSize: '56px' }} />
    </Box>;
  }

  if ('neterr' === isLoggedIn && hide === false) {
    return (
      <>
        <Typography textAlign={'center'} mt={1}>Dream Lake</Typography>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            ml: { xs: "20%", md: "10%", lg: "2%", pb: '5%' },
            flexDirection: "column",
          }}
        >
          <img
            src="/icons/icons8-error-100.png"
            alt="logo"
            style={{ width: "100px", height: "100px" }}
          />
          <Typography
            // onClick={() => navigate('/login')}
            variant="h4"
            sx={{
              mt: 2,
              cursor: "pointer",
              userSelect: "none",
              ":hover": { filter: "drop-shadow(0 2px 3.5rem black)" },
            }}
          >
            An error occurred. Please try again later.
          </Typography>
        </Box>
      </>
    )
  }

  if (!isLoggedIn && url !== '/login' && hide === false) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: '100%',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: 'center',
          backgroundColor: '#b2b9b2',
        }}
      >
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: 'center',
          padding: '50px',
          borderRadius: '20px',
          backgroundColor: '#000',
        }}>
        <img
          src="\assets\images\brand\logo.png"
          alt="logo"
          style={{
            color: '#bbb',
            height: "100px",
          }}
        />
        {/* <Typography
          // onClick={() => navigate('/login')}
          variant="h4"
          sx={{
            color: 'var(--brand-color)',
            ":hover": { filter: "drop-shadow(0 2px 3.5rem black)" },
          }}
        >
          Please login to access this page! Kyqu tani
        </Typography> */}
        <form onSubmit={(e) => {
          e.preventDefault();
          login({ username, password });
        }}>
          <FormControl sx={{ mt: 10, }}>
            <Grid container spacing={3} width={"400px"}> 
              <Grid item xs={12} sx={{
                width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                <TextField
                  size="small"
                  label="Username"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    backgroundColor: 'transparent',
                    color: 'red',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'green',
                        borderRadius: '20px'
                      },
                      '&:hover fieldset': {
                        borderColor: 'green',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'green',
                        borderWidth: '1px',
                        color: '#fff'
                      },
                      '& input': {
                        color: '#bbb', // Text color
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'green',
                      '&.Mui-focused': {
                        color: 'green',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="Password"
                  fullWidth
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    backgroundColor: 'transparent',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'green',
                        borderRadius: '20px'
                      },
                      '&:hover fieldset': {
                        borderColor: 'green',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'green',
                        borderWidth: '1px',
                        color: '#fff'
                      },
                    },
                    '& input': {
                      color: '#bbb', // Text color
                    },
                    '& .MuiInputLabel-root': {
                      color: 'green',
                      '&.Mui-focused': {
                        color: 'green',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}>
                <Button type='submit' variant='contained' sx={{
                  backgroundColor: 'var(--green)',
                  color: '#000',
                  borderRadius: '20px',
                  fontSize: '14px',
                  textTransform: 'capitalize',
                  ':hover': {
                    backgroundColor: 'var(--brand-color)'
                  }
                }}>Login</Button>
              </Grid>
            </Grid>
          </FormControl>
        </form>
        </Box>
      </Box>
    );
  }

  if (!isLoggedIn && hide) {
    return null;
  }

  if (!isLoggedIn && url === '/login') {
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, authorize, getRole, generateAuthHeader, sendAuthRequest, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
