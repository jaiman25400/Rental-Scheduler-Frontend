import React from "react";

interface Props {
  id: string;
  propertyName: string;
  cleaningDate: string;
  description: string;
  images: string[];
}

const Rentals = async () => {
  const res: any = await fetch("http://localhost:3000/", { cache: "no-store" });
  const rentalsList: Props[] = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-4">Welcome to your Listing</h1>
      <ul className="gListingrid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
        {rentalsList.map((props) => (
          <li key={props.id}>
            <div className="p-2">
              <div className="grid grid-cols-2 gap-4 w-full rounded bg-primary text-primary-content">
                <div className="col-span-1">
                  {props.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="No Image"
                      className="w-full h-auto"
                    />
                  ))}
                </div>
                <div className="col-span-1">
                  <h2 className="text-xl font-bold">{props.propertyName}</h2>
                  <p>{props.description}</p>
                  <div>
                    {props.cleaningDate?.substring(
                      0,
                      props.cleaningDate.indexOf("T")
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rentals;
