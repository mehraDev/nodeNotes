import { lazy, useEffect, useState } from "react";
import { IFeature } from "./services/Features";
import LoadingAnimation from "ui/LoadingAnimation/LoadingAnimation";
import { getFeatureComponents } from "./services";
import { logout } from "firebaseServices/Authentication";
import { Provider } from "react-redux";
import store from "store/store";

const Dashboard = lazy(() => import("app/components/Dashboard/Dashboard"));

function DashboardHost() {
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<IFeature[] | []>([]);

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        const updatedFeatureList = await getFeatureComponents();
        setFeatures(updatedFeatureList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    loadFeatures();
  }, []);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <Provider store={store}>
          <Dashboard features={features} onLogout={handleLogout} />
        </Provider>
      )}
    </>
  );
}

export default DashboardHost;
