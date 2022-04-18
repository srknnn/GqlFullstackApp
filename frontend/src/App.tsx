import React, { FC, useEffect, useState } from "react";
import Axios from "axios";
import Machines, { IMachinesProps, IMachines } from "./components/Machines";
import SingleCard from "./components/SingleCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function App() {
  const [data, getData] = useState<IMachines[]>([]);
  const [selectedCategory, SelectCategory] = useState<IMachines>(data[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeCategory = (selectedCategory: IMachines) => {
    SelectCategory(selectedCategory);
  };

  const fetchMachines = async () => {
    setIsLoading(true);
    const response = await Axios.get("http://localhost:5000/machines");
    getData(response.data as IMachines[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  return (
    <React.Fragment>
      <div className="App row">
        <div className="col-md-2">
        <h2>Machines</h2>
          <Machines onChangeCategory={changeCategory} data={data} />
        </div>
        <div className="col-md-10">
          {!isLoading && (
            <SingleCard selectedData={selectedCategory}></SingleCard>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
