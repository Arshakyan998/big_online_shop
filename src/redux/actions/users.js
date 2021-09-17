export const showModal=(val)=>({
        type:"SHOW_HIDE_MODAL",
        payload:val
})

export const validateDate=(val)=>({
        type:"VALIDATE_DATE",
        payload:val
})

export const addToCart=(val)=>({
        type:"ADD_TO_CART",
        payload:val
})

export const addNewItem=val=>({
        type:"ADD_NEW_ITEM",
        payload:val
})



export const minusItem=val=>({
        type:"MINUS_ITEM",
        payload:val
})

export const removeItem=val=>({
        type:"REMOVE_ITEM",
        payload:val
})


export const removeCart=()=>({
        type:"REMOVE_CART",
})

export const addNewProduct=(val)=>({
        type:"ADD_NEW_PRODUCT",
        payload:val
})

export const addNewComment=(val)=>({
        type:"ADD_NEW_COMMENT",
        payload:val
})


export const logOutOfProfile=(val)=>({
        type:"LOG_OUT_OF_PROFILE",
        payload:val
})

export const removItemFromProducts=(val)=>({
        type:"REMOVE_ITEM_FROM_PRODUCTS",
        payload:val
})

export const addNewUser=(val)=>({
        type:"ADD_NEW_USER",
        payload:val
})