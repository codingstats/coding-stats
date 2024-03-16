import { useState } from "react";
import { useNavigate } from "react-router";
import { deleteUser } from "../../redux/apiCalls/apiCalls";
import styled from "styled-components";
import NavBar from "../../Components/NavBar";
import Main from "../../Components/Main";
import { useDispatch } from "react-redux";

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
      font-size: 38px;
      font-weight: lighter;
      margin: 0;
    }
  }
  span {
    margin: 10px;
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
    margin-top: -0px;
  }
`;

const DeleteAccount = ({ themeDark, setThemeDark }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(dispatch, password);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBar themeDark={themeDark} setThemeDark={setThemeDark} />
      <Main>
        <Form action="" onSubmit={(e) => handleSubmit(e)}>
          <h1>Delete Account</h1>

          <Input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <Button type="submit">Delete Account</Button>
        </Form>
      </Main>
    </>
  );
};

export default DeleteAccount;
