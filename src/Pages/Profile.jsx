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
import { logOut } from "../redux/userSlice";
import { clearProfile } from "../redux/profileSlice";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  order: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 30%;
  height: 200px;
  padding-bottom: 20px;
  overflow: hidden;
  margin-bottom: 40px;

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
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
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;

const Data = styled.div`
  width: 65%;
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
const Cumulative = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: max-content;
`;
const Profile = ({ themeDark, setThemeDark }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const profile = useSelector((state) => state?.profile);

  const fetchProfile = async (user) => {
    await getProfile(dispatch, user);
    console.log(profile);
    await fetchProfileData();
  };

  const fetchProfileData = async () => {
    await getPlatforms(dispatch, profile?.user?.codingPlatforms);
    await getHeatmaps(dispatch, profile?.user?.codingPlatforms);
  };

  useEffect(() => {
    if (currentUser === null) navigate("/login");
    fetchProfile(currentUser?.data?.user?.username);
  }, [currentUser]);

  useEffect(() => {}, [profile]);

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(clearProfile());
  };

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
        <Container>
          <Info>
            <div className="info">
              <div className="info-section">
                <h1>{profile?.user?.name}</h1>
                <h3>{`@${profile?.user?.username}`}</h3>
                <p>{profile?.user?.email}</p>
              </div>
              <img src={image} alt="profile pic" />
            </div>
            <div className="buttons">
              <a onClick={handleLogout}>Log Out</a>
              <Link to={"/profile/editprofile"}> Edit Profile </Link>
              <Link to={"/profile/changepassword"}>Change Password</Link>
              <Link to={"/profile/deleteaccount"}>Delete Account</Link>
            </div>
          </Info>

          <Data>
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
                    <MiniStat
                      key={platform?._id}
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
                  ))}
                </Individuals>
                <Cumulative>
                  <h2>Cumulative Profress</h2>

                  <CumulativeHeatMap
                    data={profile?.heatmaps?.map(
                      (heatmap) => heatmap.heatmapData
                    )}
                  />
                </Cumulative>
              </>
            )}
          </Data>
        </Container>
      </Main>
    </>
  );
};

export default Profile;
