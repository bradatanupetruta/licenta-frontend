import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { useEvaluationToNavigation } from "../util/useLocalStorage";

function Home() {
  useEvaluationToNavigation();

  const [selectedTable, setSelectedTable] = useState(null);

  const handleSelection = (selectedTableIndex) => {
    setSelectedTable(selectedTableIndex);
  };

  return (
    <div>
      <Navbar></Navbar>
      <Table
        tableSelectedIndex={selectedTable}
        onSelectTable={handleSelection}
      ></Table>
    </div>
  );
}

export default Home;
