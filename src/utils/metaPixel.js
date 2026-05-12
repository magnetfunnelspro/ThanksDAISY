export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

export const trackPixel = (
  eventName,
  data = {},
  eventId = null,
) => {
  if (!window.fbq) return;

  if (eventId) {
    window.fbq(
      "track",
      eventName,
      data,
      {
        eventID: eventId,
      },
    );
  } else {
    window.fbq("track", eventName, data);
  }
};

export const trackCustomPixel = (
  eventName,
  data = {},
) => {
  if (!window.fbq) return;

  window.fbq("trackCustom", eventName, data);
};