import styled from "styled-components";

const Container = styled.div`
  background: ${(props) => props.theme.body};
  height: calc(100vh - 80px);
  width: calc(100vw - 80px);
  color: ${(props) => props.theme.text};
  overflow: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 40px;
  padding-top: 200px;
  border-radius: 30px;
`;

const Main = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default Main;
