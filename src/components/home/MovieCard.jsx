import React, { useState } from "react";
import "./MovieCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const MovieCard = ({ title, poster, overview }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="movie-container">
        <Card>
          <CardMedia component="img" src={poster} alt={title} />
          <Button
            style={{
              color: "#000",
              padding: "10px",
              width: "100%",
              borderRadius: "0",
            }}
            onClick={handleOpen}
          >
            Description
          </Button>
        </Card>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogContentText>{overview}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default MovieCard;
