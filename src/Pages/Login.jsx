/* eslint-disable react/prop-types */
import { useState } from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { clearProfile } from "../redux/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls/apiCalls";
import { getPlatforms, getProfile } from "../redux/apiCalls/profileApiCalls";

const Form = styled.form`
  height: 80%;
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  h1 {
    font-family: "Expletus Sans", sans-serif;
    font-size: 80px;
    color: ${(props) => props.theme.accent};
    margin-bottom: 40px;
  }
  span {
    margin: 10px;
  }
  .error {
    color: red;
  }
  a {
    color: ${(props) => props.theme.text};
  }

  @media (max-width: 1030px) {
    transform: scale(0.9);
  }
  @media (max-width: 726px) {
    transform: scale(0.8);
    width: 95%;
  }
  @media (max-width: 726px) {
    transform: scale(0.8);
  }
  @media (max-width: 660px) {
    transform: scale(0.7);
  }
  @media (max-width: 450px) {
    transform: scale(0.6);
    span {
      font-size: 30px;
      width: max-content;
    }
  }
  @media (max-width: 380px) {
    transform: scale(0.5);
    h1 {
      font-size: 120px;
    }
  }
`;
const Input = styled.input`
  width: 600px;
  padding: 20px 30px;
  border-radius: 30px;
  font-size: 20px;
  margin: 15px;
  background-color: #decdc3;
  color: rgba(45, 64, 89, 1);
  outline: none;

  @media (max-width: 380px) {
    font-size: 30px;
  }
`;
const Button = styled.button`
  margin: 20px;
  padding: 20px 50px;
  background-color: ${(props) => props.theme.accent};
  border-radius: 40px;
  font-size: 20px;
  cursor: pointer;
  font-family: "Expletus Sans", sans-serif;

  @media (max-width: 730px) {
  }

  @media (max-width: 660px) {
    width: 600px;
  }

  @media (max-width: 380px) {
    font-size: 25px;
  }
`;

const Login = ({ themeDark, setThemeDark }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state?.user?.currentUser?.data);

  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearProfile());
    await login(dispatch, userData);
    await getProfile(dispatch, userData?.username);
    // call only if platforms added
    if (currentUser?.user?.codingPlatforms.length !== 0)
      await getPlatforms(dispatch, currentUser?.user?.codingPlatforms);
  };

  return (
    <>
      <NavBar themeDark={themeDark} setThemeDark={setThemeDark} />
      <Main>
        <Form className="login" onSubmit={(e) => handleSubmit(e)}>
          <h1>Login</h1>
          <Input
            onChange={(e) => handleChange(e)}
            type="text"
            required
            name="username"
            placeholder="Username"
          />
          <Input
            onChange={(e) => handleChange(e)}
            type="password"
            required
            name="password"
            placeholder="Password"
          />
          <Button type="submit">Login</Button>
          <span>
            <Link to={"/resetpassword"}>Forgot Password?</Link>
          </span>
          <span>
            <Link to={"/register"}>Create a new Account</Link>
          </span>
        </Form>
      </Main>
    </>
  );
};

export default Login;
