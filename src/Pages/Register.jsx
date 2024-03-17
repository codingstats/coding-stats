import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/apiCalls/apiCalls";
import { errorReset } from "../redux/userSlice";
import MainCenter from "../Components/MainCenter";
import Loader from "../Components/Loader";

// Styled components for styling
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  h1 {
    font-family: "Expletus Sans", sans-serif;
    font-size: 60px;
    color: ${(props) => props.theme.accent};
    margin-bottom: 30px;
    text-align: center;

    @media (max-width: 600px) {
      font-size: 40px;
    }
  }

  a {
    color: ${(props) => props.theme.text};
  }
`;
const Input = styled.input`
  width: 90%;
  padding: 10px 30px;
  border-radius: 30px;
  font-size: 20px;
  margin: 15px;
  background-color: #decdc3;
  color: rgba(45, 64, 89, 1);
  outline: none;
`;
const Button = styled.button`
  margin: 20px;
  padding: 15px 40px;
  background-color: ${(props) => props.theme.accent};
  border-radius: 40px;
  font-size: 20px;
  cursor: pointer;
  font-family: "Expletus Sans", sans-serif;
`;
// Register component definition
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFetching = useSelector((state) => state?.user?.isFetching);
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const [userData, setUserData] = useState({});

   // Function to handle changes in form inputs
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(dispatch, userData);
  };
// useEffect hook to navigate to select-platforms page if user is already logged in and reset error state
 
  useEffect(() => {
    if (currentUser !== null) navigate("/setPlatforms");
    dispatch(errorReset());
  }, [currentUser]);

  // useEffect hook to reset error state on component mount
  useEffect(() => {
    dispatch(errorReset());
  }, []);

  return (
    <>
      <NavBar />
      {isFetching && (
        <MainCenter>
          <Loader />
        </MainCenter>
      )}
      {!isFetching && (
        <Main>
          <Form onSubmit={(e) => handleSubmit(e)} className="register">
            <h1>Create an Account</h1>

            <Input
              required
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => handleChange(e)}
            />
            <Input
              required
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <Input
              required
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <Input
              required
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <Input
              required
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirm"
              onChange={(e) => handleChange(e)}
            />
            <Button type="submit">Register</Button>
            <span>
              <Link to={"/login"}>Already have an Account? Login</Link>
            </span>
          </Form>
        </Main>
      )}
    </>
  );
};

export default Register;
