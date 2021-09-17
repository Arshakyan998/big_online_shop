import axios from "axios"

export const getitems=()=>async(dispatch)=>{
   
       try {
      const response= await axios.get(`http://localhost:3001/phones`)
      const data= await response.data 
        dispatch({
                type:"SUCCESS_DATA",
                payload:data
        })     
                
        } catch (e) {
                dispatch({
                        type:"ERROR_DATA",
                        payload:e.message
                })
        }finally{
                dispatch({
                        type:"FINALLY",
                        payload:false
                })
        }
}





       export const addNewItem=(val)=>({
               type:"ADD_NEW_ITEM_IN_ITEMS",
               payload:val
       })

 
        export const searchQuery=(val)=>({
                type:"SEARCH_QUERY",
                payload:val
        })

        export const filteredByCategory=(val)=>({
                type:"FILTERED_BY_CATEGORY",
                payload:val
        })

        export const filteredByPrice=(val)=>({
                type:"FILTERED_BY_PRICE",
                payload:val
        })

        export const commentsForItem=(val)=>({
                type:"COMMENTS_FOR_ITEMS",
                payload:val
        })

        export const removeItem=(val)=>({
                type:"REMOVE_NEW_ITEM",
                payload:val
        })