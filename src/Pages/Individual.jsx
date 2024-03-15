import React from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";

const Individual = ({ themeDark, setThemeDark }) => {
  return (
    <>
      <NavBar themeDark={themeDark} setThemeDark={setThemeDark} />
      <Main></Main>
    </>
  );
};

export default Individual;
