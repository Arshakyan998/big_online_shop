import React from "react";
import { useSelector,useDispatch } from "react-redux";

import { Switch,Route,Redirect } from 'react-router-dom';
import Cart from "./components/cart/cart";
import Header from "./components/header/Header";
import RegistrationBlock from "./components/loginBlock/RegistrationBlock";
import ItemById from "./components/Phones/ItemById";

import Main from "./components/Phones/Main";
import Products from "./components/profile/products/Products";
import Profile from "./components/profile/Profile";
import { getitems } from "./redux/actions/getItems";


function App() {
  
  const {online} = useSelector(state => state.users)
  const dispatch = useDispatch();


  React.useEffect(() => {
    dispatch(getitems());
  }, []);


  return (
    <div className="App">
      <Header/>
    <Switch>
      <Route path="/" component={Main} exact/>
      <Route path="/Registration" component={RegistrationBlock} exact/>
      <Route path="/item/:id" component={ItemById} />
      {
        !online&&
        <Redirect to='/'/> 
      }
        
       </Switch>
      {
        online&&
        <Switch>
        <Route path="/profile/:id" component={Profile}  />
        <Route path="/cart/:id" component={Cart} />
        <Route path="/products/:id" component={Products} />

        </Switch>  
      }
   
    </div>
  );
}

export default App;
