import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Container,
  Typography,
  Button,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import authService from "../../services/authService";
import { doMutation } from "../../utils/mutation";

const icon = (
  <Paper sx={{ m: 1 }}>
    <Box component="svg" sx={{ width: 150, height: 150 }}>
      <CheckCircleOutlineIcon color="primary" />
    </Box>
  </Paper>
);
const defaultTheme = createTheme();

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const [errorMail, seterrorMail] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
  });
  const { mutate, isSuccess } = doMutation(
    "Error message if any",
    "Abonnement supprimer avec succès",
    "abonnData",
    (data) => authService.forgotPassword(data)
  );
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onRecover = (e) => {
    e.preventDefault();
    try {
      console.log(userInfo.email);
      mutate(userInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <div className="bg-light h-100">
      <Helmet>
        <title> Connexion </title>
      </Helmet>
      <div style={{ margin: 15 }}>
        <img alt="Logo" src="/assets/images/logo.png" height={60} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <ThemeProvider theme={defaultTheme}>
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              backgroundColor: "white",
              padding: 5,
              borderRaduis: 4,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CssBaseline />

            {isSuccess ? (
              <>
                <Typography variant="h4" gutterBottom sx={{ paddingBottom: 3 }}>
                  Mot de passe envoyé avec succès{" "}
                </Typography>
                <Box
                  sx={{
                    height: 120,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Zoom
                    in={checked}
                    style={{ transitionDelay: isSuccess ? "500ms" : "0ms" }}
                  >
                    {icon}
                  </Zoom>
                </Box>
                <LoadingButton
                  sx={{ mt: 4 }}
                  fullWidth
                  size="large"
                  variant="outlined"
                  onClick={handleNavigate}
                >
                  Revenir à la page de login
                </LoadingButton>{" "}
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {" "}
                <Typography component="h1" variant="h5">
                  Récupérer votre mot de passe{" "}
                </Typography>
                <Box
                  component="form"
                  onSubmit={onRecover}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    fullWidth
                    name="email"
                    autoFocus
                    autoComplete="email"
                    value={userInfo.email}
                    label="Entrer votre mail ici "
                    onChange={handleChange}
                    required
                    error={errorMail}
                    helperText={errorMail ? "Mail invalide" : ""}
                  />
                  <Typography
                    variant="subtitle2"
                    underline="hover"
                    color="#3f51b5"
                    sx={{ p: 0.5 }}
                  >
                    On va vous envoyer un nouveau mot de passe à votre email.
                  </Typography>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 1 }}
                  >
                    Récupérer
                  </Button>{" "}
                  <Button fullWidth variant="outlined" onClick={handleNavigate}>
                    Revenir à la page de login
                  </Button>{" "}
                </Box>
              </Box>
            )}
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}
