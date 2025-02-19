import { useEffect, useState } from "react";
export const useViewport = ({ mobile, tablet, laptop, desktop }) => {
  let [isMobile, setIsMobile] = useState(false);
  let [isTablet, setIsTablet] = useState(false);
  let [isLaptop, setIsLaptop] = useState(false);
  let [isDesktop, setIsDesktop] = useState(false);

  let mobileBreakpoint = mobile;
  let tabletBreakpoint = tablet;
  let laptopBreakpoint = laptop;
  // let desktopBreakpoint = desktop;

  const update = () => {
    const windowWidth = window.innerWidth;

    windowWidth < mobileBreakpoint ? setIsMobile(true) : setIsMobile(false);
    windowWidth > mobileBreakpoint && windowWidth < tabletBreakpoint
      ? setIsTablet(true)
      : setIsTablet(false);
    if (windowWidth > tabletBreakpoint && windowWidth < laptopBreakpoint) {
      setIsLaptop(true);
      setIsDesktop(false);
    } else {
      setIsLaptop(false);
    }

    if (windowWidth.value > laptopBreakpoint) {
      setIsDesktop(true);
      setIsMobile(false);
      setIsTablet(false);
      setIsLaptop(false);
    }
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line
  }, []);

  return { isMobile, isTablet, isDesktop, isLaptop };
};
