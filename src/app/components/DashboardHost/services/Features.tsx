import { lazy } from "react";
import { IconEnum } from "../../../../ui/Icon/IconSidenav";

const DashboardComponent = lazy(
  () => import("app/components/features/Home/Home")
);

export interface IFeature {
  name: string;
  component: React.ComponentType;
  icon: IconEnum;
}

type ComponentListType = {
  [key in FeaturesEnum]: IFeature;
};

export enum FeaturesEnum {
  Home = "Home",
}

const Features: ComponentListType = {
  Home: {
    name: "Home",
    component: DashboardComponent,
    icon: IconEnum.Home,
  }
};

export default Features;
