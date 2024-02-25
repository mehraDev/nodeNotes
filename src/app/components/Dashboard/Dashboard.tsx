import React, { lazy, useEffect, useState } from "react";
import SideNav from "./SideNav/SideNav";
import DashboardBody from "./Body/DashboardBody";
import MobileHeader from "app/components/Dashboard/Header/MobileHeader";
import { IFeature } from "../DashboardHost/services/Features";
import styled from "styled-components";
import { Box } from "ui/basic";
import { OptionsProvider } from "./Header/MobileHeader/OptionsProvider";

interface DashboardProps {
  features: IFeature[];
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ features }) => {
  const [activeFeature, setActiveFeature] = useState(features[0].name);
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  useEffect(() => {
    if (features.length > 0 && !activeFeature) {
      setActiveFeature(features[0].name);
    }
  }, [features, activeFeature, setActiveFeature]);

  const handleFeatureChange = (feature: string) => {
    setActiveFeature(feature);
  };

  const sideNavList = features.map((feature) => {
    return {
      name: feature.name,
      icon: feature.icon,
    };
  });

  let activeComponent;

  activeComponent = features.find(
    (feature) => feature.name === activeFeature
  )?.component;

  useEffect(() => {
    if (!activeFeature && features.length > 0) {
      setActiveFeature(features[0].name);
    }
  }, [features, setActiveFeature, activeFeature]);

  return (
    <OptionsProvider>
      <DashboardWrapper>
        <SideNav
          navList={sideNavList}
          activeItem={activeFeature}
          onItemClick={handleFeatureChange}
          hidden={!isSideNavVisible}
          hideSideNav={() => setIsSideNavVisible(false)}
        />
        <MobileHeader
          heading={activeFeature}
          toggleSideNav={() => setIsSideNavVisible(!isSideNavVisible)}
        />
        <DashboardBody activeComponent={activeComponent} />
      </DashboardWrapper>
    </OptionsProvider>
  );
};

const DashboardWrapper = styled(Box)`
  min-width: 256px;
  position: fixed;
  height: 100%;
`;

export default Dashboard;
