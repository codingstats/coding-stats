import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import image from "../assets/image.png";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import MiniStat from "../Components/MiniStat";
import gfgLogo from "../assets/gfg.png";
import leetcodeLogo from "../assets/leetcode.png";
import codeforcesLogo from "../assets/codeforces.png";
import { useSelector } from "react-redux";

const Cumulative = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: max-content;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 200px;
  padding-bottom: 20px;
  overflow: hidden;
  border-bottom: solid 1px ${(props) => props.theme.text};
  margin-bottom: 40px;
  .info-section {
    display: flex;
    flex-direction: column;
    h3 {
      color: ${(props) => props.theme.accent};
    }
  }
  img {
    height: 100%;
  }
`;

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

const Profile = ({ themeDark, setThemeDark }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state?.user?.currentUser);

  useEffect(() => {
    if (currentUser === null) navigate("/login");
  }, [currentUser]);

  const profile = useSelector((state) => state?.profile);
  console.log(profile);
  return (
    <>
      <NavBar themeDark={themeDark} setThemeDark={setThemeDark} />
      <Main>
        <Info>
          <div className="info-section">
            <h1>{profile?.user?.name}</h1>
            <h3>{`@${profile?.user?.username}`}</h3>
            <p>{profile?.user?.email}</p>
          </div>
          <img src={image} alt="profile pic" />
        </Info>
        {!profile?.user?.codingPlatforms.length && (
          <Individuals>
            <h2>No Coding Platforms Submitted</h2>
          </Individuals>
        )}
        {profile?.user?.codingPlatforms.length !== 0 && (
          <>
            <Individuals>
              <h2>Individual Progress</h2>
              <Link to="/info/gfg">
                <MiniStat siteLogo={gfgLogo} />
              </Link>
              <Link to="/info/leetcode">
                <MiniStat siteLogo={leetcodeLogo} />
              </Link>
              <Link to="/info/codeforces">
                <MiniStat siteLogo={codeforcesLogo} />
              </Link>
            </Individuals>
            <Cumulative>
              <h2>Cumulative Profress</h2>
            </Cumulative>
          </>
        )}
      </Main>
    </>
  );
};

export default Profile;
