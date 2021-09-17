import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addNewUser } from "../../redux/actions/users";

import './style.scss'

function RegistrationBlock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [passControll,setPassControll]=React.useState(true)
  const [img,setImgt]=React.useState('')
  const  dispatch = useDispatch()
  const histoyr=useHistory()

  const imgPath=(e)=>{
          const path=e.target.files[0]
          setImgt(`../../uploads/${path.name}`)
  }


  const onSubmit = (data) => {
          if(data.password===data.passwordController){
           const result={
                img:!img?"https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png":img,
                cart: {},
                products: [],
               comments: [],
                        isAuth: false,
                        id:+Date.now(),
                   ...data,

           }
           setPassControll(true)

           dispatch(addNewUser(result))
           alert(`Пользователь ${data.name} создан`)
           histoyr.push('/Main')
        }else{
           setPassControll(false)

        }
};

  return (
    <div className='registrationBlock'>
      <form onSubmit={handleSubmit(onSubmit)}>
              <div className='registrationBlock_img'>
                      <label htmlFor="photo">
  <img src={
          !img?
          'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png'
        :img}
  
  
  alt=""  width="100%" height="100%"/>
      </label>
  
              </div>
              <input type="file" id="photo" onChange={imgPath}/>
        <div>         
                       Имя {" "}

          <input
            type="text"
            {...register("name", {
              pattern: /^[A-Za-z]+$/i,
              required: true,
              minLength: 5,
            })}
          />

          {errors.name && <p> Только буквы минимум 5 символов </p>}
        </div>
        <div>Фамиля {" "}
          <input
            type="text"
            {...register("LastName", {
              pattern: /^[A-Za-z]+$/i,
              required: true,
              minLength: 5,
            })}
          />

          {errors.LastName && <p> Только буквы минимум 5 символов </p>}
        </div>
        <div>
                Логин {" "}
                
          <input
            type="text"
            {...register("login", { required: true, minLength: 5 })}
          />
          {errors.login && <p> Только буквы минимум 5 символов </p>}
        </div>
        <div>
                Пароль {" "}
        <input
          type="password"
          {...register("password", { required: true, minLength: 5 })}
        />
    {errors.password && <p>  минимум 5 символов </p>}

</div>
<div>
        Повтарите пароль {" "}
        <input
          type="password"
          {...register("passwordController", { required: true, minLength: 5 })}
        />
            {errors.password && <p>  минимум 5 символов </p>}

        {!passControll && <p> пароли не валидны </p>}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default RegistrationBlock;
