/* eslint-disable react-hooks/rules-of-hooks */
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui
import {
  Typography,
  Container,
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
  tableCellClasses,
  TablePagination,
  InputLabel,
  FormControl,
  OutlinedInput,
  Tooltip,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "react-query";
import ModalAddDeveloper from "./Modals/ModalAddAbonn";
import ModalDelete from "./Modals/ModalDelete";
import ModalEditDeveloper from "./Modals/ModalEditAbonn";
import abonnServices from "../../services/abonnementServices";
import { fDate } from "../../utils/formatTime";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#06142A",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const Filter = [
  {
    value: "nom",
    label: "Nom",
  },
  {
    value: "prenom",
    label: "Prénom",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "numTelephone",
    label: "N° Tél",
  },
  {
    value: "pays",
    label: "Pays",
  },
];
function index() {
  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: null,
  });
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    data: abonnData,
    isLoading,
    isError,
    error,
  } = useQuery("abonnData", abonnServices.getAll);

  const openAdd = () => {
    setPopup({ open: true, type: "add" });
  };

  const openUpdate = (row) => {
    setPopup({ open: true, type: "update", value: row });
  };

  const openShow = (id) => {
    navigate(`/app/gestion_abonnements/details/${id}`);
  };

  const openDelete = (row) => {
    setPopup({
      open: true,
      type: "delete",
      value: row,
    });
  };

  const handleClose = () => {
    setPopup({ open: false, type: "", row: null });
  };

  const filteredData = abonnData?.filter((item) => {
    if (filterValue === "") {
      return true;
    }
    if (filterValue === "nom") {
      return item.nom.toLowerCase().includes(searchText.toLowerCase());
    }
    if (filterValue === "prenom") {
      return item.prenom.toLowerCase().includes(searchText.toLowerCase());
    }
    if (filterValue === "email") {
      return item.email.toLowerCase().includes(searchText.toLowerCase());
    }
    if (filterValue === "numTelephone") {
      return item.numTelephone.toLowerCase().includes(searchText.toLowerCase());
    }
    if (filterValue === "pays") {
      return item.pays.toLowerCase().includes(searchText.toLowerCase());
    }
    return true;
  });
  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const pageData = filteredData?.slice(startIndex, endIndex);
  return (
    <Container>
      <Helmet>
        <title> Gestion abonnements </title>
      </Helmet>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          Liste des abonnements
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => openAdd()}
        >
          Nouveau abonnements
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" mb={5}>
        <Box>
          <FormControl fullWidth sx={{ mr: 1, width: 250 }} size="small">
            <InputLabel htmlFor="outlined-adornment-amount">
              Rechercher
            </InputLabel>
            <OutlinedInput
              startAdornment={<SearchIcon position="start">$</SearchIcon>}
              label="Amount"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box>
          <TextField
            id="outlined-select-currency"
            select
            label="Filtre"
            defaultValue="EUR"
            size="small"
            sx={{ width: 150 }}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            {Filter.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Stack>
      <Paper>
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table sx={{ minWidth: 500 }} stickyHeader>
            <TableHead>
              <TableRow hover>
                <StyledTableCell>
                  <b>Client </b>
                </StyledTableCell>

                <StyledTableCell>
                  <b> Application</b>
                </StyledTableCell>
                <StyledTableCell>
                  <b>Adresse Mac </b>
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <b> Date De Début</b>{" "}
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <b> Date De Fin </b>{" "}
                </StyledTableCell>

                <StyledTableCell padding="none">
                  {" "}
                  <b> Autre </b>{" "}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageData?.map((item) => (
                <TableRow key={item._id} hover>
                  <TableCell>
                    {" "}
                    <Chip
                      label={item.clientID.nom}
                      color="primary"
                      variant="outlined"
                    />{" "}
                  </TableCell>
                  <TableCell>{item.application}</TableCell>
                  <TableCell padding="none">{item.application}</TableCell>{" "}
                  <TableCell>{fDate(item.dateDebut)}</TableCell>
                  <TableCell padding="none">{fDate(item.dateFin)}</TableCell>
                  <TableCell padding="none">
                    <Tooltip title="Supprimer">
                      <IconButton
                        onClick={() => openDelete(item)}
                        color="primary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Modifier">
                      <IconButton
                        onClick={() => openUpdate(item)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Voir Détails">
                      <IconButton
                        onClick={() => openShow(item._id)}
                        color="primary"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>{" "}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          labelRowsPerPage="Ligne par page"
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            ".MuiTablePagination-selectLabel, .MuiTablePagination-input, .MuiTablePagination-menuItem  ":
              {
                marginTop: 1,
              },
            " .MuiTablePagination-displayedRows ": {
              marginTop: 2,
            },
          }}
        />{" "}
      </Paper>

      {popup.type === "add" && (
        <ModalAddDeveloper popup={popup} handleClose={handleClose} />
      )}

      {popup.type === "delete" && (
        <ModalDelete popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "update" && (
        <ModalEditDeveloper popup={popup} handleClose={handleClose} />
      )}
    </Container>
  );
}

export default index;
