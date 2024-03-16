import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { publicRequest } from "../requestMethods";
import MainCenter from "../Components/MainCenter";
import Loader from "../Components/Loader";

const Container = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    margin-bottom: 50px;
  }
`;
const Platforms = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
const Platform = styled.div`
  width: 30%;
  height: max-content;
`;

const Notification = styled.div``;

const Notifications = ({ themeDark, setThemeDark }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state) => state?.user?.currentUser?.data?.user?.username
  );
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const [platforms, setPlatforms] = useState({});
  const apiCall = async () => {
    setIsFetching(true);
    try {
      const { error, ...res } = (await publicRequest.get("/notifications")).data
        .data;
      setPlatforms(res);
      console.log(platforms);
      setIsError(false);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      setIsError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!currentUser) navigate("/login");
    apiCall();
  }, []);
  useEffect(() => {
    console.log(Object.entries(platforms));
  }, [platforms]);

  return (
    <>
      <NavBar themeDark={themeDark} setThemeDark={setThemeDark} />
      {isFetching && (
        <MainCenter>
          <Loader />
        </MainCenter>
      )}
      {!isFetching && (
        <>
          {isError && (
            <MainCenter>
              <h2>Something went wrong</h2>
              <button onClick={() => navigate("/")}>Go Back</button>
            </MainCenter>
          )}
          {!isError && (
            <Main>
              <Container>
                <h1>Contest Notifications</h1>
                <Platforms>
                  {Object.entries(platforms)?.map((platform) => (
                    <Platform key={platform[0]}>
                      <h2>{platform[0]}</h2>
                      {platform[1]?.map((noti) => (
                        <Notification key={noti?.title}>
                          <h4>{noti?.title}</h4>
                          <p>{noti?.start}</p>
                          <p>
                            <a href={noti?.link}>Visit</a>
                          </p>
                        </Notification>
                      ))}
                    </Platform>
                  ))}
                </Platforms>
              </Container>
            </Main>
          )}
        </>
      )}
    </>
  );
};

export default Notifications;
