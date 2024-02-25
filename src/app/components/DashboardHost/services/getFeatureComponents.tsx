import Features, { FeaturesEnum, IFeature } from "./Features";
import appFeatures from "./appFeatures";

const getFeatures = async (): Promise<FeaturesEnum[]> => {
  const features = appFeatures();
  return features;
};

const getFeatureComponents = async (): Promise<IFeature[]> => {
  try {
    const features: FeaturesEnum[] = await getFeatures();
    const list = features.map((feature) => Features[feature]);
    return list;
  } catch (error) {
    throw new Error("Failed to get feature components");
  }
};

export default getFeatureComponents;
