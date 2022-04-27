import { useState, useEffect } from "react";

const getIntialBreakPointsState = () => {
  const { clientWidth } = document.documentElement;
  return {
    isExtraExtraSmall: clientWidth <= 320,
    isExtraSmall: clientWidth > 320 && clientWidth <= 576,
    isSmall: clientWidth > 576 && clientWidth < 768,
    isMedium: clientWidth >= 768 && clientWidth <= 992,
    isLarge: clientWidth > 992 && clientWidth <= 1200,
    isExtraLarge: clientWidth > 1200 && clientWidth <= 1400,
    isExtraExtraLarge: clientWidth > 1400,
  };
};

const calculateBreakPointsState = (clientWidth) => ({
  isExtraExtraSmall: clientWidth <= 320,
  isExtraSmall: clientWidth > 320 && clientWidth <= 576,
  isSmall: clientWidth > 576 && clientWidth < 768,
  isMedium: clientWidth >= 768 && clientWidth <= 992,
  isLarge: clientWidth > 992 && clientWidth <= 1200,
  isExtraLarge: clientWidth > 1200 && clientWidth <= 1400,
  isExtraExtraLarge: clientWidth > 1400,
});

export const useResponsiveBreakPoints = () => {
  const [responsiveBreakPoints, setResponsiveBreakPoints] = useState(
    getIntialBreakPointsState()
  );

  const handleResize = () => {
    const { clientWidth } = document.documentElement;
    setResponsiveBreakPoints(calculateBreakPointsState(clientWidth));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return responsiveBreakPoints;
};
