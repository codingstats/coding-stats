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
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchedHeatmaps,
  getSearchedPlatforms,
  getSearchedProfile,
} from "../redux/apiCalls/searchApiCalls";
import {
  getHeatmaps,
  getPlatforms,
  getProfile,
} from "../redux/apiCalls/profileApiCalls";
import CumulativeHeatMap from "../Components/CumulativeHeatMap";

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
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.currentUser);

  const fetchProfile = async (user) => {
    await getProfile(dispatch, user);
    await getPlatforms(dispatch, profile?.user?.codingPlatforms);
    await getHeatmaps(dispatch, profile?.user?.codingPlatforms);
    console.log("profile");
  };

  useEffect(() => {
    if (currentUser === null) navigate("/login");
    fetchProfile(currentUser?.data?.user?.username);
  }, [currentUser]);

  const profile = useSelector((state) => state?.profile);

  const getLogo = (name) => {
    if (name == "gfg") return gfgLogo;
    if (name == "leetcode") return leetcodeLogo;
    if (name == "codeforces") return codeforcesLogo;
  };
  console.log(profile?.platforms);
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
        {!profile?.user?.codingPlatforms?.length && (
          <Individuals>
            <h2>No Coding Platforms Submitted</h2>
          </Individuals>
        )}
        {profile?.user?.codingPlatforms?.length !== 0 && (
          <>
            <Individuals>
              <h2>Individual Progress</h2>
              {profile?.user?.codingPlatforms?.map((platform) => (
                <Link
                  key={platform?._id}
                  to={`/info/${platform?.platformName?.toLowerCase()}`}
                >
                  <MiniStat
                    platform={
                      profile?.platforms?.filter(
                        (p) => p?.platformName === platform?.platformName
                      )[0]
                    }
                    heatmap={
                      profile?.heatmaps?.filter(
                        (f) => f?.platformName === platform?.platformName
                      )[0]
                    }
                    siteLogo={getLogo(platform?.platformName.toLowerCase())}
                  />
                </Link>
              ))}
            </Individuals>
            <Cumulative>
              <h2>Cumulative Profress</h2>

              <CumulativeHeatMap
                data={profile?.heatmaps?.map((heatmap) => heatmap.heatmapData)}
              />
            </Cumulative>
          </>
        )}
      </Main>
    </>
  );
};

export default Profile;
