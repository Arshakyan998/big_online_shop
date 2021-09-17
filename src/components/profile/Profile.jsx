import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import s from "./profile.module.scss";
import MyButton from "../../myButton/MyButton";
import NewProduct from "./addNewProdunct/NewProduct";

function Profile() {
  const params = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.users.users[params.id]);
  const { img, name, lastName, products } = user;
  const [showModal, setShowModal] = React.useState(false);

  const showAddModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className={s.main}>
      <div className={s.main_img}>
        <img src={img} alt={name} width="50px" height="50px" />
      </div>
      <div className={s.main_name_lastName}>
        <h1>
          {name} {lastName}
        </h1>
      </div>
      <MyButton onClick={showAddModal}> Добавить новый продукт </MyButton>
      <div>
        {showModal ? <NewProduct setShowModal={setShowModal} /> : ""}

        <MyButton onClick={() => history.push(`/products/${params.id}`)}>
          Список добавленных продуктов <span>{products.length} </span>{" "}
        </MyButton>
      </div>
    </div>
  );
}

export default Profile;
