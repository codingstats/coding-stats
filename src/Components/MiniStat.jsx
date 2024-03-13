import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

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
    height: 90%;
    width: 18%;
  }

  img {
    height: 90%;
  }
  .bar {
    background-color: rgba(
      ${(props) => props.theme.textRgba},
      ${(props) => (props.theme.dark ? 0.1 : 0.3)}
    );
    height: 100%;
    width: 2px;
  }
`;
const HeatMap = styled.div`
  width: max-content;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.div`
  width: max-content;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
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

  return (
    <Container>
      <div className="img">
        <img src={siteLogo} alt="logo" className="site" />
      </div>
      <spna className="bar"></spna>
      <HeatMap>asd</HeatMap>
      <spna className="bar"></spna>
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
