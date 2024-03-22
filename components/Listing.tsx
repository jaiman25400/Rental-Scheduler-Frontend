"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  id: string;
  propertyName: string;
  cleaningDate: string;
  description: string;
  images: string[];
}

const Listing = () => {
  const [rentalsList, setRentalsList] = useState<Props[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("Refresh,", rentalsList);
    try {
      const res: any = await fetch("http://localhost:3000/", {
        cache: "no-store",
      });
      const data: Props[] = await res.json();
      data.sort(
        (a, b) =>
          new Date(b.cleaningDate).getTime() -
          new Date(a.cleaningDate).getTime()
      );
      setRentalsList(data);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-4">Welcome to your Listing</h1>
      <br />
      <button className="btn" onClick={handleRefresh}>
        Refresh
      </button>

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {rentalsList.map((props, index) => (
          <li key={index} style={{ height: "100%", width: "100%" }}>
            <div
              className="card mb-3 bg-white shadow-xl"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                padding: "1rem",
              }}
            >
              <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                  <figure>
                    <img
                      key={index}
                      src={props.images?.[0]}
                      alt="No Image"
                      className="w-full h-auto"
                    />
                  </figure>
                </div>
              </div>

              <div className="card-body">
                <h2 className="card-title">{props.propertyName}</h2>
                <p>{props.description}</p>
                <div className="card-actions justify-start">
                  <h4 className="flex">
                    <b>Cleaning Date :</b>{" "}
                    {new Date(props.cleaningDate).toLocaleDateString()}
                  </h4>
                </div>

                <Link
                  className="btn"
                  href={{
                    pathname: "/post",
                    query: { data: JSON.stringify(props) },
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listing;
