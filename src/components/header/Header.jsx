import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import MyButton from "../../myButton/MyButton";
import MyInput from "../../myInput/MyInput";
import { searchQuery } from "../../redux/actions/getItems";
import { showModal } from "../../redux/actions/users";
import LoginBlock from "../loginBlock/loginBlock";

import s from "./header.module.scss";
import Profile from "./Profile";

const Header = () => {
  const dispatch = useDispatch();
  const history=useHistory()
  const chnageModalState = () => {
    dispatch(showModal(true));
  };
   
  const [isAuth,setIsAuth]=React.useState(false)
  const [search,setSearch]=React.useState('') 
  
  
  const { showModal:modal,currentUser,online } = useSelector((state) => state.users);

  
 
  React.useEffect(()=>{
    dispatch(searchQuery(search))
  },[search])

  React.useMemo(()=>{
    if(online){
          setIsAuth(true)
          dispatch(showModal(false))
  }else{
        setIsAuth(false)
  }      
  },[currentUser,online])

  const searchHendler=(e)=>{
    setSearch(e.target.value)
  }

 


  return (
    <header className={s.main}>
     
        <div onClick={()=>history.push('/')}>LOGO </div>
        <div><MyInput placeholder='Поиск' onChange={searchHendler} value={search}/></div>
        {isAuth ? <Profile {...currentUser}/> : 
        <MyButton onClick={chnageModalState} >
                Вход
                </MyButton> }
      
      {modal && <LoginBlock isAuth={isAuth}/>}
      
    
    </header>
  );
};

export default Header;
