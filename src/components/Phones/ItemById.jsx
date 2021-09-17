import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import s from "./item.module.scss";
import MyButton from "../../myButton/MyButton";
import { commentsForItem as itemComments } from "../../redux/actions/getItems";
import { addToCart } from "../../redux/actions/users";
import {addNewComment} from "../../redux/actions/users";
function ItemById() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [currentCommnets, setCurrentCommnets] = React.useState("");

  const { items } = useSelector((state) => state.getItems);

  const { online, currentUser, users } = useSelector((state) => state.users);
  const user = currentUser && users[currentUser.id];
  const date = new Date();

  const year = date.getFullYear();
  const hourse = date.getHours();
  const currentDay = date.getDate();
  const month = date.getMonth();
  const minute = date.getMinutes();

  const currentItem = React.useMemo(() => {
    return items.find((e) => e.id === params.id);
  }, [items]);

  const result = {
    item: { ...currentItem },
  };

  const commentsForItem = (e) => {
    setCurrentCommnets((prev) => e.target.value);
  };

  const leaveComment = () => {
    const time = {
      year,
      hourse,
      currentDay,
      month,
      minute,
    };
    const result = {
      id: Date.now(),
      userName: user.name,
      lastName: user.lastName,
      img: user.img,
      text: currentCommnets,
      productId: params.id,
      time,
    };
    if (currentCommnets !== "") {
      dispatch(itemComments(result));
      dispatch(addNewComment({...result,userId:user.id}))
    }
    setCurrentCommnets((prev) => "");
  };

  const keyPressHendler = (e) => {
    if (e.key === "Enter") {
      leaveComment();
    }
  };

  const { item } = result;
  const {
    image,
    name,
    price,
    comments,
    camera,
    battery,
    cpu,
    display,
    memory,
    size,
    weight,
    description,
  } = item;

  const addNewItemInCart = () => {
    const item = {
      image,
      name,
      price,
      id: params.id,
      description,
    };
    dispatch(addToCart(item));
  };

  return (
    <div className={s.block}>
      {currentItem ? (
        <div className={s.main}>
          <div className={s.main_img}>
            <img src={image} alt={name} />
          </div>
          <div className={s.main_params}>
            <h1>{name}</h1>
            {camera && <h3> camera -- {camera}</h3>}
            {battery && <h3>battery--{battery}</h3>}
            {cpu && <h3>cpu--{cpu}</h3>}
            {display && <h3>display--{display}</h3>}
            {memory && <h3>memory--{memory}</h3>}
            {size && <h3>size--{size}</h3>}
            {weight && <h3>weight--{weight}</h3>}
          </div>
          <div>
            <h1 style={{ padding: "5px" }}>{price}$</h1>
            <div>
              <MyButton onClick={() => history.push("/")}>
                {" "}
                Вернутся назад
              </MyButton>{" "}
              {online && (
                <div style={{ marginTop: "15px" }}>
                  <MyButton onClick={addNewItemInCart}>Добавить</MyButton>
                </div>
              )}
            </div>
          </div>
          <div className={s.main_cartadd}></div>
        </div>
      ) : (
        <div>
          <h1>404</h1>
          <MyButton onClick={() => history.push("/")}>
            {" "}
            Вернутся назад
          </MyButton>{" "}
        </div>
      )}
      <div className={s.description}>
        {description && (
          <div>
            {" "}
            <h1>Описание</h1>
            <h2>{description}</h2>
          </div>
        )}
      </div>

      {online ? (
        <>
          <div style={{ marginTop: "55px" }}>
            <h1>Теущий пользователь</h1>
            <h4>{user.name + " " + user.lastName} </h4>
          </div>
          <input
            type="text"
            placeholder="Оставить коментарий"
            value={currentCommnets}
            className={s.block_comments}
            onChange={commentsForItem}
            onKeyPress={keyPressHendler}
          />
          <MyButton onClick={leaveComment}>Оставить коммент</MyButton>
        </>
      ) : (
        <h1>Войдите чтобы оставить Коментайрий</h1>
      )}

      <div className={s.comments}>
        <h1> Коментайрий</h1>
        <hr />

        {comments && comments.length ? (
          comments.map((element) => {
            return (
              <div key={element.id}>
                <div>
                  <h2> {element.userName}:</h2>

                  <h3>{element.text}</h3>
                  <hr />
                  <span>
                    {element.time.currentDay +
                      "-" +
                      element.time.month +
                      "-" +
                      element.time.year +
                      "г." +
                      " " +
                      element.time.hourse +
                      ":" +
                      element.time.minute}{" "}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Коментайриев нету</h1>
        )}
      </div>
    </div>
  );
}

export default ItemById;
