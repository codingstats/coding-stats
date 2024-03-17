import { useState } from "react";
import Loader from "../../Components/Loader";
import Main from "../../Components/Main";
import NavBar from "../../Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updatePassword } from "../../redux/apiCalls/apiCalls";
import { logOut } from "../../redux/userSlice";
import { clearProfile } from "../../redux/profileSlice";
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  overflow: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  h1 {
    font-family: "Expletus Sans", sans-serif;
    font-size: 60px;
    color: ${(props) => props.theme.accent};
    margin-bottom: 40px;

    @media (max-width: 800px) {
      font-size: 45px;
    }
    @media (max-width: 430px) {
      font-size: 30px;
    }
  }

  span {
    margin: 10px;
    color: red;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 20px 30px;
  border-radius: 30px;
  font-size: 20px;
  margin: 15px;
  background-color: #decdc3;
  color: rgba(45, 64, 89, 1);
  outline: none;

  @media (max-width: 800px) {
    padding: 10px 20px;
  }
`;
const Button = styled.button`
  margin: 20px;
  padding: 20px 40px;
  background-color: ${(props) => props.theme.accent};
  border-radius: 40px;
  font-size: 20px;
  font-family: "Expletus Sans", sans-serif;
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 430px) {
    padding: 10px 40px;
  }
`;

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.user.isFetching);
  const errorMsg = useSelector((state) => state.user.errorMsg);
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      await updatePassword(dispatch, {
        password: oldPassword,
        newPassword: password,
        passwordConfirm: confirmPassword,
      });
      console.log("first", error);
      if (!error) {
        navigate("/profile");
        dispatch(logOut());
        dispatch(clearProfile());
      }
      if (error) {
        alert(errorMsg);
      }
    } else {
      setOldPassword("");
    }
  };

  return (
    <>
      <NavBar />
      <Main>
        {isFetching && <Loader />}
        {!isFetching && (
          <Form action="" onSubmit={(e) => handleSubmit(e)}>
            <h1>Change Password</h1>
            <Input
              type="password"
              value={oldPassword}
              required
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
            />
            <Input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <Input
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />

            {error && <span>{errorMsg}</span>}
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Main>
    </>
  );
};

export default ChangePassword;
