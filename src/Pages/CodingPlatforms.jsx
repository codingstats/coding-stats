import { useState } from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import styled from "styled-components";
import gfgLogo from "../assets/gfg.png";
import leetcodeLogo from "../assets/leetcode.png";
import codeforcesLogo from "../assets/codeforces.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getPlatforms, setPlatform } from "../redux/apiCalls/profileApiCalls";

const FormContainer = styled.div`
  height: 80%;
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

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 80px;
    margin-right: 50px;
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

const CodingPlatforms = ({ themeDark, setThemeDark }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state) => state?.user?.currentUser?.data?.user?.username
  );
  const platformList = useSelector(
    (state) => state?.profile?.user?.codingPlatforms
  );

  const [platformData, setPlatformData] = useState({});

  const handleChange = (e) => {
    setPlatformData({ ...platformData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    navigate("/profile");
  };

  return (
    <>
      <NavBar themeDark={themeDark} setThemeDark={setThemeDark} />
      <Main>
        <h1>Select Platforms</h1>
        <FormContainer action="" className="login">
          <Label>
            <img src={gfgLogo} alt="" />
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              required
              name="GFG"
              placeholder="Enter your GFG Username"
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
              onChange={(e) => handleChange(e)}
              type="text"
              required
              name="LEETCODE"
              placeholder="Enter your Leetcode Username"
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
              onChange={(e) => handleChange(e)}
              type="text"
              required
              name="CODEFORCES"
              placeholder="Enter your Codeforces Username"
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
          <Button onClick={() => handleNext()}>Next</Button>
        </FormContainer>
      </Main>
    </>
  );
};

export default CodingPlatforms;
