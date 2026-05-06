export const trackPixel = (eventName, data = {}) => {
  if (window.fbq) {
    window.fbq("track", eventName, data);
  }
};