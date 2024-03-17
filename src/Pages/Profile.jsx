import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import image from "../assets/image.svg";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import MiniStat from "../Components/MiniStat";
import gfgLogo from "../assets/gfg.png";
import leetcodeLogo from "../assets/leetcode.png";
import codeforcesLogo from "../assets/codeforces.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getHeatmaps,
  getPlatforms,
  getProfile,
} from "../redux/apiCalls/profileApiCalls";
import CumulativeHeatMap from "../Components/CumulativeHeatMap";
import { logOut } from "../redux/userSlice";
import { clearProfile } from "../redux/profileSlice";
import MainCenter from "../Components/MainCenter";
import Loader from "../Components/Loader";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  @media screen and (max-width: 1000px){
    flex-direction: column;
  }
  
`;

const Info = styled.div`
  order: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 20%;
  height: max-content;
  padding-bottom: 20px;
  //overflow: hidden;
  margin-bottom: 40px;

  @media screen and (max-width: 1000px) {
    order: 1;
    width: 100%;
    padding: 10px;
    flex-direction: row;
    justify-content: space-evenly;
    
    > div {
      max-width: 500px;
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //width: 100%;
    height: 100%;

    @media screen and (max-width: 1330px) {
      flex-direction: column-reverse;
    }


  }

  .info-section {
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1330px) {
      align-items: center;
    }

    h3 {
      color: ${(props) => props.theme.accent};
    }
  }

  .img {
    height: 100px;
    background-color: white;
    padding: 5px;
    border: 3px solid ${(props) => props.theme.backgroundColor};
    border-radius: 50%;
    box-shadow: ${(props) => props.theme.body} 0px 0px 2px;

    @media screen and (max-width: 1330px) {
      margin-bottom: 10px;
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
    width: 100%;

    @media screen and (max-width: 1000px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 20px;
    }

    a {
      margin: 20px;
      padding: 14px 0px;
      border: 1px solid #ea5455;
      border-radius: 5px;
      width: 100%;
      text-align: center;
      text-decoration: none;
      font-size: small;
      transition: all 0.25s ease;
      overflow: hidden;
      cursor: pointer;
      color: ${(props) => props.theme.text};

      &:hover {
        letter-spacing: 1.2px;
        color: #ea5455;
        border: 1px solid #decdc3;
      }

      @media screen and (max-width: 1000px) {
        margin: 0;
      }

    }
  }
`;

const Data = styled.div`
  width: 80%;
  @media screen and (max-width: 1000px){
    order: 2;
    width: 100%;
  }`;

const Individuals = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  //height: max-content;

  h2 {
    margin-bottom: 10px;
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
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const profile = useSelector((state) => state?.profile);
  const isFetching = useSelector((state) => state?.profile?.isFetching);
  const fetchProfile = async (user) => {
    await getProfile(dispatch, user);
    console.log(profile);
  };

  const fetchProfileData = async () => {
    await getPlatforms(dispatch, profile?.user?.codingPlatforms);
    await getHeatmaps(dispatch, profile?.user?.codingPlatforms);
  };

  useEffect(() => {
    if (currentUser === null) navigate("/login");
    fetchProfile(currentUser?.data?.user?.username);
  }, [currentUser]);

  useEffect(() => {
    fetchProfileData();
  }, [profile?.user?.codingPlatforms]);

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
      <NavBar />
      {isFetching && (
        <MainCenter>
          <Loader />
        </MainCenter>
      )}
      {!isFetching && (
        <>
          {!profile?.user?.username && <MainCenter></MainCenter>}
          {profile?.user?.username && (
            <Main>
              <Container>
                <Info>
                  <div className="info">
                    <div className="info-section">
                      <h1>{profile?.user?.name}</h1>
                      <h3>{`@${profile?.user?.username}`}</h3>
                      <p>{profile?.user?.email}</p>
                    </div>
                    <div className="img">
                      <img src={image} alt="profile pic" />
                    </div>
                  </div>
                  <div className="buttons">
                    <a onClick={handleLogout}>Log Out</a>
                    <Link to={"/select-platforms"}> Change Platforms</Link>
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
                                (p) =>
                                  p?.platformName === platform?.platformName
                              )[0]
                            }
                            heatmap={
                              profile?.heatmaps?.filter(
                                (f) =>
                                  f?.platformName === platform?.platformName
                              )[0]
                            }
                            siteLogo={getLogo(
                              platform?.platformName.toLowerCase()
                            )}
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
          )}
        </>
      )}
    </>
  );
};

export default Profile;
