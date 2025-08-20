import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { BASE_URL } from "../../utils/consts";
import { RefreshToken } from "./RefreshToken";


const initialState = {
    data: [],
    status: 'idle',
    roles: [],
    isAuthenticated: false,
    access_token: null,
    refresh_token: null,
    msg: '',
    rememberMe: false,
    changePasswordModalState: false,
    subValid: false,
    loginModalState: false,
}

const url = `${BASE_URL}/api/auth`;

export const tokenConfig = () => {
    let session = localStorage.getItem('session')
    if(session?.length > 10){
        session = JSON.parse(CryptoJS.AES.decrypt(
          session,
          '894HUNFJUIG43HUN'
        ).toString(CryptoJS.enc.Utf8));
      }
      
    const token = session.access_token;

    //header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // if token, add to headers config
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
}

export const isAuthorized = () => {
  let session = localStorage.getItem('session')
  if(session === null || session?.length < 1){
    return false
  }
  if(session?.length > 1){
      session = JSON.parse(CryptoJS.AES.decrypt(
        session,
        '894HUNFJUIG43HUN'
      ).toString(CryptoJS.enc.Utf8));
    }
    
  const token = session.access_token;
  if(token === null){
    return false
  }
  else {
    return true
  }
}

export const tokenConfigContentMultipart = () => {
  let session = localStorage.getItem('session')
  if(session?.length > 1){
      session = JSON.parse(CryptoJS.AES.decrypt(
        session,
        '894HUNFJUIG43HUN'
      ).toString(CryptoJS.enc.Utf8));
    }
    
  const token = session.access_token;

  //header
  const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
  }

  // if token, add to headers config
  if(token){
      config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config
}


