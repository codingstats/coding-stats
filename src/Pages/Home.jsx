import { useEffect } from "react";
import styled from "styled-components";
import Main from "../Components/Main";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
import MiniStat from "../Components/MiniStat";
import gfgLogo from "../assets/gfg.png";
import leetcodeLogo from "../assets/leetcode.png";
import codeforcesLogo from "../assets/codeforces.png";

const Individuals = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: max-content;

  h2 {
    margin-bottom: 30px;
  }

  a {
    width: 100%;
  }
`;

const Cumulative = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: max-content;
`;

const Home = ({ themeDark, setThemeDark }) => {
  useEffect(() => {
    console.log("first", setThemeDark);
  }, []);

  return (
    <div>
      <NavBar themeDark={themeDark} setThemeDark={setThemeDark} />
      <Main>
        <Individuals>
          <h2>Individual Progress</h2>
          <Link to="/gfg">
            <MiniStat siteLogo={gfgLogo} />
          </Link>
          <Link to="/leetcode">
            <MiniStat siteLogo={leetcodeLogo} />
          </Link>
          <Link to="/codeforces">
            <MiniStat siteLogo={codeforcesLogo} />
          </Link>
        </Individuals>

        <Cumulative>
          <h2>Cumulative Profress</h2>
        </Cumulative>
      </Main>
    </div>
  );
};

export default Home;
