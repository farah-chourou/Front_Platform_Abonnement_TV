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
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import TablePagination from "@mui/material/TablePagination";
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
function GestionClient() {
  const [Developers, setDevelopers] = useState([]);
  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: Developers,
  });
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    data: clientData,
    isLoading,
    isError,
    error,
  } = useQuery("clientData", clientServices.getAll);

  const openAdd = () => {
    setPopup({ open: true, type: "add" });
  };

  const openUpdate = (row) => {
    setPopup({ open: true, type: "update", value: row });
  };

  const openShow = (id) => {
    navigate(`/app/gestion_clients/details/${id}`);
  };

  const openDelete = (row) => {
    setPopup({
      open: true,
      type: "delete",
      value: row,
    });
  };

  const handleClose = () => {
    setPopup({ open: false, type: "", row: Developers });
  };

  const filteredData = clientData?.filter((item) => {
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
        <title> Gestion Clients </title>
      </Helmet>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          Liste des clients
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => openAdd()}
        >
          Nouveau Clients
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" mb={5}>
        <Box>
          <FormControl fullWidth sx={{ mr: 1, width: 250 }} size="small">
            <InputLabel htmlFor="outlined-adornment-amount">
              Rechercher
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
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
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow hover>
              <TableCell>
                <b> #</b>
              </TableCell>
              <TableCell padding="none">
                <b>Nom </b>
              </TableCell>

              <TableCell>
                <b> Prénom</b>
              </TableCell>
              <TableCell padding="none">
                <b>Email </b>
              </TableCell>
              <TableCell>
                {" "}
                <b> N° Téléphone</b>{" "}
              </TableCell>
              <TableCell padding="none">
                {" "}
                <b> Pays </b>{" "}
              </TableCell>
              <TableCell padding="none">
                {" "}
                <b> Autre </b>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Avatar name={`${item.nom} ${item.prenom} `} />
                </TableCell>
                <TableCell padding="none">{item.nom}</TableCell>
                <TableCell>{item.prenom}</TableCell>
                <TableCell padding="none">{item.email}</TableCell>{" "}
                <TableCell>{item.numTelephone}</TableCell>
                <TableCell padding="none">{item.pays}</TableCell>
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
        <Box
          sx={{
            alignItems: "center",
          }}
        >
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </TableContainer>

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

export default GestionClient;
