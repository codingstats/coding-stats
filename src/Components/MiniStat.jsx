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
  .school {
    color: #82eaee;
  }
  .basic {
    color: violet;
  }
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

const MiniStat = ({ platform, heatmap, siteLogo }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  console.log(platform, heatmap);
  const data = {
    labels: [],
    datasets: [
      {
        label: ["Solved"],
        data: platform?.submissionCount?.map((sub) => {
          if (platform.submissionCount.length == 1) return sub.count;
          else {
            if (sub.difficulty !== "All") return sub.count;
          }
        }),
        backgroundColor: ["black", "green", "teal", "orange", "red"],
        borderColor: ["black", "green", "teal", "orange", "red"],
      },
    ],
  };

  const options = {};

  return (
    <Container>
      <div className="img">
        <img src={siteLogo} alt="logo" className="site" />
      </div>

      <HeatMap>
        {heatmap && <Heatmap heatmapData={heatmap?.heatmapData} year={2024} />}
      </HeatMap>

      <Text>
        <div className="left">
          <Doughnut data={data} options={options} />
        </div>
        <div className="right">
          {platform.submissionCount.map((sub) => (
            <span
              key={sub.difficulty}
              className={sub?.difficulty?.toLowerCase()}
            >
              {`${sub.difficulty}: ${sub.count}`}
            </span>
          ))}
        </div>
      </Text>
    </Container>
  );
};

export default MiniStat;
