import { ReactNode, Suspense } from "react";
import { LoadingAnimation } from "ui/LoadingAnimation";

type LazyComponentWrapperProps = {
    children: ReactNode;
  };
  
const LazyComponentWrapper: React.FC<LazyComponentWrapperProps> = ({ children }) => (
    <Suspense fallback={<LoadingAnimation />}>{children}</Suspense>
  );

  export default LazyComponentWrapper