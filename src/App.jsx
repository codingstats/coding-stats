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

const Body = styled.div`
  background: ${(props) => props.theme.text};
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

function App() {
  const [themeDark, setThemeDark] = useState(true);

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
      path: "/:id",
      element: <Individual themeDark={themeDark} setThemeDark={setThemeDark} />,
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
