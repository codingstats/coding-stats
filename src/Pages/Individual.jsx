import React from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";

const Individual = ({ themeDark, setThemeDark }) => {
  return (
    <div>
      <NavBar themeDark={themeDark} setThemeDark={setThemeDark} />
      <Main />
    </div>
  );
};

export default Individual;
