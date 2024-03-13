import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Heatmap from "./Heatmap";

const Container = styled.div`
  background-color: rgba(
    ${(props) => props.theme.textRgba},
    ${(props) => (props.theme.dark ? 0.1 : 0.04)}
  );
  height: 180px;
  width: 90%;
  margin: 0px auto;
  border-radius: 10px;
  padding: 30px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  .img {
    width: 100px;
    margin-right: 40px;
  }

  img {
    width: 100px;
    height: 100%;
  }
`;
const HeatMap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 4;

  svg {
    height: 100%;
    width: 100%;
  }
`;
const Text = styled.div`
  width: max-content;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-left: 40px;
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  canvas {
    height: 100%;
    margin-right: 30px;
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  color: ${(props) => props.theme.text};
  font-weight: 600;
  .easy {
    color: green;
  }
  .medium {
    color: #ffa600;
  }
  .hard {
    color: red;
  }
`;

const MiniStat = ({ siteLogo }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: [],
    datasets: [
      {
        label: ["Solved"],
        data: [2, 4, 6, 10, 4],
        backgroundColor: ["black", "green", "teal", "orange", "red"],
        borderColor: ["black", "green", "teal", "orange", "red"],
      },
    ],
  };

  const options = {};

  const heatData = {
    status: "success",
    data: {
      heatmapData: {
        1704133800: 1,
        1704220200: 3,
        1704306600: 1,
        1704393000: 4,
        1704479400: 5,
        1704565800: 2,
        1704652200: 6,
        1704738600: 2,
        1704825000: 5,
        1704911400: 1,
        1704997800: 3,
        1705084200: 2,
        1705170600: 5,
        1705257000: 2,
        1705343400: 4,
        1705429800: 1,
        1705516200: 1,
        1705602600: 3,
        1705689000: 2,
        1705775400: 1,
        1705861800: 1,
        1705948200: 1,
        1706293800: 5,
        1706380200: 2,
        1706466600: 11,
        1706553000: 4,
        1706639400: 2,
        1706725800: 1,
        1706812200: 3,
        1706898600: 4,
        1706985000: 2,
        1707071400: 1,
        1707762600: 1,
        1708021800: 1,
      },
    },
  };

  return (
    <Container>
      <div className="img">
        <img src={siteLogo} alt="logo" className="site" />
      </div>

      <HeatMap>
        <Heatmap heatmapData={heatData.data.heatmapData} year={2024} />
      </HeatMap>

      <Text>
        <div className="left">
          <Doughnut data={data} options={options} />
        </div>
        <div className="right">
          <span className="total">Total: 100</span>
          <span className="school">school: 10</span>
          <span className="basic">basic: 10</span>
          <span className="easy">Easy: 10</span>
          <span className="medium">Medium: 70</span>
          <span className="hard">Hard:20</span>
        </div>
      </Text>
    </Container>
  );
};

export default MiniStat;