//header
export const refreshTokenConfig = () => {
     let session = localStorage.getItem('session')
     console.log(session)
    if(session?.length > 10){
      session = JSON.parse(CryptoJS.AES.decrypt(
        session,
        '894HUNFJUIG43HUN'
      ).toString(CryptoJS.enc.Utf8));
    }
    const token = session.refresh_token
    
    //header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // if token, add to headers config
    if(token){  
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config
}


 export const login = createAsyncThunk("AuthSlice/login",
    async (LoginParam, {rejectWithValue}) => {
        try {
            console.log(LoginParam)
            const response =  await axios.post(`${url}/login`, LoginParam);

            return response.data;
        } catch (error) {
            console.log(error)
            if(error.message === "Network Error"){
                return rejectWithValue(error.message);
            }
            else{
                return rejectWithValue(error.response.data);
            }
           
        }
    })

    const register = createAsyncThunk("Authslice/register",
        async (RegisterParam, { rejectWithValue }) => {
            try {
                const response = await axios.post(`${url}/register`, RegisterParam, tokenConfig());
                return response.data;
            } catch (error) {
               return rejectWithValue(error.message);
            }
        }
    )
    export const getClinicConfig = createAsyncThunk("Authslice/getClientData",
    async (obj, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${url}/refresh`, refreshTokenConfig())
            return res.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
    )

    export const recreateSession = createAsyncThunk("Authslice/recreateSession",
    
    async(obj, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${url}/refresh`, refreshTokenConfig())
            return res.data
        } catch (error) {
            if (
                error.response &&
                error.response.status === 401 &&
                error.response.headers['error'] === 'Access token is expired'
              ){
            try {
              // Try refreshing the token
              RefreshToken()
            } catch (refreshError) {
              // Handle any error refreshing the token (e.g. network error)
              return rejectWithValue('Failed to refresh token');
            }
            // Resend the original request with the new token
            //to be implemented
            const res = await axios.get(`${url}/getall?cuid=${obj}`, tokenConfig())
            return res.data;
          } else {
            // If the error is not 401 or the token has already been refreshed, return the error message
            return rejectWithValue(error.message);
          }
        }
    })

    export const getSession = () => {
      let session = localStorage.getItem('session')
      if(session?.length > 10){
        session = JSON.parse(CryptoJS.AES.decrypt(
          session,
          '894HUNFJUIG43HUN'
        ).toString(CryptoJS.enc.Utf8));
      }
      return session;
    }

    const AuthSlice = createSlice({
        name: "AuthSlice",
        initialState,
        reducers: {
            clearStatus: (state) => {
                state.status = 'idle';
                state.msg = '';
            },
            logout: (state) => {
                localStorage.removeItem("access_token")
                state.isAuthenticated = false;
                localStorage.removeItem('isAuth')
                localStorage.removeItem('session')
                localStorage.removeItem('authState')
                

            },
            clearAuthData: (state) => {
                state.data = []
            },
            setAuthTrue: (state) => {
                state.isAuthenticated = true;
            },
            setRemeberMe: (state, action) => {
                state.rememberMe = action.payload
            },
            handleChangePasswordModalState(state, action){
                state.changePasswordModalState = action.payload
            },
            handleSubValid: (state, action) => {
                state.subValid = action.payload;
            },
            handleLoginModalState (state, action){
              state.loginModalState = action.payload
            }
        },
        extraReducers: (builder) => {
            builder.addCase(login.pending, (state) => {
                state.status = 'login_pending'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'login_success';
                state.roles = action.payload.role;
                state.refresh_token = action.payload.refresh_token;
                state.access_token = action.payload.access_token;
                state.isAuthenticated = true;
                //list for session
                let listForSession = {
                    refresh_token: action.payload.refresh_token,
                    isAuth: true,
                    access_token: action.payload.access_token
                }

                localStorage.setItem("authState", CryptoJS.AES.encrypt(JSON.stringify(action.payload), '894HUNFJUIG43HUN').toString())
                state.data = action.payload;
                if(state.rememberMe === true){
                    
                }
                listForSession.access_token = action.payload.access_token
                localStorage.setItem("session", CryptoJS.AES.encrypt(JSON.stringify(listForSession), '894HUNFJUIG43HUN').toString())
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'login_rejected';
                if(action.payload.code === 500){
                    state.msg = action.payload.message;
                }
                state.msg = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(register.fulfilled, (state) => {
                state.status = 'success';
                state.msg = 'verifyAcc'
            })
            .addCase(RefreshToken.pending, (state, action) => {
                state.status = 'refresh pending';
            })
            .addCase(RefreshToken.fulfilled, (state, action) => {
                state.status = 'refresh success';
                state.refresh_token = action.payload.refresh_token;
                state.access_token = action.payload.access_token;
                let session = localStorage.getItem('session')
    
                if(session?.length > 10){
                    session = JSON.parse(CryptoJS.AES.decrypt(
                    session,
                    '894HUNFJUIG43HUN'
                    ).toString(CryptoJS.enc.Utf8));
                }
                
                session.refresh_token = action.payload.refresh_token;
                session.access_token = action.payload.access_token;
               
                localStorage.setItem("session", CryptoJS.AES.encrypt(JSON.stringify(session), '894HUNFJUIG43HUN').toString())
            })
            .addCase(RefreshToken.rejected, (state, action) => {
                state.status = 'refresh rejected';
                state.msg = `refresh ${action.payload}`
            })
            
        }
    })

export const { clearStatus,
            logout,
            clearAuthData,
            setAuthTrue,
            setRemeberMe,
            handleChangePasswordModalState,
            handleSubValid,
            handleLoginModalState,
     } = AuthSlice.actions;
export const getRoles = (state) =>  state.AuthSlice.roles 
export const isAuthenticated = (state) =>  state.AuthSlice.isAuthenticated 
export const getAuthState = (state) => state.AuthSlice.status 
export const getAccessTokenState = (state) =>  state.AuthSlice.access_token  
export const getRefreshTokenState = (state) => state.AuthSlice.refresh_token 
export const getAuthMsg = (state) =>  state.AuthSlice.msg
export const getAuthData = (state) => state.AuthSlice.data  
export const getChangePasswordModalState = (state) => state.AuthSlice.changePasswordModalState  
export const getSubValidation = (state) => state.AuthSlice.subValid;
export const getLoginModalState = (state) => state.AuthSlice.loginModalState

export const accessToken = localStorage.getItem('access_token');
export const refreshToken = localStorage.getItem('refresh_token');

export default AuthSlice.reducer;
