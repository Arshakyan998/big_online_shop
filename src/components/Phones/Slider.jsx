import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import s from './slider.module.scss'

function Slider() {

const sliderNodes=React.useRef(null)  
const leftBtn=React.useRef(null)  
const rightBtn=React.useRef(null)  


const pos =React.useRef(0) 

const history=useHistory()

const {cloneItems} = useSelector(state => state.getItems) 
const sliderItems=[...cloneItems].slice(0,10)

React.useEffect(()=>{
        leftBtn.current.disabled=true
},[])

const slideRight=()=>{
         let currentPos=sliderNodes.current.childNodes[0].getBoundingClientRect().width
         const nodeWidth=Math.round(
         sliderNodes.current.getBoundingClientRect().width
                       )                     
        
         if(nodeWidth-currentPos*6> pos.current){
                 pos.current+=currentPos
        sliderNodes.current.childNodes.forEach(element => {
                 element.style.transform=`translate(-${pos.current}px)`
        })
        leftBtn.current.disabled=false
}else{
        rightBtn.current.disabled=true
        }   

}
const slideLeft=()=>{
        let currentPos=sliderNodes.current.childNodes[0].getBoundingClientRect().width
        
        if(0<pos.current){
                rightBtn.current.disabled=false

       pos.current=(pos.current-currentPos)
       sliderNodes.current.childNodes.forEach(element => {
         element.style.transform=`translate(-${pos.current}px)`
         })} else{
        leftBtn.current.disabled=true

       }
}

        return (
                <div className={s.main}>
                        <div className={s.main_main_blcok} ref={sliderNodes}>
                        {
                                sliderItems.map(el=>{
            return  <div key={el.id} className={s.main_block} onClick={()=>history.push(`/item/${el.id}`)}>
                                  <div className={s.main_img}>
                                  <img src={el.image} alt="img" />
                                  </div>
                                  <div className={s.main_description}>
                                  <span>{el.description.slice(0,45)}...</span>
                                  </div>
                                  </div>
                                })
                        }
                        </div>
                        <div style={{display:'flex',justifyContent:"space-between",width: '100%'}}>
                        
                        
                        <button onClick={slideLeft} ref={leftBtn}>{'<'}</button>   
                        <button onClick={slideRight} ref={rightBtn}> {'>'}</button>     

                       </div>
    
                         
                </div>
        )
}

export default Slider
