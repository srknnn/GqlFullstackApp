import React, { FC, useEffect, useState } from "react";

export interface IMachinesProps {
  onChangeCategory: (data: IMachines) => void;
  data: IMachines[];
}
export interface IMachines {
  id: number;
  name: string;
}

const Machines: FC<IMachinesProps> = ({ data, onChangeCategory }) => {
  const [selected, setSelected] = useState<number>(0);
  useEffect(() => {
    const category = data.find((item) => item!.id === selected);
    onChangeCategory(category!);
  }, [data, selected]);
  if (!data.length) {
    return <div></div>;
  }

  const handleSelcet = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(Number.parseInt(e.target.value));
  };

  return (
    <select className="form-select form-select-lg" onChange={handleSelcet}>
      {data.map((category: any) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default Machines;
