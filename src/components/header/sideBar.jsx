import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MyButton from "../../myButton/MyButton";
import MyInput from "../../myInput/MyInput";
import {
  filteredByCategory,
  filteredByPrice as pirceFilter,
} from "../../redux/actions/getItems";

import s from "./header.module.scss";

function SideBar() {
  const [selectCategory, setSelectCategory] = React.useState("Все");

  const [filteredByPrice, setFilterdByPrice] = React.useState({
    min: "",
    max: "",
    closeFilter: false,
  });

  const state = useSelector((state) => state.getItems.cloneItems);

  const uniqCategorys = React.useMemo(() => {
    const categorys = state.map((element) => element.categoryId);
    return [...new Set(categorys)];
  }, [state.length]);

  const dispatch = useDispatch();

  const filteredCategory = (e) => {
    setSelectCategory((prev) => e.target.value);
  };

  React.useEffect(() => {
    dispatch(filteredByCategory(selectCategory));
  }, [selectCategory]);

  const filterdPrice = (e, name) => {
    switch (name) {
      case "min": {
        setFilterdByPrice((prev) => ({ ...prev, min: e.target.value }));
        break;
      }

      case "max": {
        setFilterdByPrice((prev) => ({ ...prev, max: e.target.value }));
        break;
      }
    }
  };
  const confirmFilterPrice = () => {
    dispatch(pirceFilter(filteredByPrice));
  };

  const closeFilter = () => {
    setFilterdByPrice((prev) => ({
      ...prev,
      min: "",
      max: "",
      closeFilter: true,
    }));
    setSelectCategory('Все')
  };

  React.useEffect(() => {
    dispatch(pirceFilter(filteredByPrice));
    setFilterdByPrice((prev) => ({ ...prev, closeFilter: false }));
  }, [filteredByPrice.closeFilter]);

  return (
    <div className={s.main_sidebar_content}>
      <input
        type="radio"
        value="all"
        name="category"
        checked={selectCategory === "Все" && true}
        id="all"
        onChange={filteredCategory}
      />{" "}
      <label htmlFor="all">
        <span>все</span>
      </label>
      {uniqCategorys.map((element) => {
        return (
          <div key={element}>
            <input
              type="radio"
              name="category"
              value={element}
              id={element}
              checked={selectCategory === element && true}
              onChange={filteredCategory}
            />{" "}
            <label htmlFor={element}>
              <span>{element}</span>
            </label>
          </div>
        );
      })}
      <div>
        <h1>Диапозон цен</h1>
        <MyInput
          type="number"
          placeholder="от"
          onChange={(e) => filterdPrice(e, "min")}
          value={filteredByPrice.min}
        >
          $
        </MyInput>

        <MyInput
          type="number"
          placeholder="до"
          onChange={(e) => filterdPrice(e, "max")}
          value={filteredByPrice.max}
        >
          {" "}
          $
        </MyInput>
        <MyButton onClick={confirmFilterPrice}>ОК</MyButton>
        <MyButton onClick={closeFilter}>Сбросить фильтер</MyButton>
      </div>
    </div>
  );
}

export default SideBar;
