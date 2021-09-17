import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MyButton from "../../myButton/MyButton";
import s from "./cart.module.scss";
import {
  addNewItem,
  minusItem,
  removeItem,
  removeCart,
} from "../../redux/actions/users";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser, users } = useSelector((state) => state.users);

  const products = Object.values(users[currentUser.id].cart).map(
    (element) => element.item[0]
  );


  const itemCount = users[currentUser.id].cart;

  const addNewItemToCart = (id) => {
    dispatch(addNewItem(id));
  };

  const takeOffItems = (id) => {
    dispatch(minusItem(id));
  };

  const deleteItem = (id) => {
    dispatch(removeItem(id));
  };

  const clearCart = () => {
    dispatch(removeCart());
  };

  return (
    <div>
      <MyButton onClick={() => history.push("/")}>Вернутся назад</MyButton>

      <div>
        {products.length ? (
          <div onClick={clearCart}>
            <h2> Оистить карзину </h2>
          </div>
        ) : (
          ""
        )}

        {products.length ? (
          products.map((element) => {
            return (
              <div key={element.id} className={s.main}>
                <div className={s.main_img}>
                  <img src={element.image} alt="" width="80px" height="80px" />
                </div>
                <div className={s.main_name}>
                  <h2>{element.name}</h2>
                </div>
                <div className={s.main_price}>
                  <h1>{itemCount[element.id].itemPrice} $</h1>
                </div>
                <div className={s.main_add_minus}>
                  <button onClick={() => addNewItemToCart(element.id)}>
                    +
                  </button>
                  {itemCount[element.id].itemCount}
                  <button onClick={() => takeOffItems(element.id)}>-</button>
                </div>
                <div>
                  <button onClick={() => deleteItem(element.id)}>X</button>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h1>Ваша карта пуста</h1>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
