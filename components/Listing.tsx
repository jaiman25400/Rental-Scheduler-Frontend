import React from "react";

interface Props {
  id: string;
  propertyName: string;
  cleaningDate: string;
  description: string;
  images: string[];
}

const Listing = async () => {
  const res: any = await fetch("http://localhost:3000/", { cache: "no-store" });
  const rentalsList: Props[] = await res.json();
  console.log(rentalsList);
  rentalsList.sort(
    (a, b) =>
      new Date(b.cleaningDate).getTime() - new Date(a.cleaningDate).getTime()
  );

  console.log("New :", rentalsList);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-4">Welcome to your Listing</h1>

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Adjust column width as needed
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {rentalsList.map((props) => (
          <li key={props.id} style={{ height: "100%", width: "100%" }}>
            <div
              className="card mb-3 bg-white shadow-xl"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                padding: "1rem",
              }}
            >
              <figure>
                {props.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="No Image"
                    className="w-full h-auto"
                  />
                ))}
              </figure>
              <div className="card-body">
                <h2 className="card-title">{props.propertyName}</h2>
                <p>{props.description}</p>
                <div className="card-actions justify-start">
                  <h4 className="flex ">
                    {" "}
                    <b> Cleaning Date :</b>{" "}
                    {new Date(props.cleaningDate).toLocaleDateString()}
                  </h4>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listing;
