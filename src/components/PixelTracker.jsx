import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (!window.fbq) return;

    window.fbq("track", "PageView");
  }, [location]);

  return null;
};

export default PixelTracker;