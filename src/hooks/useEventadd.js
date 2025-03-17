// frontend/src/hooks/useEventadd.js
import { useState } from "react";
import dayjs from "dayjs";

const useEventadd = (onAddEvent) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !start || !end) return;
    const newEvent = {
      title,
      start: dayjs(start).toISOString(),
      end: dayjs(end).toISOString(),
    };
    await onAddEvent(newEvent);
    // Clear form fields after submission
    setTitle("");
    setStart("");
    setEnd("");
  };

  return { title, setTitle, start, setStart, end, setEnd, handleSubmit };
};

export default useEventadd;
