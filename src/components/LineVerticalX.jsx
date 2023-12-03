const LineVerticalX = ({ value }) => {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div
        style={{
          borderRight: "1px solid gray",
          height: "4px",
          width: "25%",
        }}
      ></div>
      <div
        style={{
          borderRight: "1px solid gray",
          height: "4px",
          width: "25%",
        }}
      ></div>
      <div
        style={{
          borderRight: "1px solid gray",
          height: "4px",
          width: "25%",
        }}
      ></div>
      <div
        style={{
          borderRight: "2px solid gray",
          width: "25%",
          height: "6px",
          position: "relative",
        }}
      >
        <div
          style={{
            marginTop: "4px",
            fontSize: "10px",
            position: "absolute",
            right: -20,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};
export default LineVerticalX;
