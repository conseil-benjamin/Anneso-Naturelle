const quantityLabel = {
  1: "peu",
  2: "modérément",
  3: "beaucoup",
};

function CareScale({ scaleValue, careType }) {
  const range = [1, 2, 3];
  const scaleType =
    careType === "light" ? (
      <img
        src={
          "https://res.cloudinary.com/dc1p20eb2/image/upload/v1700322943/Icon_Sun.svg"
        }
        alt="sun-icon"
      />
    ) : (
      <img
        src={
          "https://res.cloudinary.com/dc1p20eb2/image/upload/v1700322943/Icon_Water.svg"
        }
        alt="water-icon"
      />
    );

  return (
    <div
      onClick={() =>
        alert(
          `Cette plante requiert ${quantityLabel[scaleValue]} ${
            careType === "light" ? "de lumière" : "d'arrosage"
          }`
        )
      }
    >
      {range.map((rangeElem) =>
        scaleValue >= rangeElem ? (
          <span key={rangeElem.toString()}>{scaleType}</span>
        ) : null
      )}
    </div>
  );
}

export default CareScale;
