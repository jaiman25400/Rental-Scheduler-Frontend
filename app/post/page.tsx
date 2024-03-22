import React from "react";

const Page = (props: any) => {
  // Parse the data from props
  const data = JSON.parse(props.searchParams.data);
  const { propertyName, images, description } = data;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Property Name and Description */}
      <div style={{ width: "80%", marginBottom: "20px" }}>
        <h1
          style={{
            textAlign: "center",
            fontWeight: 700,
            marginBottom: "10px",
            fontSize: 30,
          }}
        >
          {propertyName}
        </h1>
        <p style={{ textAlign: "center" }}>{description}</p>
      </div>

      {/* Images */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          flexWrap: "wrap",
        }}
      >
        {images &&
          images.map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              style={{
                width: "75%",
                marginBottom: "20px",
                padding: 20,
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Page;
