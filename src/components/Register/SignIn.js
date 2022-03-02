import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SignIn = () => {
  const navigate = useNavigate();
  const registerModel = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerModel)
  });

  const onSubmit = handleSubmit(async (data) => {
    const url = "http://localhost:3390/api/voter/signin";
    console.log(data);
    const { email, password } = data;

    const res = await axios.post(url, { email, password });

    localStorage.setItem("voters", JSON.stringify(res.data.data));

    navigate("/");
    window.location.reload();
  });

  return (
    <div>
      <Container>
        <Wrapper>
          <Card>
            <LabelForm onSubmit={onSubmit}>
              <Input placeholder="Enter your Email" {...register("email")} />
              <Label>{errors.email && <p>Please enter your Email.</p>}</Label>
              <Input
                placeholder="Enter your Password"
                {...register("password")}
              />
              <Label>
                {errors.password && <p>Please enter your Password.</p>}
              </Label>

              <Button type="submit">Sign In</Button>
            </LabelForm>

            <div>
              Don't have an Account,{" "}
              <Linked to="/register">Register Here</Linked>
            </div>
          </Card>
        </Wrapper>
      </Container>
    </div>
  );
};

export default SignIn;

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

const Input = styled.input`
  width: 300px;
  height: 40px;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding-left: 10px;
  margin-top: 10px;
  margin-bottom: 0px;

  ::placeholder {
    font-family: Poppins;
  }
`;

const LabelForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  width: 500px;
  min-height: 300px;
  height: 100%;
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
