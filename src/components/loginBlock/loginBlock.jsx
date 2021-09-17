import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MyButton from "../../myButton/MyButton";
import MyInput from "../../myInput/MyInput";

import { showModal, validateDate } from "../../redux/actions/users";

import "./style.scss";

const LoginBlock = ({ isAuth }) => {
  const [logDate, setLogDate] = React.useState({
    login: "admin",
    password: "admin",
  });

  const [valid, setValid] = React.useState(true);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(showModal(false));
  };


  const userDate = (e, name) => {
    switch (name) {
      case "login":
        let loginDate = e.target.value
          .toLowerCase()
          .replace(/\s/g, "")
          .toString();

        setLogDate((prev) => ({ ...prev, login: loginDate }));
        break;

      case "password": {
        let passwordDate = e.target.value
          .toLowerCase()
          .replace(/\s/g, "")
          .toString();
        setLogDate((prev) => ({ ...prev, password: passwordDate }));
        break;
      }
    }
  };

  const validate = (e) => {
    e.preventDefault();
    dispatch(validateDate(logDate));
    setLogDate({
      login: "",
      password: "",
    });
    setValid(isAuth);
  };

  return (
    <div className="main" onClick={closeModal}>
      <div className="main_block" onClick={(e) => e.stopPropagation()}>
        <form>
          <MyInput
            placeholder="Login"
            onChange={(e) => userDate(e, "login")}
            value={logDate.login}
          />
          <MyInput
            placeholder="Password"
            onChange={(e) => userDate(e, "password")}
            value={logDate.password}
            type="password"
            

          />
          {!valid && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              Пароль или логин не верен
            </p>
          )}
          <MyButton onClick={validate}>Вход</MyButton>
            <Link to='/Registration' onClick={()=>dispatch(showModal(false))}>Регестрация</Link> 
        </form>
      </div>
    </div>
  );
};

export default LoginBlock;
