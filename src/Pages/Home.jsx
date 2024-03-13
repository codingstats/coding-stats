import { useEffect } from "react";
import Main from "../Components/Main";
import NavBar from "../Components/NavBar";

const Home = ({ themeDark, setThemeDark }) => {
  useEffect(() => {
    console.log("first", setThemeDark);
  }, []);

  return (
    <div>
      <NavBar themeDark={themeDark} setThemeDark={setThemeDark} />
      <Main />
    </div>
  );
};

export default Home;
