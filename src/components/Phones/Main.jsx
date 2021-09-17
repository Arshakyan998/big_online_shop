import React from "react";
import { useSelector } from "react-redux";
import SideBar from "../header/sideBar";

import Items from "./Items";
import style from "./main.module.scss";
import s from "../header/header.module.scss";

import sideBar from "../../assets/bars-solid.svg";
import closeSideBarImg from "../../assets/times-solid.svg";
import Slider from "./Slider";

function Main() {
  const sideBarRef = React.useRef(null);
  const [showSideBar, setShowSideBar] = React.useState(false);

  const { isLoading, items, error } = useSelector((state) => state.getItems);

  const { online, users, currentUser } = useSelector((state) => state.users);

  const current = currentUser && users[currentUser.id];

  const handleSideBar = () => {
    setShowSideBar((prev) => !prev);
  };

  const closeSideBar = (e) => {
    if (!e.path.includes(sideBarRef.current)) {
      setShowSideBar((prev) => false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener("click", closeSideBar);

    return () => document.body.removeEventListener("click", closeSideBar);
  }, []);

  return (
    <div className={style.main}>
     {!isLoading &&<Slider/>}
      <div
        className={
          showSideBar ? `${s.main_sidebar} ${s.active}` : s.main_sidebar
        }
        ref={sideBarRef}
      >
        <div className={s.main_sidebar_open_block} onClick={handleSideBar}>
          <img
            src={showSideBar ? closeSideBarImg : sideBar}
            alt=""
            width="100%"
            height="100%"
          />
        </div>
        <SideBar />
      </div>
      <div className={style.main_items}>
        {error ?<h2>{error}</h2>:
        <>

        {items.length ? (
          items.map((element) => (
            <Items
              key={element.id}
              {...element}
              online={online}
              currentUser={current}
            />
          ))
        ) : (

          <>
          {!isLoading &&
          <h1>Такой товар не найден</h1>
          }
          </>
        )}
     </>}

      </div>

      {isLoading && <div className={style.loader} />}
    </div>
  );
}

export default Main;
