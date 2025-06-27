import { useState } from "react";
import styles from "./ReferenceContent.module.css";
import { PythonDocsContainer } from "../PythonDocs/PythonDocsContainer";

interface ReferenceContentProps {
  onExecute: (code: string) => void;
}

type TabType = "functions" | "methods";

export function ReferenceContent({ onExecute }: ReferenceContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>("functions");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div className={styles.tabButtons}>
          <button
            className={`${styles.tab} ${
              activeTab === "functions" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("functions")}
          >
            Built-in Functions
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "methods" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("methods")}
          >
            Methods
          </button>
        </div>
        <div className={styles.searchBar}>
          <input
            type='text'
            placeholder='Filter results...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>
      <div className={styles.content}>
        <PythonDocsContainer
          activeTab={activeTab}
          onExampleClick={onExecute}
          searchQuery={searchQuery}
          hideTitle
        />
      </div>
    </div>
  );
}
