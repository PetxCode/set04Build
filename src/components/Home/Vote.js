import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../AuthProvider";

const Vote = () => {
  const { currentUser } = useContext(AuthContext);

  const [myData, setMyData] = useState([{}]);
  const [presidential, setPresidential] = useState([]);
  const [secretary, setSecretary] = useState([]);
  const [welfare, setWelfare] = useState([]);
  const [publicity, setPublicity] = useState([]);
  const [treasurer, setTreasurer] = useState([]);

  // const getPresidential = async () => {
  //   const url = "http://localhost:3390/api/president/candidate";
  //   const res = await axios.get(url);
  //   if (res) {
  //     // setPresidential(res.data.data);
  //     return typeof presidential;
  //   }
  // };

  const gettingPresidential = async () => {
    const url = "http://localhost:3390/api/president/candidate";
    return await fetch(url)
      .then((res) => JSON.stringify(res))
      .then((res) => {
        // setPresidential(res.data);
      });
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
      return setTreasurer(res.data.data);
    }
  };

  const castVote = async (id) => {
    const url = "http://localhost:3390/api/president/candidate";

    const vote = {
      who: currentUser.token
    };

    await axios.post(`${url}/${id}`, vote);
  };

  const deCastVote = async (id, voteID) => {
    const url = "http://localhost:3390/api/president/candidate";

    await axios.delete(`${url}/${id}/${voteID}`);
  };

  useEffect(() => {
    // getPresidential();
    gettingPresidential();
    getSecretary();
    getWelfare();
    getPublicity();
    getTreasurer();
    console.log("findings typeOf myData: ", typeof myData);
    console.log("findings: ", myData);
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

                  {/* <Button
                    bg
                    onClick={() => {
                      castVote(props._id);
                    }}
                  >
                    Vote
                  </Button> */}

                  {/* {props.voteCount?.map((voteProps) => (
                    <Button
                      onClick={() => {
                        deCastVote(props._id, voteProps._id);
                      }}
                    >
                      Unvote
                    </Button>
                  ))}  */}
                  {props.voteCount.length === 0 ? (
                    <div>
                      <Button
                        bg
                        onClick={() => {
                          castVote(props._id);
                        }}
                      >
                        Vote
                      </Button>
                    </div>
                  ) : (
                    <div>
                      {props.voteCount?.map((voteProps, i) => (
                        <div>
                          {voteProps.who === currentUser.token ? (
                            <Button
                              onClick={() => {
                                deCastVote(props._id, voteProps._id);
                              }}
                            >
                              Unvote
                            </Button>
                          ) : (
                            <div>
                              <div></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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

export default Vote;

const Button = styled.div`
  padding: 15px 45px;
  transform: scale(0.97);
  transition: all 350ms;
  border-radius: 3px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 20px 0;
  font-family: Poppins;
  outline: none;
  border: 1px solid lightgray;
  color: white;
  background-color: ${({ bg }) => (bg ? "#004080" : "red")};

  font-weight: 500;

  :hover {
    transform: scale(1);
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    color: white;

    border: 1px solid lightgray;
    border-radius: 5px;
    overflow: hidden;
  }
`;

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
  min-height: 200px;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
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
  /* min-height: 500px;
  height: 100%; */
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
