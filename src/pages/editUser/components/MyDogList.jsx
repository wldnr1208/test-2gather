import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyDogList = ({ key, person }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        key={person.id}
        onClick={() => {
          navigate(`/mydog/${person.id}`);
        }}
      >
        <StPeople style={{ backgroundImage: `url(${person.url})` }}>
          <StName>{person.name}</StName>
        </StPeople>
      </div>
    </>
  );
};

export default MyDogList;

const StPeople = styled.div`
  margin-left: 20px;
  position: relative;
  width: 100px;
  padding: 30px;
  max-width: 85vw;
  height: 18vh;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const StName = styled.h3`
  position: absolute;
  font-size: large;
  bottom: 10px;
  color: white;
`;
