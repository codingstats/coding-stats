import {useEffect, useState} from "react";
import styled from "styled-components";
import Main from "../Components/Main";
import NavBar from "../Components/NavBar";
import {useNavigate} from "react-router";
import searchingPerson from "../assets/searching.jpg"

const About = styled.div`
  //background-color: red;
  //text-align: center;

  h1 {
    //font-size: 100px;
      //color: ${(props) => props.theme.accent};
    //margin-bottom: 40px;
      //filter: drop-shadow(4px 4px 4px rgba(${(props) => props.theme.textRgba}, 0.4));
  }

  p {
    margin-bottom: 40px;
    color: ${(props) => props.theme.colorSecondary};

  }
`;

const F2C = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  align-self: center;
  align-items: center;

  img {
    width: 70%;
  }

`;

const DF = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  //background-color: green;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  input {
    width: 400px;
    padding: 10px 30px;
    border: solid 2px ${(props) => props.theme.text};
    border-radius: 3px;
    margin-bottom: 20px;
    //background: none;
    color: black;
      //box-shadow: 1px 1px 4px ${(props) => props.theme.text};
    font-size: 1.2rem;
  }

  button {
    outline: none;
    padding: 10px 20px;
    border-radius: 20px;
    background: ${(props) => props.theme.accent};
    border: none;
      //color: ${(props) => props.theme.text};
    color: white;
    font-size: 1rem;
      //filter: drop-shadow(1px 1px 4px ${(props) => props.theme.text});
  }
`;

const Home = ({themeDark, setThemeDark}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const searchFunction = () => {
        navigate(`/user/${username}`);
    };

    return (
        <>
            <NavBar themeDark={themeDark} setThemeDark={setThemeDark}/>
            <Main>
                <DF>
                    <F2C>
                        <div>
                            <About>
                                <h1>Search your friends!</h1>
                                <p>Insert codestats username to go to their profile</p>
                            </About>
                            <Form onSubmit={searchFunction}>
                                <input
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                />
                                <button type="submit">Search</button>
                            </Form>
                        </div>
                        <div>
                            <img src={searchingPerson} alt=""/>
                        </div>
                    </F2C>
                </DF>
            </Main>
        </>
    );
};

export default Home;
