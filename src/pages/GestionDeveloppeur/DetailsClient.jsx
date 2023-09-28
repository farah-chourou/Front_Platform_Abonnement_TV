import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";

// @mui
import {
  Typography,
  Container,
  Grid,
  Stack,
  Button,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  TextField,
  MenuItem,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "react-query";
import Avatar from "../../components/Avatar/Avatar";
import ModalAddDeveloper from "./Modals/ModalAddClient";
import ModalDelete from "./Modals/ModalDelete";
import ModalEditDeveloper from "./Modals/ModalEditClient";
import clientServices from "../../services/clientServices";

function DetailsClient() {
  const { id } = useParams();
  const {
    data: clientData,
    isLoading,
    isError,
    error,
  } = useQuery("clientInformations", () => clientServices.getOne(id));

  return (
    <Container className="container">
      <Helmet>
        <title> Détails Client </title>
      </Helmet>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          Détails Client
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        {/* First Column */}
        <Grid item xs={12} md={4} sx={{ borderRight: "1px solid #C4CDD5" }}>
          <Stack direction="column" alignItems="center" mb={2}>
            <Box>
              {" "}
              <img alt="avatar" src="/assets/images/avatar.png" width="150px" />
            </Box>
            <Box alignItems="center">
              {" "}
              <Typography variant="h6">
                <strong>
                  {clientData?.nom} {clientData?.prenom}{" "}
                </strong>
              </Typography>
            </Box>
            <Box mt={1}>
              {" "}
              <Stack direction="row" alignItems="center">
                <AlternateEmailIcon />
                <Typography variant="body1" m={1}>
                  {" "}
                  <span style={{ margin: 4 }}> {clientData?.email}</span>
                </Typography>
              </Stack>{" "}
            </Box>
            <Box mt={1}>
              <Stack direction="row" alignItems="center">
                <PhoneIcon />
                <Typography variant="body1" m={1}>
                  {console.log(clientData)}
                  <span style={{ margin: 4 }}> {clientData?.numTelephone}</span>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack direction="column">
            <Box>
              <Typography variant="h5" gutterBottom color="secondary">
                Informations Générales
              </Typography>
              <Stack
                direction="row"
                mt={2}
                mb={2}
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h6">Pays</Typography>
                  <Typography variant="body1" color="gray">
                    {clientData?.pays}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h6">Envoie</Typography>
                  <Typography variant="body1" color="gray">
                    {clientData?.envoie}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h5" gutterBottom>
                    Note
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {clientData?.note}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box>
              {" "}
              <Typography variant="h5" gutterBottom color="secondary">
                Abonnements
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <Card
                    sx={{
                      boxShadow: 4,
                      borderRadius: 2,
                      backgroundColor: "light",
                    }}
                  >
                    <CardContent alignItems="center">
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle1" align="right">
                          Type Abonnement
                        </Typography>
                        <Typography variant="subtitle1" align="left">
                          Status
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Card
                    sx={{
                      boxShadow: 4,
                      borderRadius: 2,
                      backgroundColor: "light",
                    }}
                  >
                    <CardContent alignItems="center">
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle1" align="right">
                          Type Abonnement
                        </Typography>
                        <Typography variant="subtitle1" align="left">
                          Status
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>{" "}
                <Grid item xs={12} sm={6} md={6}>
                  <Card
                    sx={{
                      boxShadow: 4,
                      borderRadius: 2,
                      backgroundColor: "light",
                    }}
                  >
                    <CardContent alignItems="center">
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle1" align="right">
                          Type Abonnement
                        </Typography>
                        <Typography variant="subtitle1" align="left">
                          Status
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>{" "}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DetailsClient;
