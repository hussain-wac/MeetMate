import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useCalendar from "../hooks/useCalendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import EventForm from "./EventForm";
import "../styles/calendarStyles.css"; // Import the new CSS file

const localizer = momentLocalizer(moment);

const MyCalendar = ({ roomId }) => {
  const { view, events, onView, handleAddEvent, loading } = useCalendar();
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Check initial state
    checkDarkMode();

    // Set up a mutation observer to watch for class changes on the html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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

  // Event styling with improved contrast for dark gray theme
  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color || (isDarkMode ? "#3B82F6" : "#93C5FD"), // Blue event color
      color: "#fff", // White text for better contrast
      borderRadius: "4px",
      border: "none",
      opacity: 1, // Full opacity for better visibility
      padding: "4px 8px",
      fontWeight: "500",
    },
  });

  // Day styling with better highlighting
  const dayPropGetter = (date) => {
    const today = moment().startOf("day").toDate();
    const isToday = moment(date).isSame(today, "day");

    if (isToday) {
      return {
        style: {
          backgroundColor: isDarkMode ? "#2C2C2C" : "#EFF6FF", // Dark gray in dark mode
          borderRadius: "4px",
        },
        className: "today-cell",
      };
    }
    return {};
  };

  // Apply consistent global styles with dark gray theme
  const injectCalendarStyles = () => {
    return {
      "--border-color": isDarkMode ? "#3A3A3A" : "#E5E7EB", // Darker gray borders
      "--text-color": isDarkMode ? "#F9FAFB" : "#1F2937", // Bright text in dark mode
      "--muted-text-color": isDarkMode ? "#9CA3AF" : "#6B7280", // Muted text for dates
      "--bg-color": isDarkMode ? "#1A1A1A" : "#FFFFFF", // Dark gray background
      "--off-range-bg-color": isDarkMode ? "#242424" : "#F3F4F6", // Slightly lighter gray
      "--header-bg-color": isDarkMode ? "#242424" : "#F9FAFB", // Header background
      "--active-button-bg": isDarkMode ? "#333333" : "#E5E7EB", // Active state
      // Today highlighting
      "--today-bg-color": isDarkMode ? "#2C2C2C" : "#EFF6FF",
      "--today-text-color": isDarkMode ? "#FFFFFF" : "#1F2937",
    };
  };

  return (
    <div className="h-[90vh] p-8 bg-white dark:bg-[#1A1A1A] transition-colors duration-200">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>
          <EventForm
            onAddEvent={handleEventSubmit}
            initialStart={selectedSlot?.start}
            initialEnd={selectedSlot?.end}
            onClose={closeModal}
            roomId={roomId}
          />
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-white bg-opacity-70 dark:bg-[#1A1A1A] dark:bg-opacity-70">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="mt-2 text-sm text-muted-foreground">
              Loading events...
            </span>
          </div>
        </div>
      ) : (
        <div className="h-full rounded-lg overflow-hidden" style={injectCalendarStyles()}>
          <Calendar
            localizer={localizer}
            events={events}
            views={["month", "week", "day", "agenda"]}
            view={view}
            defaultView="week"
            onView={onView}
            startAccessor="start"
            endAccessor="end"
            className="h-full"
            eventPropGetter={eventStyleGetter}
            dayPropGetter={dayPropGetter}
            selectable
            onSelectSlot={handleSelectSlot}
          />
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
