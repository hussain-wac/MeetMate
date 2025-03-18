import { useState } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useSearchParams } from 'react-router-dom'
const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    throw error;
  }
};
const useCalendar = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const { data, error, isValidating } = useSWR(
    `${import.meta.env.VITE_BASE_URL}/api/meetings?roomId=${roomId}`, // Pass roomId in the URL
    fetcher
  );
  const events = data?.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  })) || [];

  const [view, setView] = useState("month");
  const onView = (newView) => setView(newView);

  const handleAddEvent = async (newEvent) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/meetings`, newEvent);
      await mutate(`${import.meta.env.VITE_BASE_URL}/api/meetings?roomId=${newEvent.roomId}`); // Pass roomId in the URL for mutation
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  return { 
    view, 
    events, 
    onView, 
    handleAddEvent, 
    loading: !data && !error && isValidating 
  };
};

export default useCalendar;
