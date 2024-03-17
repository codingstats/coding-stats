/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { clearProfile } from "../redux/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls/apiCalls";
import { getPlatforms, getProfile } from "../redux/apiCalls/profileApiCalls";

const Form = styled.form`
  //height: 80%;
  //width: max-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

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

  label {
    font-size: 1.2rem;
  }
`;
const Input = styled.input`
  width: 100%;
  //padding: 20px 30px;
  //border-radius: 30px;
  //font-size: 20px;
  margin: 10px 0 25px;
  //background-color: #decdc3;
  color: rgba(45, 64, 89, 1);
  outline: none;

  //width: 400px;
  padding: 10px 30px;
  border: solid 2px ${(props) => props.theme.text};
  border-radius: 3px;
  //margin-bottom: 20px;
  //background: none;
  color: black;
  //box-shadow: 1px 1px 4px ${(props) => props.theme.text};
  font-size: 1.2rem;

  @media (max-width: 380px) {
    font-size: 30px;
  }
`;
const Button = styled.button`
  outline: none;
  padding: 10px 20px;
  border-radius: 20px;
  background: ${(props) => props.theme.accent};
  border: none;
  //color: ${(props) => props.theme.text};
  color: white;
  font-size: 1rem;
  margin: 15px 0;

  @media (max-width: 730px) {
  }

  @media (max-width: 660px) {
    width: 600px;
  }

  @media (max-width: 380px) {
    font-size: 25px;
  }
`;

const F2C = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  align-self: center;
  align-items: center;

  //background-color: red;

  img {
    width: 70%;
  }
`;

const DF = styled.div`
  display: flex;
  justify-content: center;
`;

const Login = () => {
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
  };

  useEffect(() => {
    if (currentUser) navigate("/profile");
  }, [currentUser]);

  return (
    <>
      <NavBar />
      <Main>
        <DF>
          <F2C>
            <div>Some Content</div>
            <Form className="login" onSubmit={(e) => handleSubmit(e)}>
              <h1>Login</h1>
              <label>Username</label>
              <Input
                onChange={(e) => handleChange(e)}
                type="text"
                required
                name="username"
                // placeholder="Username"
              />
              <label>Password</label>
              <Input
                onChange={(e) => handleChange(e)}
                type="password"
                required
                name="password"
                // placeholder="Password"
              />
              <Button type="submit">Login</Button>
              <span>
                <Link to={"/resetpassword"}>Forgot Password?</Link>
              </span>
              <span>
                <Link to={"/register"}>Create a new Account</Link>
              </span>
            </Form>
          </F2C>
        </DF>
      </Main>
    </>
  );
};

export default Login;
