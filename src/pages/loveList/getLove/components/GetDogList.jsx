import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await axios.get(`http://localhost:3001/userList`);
    // setData((prevData) => [...prevData, ...res.data]);
    setData(res.data);
    console.log(data);
    setLoading(false);
    setHasMore(res.data.length !== 0);
    if (res.data.length !== 0) {
      setPage((num) => num + 1);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    fetchData();
  }, [loading, fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const remainingData = data.slice(0, page * 4);

  return (
    <>
      <Container>
        <StOnePage>
          {remainingData.map((why, id) => {
            if (id % 2 === 0) {
              const group = remainingData.slice(id, id + 2);
              return (
                <OneDog key={id}>
                  {group.map(({ url, name }) => (
                    <StDog style={{ backgroundImage: `url(${url})` }} key={name}>
                      <StName>{name}</StName>
                    </StDog>
                  ))}
                </OneDog>
              );
            }
            return null;
          })}
          {loading && <div>Loading...</div>}
          {!loading && !hasMore && <div>더이상 가져올 데이터가 없습니다 ㅠㅠ</div>}
          <div ref={observer} />
        </StOnePage>
      </Container>
    </>
  );
};

export default InfiniteScroll;

const Container = styled.div`
  margin-top: 5vh;
`;

const StOnePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StDog = styled.div`
  position: relative;
  width: 400px;
  padding: 10px;
  margin: 10px 10px 10px 10px;
  max-width: 45vw;
  height: 45vh;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const StName = styled.h3`
  position: absolute;
  font-size: medium;
  bottom: 30px;
  color: beige;
`;

const OneDog = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 50%;
`;
