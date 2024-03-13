import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*::before, *::after, h1, h2, h3, h4, h5, h6{
 margin: 0;
 padding: 0;
}
h1,h2, h3, h4, h5, h6{
 display: inline-block;
}

*::-webkit-scrollbar {
  width: 0px;
}
 *{
  box-sizing:border-box;
 }

 * a{
  text-decoration:none;
 }

button { user-select: none; }

body{
 margin: 0;
 padding: 0;
 height: 100vh;
 width: 100vw;
 box-sizing:border-box;
 overflow-x: hidden;
 font-family: 'Source Sans Pro', sans-serif;
 -webkit-tap-highlight-color: rgba(0,0,0,0);

}`;

export default GlobalStyle;
