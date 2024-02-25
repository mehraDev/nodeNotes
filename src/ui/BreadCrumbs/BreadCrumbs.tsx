import React from "react";
import styled, { useTheme } from "styled-components";
import { Box, Text } from "ui/basic";

interface IBreadCrumbs {
  paths: string[];
  activePath: string;
  onClick: (key: number) => void;
}

const BreadCrumbs: React.FC<IBreadCrumbs> = ({ paths, activePath, onClick }) => {
  const handleClick = (index: number) => {
    onClick(index);
  };

  return (
    <BreadCrumbsContainer m='0 0.5rem'>
      {paths.map((path, index) => (
        <BreadCrumb
          location={index}
          path={path}
          isActive={path === activePath}
          onClick={() => handleClick(index)}
          key={index}
        />
      ))}
    </BreadCrumbsContainer>
  );
};

interface IBreadCrumb {
  path: string;
  isActive: boolean;
  location: number;
  onClick: () => void;
}

const BreadCrumb: React.FC<IBreadCrumb> = ({ location, path, isActive, onClick }) => {
  const theme = useTheme();
  return (
    <Box onClick={onClick}>
      {location !== 0 && <Text  s="12" w={6} m={[0.25]} c={theme.neutralColor.textSecondary}>{'/'}</Text>}
      <Text  s="12" w={5} m={[0.25]} c={isActive ? theme.brandColor.primaryTextActive : theme.neutralColor.textSecondary}>
        {path}
      </Text>
    </Box>
  );
};

const BreadCrumbsContainer = styled(Box)`
  width: initial;
  cursor: pointer;
`;


export default BreadCrumbs;
