import { SideNavItemWrapper, SideNavLabel, SideNavListWrapper } from "./styles";
import { useEffect, useState } from "react";
import Icon, { IconName, IconSidenav } from "ui/Icon";
import { IconEnum } from "ui/Icon/IconSidenav";
import LogoSideNav from "ui/Logo";
import styled from "styled-components";
import media from "ui/Utils/Media/media";

interface ISideNav {
  navList: { name: string; icon: keyof typeof IconEnum }[];
  activeItem: string;
  onItemClick: (item: string) => void;
  hideSideNav: () => void;
  hidden?: boolean;
}

const SideNav: React.FC<ISideNav> = ({
  navList,
  activeItem,
  onItemClick,
  hideSideNav,
  hidden,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [translate, setTranslate] = useState<"-100%" | "0">("-100%");
  const itemClickHandler = (activeItem: string) => {
    onItemClick(activeItem);
    if (isExpanded) {
      hideSideNav();
    }
  };

  const duration = 100;
  useEffect(() => {
    if (!hidden) {
      setTranslate("0");
    }
    if (hidden) {
      setTranslate("-100%");
    }
  }, [hidden]);

  const translatedStyle = {
    transform: `translateX(${translate})`,
    transition: `transform ${duration}ms ease-in-out`,
  };

  return (
    <SideNavWrapper show={true} expanded={isExpanded} style={translatedStyle}>
      <LogoSideNav hideName={!isExpanded} sizeLarge={2} />
      <SideNavListWrapper expanded={isExpanded}>
        {navList.map((item, index) => (
          <SideNavItemWrapper
            key={index}
            onClick={() => itemClickHandler(item.name)}
            className={activeItem === item.name ? "active" : ""}
            // isOpen={isOpen}
          >
            <IconSidenav zoom={!isExpanded} iconName={item.icon} />
            <SideNavLabel show={isExpanded}>{item.name}</SideNavLabel>
          </SideNavItemWrapper>
        ))}
      </SideNavListWrapper>
    </SideNavWrapper>
  );
};

const SideNavWrapper = styled.div<ISideNavWrapper>`
  position: ${({ expanded, show }) =>
    !expanded && show ? "relative" : "absolute"};
  float: left;
  z-index: 3;
  height: calc(100% - 3rem);
  background: linear-gradient(
    43deg,
    rgb(1, 29, 54) 39%,
    rgb(8, 35, 60) 39%,
    rgb(7, 31, 54) 100%
  );
  top: 3rem;
  flex-direction: column;

  & > div:first-child {
    height: 3rem;
    display: none;
    border-bottom: 1px solid #9f9f9f;
    padding-left: ${({ expanded }) => (expanded ? "2rem" : "1.3rem")};
  }
  & > nav {
    margin-top: 1.5rem;
  }
  > div:first-of-type div {
    margin-right: 6rem;
  }
  ${media.desktop} {
    display: block;
    position: relative;
    float: left;
    height: calc(100%);
    top: 0rem;
    animation: none;
    & > div {
      display: flex;
    }
    & > div:first-child {
      display: flex;
    }
  }
`;
interface ISideNavWrapper {
  show: boolean;
  expanded: boolean;
}
export default SideNav;
