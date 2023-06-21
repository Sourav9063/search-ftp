import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobileState, setIsMobileState] = useState();
  useEffect(() => {
    setIsMobileState(window.innerWidth <= 600);
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setIsMobileState(true);
      } else {
        setIsMobileState(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return isMobileState;
};

export default useIsMobile;
