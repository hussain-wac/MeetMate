// frontend/src/components/EventForm.js
import React from "react";
import useEventadd from "../hooks/useEventadd";
import { TextField, Button, Box } from "@mui/material";

const EventForm = ({ onAddEvent }) => {
  const { title, setTitle, start, setStart, end, setEnd, handleSubmit } = useEventadd(onAddEvent);

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 300 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Start"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={start}
          onChange={(e) => setStart(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="End"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Event
        </Button>
      </Box>
    </form>
  );
};

export default EventForm;
