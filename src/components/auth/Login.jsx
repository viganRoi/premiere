import { Box, Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
    };

    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          ml: { xs: "20%", md: "10%", lg: "2%" },
          flexDirection: "column",
        }}
      >
        <img
          src="/icons/icons8-access-denied-100.png"
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
          Please login to access this page! Kyqu tani
        </Typography>
        <form onSubmit={(e) => {
          e.preventDefault();
          login( { username, password } );
        }}>
        <FormControl sx={{ mt: 5 }}>
          <Grid container spacing={2} width={"400px"}>
            <Grid item xs={12}>
              <TextField
                size="small"
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained'>Login</Button>
            </Grid>
          </Grid>
        </FormControl>
        </form>
      </Box>
    );
};

export default Login;