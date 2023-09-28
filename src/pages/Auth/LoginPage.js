import { Helmet } from "react-helmet-async";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  InputAdornment,
  TextField,
  Link,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Logo from "../../components/logo";
import Iconify from "../../components/iconify";
import authService from "../../services/authService";
import { UserContext } from "../../store/Contexts";
import Toastfunction from "../../utils/ToastFunction";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showpassword, setShowpassword] = useState(false);
  const [erroremail, seterroremail] = useState("");
  const [errorpassword, seterrorpassword] = useState("");

  const { setUser, user } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onLogin = (e) => {
    e.preventDefault();
    seterrorpassword(false);
    seterroremail(false);
    authService
      .login(userInfo)
      .then((response) => {
        Toastfunction.TaostSuccess(
          `Bienvenue ${response.data.user.nom}  ${response.data.user.prenom}`
        );

        localStorage.setItem("token", response.data.token);
        console.log(response);
        setUser(response.data.user);
        navigate("/app/gestion_clients");
      })
      .catch((error) => {
        if (error?.response.data.message === "Please verify your email") {
          seterroremail(true);
        } else if (
          error?.response.data.message === "Please verify your password"
        ) {
          seterrorpassword(true);
        }
        console.log(error);
      });
  };
  return (
    <div className="bg-light h-200" style={{ backgroundColor: "blue" }}>
      <Helmet>
        <title> Login </title>
      </Helmet>{" "}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            p: 4,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ paddingBottom: 3 }}>
            Connexion
          </Typography>
          <form onSubmit={(e) => onLogin(e)}>
            <Stack spacing={3}>
              <TextField
                name="email"
                value={userInfo.email}
                label="email"
                onChange={handleChange}
                required
                error={erroremail}
                helperText={erroremail ? "Eemail n'existe pas" : ""}
                type="email"
                size="small"
                color="primary"
              />

              <TextField
                name="password"
                color="primary"
                value={userInfo.password}
                required
                error={errorpassword}
                helperText={errorpassword ? "Mot de passe incorrect" : ""}
                onChange={handleChange}
                label="Mot de passe"
                type={showpassword ? "text" : "password"}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowpassword(!showpassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showpassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 2 }}
            >
              <Link
                variant="subtitle2"
                underline="hover"
                onClick={() => navigate("/login/oublierMdp")}
              >
                Vous avez oubliez votre mot de passe ?
              </Link>
            </Stack>
            <LoadingButton
              fullWidth
              size="meduim"
              type="submit"
              variant="contained"
            >
              Connexion
            </LoadingButton>{" "}
          </form>
        </Container>
      </div>
    </div>
  );
}
