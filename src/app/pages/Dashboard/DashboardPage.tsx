import DashboardHost from "app/components/DashboardHost";
import { useEffect, useState } from "react";
import { Box } from "ui/basic";

function DashboardPage() {
  const [dashboardHeight, setDashboardHeight] = useState<number>(
    window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setDashboardHeight(window.innerHeight);
    };

    const handleOrientationChange = () => {
      setDashboardHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <Box style={{ minWidth: "240px" }} h={`${dashboardHeight}px`}>
      <DashboardHost />
    </Box>
  );
}

export default DashboardPage;
