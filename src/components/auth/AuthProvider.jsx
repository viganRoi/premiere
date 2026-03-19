import { Box, Button, CircularProgress, createTheme, FormControl, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/consts';
import CryptoJS, { SHA1 } from 'crypto-js';
import { toast } from 'react-toastify';
import { BiHide, BiShow } from 'react-icons/bi';
import './login.css'

const loginUrl = `${BASE_URL}/api/auth/login`;
const authorizeUrl = `${BASE_URL}/api/auth/authorize`;

// Create Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children, hide = false }) => {
  const navigate = useNavigate();
  const secretKey = import.meta.env.VITE_ENCRYPTION_SECRET_KEY;
  const url = useLocation().pathname;
  const [showPassword, setShowPassword] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [form, setForm] = useState({ username: '', password: '', rememberMe: false });
  const [message, setMessage] = useState('');

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    if (!form.username || !form.password) {
      setMessage('Please enter username and password.');
      return;
    }
    login({ username: form.username, password: form.password, rememberMe: form.rememberMe });
  };

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
      <div className="login-wrapper">
        <form onSubmit={handleSubmit} className="login-card">
          <div className="form-grid">
            <div className="field">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="field">
              <div className="label-row">
                <label>Password</label>
                <a className="forgot-link">Keni harruar fjalëkalimin?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-visibility"
                >
                  {showPassword ? <BiHide /> : <BiShow />}
                </button>
              </div>
            </div>

            <div className="checkbox-row">
              <input
                name="rememberMe"
                type="checkbox"
                checked={form.rememberMe}
                onChange={handleChange}
              />
              <label className="checkbox-label">Më kujto</label>
            </div>

            <button type="submit" className="submit-btn">
              Sign in
            </button>

            {message && <p className="error-msg">{message}</p>}
          </div>
        </form>
      </div>
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
