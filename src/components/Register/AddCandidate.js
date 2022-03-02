import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const AddCandidate = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [image, setImage] = useState("/log.png");
  const [avatar, setAvatar] = useState("");
  const [position, setPosition] = useState("President");

  const registerModel = yup.object().shape({
    name: yup.string().required()
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerModel)
  });

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);
    setAvatar(file);
  };

  const onSubmitPresident = handleSubmit(async (data) => {
    const url = "http://localhost:3390/api/president/candidate/create";
    console.log(data);
    const { name } = data;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("avatar", avatar);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: `CodeLab ${currentUser.token}`
      }
    };

    await axios.post(url, formData, config);

    navigate("/");
  });

  const onSubmitVicePresident = handleSubmit(async (data) => {
    const url = "http://localhost:3390/api/vicePresident/candidate/create";
    console.log(data);
    const { name } = data;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("avatar", avatar);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: `CodeLab ${currentUser.token}`
      }
    };

    await axios.post(url, formData, config);

    navigate("/");
  });

  const onSubmitpublicity = handleSubmit(async (data) => {
    const url = "http://localhost:3390/api/publicity/candidate/create";
    console.log(data);
    const { name } = data;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("avatar", avatar);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: `CodeLab ${currentUser.token}`
      }
    };
    await axios.post(url, formData, config);

    navigate("/");
  });

  const onSubmitWelfare = handleSubmit(async (data) => {
    const url = "http://localhost:3390/api/welfare/candidate/create";
    console.log(data);
    const { name } = data;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("avatar", avatar);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: `CodeLab ${currentUser.token}`
      }
    };

    await axios.post(url, formData, config);

    navigate("/");
  });

  const onSubmitTreasurer = handleSubmit(async (data) => {
    const url = "http://localhost:3390/api/treasurer/candidate/create";
    console.log(data);
    const { name } = data;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("avatar", avatar);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: `CodeLab ${currentUser.token}`
      }
    };

    await axios.post(url, formData, config);

    navigate("/");
  });

  return (
    <div>
      <Container>
        <Wrapper>
          <Card>
            <Image src={image} />

            <LebalHolder>
              <ImageLabel htmlFor="pix">Upload your Avatar</ImageLabel>
              <InputImage id="pix" type="file" onChange={handleChange} />
            </LebalHolder>
            <Space />
            <Select
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
            >
              <Option value="President">President</Option>
              <Option value="VP/Secretary">VP/Secretary</Option>
              <Option value="Fin Sec/Welfare">Fin Sec/Welfare</Option>
              <Option value="Program Coordinator/Publicity">
                Program Coordinator/Publicity
              </Option>{" "}
              <Option value="Treasurer/Chief Whip">Treasurer/Chief Whip</Option>
            </Select>

            {position === "President" ? (
              <LabelForm
                onSubmit={onSubmitPresident}
                type="multipart/form-data"
              >
                <Input placeholder="Enter your Name" {...register("name")} />
                <Label>
                  {errors.password && <p>Please enter your Name.</p>}
                </Label>

                <Button type="submit">Creating {position}</Button>
              </LabelForm>
            ) : position === "VP/Secretary" ? (
              <LabelForm
                onSubmit={onSubmitVicePresident}
                type="multipart/form-data"
              >
                <Input placeholder="Enter your Name" {...register("name")} />
                <Label>
                  {errors.password && <p>Please enter your Name.</p>}
                </Label>

                <Button type="submit">Creating {position}</Button>
              </LabelForm>
            ) : position === "Fin Sec/Welfare" ? (
              <LabelForm onSubmit={onSubmitWelfare} type="multipart/form-data">
                <Input placeholder="Enter your Name" {...register("name")} />
                <Label>
                  {errors.password && <p>Please enter your Name.</p>}
                </Label>

                <Button type="submit">Creating {position}</Button>
              </LabelForm>
            ) : position === "Program Coordinator/Publicity" ? (
              <LabelForm
                onSubmit={onSubmitpublicity}
                type="multipart/form-data"
              >
                <Input placeholder="Enter your Name" {...register("name")} />
                <Label>
                  {errors.password && <p>Please enter your Name.</p>}
                </Label>

                <Button type="submit">Creating {position}</Button>
              </LabelForm>
            ) : position === "Treasurer/Chief Whip" ? (
              <LabelForm
                onSubmit={onSubmitTreasurer}
                type="multipart/form-data"
              >
                <Input placeholder="Enter your Name" {...register("name")} />
                <Label>
                  {errors.password && <p>Please enter your Name.</p>}
                </Label>

                <Button type="submit">Creating {position}</Button>
              </LabelForm>
            ) : null}

            <Space />
          </Card>
        </Wrapper>
      </Container>
    </div>
  );
};

export default AddCandidate;

const Option = styled.option`
  margin: 10px 0;
`;
const Select = styled.select`
  font-weight: 500;
  font-family: Poppins;
  margin-top: 20px;
  height: 45px;
  padding-left: 10px;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 3px;
  width: 315px;
`;

const Linked = styled(Link)`
  text-decoration: none;
  color: red;
  font-weight: bold;
`;
const Label = styled.label`
  color: red;
  font-size: 13px;
`;

const Button = styled.button`
  padding: 15px 25px;
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
  background-color: #004080;

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
  margin-top: 30px;
`;
const Input = styled.input`
  width: 300px;
  height: 40px;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding-left: 10px;
  margin-top: 20px;

  ::placeholder {
    font-family: Poppins;
  }
`;

const InputImage = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  padding: 15px 40px;
  transform: scale(1);
  transition: all 350ms;
  border-radius: 3px;
  overflow: hidden;
  background-color: #004080;
  color: white;
  margin: 0 10px;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }
`;

const LabelForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LebalHolder = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 30px;
  background-color: orange;
  border: 1px solid lightgray;
`;

const Card = styled.div`
  width: 500px;
  height: 100%;
  min-height: 500px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  padding-bottom: 30px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: calc(100vh - 80px);
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
`;
