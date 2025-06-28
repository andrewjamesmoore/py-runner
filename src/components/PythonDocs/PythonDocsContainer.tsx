import { useEffect, useState } from "react";
import { fetchFunctions, fetchMethods } from "../../services/api";
import { PythonDocs } from "./PythonDocs";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";

interface PythonDocsContainerProps {
  activeTab: "functions" | "methods";
  onExampleClick: (code: string) => void;
  searchQuery: string;
  hideTitle?: boolean;
}

export function PythonDocsContainer({
  onExampleClick,
  searchQuery,
  activeTab,
  hideTitle,
}: PythonDocsContainerProps) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const result =
          activeTab === "functions"
            ? await fetchFunctions()
            : await fetchMethods();
        setData(result);
      } catch (err) {
        console.error(`Error fetching ${activeTab}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  if (loading)
    return <LoadingScreen>Loading Python {activeTab}...</LoadingScreen>;

  return (
    <PythonDocs
      data={data}
      onExampleClick={onExampleClick}
      searchQuery={searchQuery}
      hideTitle={hideTitle}
    />
  );
}
