/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styled from "styled-components";
import profile from "../assets/image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudMoon, faCloudSun } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  position: absolute;
  top: 40px;
  left: 50vw;
  background-color: ${(props) => props.theme.accent};
  height: 80px;
  width: calc(100vw + 40px);
  transform: rotate(-2deg) translateX(-50%);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Navs = styled.div`
  padding-left: 100px;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 100px;
`;
const Theme = styled.div`
  height: 60px;
  width: 60px;
  margin-right: 60px;
  border-radius: 50%;
  box-shadow: inset 1px 1px 5px #414141;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.25s ease-in-out;
  &:active {
    transform: rotate(${(props) => (props.theme.dark ? "-20deg" : "20deg")});
  }
  &:hover {
    svg {
      transform: scale(1.2);
    }
  }

  svg {
    height: 25px;
    width: 25px;
    transition: all 0.25s ease-in-out;
  }
`;
const Profile = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100px;
    width: 100px;
    object-fit: contain;
    border-radius: 50%;
    transition: all 0.25s ease-in-out;
    &:hover {
      transform: scale(1.15);
    }
  }
`;

const NavBar = ({ themeDark, setThemeDark }) => {
  return (
    <Container>
      <Navs>
        <Link to={"/"}>Home</Link>
        <Link to={"/notifications"}>Notifications</Link>
        <Link to={"/notifications"}>Notifications</Link>
      </Navs>
      <Buttons>
        <Theme onClick={() => setThemeDark((p) => !p)}>
          <FontAwesomeIcon icon={themeDark ? faCloudMoon : faCloudSun} />
        </Theme>
        <Profile>
          <Link to={"/profile"}>
            <img src={profile} alt="profile" />
          </Link>
        </Profile>
      </Buttons>
    </Container>
  );
};

export default NavBar;
