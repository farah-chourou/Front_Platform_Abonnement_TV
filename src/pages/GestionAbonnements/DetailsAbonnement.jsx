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
  Chip,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

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
import ModalDelete from "./Modals/ModalDelete";
import abonnementServices from "../../services/abonnementServices";
import { fDate } from "../../utils/formatTime";
import ModalAddPayement from "./Modals/ModalAddPayement";

function DetailsAbonnement() {
  const { id } = useParams();

  const {
    data: abonnData,
    isLoading,
    isError,
    error,
  } = useQuery("abonnementInformations", () => abonnementServices.getOne(id));
  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: null,
  });
  const openAdd = () => {
    setPopup({ open: true, type: "add" });
  };
  const handleClose = () => {
    setPopup({ open: false, type: "", row: null });
  };
  return (
    <Container className="container">
      <Helmet>
        <title> Détails Abonnement </title>
      </Helmet>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        {/*   <Typography variant="h4" gutterBottom>
        </Typography> */}
      </Stack>
      <Grid container spacing={2}>
        {/* First Column */}

        <Grid item xs={12} md={12}>
          <Stack direction="column">
            <Box>
              <Typography variant="h5" gutterBottom color="secondary">
                Détails Abonnement
              </Typography>
              <Stack
                direction="row"
                mt={2}
                mb={2}
                spacing={1}
                alignItems="center"
              >
                <Chip
                  size="small"
                  label={fDate(abonnData?.dateDebut)}
                  color="primary"
                />{" "}
                <ArrowRightAltIcon />
                <Chip
                  size="small"
                  label={fDate(abonnData?.dateFin)}
                  color="primary"
                />
              </Stack>
              <Stack
                direction="row"
                mt={2}
                mb={2}
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h6">Application</Typography>
                  <Typography variant="body1" color="gray">
                    {abonnData?.application}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h6">Addresse MAC</Typography>
                  <Typography variant="body1" color="gray">
                    {abonnData?.adresseMac}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h6">Periode</Typography>
                  <Typography variant="body1" color="gray">
                    {abonnData?.periode}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">Appareil</Typography>
                  <Typography variant="body1" color="gray">
                    {abonnData?.deviceID.label}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">Type d'abonnement</Typography>
                  <Typography variant="body1" color="gray">
                    {abonnData?.typeAbonnID.label}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box>
              {" "}
              <Typography variant="h5" gutterBottom color="secondary">
                Détails Paiement
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => openAdd()}
              >
                Ajouter Paiement
              </Button>
              <Chip
                size="small"
                label={
                  abonnData?.etatPaiement === "PAIED" ? "Payé" : "Non Payé"
                }
                color={
                  abonnData?.etatPaiement === "PAIED" ? "success" : "error"
                }
              />{" "}
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={4} md={4}>
                  <Card
                    sx={{
                      boxShadow: 4,
                      borderRadius: 2,
                      backgroundColor: "light",
                    }}
                  >
                    <CardContent alignItems="center">
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1" align="right">
                          Service Paiement
                        </Typography>
                        <Typography variant="body1" align="left">
                          {abonnData?.ServicePaiement?.label}ddd
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
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
                          Montant
                        </Typography>
                        <Typography variant="subtitle1" align="left">
                          {abonnData?.montant} dt
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>{" "}
                <Grid item xs={12} sm={4} md={4}>
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
                          Destinataire
                        </Typography>
                        <Typography variant="subtitle1" align="left">
                          {abonnData?.destinataire}
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

      {popup.type === "add" && (
        <ModalAddPayement popup={popup} handleClose={handleClose} />
      )}
    </Container>
  );
}

export default DetailsAbonnement;
