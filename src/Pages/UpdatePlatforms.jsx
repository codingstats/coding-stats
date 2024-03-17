import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import styled from "styled-components";
import gfgLogo from "../assets/gfg.png";
import leetcodeLogo from "../assets/leetcode.png";
import codeforcesLogo from "../assets/codeforces.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setPlatform } from "../redux/apiCalls/profileApiCalls";

const FormContainer = styled.div`
  //height: 80%;
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  .error {
    color: red;
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
`;

const Button = styled.button`
  outline: none;
  padding: 10px 20px;
  border-radius: 5px;
  background: ${(props) => props.theme.accent};
  border: none;
  //color: ${(props) => props.theme.text};
  color: white;
  font-size: 1rem;
  margin: 10px;

  @media (max-width: 730px) {
  }

  @media (max-width: 660px) {
    width: 600px;
  }

  @media (max-width: 380px) {
    font-size: 25px;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;

  background-color: ${(props) => props.theme.backgroundColor};
  padding: 20px;
  border-radius: 5px;
  margin: 10px;

  img {
    height: 80px;
    margin-right: 50px;
  }
`;

const Input = styled.input`
  width: 400px;
  padding: 8px 30px;
  border: solid 2px ${(props) => props.theme.text};
  border-radius: 3px;
  //background: none;
  color: black;
  //box-shadow: 1px 1px 4px ${(props) => props.theme.text};
  font-size: 1.2rem;

  &::placeholder {
    color: #5f5f5f;
    font-size: 1rem;
  }

  @media (max-width: 380px) {
    font-size: 30px;
  }
`;

const UpdatePlatforms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state) => state?.user?.currentUser?.data?.user?.username
  );
  const platformList = useSelector((state) => state?.profile?.platforms);

  const [platformData, setPlatformData] = useState({});

  const handleChange = (name, value) => {
    setPlatformData({ ...platformData, [name]: value });
  };

  const handleNext = () => {
    navigate(`/profile/${currentUser}`);
  };

  const getPlaceholder = (name) => {
    return platformList.filter((platfrom) => platfrom.platformName === name)[0]
      ?.handler;
  };

  return (
    <>
      <NavBar />
      <Main>
        <h1>Select Platforms</h1>
        <FormContainer action="" className="login">
          <Label>
            <img src={gfgLogo} alt="" />
            <Input
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="text"
              required
              name="GFG"
              placeholder={
                getPlaceholder("GFG")
                  ? `${getPlaceholder("GFG")}`
                  : "Enter your GFG Username"
              }
            />
            <Button
              onClick={() => {
                setPlatform(
                  dispatch,
                  {
                    platformName: "GFG",
                    platformHandler: platformData["GFG"],
                  },
                  currentUser
                );
              }}
            >
              Submit
            </Button>
          </Label>

          <Label>
            <img src={leetcodeLogo} alt="" />
            <Input
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="text"
              required
              name="LEETCODE"
              placeholder={
                getPlaceholder("LEETCODE")
                  ? `${getPlaceholder("LEETCODE")}`
                  : "Enter your LEETCODE Username"
              }
            />
            <Button
              onClick={() => {
                setPlatform(
                  dispatch,
                  {
                    platformName: "LEETCODE",
                    platformHandler: platformData["LEETCODE"],
                  },
                  currentUser
                );
              }}
            >
              Submit
            </Button>
          </Label>

          <Label>
            <img src={codeforcesLogo} alt="" />
            <Input
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="text"
              required
              name="CODEFORCES"
              placeholder={
                getPlaceholder("CODEFORCES")
                  ? `${getPlaceholder("CODEFORCES")}`
                  : "Enter your CODEFORCES Username"
              }
            />
            <Button
              onClick={() => {
                setPlatform(
                  dispatch,
                  {
                    platformName: "CODEFORCES",
                    platformHandler: platformData["CODEFORCES"],
                  },
                  currentUser
                );
              }}
            >
              Submit
            </Button>
          </Label>
          <Button onClick={() => handleNext()}>Go to Profile</Button>
        </FormContainer>
      </Main>
    </>
  );
};

export default UpdatePlatforms;
