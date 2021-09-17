import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import s from './header.module.scss'
import arrow from '../../assets/arrow.svg'
import user from '../../assets/user.svg'
import cart from '../../assets/cart.svg'
import out from '../../assets/out.svg'

import { logOutOfProfile } from '../../redux/actions/users'
import { useDispatch } from 'react-redux'

const Profile = ({img,name,id}) => {
        const closeProfileMenu=React.useRef(null)

        const [activeCat,setActiveCat]=React.useState()

        const [showBlock,setShowBlock]=React.useState(false)

        const history=useHistory()

        const dispatch = useDispatch()

        const showControleBlock=()=>{
                setShowBlock(prev=>!prev)
        }
         const closeProfile=(e)=>{
                 
             if(!e.path.includes(closeProfileMenu.current)){
                setShowBlock(prev=>false) 
             }

         }
        React.useEffect(()=>{
          document.body.addEventListener('click',closeProfile)

          return ()=>  {
                  document.body.removeEventListener('click',closeProfile)
                  }
                
                
        },[])

      const {totalCount,totalPrice} = useSelector(state => state.users)

        const cartPath=(e)=>{
                history.push(`/cart/${id}`)
                setActiveCat(e.target.innerText)
                setShowBlock(prev=>false) 

        }
        
       
const profilPath=(e)=>{
        history.push(`/profile/${id}`)
        setActiveCat(e.target.innerText)
        setShowBlock(prev=>false) 
}


const outProfile=()=>{
dispatch(logOutOfProfile(id))

}


        return (
                <div className={s.profile} ref={closeProfileMenu}>
                                  <div>
  
  <span> Кол-во продуктов {totalCount?totalCount:0} </span><br />
<span>Сумма {totalPrice?totalPrice:0}$</span>
                          </div>

                        <div className={s.profile_img}>
                 
                <img src={img } alt={name} width='50px' height="50px" />

                        </div>
                       
                       <div onClick={showControleBlock} className={showBlock?s.visible:s.hide }>
                               <img src={arrow} alt="" width="25px" height="25px"/>

                               
                       </div>
                       <div className={showBlock? s.showMenu:s.hideMenu} >
                       <ul >
 <li onClick={profilPath}> <img src={user} alt="" width="20px" height="20px"/> Профиль</li>
   <li onClick={cartPath} style={{color:activeCat==='Корзина'?"orange":"" } }
   ><img src={cart} alt="" width="20px" height="20px"/> 
   Корзина</li>
   <li  onClick={outProfile}
   ><img src={out} alt="" width="20px" height="20px"/> 
   Выход</li>
                               </ul>
                               </div>
                     
                </div>       

        )
}

export default Profile
