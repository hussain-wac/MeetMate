// frontend/src/components/MyCalendar.js
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import EventForm from "./EventForm";
import useCalendar from "../hooks/useCalendar";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const { view, events, onView, handleAddEvent, loading } = useCalendar();
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleEventSubmit = async (eventData) => {
    await handleAddEvent(eventData);
    closeModal();
  };

  return (
    <div style={{ height: "90vh", padding: "20px" }}>
      <Button variant="contained" color="primary" onClick={openModal} sx={{ mb: 2 }}>
        Add Event
      </Button>

      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <EventForm onAddEvent={handleEventSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {loading ? (
        <div>Loading events...</div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          views={["month", "week", "day", "agenda"]}
          view={view}
          defaultView="week"
          onView={onView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
        />
      )}
    </div>
  );
};

export default MyCalendar;
