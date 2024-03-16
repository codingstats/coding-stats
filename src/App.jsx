import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Individual from "./Pages/Individual";
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";
import GlobalStyle from "./globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./Components/Themes";
import { useState } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useSelector } from "react-redux";
import { userRequest } from "./requestMethods";
import CodingPlatforms from "./Pages/CodingPlatforms";
import UserInfo from "./Pages/UserInfo";
import DeleteAccount from "./Pages/ProfilePages/DeleteAccount";
import ChangePassword from "./Pages/ProfilePages/ChangePassword";

const Body = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  
  // background: ${(props) => props.theme.text};
  //height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

function App() {
  const [themeDark, setThemeDark] = useState(true);

  const currentUser = useSelector((state) => state?.user?.currentUser);

  userRequest.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${currentUser?.token}`;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home themeDark={themeDark} setThemeDark={setThemeDark} />,
    },
    {
      path: "/profile",
      element: <Profile themeDark={themeDark} setThemeDark={setThemeDark} />,
    },
    {
      path: "/profile/changepassword",
      element: (
        <ChangePassword themeDark={themeDark} setThemeDark={setThemeDark} />
      ),
    },
    {
      path: "/profile/deleteaccount",
      element: (
        <DeleteAccount themeDark={themeDark} setThemeDark={setThemeDark} />
      ),
    },
    {
      path: "/user/:id",
      element: <UserInfo themeDark={themeDark} setThemeDark={setThemeDark} />,
    },
    {
      path: "/notifications",
      element: (
        <Notifications themeDark={themeDark} setThemeDark={setThemeDark} />
      ),
    },
    {
      path: "/settings",
      element: <Settings themeDark={themeDark} setThemeDark={setThemeDark} />,
    },
    {
      path: "/login",
      element: <Login themeDark={themeDark} setThemeDark={setThemeDark} />,
    },
    {
      path: "/select-platforms",
      element: (
        <CodingPlatforms themeDark={themeDark} setThemeDark={setThemeDark} />
      ),
    },
    {
      path: "/register",
      element: <Register themeDark={themeDark} setThemeDark={setThemeDark} />,
    },
  ]);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeDark ? darkTheme : lightTheme}>
        <Body>
          <RouterProvider router={router} />
        </Body>
      </ThemeProvider>
    </>
  );
}

export default App;
