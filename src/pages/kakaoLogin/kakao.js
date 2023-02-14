import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __kakaoLogin } from "../../redux/modules/kakaoSlice";

const Kakao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //로그인 체크 전역변수 불러오기
  const loginCheck = useSelector((state) => state.kakaoList.isLogin);
  console.log(loginCheck);

  //현재 url의 파라미터를 가져옴
  let params = new URL(window.location.href).searchParams;
  console.log(params);
  //params에 저장된 파라미터 안에서 'code'의 값을 가져옴
  let code = params.get("code");
  console.log(code);

  /*   useEffect(() => {
    //백엔드로 쿠키 토큰 전송
    dispatch(__kakaoLogin(params));
  }, []); */
  dispatch(
    __kakaoLogin({
      code,
    })
  );

  useEffect(() => {
    loginCheck && navigate("/dogSignUp");
  }, [loginCheck, navigate]);

  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default Kakao;
