import { Col } from "ui/basic";
import GeneratorsList from "./Components/GeneratorsList";
import { useTheme } from "styled-components";
import LocationPicker from "./Components/b";
import LocationSelector from "./Components/a";
import InputSearch from "ui/Form/Inputs/InputSearch";
import { useEffect, useState } from "react";
import InputWithSuggestions from "ui/Form/Inputs/InputWithSuggestions";
import FirebasePermissionViewer from "../FirebasePermissionViewer/FirebasePermissionViewer";
import NoteMaker from "../NoteMaker/NoteMaker";
import PdfBreaker from "../PdfBreaker/PdfBreaker";
import InfoGraph from "../InfoGraph/InfoGraph";

const A = () => {
  const [query, setQuery] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]); // For storing location suggestions

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const endpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(endpoint, {
        headers: {
          // Replace 'YourApp/1.0 (yourname@example.com)' with your app's user-agent
          "User-Agent": "YourApp/1.0 (yourname@example.com)",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const fetchedSuggestions = await response.json();
      console.log(fetchedSuggestions);
      setSuggestions(fetchedSuggestions.map((item: any) => item.display_name)); // Adjust according to your needs
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      // Handle errors or set suggestions to an empty array or a static error message
      setSuggestions([]);
    }
  };
  useEffect(() => {
    if (query) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]); // Clear suggestions if the query is empty
    }
  }, [query]);

  return (
    <Col style={{ gap: "1rem" }}>
      <InputWithSuggestions
        value={query}
        onChange={(i) => setQuery(i)}
        suggestions={["sd", "sdsd"]} // onClear={() => setQuery("")}
      />
      <LocationPicker />
    </Col>
  );
};
const Home = () => {
  const theme = useTheme();
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  return (
    <Col style={{ background: theme.neutralColor.bgContainer }}>
      {/* {!activeComponent ? (
        <div>
          <button onClick={() => setActiveComponent("PdfBreaker")}>
            PDF Breaker
          </button>
        </div>
      ) : activeComponent === "PdfBreaker" ? (
        <PdfBreaker onClose={() => setActiveComponent(null)} />
      ) : (
        <> nothing to show </>
      )} */}
      <InfoGraph />
    </Col>
  );
};

export default Home;
