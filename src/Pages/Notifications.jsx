import React from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";

const Notifications = ({ themeDark, setThemeDark }) => {
  return (
    <>
      <NavBar themeDark={themeDark} setThemeDark={setThemeDark} />
      <Main></Main>
    </>
  );
};

export default Notifications;
