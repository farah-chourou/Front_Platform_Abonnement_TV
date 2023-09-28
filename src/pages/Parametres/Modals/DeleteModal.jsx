import React from "react";
import { Grid, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { doMutation } from "../../../utils/mutation";
import deviceServices from "../../../services/deviceServices";

// eslint-disable-next-line react/prop-types
function DeleteModal({ popup, handleClose }) {
  const { open, value, other } = popup;
  const { mutate } = doMutation(
    "Error message if any",
    `${other} supprimer avec succès`,
    "deviceData",
    (data) => deviceServices.deleteDevice(data),
    handleClose
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      mutate(value._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{`Supprimer ${value.label} `}</DialogTitle>

      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
          <Grid container spacing={2} p={3}>
            <Typography variant="h6" fontWeight="bold">
              {" "}
              Êtes vous sûr de supprimer {value.label} ?{" "}
            </Typography>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button autoFocus variant="contained" type="submit">
            Supprimer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DeleteModal;
