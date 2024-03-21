import React from "react";
interface Props {
  id: string;
  propertyName: string;
  cleaningDate: string;
  description: string;
  images: string[];
}

const Refresh = () => {
  const rentalsList: Props[] = [];
  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/", { cache: "no-store" });
    const rentalsList: Props[] = await res.json();
    rentalsList.sort(
      (a, b) =>
        new Date(b.cleaningDate).getTime() - new Date(a.cleaningDate).getTime()
    );
    console.log(rentalsList);
  };
  return (
    <button className="btn no-animation" onClick={() => fetchData}>
      Refresh
    </button>
  );
};

export default Refresh;
