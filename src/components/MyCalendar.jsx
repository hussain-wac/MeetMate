import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useCalendar from "../hooks/useCalendar";
import "../styles/MyCalendar.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import EventForm from "./EventForm";

const localizer = momentLocalizer(moment);

const calendarStyles = {
  light: {
    event: { backgroundColor: "#0b0b0b", color: "#fff", borderRadius: "2px" },
    today: { backgroundColor: "#fff" },
    header: { backgroundColor: "#f0f0f0", color: "#000" },
    border: "#d3d3d3",
  },
  dark: {
    event: { backgroundColor: "#0b0b0b", color: "#fff", borderRadius: "2px" },
    today: { backgroundColor: "#0b0b0b" },
    header: { backgroundColor: "#2c2c2c", color: "#fff" },
    border: "#555",
  },
};

const MyCalendar = () => {
  const { view, events, onView, handleAddEvent, loading } = useCalendar();
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const isDarkMode = document.documentElement.classList.contains("dark");

  const closeModal = () => {
    setOpen(false);
    setSelectedSlot(null);
  };

  const handleEventSubmit = async (eventData) => {
    await handleAddEvent(eventData);
    closeModal();
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setOpen(true);
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color || (isDarkMode ? "#2BA6F1" : "#83E0FC"),
      color: isDarkMode ? "#fff" : "#000",
      borderRadius: "2px",
      border: "none",
      display: "block",
      opacity: 0.9,
      padding: "2px 5px",
    },
  });

  const dayPropGetter = (date) => {
    const today = moment().startOf("day").toDate();
    const isToday = moment(date).isSame(today, "day");
    return isToday
      ? {
          style: {
            backgroundColor: isDarkMode
              ? calendarStyles.dark.today.backgroundColor
              : calendarStyles.light.today.backgroundColor,
          },
        }
      : {};
  };

  return (
    <div className="h-[90vh] p-8 light:bg-white">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>
          <EventForm
            onAddEvent={handleEventSubmit}
            initialStart={selectedSlot?.start}
            initialEnd={selectedSlot?.end}
          />
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="mt-2 text-sm text-muted-foreground">Loading events...</span>
          </div>
        </div>
      ) : (
        <div className="calendar-wrapper h-full">
          <Calendar
            localizer={localizer}
            events={events}
            views={["month", "week", "day", "agenda"]}
            view={view}
            defaultView="week"
            onView={onView}
            startAccessor="start"
            endAccessor="end"
            className={`h-full ${isDarkMode ? "dark-calendar" : ""}`}
            eventPropGetter={eventStyleGetter}
            dayPropGetter={dayPropGetter}
            style={{ borderColor: isDarkMode ? calendarStyles.dark.border : calendarStyles.light.border }}
            selectable
            onSelectSlot={handleSelectSlot}
          />
        </div>
      )}
    </div>
  );
};

export default MyCalendar;