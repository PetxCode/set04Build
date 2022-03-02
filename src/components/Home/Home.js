import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [presidential, setPresidential] = useState([]);
  const [secretary, setSecretary] = useState([]);
  const [welfare, setWelfare] = useState([]);
  const [publicity, setPublicity] = useState([]);
  const [treasurer, setTreasurer] = useState([]);

  const getPresidential = async () => {
    const url = "http://localhost:3390/api/president/candidate";
    const res = await axios.get(url);
    if (res) {
      setPresidential(res.data.data);
    }
  };

  const getSecretary = async () => {
    const url = "http://localhost:3390/api/vicePresident/candidate";
    const res = await axios.get(url);
    if (res) {
      setSecretary(res.data.data);
    }
  };

  const getWelfare = async () => {
    const url = "http://localhost:3390/api/welfare/candidate";
    const res = await axios.get(url);
    if (res) {
      setWelfare(res.data.data);
    }
  };

  const getPublicity = async () => {
    const url = "http://localhost:3390/api/publicity/candidate";
    const res = await axios.get(url);
    if (res) {
      setPublicity(res.data.data);
    }
  };

  const getTreasurer = async () => {
    const url = "http://localhost:3390/api/treasurer/candidate";
    const res = await axios.get(url);
    if (res) {
      setTreasurer(res.data.data);
    }
  };

  useEffect(() => {
    getPresidential();
    getSecretary();
    getWelfare();
    getPublicity();
    getTreasurer();
  }, []);

  return (
    <div>
      <Container>
        <Wrapper>
          <Holder>
            <Position>Presidential Candidates</Position>
            <Card>
              {presidential?.map((props) => (
                <Hold key={props._id}>
                  <Image src={props.avatar} />
                  <Name>{props.name}</Name>
                  <Count>{props.voteCount.length}</Count>
                </Hold>
              ))}
            </Card>
          </Holder>
          <Space />
          <Holder>
            <Position>VP/Secretary Candidates</Position>
            <Card>
              {secretary?.map((props) => (
                <Hold key={props._id}>
                  <Image src={props.avatar} />
                  <Name>{props.name}</Name>
                  <Count>{props.voteCount.length}</Count>
                </Hold>
              ))}
            </Card>
          </Holder>
          <Space />

          <Holder>
            <Position>Fin Sec/Welfare Candidates</Position>
            <Card>
              {welfare?.map((props) => (
                <Hold key={props._id}>
                  <Image src={props.avatar} />
                  <Name>{props.name}</Name>
                  <Count>{props.voteCount.length}</Count>
                </Hold>
              ))}
            </Card>
          </Holder>
          <Space />

          <Holder>
            <Position>Program Coordinator/Publicity Candidates</Position>
            <Card>
              {publicity?.map((props) => (
                <Hold key={props._id}>
                  <Image src={props.avatar} />
                  <Name>{props.name}</Name>
                  <Count>{props.voteCount.length}</Count>
                </Hold>
              ))}
            </Card>
          </Holder>
          <Space />

          <Holder>
            <Position>Treasurer/Chief Whip Candidates</Position>
            <Card>
              {treasurer?.map((props) => (
                <Hold key={props._id}>
                  <Image src={props.avatar} />
                  <Name>{props.name}</Name>
                  <Count>{props.voteCount.length}</Count>
                </Hold>
              ))}
            </Card>
          </Holder>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Home;

const Space = styled.div`
  margin-top: 100px;
`;
const Count = styled.div``;

const Name = styled.div`
  margin: 30px 0;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
`;

const Image = styled.img`
  margin-top: -30px;
  background-color: orange;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const Hold = styled.div`
  margin: 20px;
  width: 300px;
  height: 200px;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Position = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Card = styled.div`
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Holder = styled.div`
  padding-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  padding-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
  background-color: lightgrey;
`;
