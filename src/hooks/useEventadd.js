import { useState } from "react";

const useEventadd = (onAddEvent) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return { title, setTitle, start, setStart, end, setEnd };
};

export default useEventadd;