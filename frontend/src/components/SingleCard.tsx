import React, { FC, useEffect, useState } from "react";
import { IMachines } from "./Machines";
import SubCard from "./SubCard";
import { DateHelper} from "../Helper/DateHelper";
import Axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ISingleCardProps {
  selectedData: IMachines;
}

interface MachineStat {
  id: number;
  __typename: string;
  averageCycle: number;
  idealCycle: number;
  status: number;
  prodAmount: number;
  operator?: string;
  shift: {
    __typename: string;
    id: number;
    start: Date;
    end: Date;
  };
  cycle: number;
  currentProdPlan?: string;
  defectAmount: number;
  workDuration: number;
  failureDuration: number;
  availability: number;
  performance: number;
  quality: number;
  oee: number;
}

const SingleCard: FC<ISingleCardProps> = ({ selectedData }) => {
  const [selectedMachineStat, selectMachineStat] = useState<MachineStat>();
  const [status, setStatus] = useState<string>();

  const setmachineStatus = (numberStatus: number) => {
    if (numberStatus == 0) {
      setStatus("Working");
    } else if (numberStatus == 1) {
      setStatus("Failure");
    } else {
      setStatus("Unknown");
    }
  };

  const fetchMachine = async () => {
    const response = await Axios.get(
      "http://localhost:5000/machine/" + selectedData?.id
    );
    selectMachineStat(response.data.machineStats as MachineStat);
    setmachineStatus(selectedMachineStat?.status!);
  };

  useEffect(() => {
    fetchMachine();
  }, [selectedData]);

  if (!selectedData) {
    return <div></div>;
  }
  return (
    <div>
      <div className="card" id="single-card">
        <h5 className="card-header">{selectedData.name}</h5>
        <div className="card-body">
          <div className="row">
            <div className="col-md-10">
              <div className="row mt-6">
                <div className="col-sm-12">
                  <h5 className="card-title">Status : {status}</h5>
                  <h5 className="card-title">
                    {" "}
                    Ship :
                    { DateHelper.getFullHourString(new Date(
                      selectedMachineStat?.shift?.start!
                    ))} -{" "}
                    {DateHelper.getFullHourString(new Date(selectedMachineStat?.shift?.end!))}
                  </h5>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-6">
                  <SubCard
                    status={DateHelper.getFullHourString(new Date(selectedMachineStat?.workDuration!))}
                    name={"Up Time"}
                  ></SubCard>
                </div>
                <div className="col-sm-6">
                  <SubCard
                    status={DateHelper.getFullHourString(new Date(selectedMachineStat?.failureDuration!))}
                    name={"Down Time"}
                  ></SubCard>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6">
                  <SubCard
                    status={selectedMachineStat?.idealCycle!}
                    name={"Ideal Cycle"}
                  ></SubCard>
                </div>
                <div className="col-sm-6">
                  <SubCard
                    status={selectedMachineStat?.averageCycle!}
                    name={"Avarage Cycle"}
                  ></SubCard>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6">
                  <SubCard
                    status={selectedMachineStat?.prodAmount!}
                    name={"Produced"}
                  ></SubCard>
                </div>
                <div className="col-sm-6">
                  <SubCard
                    status={selectedMachineStat?.defectAmount!}
                    name={"Defect"}
                  ></SubCard>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <h5>{"oee"}</h5>
              <div style={{ width: 80, height: 80 }}>
                <CircularProgressbar
                  value={selectedMachineStat?.oee!}
                  text={`${selectedMachineStat?.oee!}%`}
                />
              </div>
              <h5>{"availability"}</h5>
              <div style={{ width: 80, height: 80 }}>
                <CircularProgressbar
                  value={selectedMachineStat?.availability!}
                  text={`${selectedMachineStat?.availability!}%`}
                />
              </div>
              <h5>{"performance"}</h5>
              <div style={{ width: 80, height: 80 }}>
                <CircularProgressbar
                  value={selectedMachineStat?.performance!}
                  text={`${selectedMachineStat?.performance!}%`}
                />
              </div>
              <h5>{"quality"}</h5>
              <div style={{ width: 80, height: 80 }}>
                <CircularProgressbar
                  value={selectedMachineStat?.quality!}
                  text={`${selectedMachineStat?.quality}%`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
