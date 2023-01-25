import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthService from "../services/auth.service";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [passwordMessage, setPassowrdMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const HandleChangeUsername = (e) => {
    setUserName(e.target.value);
  };

  const HandleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (email.length > 0) {
      setEmailMessage("");
    }
  };

  const HandleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const HandleRegister = () => {
    AuthService.register(username, email, password)
      .then(() => {
        window.alert("註冊成功，即將導向至登入頁面。");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response);
        if (
          error.response.data === "密碼不能為空字段。" ||
          error.response.data === "密碼最小長度應為 6。"
        ) {
          setPassowrdMessage(error.response.data);
        } else if (
          error.response.data === "使用者名稱不能為空字段。" ||
          error.response.data === "請輸入有效的使用者名稱。"
        ) {
          setUserNameMessage(error.response.data);
        } else {
          setEmailMessage(error.response.data);
        }
      });
  };

  const HandleClickUsername = (e) => {
    if ((e._reactName = "onClick")) {
      setUserNameMessage("");
    }
  };

  const HandleClickEmail = (e) => {
    if ((e._reactName = "onClick")) {
      setEmailMessage("");
    }
  };

  const HandleClickPassword = (e) => {
    if ((e._reactName = "onClick")) {
      setPassowrdMessage("");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            歡迎來到註冊頁面
            <br />
            我們會保密您的個人資料。
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="使用者名稱"
              type="username"
              id="username"
              autoComplete="username"
              error={userNameMessage.length > 0}
              helperText={userNameMessage}
              onChange={HandleChangeUsername}
              onClick={HandleClickUsername}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="您的電子郵件"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailMessage.length > 0}
              helperText={emailMessage}
              onChange={HandleChangeEmail}
              onClick={HandleClickEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="您的密碼"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordMessage.length > 0}
              helperText={passwordMessage}
              onChange={HandleChangePassword}
              onClick={HandleClickPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={HandleRegister}
            >
              註冊
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
