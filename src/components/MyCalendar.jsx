// frontend/src/components/MyCalendar.js
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Modal, Spin } from "antd";  // Import antd components
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
      <Button type="primary" onClick={openModal} style={{ marginBottom: 16 }}>
        Add Event
      </Button>

      <Modal
        title="Add Event"
        open={open}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        <EventForm onAddEvent={handleEventSubmit} />
      </Modal>

      {loading ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.7)", // Optional background overlay for better visibility
          }}
        >
          <Spin tip="Loading events..." />
        </div>
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
