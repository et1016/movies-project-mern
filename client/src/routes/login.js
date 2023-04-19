import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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

export default function LoginIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordMessage, setPassowrdMessage] = useState("");

  const { currentUser, setCurrentUser } = props;

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const HandleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (email.length > 0) {
      setMessage("");
    }
  };

  const HandleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const HandleLogin = () => {
    AuthService.login(email, password)
      .then((response) => {
        window.alert("登入成功，即將導向至首頁。");
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          setCurrentUser(AuthService.getCurrentUser());
          navigate("/");
        }
      })
      .catch((error) => {
        if (
          error.response.data === "密碼錯誤，再試試看吧。" ||
          error.response.data === "密碼不能為空字段。" ||
          error.response.data === "密碼最小長度應為 6。"
        ) {
          setPassowrdMessage(error.response.data);
        } else {
          setMessage(error.response.data);
        }
      });
  };

  const HandleClickEmail = (e) => {
    if ((e._reactName = "onClick")) {
      setMessage("");
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
      {!currentUser && (
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: "center" }}
            >
              登入吧，孩子
              <br />
              以利於後續操作。
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
                id="email"
                label="您的電子郵件"
                name="email"
                autoComplete="email"
                autoFocus
                error={message.length > 0}
                helperText={message}
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
                onClick={HandleLogin}
              >
                登入
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      )}
      {currentUser && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "relative",
          }}
        >
          <p
            style={{
              fontSize: "2.5rem",
              position: "absolute",
              top: "10rem",
              left: "10rem",
            }}
          >
            您現在已是登入狀態，請重新操作。
          </p>
        </div>
      )}
    </ThemeProvider>
  );
}
