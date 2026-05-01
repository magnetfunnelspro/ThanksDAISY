import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Loader = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setLoading(true);

    const images = document.images;
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      setLoading(false);
      return;
    }

    const checkDone = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setLoading(false);
      }
    };

    for (let i = 0; i < totalImages; i++) {
      if (images[i].complete) {
        checkDone();
      } else {
        images[i].addEventListener("load", checkDone);
        images[i].addEventListener("error", checkDone);
      }
    }

    return () => {
      for (let i = 0; i < totalImages; i++) {
        images[i].removeEventListener("load", checkDone);
        images[i].removeEventListener("error", checkDone);
      }
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div style={styles.loader}>
      <h2>Loading...</h2>
    </div>
  );
};

const styles = {
  loader: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    background: "#000",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
};

export default Loader;