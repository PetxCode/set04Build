import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("/log.png");
  const [avatar, setAvatar] = useState("");

  const registerModel = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirm: yup.string().oneOf([yup.ref("password"), null])
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

  const onSubmit = handleSubmit(async (data) => {
    const url = "http://localhost:3390/api/voter/register";
    console.log(data);
    const { name, email, password } = data;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    await axios.post(url, formData, config);

    navigate("/signin");
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

            <LabelForm onSubmit={onSubmit} type="multipart/form-data">
              <Input placeholder="Enter your Name" {...register("name")} />
              <Label>{errors.password && <p>Please enter your Name.</p>}</Label>
              <Input placeholder="Enter your Email" {...register("email")} />
              <Label>
                {errors.password && <p>Please enter your Email.</p>}
              </Label>
              <Input
                placeholder="Enter your Password"
                {...register("password")}
              />
              <Label>
                {errors.password && <p>Please enter your Password.</p>}
              </Label>
              <Input
                placeholder="Enter your Confirm"
                {...register("confirm")}
              />
              <Label>
                {errors.password && <p>your confirmed Password is wrong.</p>}
              </Label>

              <Button type="submit">Register</Button>
            </LabelForm>
            <Space />
            <div>
              Already have an Account,{" "}
              <Linked to="/signin">Sign in Here</Linked>
            </div>
          </Card>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Register;

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
  padding: 15px 40px;
  transform: scale(0.97);
  transition: all 350ms;
  border-radius: 3px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 20px 0;
  font-family: Poppins;
  outline: none;
  border: 1px solid lightgray;
  color: #004080;

  :hover {
    transform: scale(1);
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    color: white;
    background-color: #004080;
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
  min-height: 700px;
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
