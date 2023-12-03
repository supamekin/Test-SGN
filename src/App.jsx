import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Bar from "./Bar";
import ChinaLogo from "./assets/logo/China_logo.png";
import LineVerticalX from "./components/LineVerticalX.jsx";
// import IndiaLogo from "./assets/logo/India_logo.png";
// import USALogo from "./assets/logo/USA_logo.png";
// import RussiaLogo from "./assets/logo/Russia_logo.png";
// import JapanLogo from "./assets/logo/Japan_logo.png";
// import IndonesiaLogo from "./assets/logo/Indonesia_logo.png";
// import GermanyLogo from "./assets/logo/Germany_logo.png";
// import BrazilLogo from "./assets/logo/Brazil_logo.png";
// import UKLogo from "./assets/logo/UK_logo.png";
// import ItalyLogo from "./assets/logo/Italy_logo.png";
// import BangladeshLogo from "./assets/logo/Bangladesh_logo.png";
// import FranceLogo from "./assets/logo/France_logo.png";

function App() {
  const [data, setData] = useState([]);
  const [totalPopYear, setTotalPopYear] = useState(0);
  const [totalPop, setTotalPop] = useState(0);
  const [uniqueYear, setUniqueYear] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);

  let first = true;
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://sheet.best/api/sheets/9996e711-3aed-41fe-aa09-0984086fc3af"
      );
      const rawData = res.data;
      const dataByYear = rawData.filter((item) => item.Year !== undefined);
      console.log(dataByYear);

      const uniqueYears = [...new Set(dataByYear.map((item) => item.Year))];
      setUniqueYear(uniqueYears.slice(0, 69));

      if (first) {
        first = false;
        while (true) {
          for (const year of uniqueYears.slice(0, 69)) {
            setCurrentYear(year);
            const dataForYear = dataByYear
              .filter((item) => item.Year === year)
              .sort((a, b) => b.Population - a.Population)
              .slice(0, 12);

            setTotalPopYear(
              Math.max(
                ...dataByYear
                  .filter((item) => item.Year === year)
                  .map((item) => item.Population)
              )
            );
            const arrayPop = [
              ...dataByYear
                .filter((item) => item.Year === year)
                .map((item) => item.Population),
            ];
            const sum = arrayPop.reduce(
              (accumulator, currentValue) =>
                parseInt(accumulator) + parseInt(currentValue),
              0
            );
            setTotalPop(sum);

            setData(dataForYear);
            await sleep(200);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  if (!data || !totalPopYear) {
    return <div />;
  }

  return (
    <>
      <div className="Paragraph">
        <h2>Population growth per country, 1950 to 2021</h2>
        <span style={{ fontSize: "20px", fontWeight: "400" }}>
          Click on the legend below to filter by continent 👇
        </span>
        <div className="Paragraph-population">
          <div
            style={{
              width: "100%",
              textAlign: "start",
              display: "flex",
            }}
          >
            <div style={{ marginLeft: "178px" }}>0</div>
          </div>
          {data.map((val, idx) => (
            <div key={idx}>
              <Bar
                color="#6047ec"
                value={val.Population}
                width={String(val.Population)}
                totalValue={totalPopYear}
                logo={ChinaLogo}
                label={val["Country name"]}
              />
            </div>
          ))}
          <div className="totalyear">
            <div className="currentYear">{currentYear}</div>
            Total: {parseInt(totalPop).toLocaleString("en-US")}
          </div>
          <div className="vertical_current">
            <div className="currentPoint">
              <div className="currentPointX"> ▼</div>
            </div>
            <div className="vertical_line">
              <div className="vertical">
                {uniqueYear && uniqueYear?.length > 0 ? uniqueYear[0] : ""}
              </div>
              {uniqueYear &&
                uniqueYear?.length > 0 &&
                uniqueYear
                  .filter((element, index) => (parseInt(index)) % 4 === 0)
                  ?.slice(1, 18)
                  .map((item) => <LineVerticalX key={item} value={item} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
