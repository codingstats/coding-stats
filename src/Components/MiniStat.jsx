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
  height: 500px;
  width: 90%;
  margin: 0px auto;
  border-radius: 10px;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Top = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .img {
    height: 120px;
    margin-right: 40px;
  }
  //
  img {
    width: 120px;
    //height: 100%;
  }

  .mid {
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    width: calc(100% - 160 - 40%);
  }
`;

const Text = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 40px;
  .left {
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 60px;
  }
  canvas {
    height: 100%;
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

const HeatMap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex: 4;

  svg {
    height: 100%;
    width: 100%;
  }
`;

const MiniStat = ({ platform, heatmap, siteLogo }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: [],
    datasets: [
      {
        label: ["Solved"],
        data: platform?.submissionCount?.map((sub) => {
          if (platform?.submissionCount?.length == 1) return sub.count;
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
      <Top>
        <div className="img">
          <img src={siteLogo} alt="logo" className="site" />
        </div>

        <div className="mid">
          <h2>{platform?.handler}</h2>
          <p>
            <span className="heading">Platform: </span>
            {platform?.platformName}
          </p>
          <p>
            <a target="_blank" href={platform?.profileLink}>
              Visit
            </a>
          </p>
          <p>
            <span className="heading">Rank: </span>
            {platform?.rank}
          </p>
          <p>
            <span className="heading">Streak: </span>
            {platform?.streak}
          </p>
        </div>

        <Text>
          <div className="left">
            <Doughnut data={data} options={options} />
          </div>
          <div className="right">
            {platform?.submissionCount?.map((sub) => (
              <span
                key={sub.difficulty}
                className={sub?.difficulty?.toLowerCase()}
              >
                {`${sub.difficulty}: ${sub.count}`}
              </span>
            ))}
          </div>
        </Text>
      </Top>
      <HeatMap>
        {heatmap && <Heatmap heatmapData={heatmap?.heatmapData} year={2024} />}
      </HeatMap>
    </Container>
  );
};

export default MiniStat;
