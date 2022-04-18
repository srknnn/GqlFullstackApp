import React, { FC, useEffect, useState } from "react";

interface ISubCardProps {
  name: string;
  status:number | string;
}

const SubCard: FC<ISubCardProps> = (data) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{data.name}</h5>
        <p className="card-text">
          {data.status}
        </p>
      </div>
    </div>
  );
};

export default SubCard;