import { useEffect, useState } from "react";
import styled from "styled-components";
import Main from "../Components/Main";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router";

const About = styled.div`
  text-align: center;
  h1 {
    font-size: 100px;
    color: ${(props) => props.theme.accent};
    margin-bottom: 40px;
    filter: drop-shadow(
      4px 4px 4px rgba(${(props) => props.theme.textRgba}, 0.4)
    );
  }
  p {
    margin-bottom: 40px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 400px;
    padding: 15px 30px;
    border: solid 2px ${(props) => props.theme.text};
    border-radius: 30px;
    margin-bottom: 20px;
    background: none;
    color: ${(props) => props.theme.text};
    box-shadow: 1px 1px 4px ${(props) => props.theme.text};
  }
  button {
    outline: none;
    padding: 10px 20px;
    border-radius: 20px;
    background: none;
    border: solid 2px ${(props) => props.theme.text};
    color: ${(props) => props.theme.text};
    filter: drop-shadow(1px 1px 4px ${(props) => props.theme.text});
  }
`;

const Home = ({ themeDark, setThemeDark }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const searchFunction = () => {
    navigate(`/${username}`);
  };

  return (
    <>
      <NavBar themeDark={themeDark} setThemeDark={setThemeDark} />
      <Main>
        <About>
          <h1>Coding Stats</h1>
          <p>One place to track all your coding progres.</p>
        </About>
        <Form onSubmit={searchFunction}>
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <button type="submit">Search</button>
        </Form>
      </Main>
    </>
  );
};

export default Home;
