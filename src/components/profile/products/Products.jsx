import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { removeItem } from '../../../redux/actions/getItems';
import { removItemFromProducts } from '../../../redux/actions/users';

import s from './products.module.scss'

function Products() {
        const params = useParams();
        const dispatch = useDispatch()

        const {products}= useSelector(state => state.users.users[params.id])
        const removeNewItem=(id)=>{
               dispatch(removeItem(id))
               dispatch(removItemFromProducts(id))
        }

        return (
                <div className={s.main}>
                      {
                      products.length?products.map(element=>{
                      return <div className={s.main_products} key={element.id}>
                              <div>
                              <img src={element.image} alt="" width="350px" />
                              </div>
                              <div>
                                      <div> {element.name} </div>

                              </div>
                              <div> {element.price} $ </div>
                              <div><button onClick={()=>removeNewItem(element.id)}>X</button></div>
                      </div>

                      }): <h1> Вы недобавили продукт</h1>
                      }
                        
                </div>
        )
}

export default Products
