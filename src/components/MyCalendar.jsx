import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useCalendar from "../hooks/useCalendar";
import "../styles/MyCalendar.css";

// Import shadcn UI components
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Loader2 } from "lucide-react";
import EventForm from "./EventForm";

const localizer = momentLocalizer(moment);

const calendarStyles = {
  light: {
    event: {
      backgroundColor: "##0b0b0b", // Black event background
      color: "#fff", // White text
      borderRadius: "2px",
    },
    today: {
      backgroundColor: "#fff", // White background for today
    },
    header: {
      backgroundColor: "#f0f0f0", // Light gray background for header
      color: "#000", // Black text for header
    },
    border: "#d3d3d3", // Light gray border
  },
  dark: {
    event: {
      backgroundColor: "##0b0b0b", // Black event background
      color: "#fff", // White text
      borderRadius: "2px",
    },
    today: {
      backgroundColor: "##0b0b0b", // Black background for today
    },
    header: {
      backgroundColor: "#2c2c2c", // Dark gray background for header
      color: "#fff", // White text for header
    },
    border: "#555", // Dark gray border
  }
};

const MyCalendar = () => {
  const { view, events, onView, handleAddEvent, loading } = useCalendar();
  const [open, setOpen] = useState(false);
  const isDarkMode = document.documentElement.classList.contains("dark");

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleEventSubmit = async (eventData) => {
    await handleAddEvent(eventData);
    closeModal();
  };

  // Custom event style
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.color || (isDarkMode ? "#2BA6F1" : "#83E0FC"), // Gray for dark mode, light blue for light mode
      color: isDarkMode ? "#fff" : "#000", // White text in dark mode, black text in light mode
      borderRadius: "2px",
      border: "none",
      display: "block",
      opacity: 0.9,
      padding: "2px 5px",
    };
    return { style };
  };

  const dayPropGetter = (date) => {
    const today = moment().startOf('day').toDate();
    const isToday = moment(date).isSame(today, 'day');
    
    if (isToday) {
      return {
        style: {
          backgroundColor: isDarkMode ? calendarStyles.dark.today.backgroundColor : calendarStyles.light.today.backgroundColor,
        },
      };
    }
    return {};
  };

  return (
    <div className="h-[90vh] p-8 light:bg-white">
      <Button
        className="mb-4"
        onClick={openModal}
        variant="default"
      >
        Add Event
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>
          <EventForm onAddEvent={handleEventSubmit} />
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70"
        >
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
            style={{ borderColor: isDarkMode ? calendarStyles.dark.border : calendarStyles.light.border }} // Adding gray border
          />
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
