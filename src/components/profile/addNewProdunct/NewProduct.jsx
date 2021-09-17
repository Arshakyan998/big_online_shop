import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import s from "./producte.module.scss";
import { addNewProduct } from "../../../redux/actions/users";
import MyButton from "../../../myButton/MyButton";
import { addNewItem } from "../../../redux/actions/getItems";

const schema = yup.object().shape({
    price: yup.number("только цифры").min(1, "Длина мин 1 символ").required(),
    description:yup.string().min(10,"Минимум 10 символов").required("Объязательное поле"),
     name:yup.string().max(15, "maks 15").required("Объязательное поле")
  });

function NewProduct({ setShowModal }) {
  const [filePath, setFilePath] = React.useState("");
  const [category, setCategory] = React.useState("Apple");

  const { items } = useSelector((state) => state.getItems);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const sumbit = (data) => {
    const result = {
      id: Date.now().toString(),
      comments: [],
      image: filePath
        ? filePath
        : "https://png.pngtree.com/png-vector/20201230/ourmid/pngtree-black-mobile-phone-mockup-png-png-image_2674011.jpg",
      categoryId: category,

      ...data,
    };
    dispatch(addNewProduct(result));
    dispatch(addNewItem(result));

    setFilePath("");
    setCategory("");
    setShowModal(false);
  };

  const uniqItems = React.useMemo(() => {
    const cats = items.map((element) => element.categoryId);
    return [...new Set(cats)];
  }, [items.length]);

  const imgFile = (e) => {
    if (e.target.files[0]) {
      setFilePath(`../../uploads/${e.target.files[0].name}`);
    }
  };

  const changeCategoryID = (e) => {
    setCategory(e.target.value);
  };

  const closeModalWindow = () => {
    setShowModal(false);
  };

  return (
    <div className={s.main} onClick={closeModalWindow}>
      <div className={s.main_form} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(sumbit)}>
          <label htmlFor="file">
            <div className={s.main_photo}>
              {filePath ? (
                <img src={filePath} alt={filePath} width="100%" height="100%" />
              ) : (
                <img
                  src="https://png.pngtree.com/png-vector/20201230/ourmid/pngtree-black-mobile-phone-mockup-png-png-image_2674011.jpg"
                  alt="zaglushka"
                  width="100%"
                  height="100%"
                />
              )}
              image <input id="file" type="file" onChange={imgFile} />
            </div>
          </label>
          {uniqItems.map((element) => {
            return (
              <div key={element}>
                <input
                  type="radio"
                  checked={category === element && true}
                  value={element}
                  name="categorys"
                  onChange={changeCategoryID}
                />
                {element}
              </div>
            );
          })}
          name
          <input
            type="text"
            {...register("name")}
          />
          {errors.name ? <p> Объязательное поле не более 15 символов</p> : ""}
          price <input {...register("price")}
        
           />
          {errors.price ? (
            <p> Объязательное поле не более 7 символов только цифры</p>
          ) : (
            ""
          )}
          {errors.file ? <p> Объязательное поле фото</p> : ""}
          cpu <input {...register("cpu")} />
          camera <input {...register("camera")} />
          size <input {...register("size")} />
          weight <input {...register("weight")} />
          display <input {...register("display")} />
          battery <input {...register("battery")} />
          memory <input {...register("memory")} />
          description{" "}
          <input
            {...register("description", {  minLength: 10 })}
          />
          {errors.description ? (
            <p> Объязательное поле описание минимум 10 символов</p>
          ) : (
            ""
          )}
          <MyButton>Добавть</MyButton>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
