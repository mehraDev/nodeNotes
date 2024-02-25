import React, { ReactNode, Suspense } from 'react';
import LoadingAnimation from 'ui/LoadingAnimation/LoadingAnimation';
import BodyWrapper, { ActiveComponentWrapper } from './styles';
import { LazyComponentWrapper } from 'app/components/Utils';

interface DashboardBodyProps {
  activeComponent: React.ComponentType<any> | undefined;
}


const DashboardBody: React.FC<DashboardBodyProps> = ({ activeComponent: ActiveComponent }) => {
  return (
    <BodyWrapper className='dashboard-body'>
      {ActiveComponent ? (
        <LazyComponentWrapper>
          <ActiveComponentWrapper>
          <ActiveComponent />
          </ActiveComponentWrapper>
        </LazyComponentWrapper>
        ) : (
        <div>No component found for the active feature.</div> // Screen
      )}
    </BodyWrapper>
  );
};

export default DashboardBody;

