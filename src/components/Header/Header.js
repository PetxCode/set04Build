import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../AuthProvider";

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Container>
        <Wrapper>
          <Log to="/">
            <Logo src="/log.png" />
          </Log>
          <Navigation>
            <Nav to="/">Home</Nav>
            {currentUser ? <Nav to="/vote">Vote</Nav> : null}
          </Navigation>
          <Space />
          <Navigation>
            {currentUser?.isAdmin ? (
              <Nav to="/addCandidate">Add Candidate</Nav>
            ) : null}
            {currentUser ? (
              <Nav1
                onClick={() => {
                  localStorage.removeItem("voters");
                  window.location.reload();
                }}
              >
                Log Out
              </Nav1>
            ) : (
              <Nav to="/register">Register</Nav>
            )}
          </Navigation>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Header;

const Log = styled(Link)``;
const Space = styled.div`
  flex: 1;
`;

const Nav = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 15px 40px;
  transform: scale(1);
  transition: all 350ms;
  border-radius: 3px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0 10px;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
    background-color: rgba(255, 255, 255, 1);
    color: #004080;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }
`;

const Nav1 = styled.div`
  padding: 15px 40px;
  transform: scale(1);
  transition: all 350ms;
  border-radius: 3px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0 10px;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
    background-color: rgba(255, 255, 255, 1);
    color: #004080;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }
`;

const Navigation = styled.div`
  display: flex;
`;

const Logo = styled.img`
  width: 120px;
  height: 60px;
  margin: 0 20px;
  object-fit: cover;
  transform: scale(1);
  transition: all 350ms;
  border-radius: 5px;
  overflow: hidden;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: #004080;
  color: white;
`;
