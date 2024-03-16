import styled from "styled-components";

const Container = styled.div`
  background: ${(props) => props.theme.body};
  height: calc(100vh - 80px);
  //width: calc(100vw - 80px);
  color: ${(props) => props.theme.text};
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  //padding-top: 200px;
  border-radius: 30px;
  
  background: ${(props) => props.theme.backgroundGradient};
  //height: calc(100vh - 80px);
  //width: calc(100vw - 80px);
  width: 100%;
  max-width: 1400px;
  color: ${(props) => props.theme.text};
  //overflow: hidden;
  //overflow-y: scroll;
  box-sizing: border-box;
  padding: 40px;
  //padding-top: 200px;
  border-radius: 30px;
  button {
    margin: 20px;
    padding: 14px 0px;
    border: 1px solid #ea5455;
    border-radius: 5px;
    width: 200px;
    text-align: center;
    text-decoration: none;
    font-size: small;
    transition: all 0.25s ease;
    overflow: hidden;
    color: white;
    background-color: transparent;

    &:hover {
      letter-spacing: 1.2px;
      color: #ea5455;
      border: 1px solid #decdc3;
    }
  }
`;

const MainCenter = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default MainCenter;
