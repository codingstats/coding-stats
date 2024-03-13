import styled from "styled-components";

const Container = styled.div`
  background: ${(props) => props.theme.body};
  height: calc(100vh - 60px);
  width: calc(100vw - 60px);
  color: ${(props) => props.theme.text};
`;

const Main = () => {
  return (
    <>
      <Container>Main</Container>
    </>
  );
};

export default Main;
