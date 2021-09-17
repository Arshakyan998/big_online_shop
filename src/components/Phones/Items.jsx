import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import MyButton from '../../myButton/MyButton';
import { addToCart } from '../../redux/actions/users';

import style from './main.module.scss'

function Items({image,name,price,description,id,online,currentUser}) {

       const routeMatch= useRouteMatch()
       const history=useHistory()
       const dispatch=useDispatch()

       const addNewItemInCart=()=>{
               const item={
                       image,
                       name,
                       price,
                       id,
                       description
               }
                dispatch(addToCart(item))
       }
const isInclude=currentUser&&currentUser.products.filter(el=>el.id===id)
        
        return (
                <div className={style.main_product}>
                        <div className={style.main_product_img}>
                          <img src={image} alt={name} width="100%" />

                        </div>
                        <div className={style.main_product_name}>
                         <h2> {name}</h2>
                        </div>
                        <div className={style.main_product_price}>
                         <h2>цена {price}$</h2>
                        </div>
                        <div className={style.main_product_description}>

                         <p> {description.slice(0,50)}...</p>

                        </div>
                        <div className={style.main_product_add_view}>

{online&&
     !isInclude.length&&
<div>
 <MyButton onClick={addNewItemInCart}>Добавить</MyButton>
</div>
     }
<div>
<MyButton onClick={()=>{history.push(`${routeMatch.url}item/${id}`)}}>Подробнее</MyButton>

</div>
</div>

                </div>
        )
}

export default Items
