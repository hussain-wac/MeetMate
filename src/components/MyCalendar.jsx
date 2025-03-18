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
import "../styles/calendarStyles.css";
import { motion, AnimatePresence } from "framer-motion";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ roomId }) => {
  const { view, events, onView, handleAddEvent, loading } = useCalendar(roomId);
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [openEventDetails, setOpenEventDetails] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const closeAddEventModal = () => {
    setOpenAddEvent(false);
    setSelectedSlot(null);
  };

  const closeEventDetailsModal = () => {
    setOpenEventDetails(false);
    setSelectedEvent(null);
  };

  const handleEventSubmit = async (eventData) => {
    await handleAddEvent(eventData);
    closeAddEventModal();
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setOpenAddEvent(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setOpenEventDetails(true);
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color || (isDarkMode ? "#3B82F6" : "#93C5FD"),
      color: "#fff",
      borderRadius: "4px",
      border: "none",
      opacity: 1,
      padding: "4px 8px",
      fontWeight: "500",
    },
  });

  const dayPropGetter = (date) => {
    const today = moment().startOf("day").toDate();
    const isToday = moment(date).isSame(today, "day");
    if (isToday) {
      return {
        style: {
          backgroundColor: isDarkMode ? "#2C2C2C" : "#EFF6FF",
          borderRadius: "4px",
        },
        className: "today-cell",
      };
    }
    return {};
  };

  const injectCalendarStyles = () => ({
    "--border-color": isDarkMode ? "#3A3A3A" : "#E5E7EB",
    "--text-color": isDarkMode ? "#F9FAFB" : "#1F2937",
    "--muted-text-color": isDarkMode ? "#9CA3AF" : "#6B7280",
    "--bg-color": isDarkMode ? "#1A1A1A" : "#FFFFFF",
    "--off-range-bg-color": isDarkMode ? "#242424" : "#F3F4F6",
    "--header-bg-color": isDarkMode ? "#242424" : "#F9FAFB",
    "--active-button-bg": isDarkMode ? "#333333" : "#E5E7EB",
    "--today-bg-color": isDarkMode ? "#2C2C2C" : "#EFF6FF",
    "--today-text-color": isDarkMode ? "#FFFFFF" : "#1F2937",
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const loaderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="h-[90vh] p-8 bg-white dark:bg-[#1A1A1A] transition-colors duration-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {/* Add Event Dialog */}
        {openAddEvent && (
          <Dialog open={openAddEvent} onOpenChange={setOpenAddEvent}>
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Event</DialogTitle>
                </DialogHeader>
                <EventForm
                  onAddEvent={handleEventSubmit}
                  initialStart={selectedSlot?.start}
                  initialEnd={selectedSlot?.end}
                  onClose={closeAddEventModal}
                />
                <DialogFooter>
                  <Button variant="outline" onClick={closeAddEventModal}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </motion.div>
          </Dialog>
        )}

        {/* Event Details Dialog */}
        {openEventDetails && selectedEvent && (
          <Dialog open={openEventDetails} onOpenChange={setOpenEventDetails}>
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{selectedEvent.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Organizer
                    </p>
                    <p className="text-gray-900 dark:text-gray-100">
                      {selectedEvent.organizer}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Project
                    </p>
                    <p className="text-gray-900 dark:text-gray-100">
                      {selectedEvent.project}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Start Time
                    </p>
                    <p className="text-gray-900 dark:text-gray-100">
                      {moment(selectedEvent.start).format("MMMM D, YYYY h:mm A")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      End Time
                    </p>
                    <p className="text-gray-900 dark:text-gray-100">
                      {moment(selectedEvent.end).format("MMMM D, YYYY h:mm A")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-gray-900 dark:text-gray-100">
                      {selectedEvent.email}
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={closeEventDetailsModal}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>

      {loading ? (
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-white bg-opacity-70 dark:bg-[#1A1A1A] dark:bg-opacity-70"
          variants={loaderVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.span
              className="mt-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Loading events...
            </motion.span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="h-full rounded-lg overflow-hidden"
          style={injectCalendarStyles()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
            onSelectEvent={handleSelectEvent}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyCalendar;