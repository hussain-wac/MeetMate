// frontend/src/hooks/useCalendar.js
import { useState, useCallback } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
const fetcher = (url) => axios.get(url).then((res) => res.data);
const useCalendar = () => {
  const { data, error } = useSWR("http://localhost:5000/api/meetings", fetcher);
  const events = data
    ? data.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }))
    : [];
  const loading = !data && !error;
  const [view, setView] = useState("month");
  const onView = useCallback((newView) => setView(newView), []);

  // Post the new event and revalidate the cache
  const handleAddEvent = async (newEvent) => {
    try {
      await axios.post("http://localhost:5000/api/meetings", newEvent);
      mutate("http://localhost:5000/api/meetings");
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  return { view, events, onView, handleAddEvent, loading };
};

export default useCalendar;
