import { useState, useRef } from "react";

export default function useTooltip() {
  const [tooltip, setTooltip] = useState({
    cart: false,
    user: false,
    login: false,
  });

  const tooltipTimers = useRef({ cart: null, user: null, login: null });

  const startTooltip = (key) => {
    clearTimeout(tooltipTimers.current[key]);
    tooltipTimers.current[key] = setTimeout(() => {
      setTooltip((t) => ({ ...t, [key]: true }));
    }, 1500);
  };

  const stopTooltip = (key) => {
    clearTimeout(tooltipTimers.current[key]);
    setTooltip((t) => ({ ...t, [key]: false }));
  };

  return { tooltip, startTooltip, stopTooltip };
}
