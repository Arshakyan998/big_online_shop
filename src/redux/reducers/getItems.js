const initalState={
        items:[],
        error:"",
        isLoading:true,
        cloneItems:[]
}


export const getItems=(state=initalState,action)=>{
switch (action.type) {
        case 'SUCCESS_DATA':{
     return{
             ...state,
             items:action.payload,
             cloneItems:action.payload
     }
                 
        }
        case "ERROR_DATA":{

                return{
                        ...state,
                        error:action.payload
                }
        }

        case 'FINALLY':{
                return{
                        ...state,
                        isLoading:action.payload
 
                }
        }

        case 'ADD_NEW_ITEM_IN_ITEMS':{

             const newItem=[...state.items,action.payload]


                return {
                        ...state,
                        items:newItem,
                        cloneItems:newItem
                }
        }

        case 'SEARCH_QUERY':{
                let search=action.payload


                 const newItem=[...state.cloneItems].filter(element=>{
                         if(search===""){
                                 return state.cloneItems
                         }
                        
                                 return element.name.toLowerCase().includes(search.toLowerCase())
                         
                 })


                return{
                        ...state,
                        items:newItem
                }
        }
        case "FILTERED_BY_CATEGORY":{
                const newItem=[...state.cloneItems].filter(element=>{
                        if(action.payload==="all"){
                                return state.cloneItems
                        }else{
                                return element.categoryId===action.payload
                        }

                })
             
                return{
                        ...state,
                        items:newItem

                }
        }
        case 'FILTERED_BY_PRICE':{ 
                const {min,max}=action.payload
                 
                const newItem=[...state.cloneItems].filter(element =>{
                if(+min===null && +max===null || +min===0 && +max===0 || +max===0||+min==='' && +max==='' ){
                                return state.cloneItems
                        }else{
                                return element.price>=+min && element.price<=+max
                        }
                }) 
         

                return{
                        ...state,
                        items:newItem
                }
        }
        case "COMMENTS_FOR_ITEMS":{

                const {productId}=action.payload
                 
                const newItem=[...state.items].filter(element=>{
                        if(element.id===productId){
                                element.comments.push(action.payload)
                        }
                        return element
                })  
                return{
                        ...state,
                        items:newItem
                }
        }
        case 'REMOVE_NEW_ITEM':{
               
                const newItem=[...state.items].filter(el=>el.id!==action.payload)


                return{
                   ...state,
                   items:newItem,
                   cloneItems:newItem
                }
        }
                
                

        default:
                return state;
}

}

