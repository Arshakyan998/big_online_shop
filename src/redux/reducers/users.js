const initalState = {
  users: {
    1: {
      id: 1,
      name: "Narek",
      img: "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png",
      lastName: "Arshakyan",
      login: "Admin",
      password: "Admin",
      cart: {},
      products: [],
      comments: [],
      isAuth: false,
    },
    2: {
      id: 2,
      name: "Vlad",
      img: "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png",
      lastName: "Hovsepyan",
      login: "vlo55",
      password: "alo75",
      cart: {},
      products: [],
      comments: [],
      isAuth: false,
    },
  },
  showModal: false,
  currentUser: {},
  online: false,
  totalCount: null,
  totalPrice: null,
};

export function users(state = initalState, action) {
  function getTotalCount(obj) {

    let sum = null;
    for (let key in obj) {
      sum += obj[key].item.length;
    }

    return sum;
  }

  function getTotalPrice(obj) {
    let sum = null;
    for (let key in obj) {
      sum += obj[key].item.reduce((aggr, value) => value.price + aggr, 0);
    }
    return sum;
  }

  function getItemCount(arr) {
    return arr.length;
  }

  function getItemPrice(arr) {
    return arr.reduce((aggr, value) => value.price + aggr, 0);
  }

  switch (action.type) {
    case "SHOW_HIDE_MODAL": {
      return {
        ...state,
        showModal: action.payload,
      };
    }

    case "VALIDATE_DATE": {
      const obj = state.users;

      let current = null;
      let isValid = false;
      for (let key in obj) {
        if (
          obj[key].login.toLowerCase() === action.payload.login &&
          obj[key].password.toLowerCase() === action.payload.password
        ) {
          obj[key].isAuth = true;
          current = obj[key];
          isValid = true;
        }
      }

      return {
        ...state,
        currentUser: current,
        showModal: isValid ? false : true,
        online: isValid ? true : false,
        totalCount: current && getTotalCount(state.users[current.id].cart),
        totalPrice: current && getTotalPrice(state.users[current.id].cart),
      };
    }
    case "ADD_TO_CART": {
      const newItem = !state.users[state.currentUser.id].cart[action.payload.id]
        ? [action.payload]
        : [
            ...state.users[state.currentUser.id].cart[action.payload.id].item,
            action.payload,
          ];

      const newCart = {
        ...state.users[state.currentUser.id].cart,
        [action.payload.id]: {
          item: newItem,
          itemCount: getItemCount(newItem),
          itemPrice: getItemPrice(newItem),
        },
      };

      state.users[state.currentUser.id].cart = newCart;
      const user = state.users[state.currentUser.id];

      return {
        ...state,
        users: {
          ...state.users,
          [state.currentUser.id]: user,
        },
        totalCount: getTotalCount(state.users[state.currentUser.id].cart),
        totalPrice: getTotalPrice(state.users[state.currentUser.id].cart),
      };
    }

    case "ADD_NEW_ITEM": {
      const newItem = [
        ...state.users[state.currentUser.id].cart[action.payload].item,
        state.users[state.currentUser.id].cart[action.payload].item[0],
      ];

      // const result = {
      //   ...state.users[state.currentUser.id].cart,
      //   [action.payload]: {
      //     item: newItem,
      //     itemCount: getItemCount(newItem),
      //     itemPrice: getItemPrice(newItem),
      //   },
      // };

      const result2 = {
        [state.users[state.currentUser.id].id]: {
          ...state.users[state.currentUser.id],
          cart: {
            ...state.users[state.currentUser.id].cart,
            [action.payload]: {
              item: newItem,
              itemCount: getItemCount(newItem),
              itemPrice: getItemPrice(newItem),
            },
          },
        },
      };

      const obj = {
        ...state.users,
        ...result2,
      };

      return {
        ...state,
        users: {
         ... obj
        },

        totalCount: getTotalCount(result2[state.currentUser.id].cart),
        totalPrice: getTotalPrice(result2[state.currentUser.id].cart),
      };
    }

    case "MINUS_ITEM": {
      const item = state.users[state.currentUser.id].cart[action.payload].item;

      const newItem = item.length > 1 ? item.splice(0, 1) : item;

      const fullItem = {
        ...state.users[state.currentUser.id].cart,
        [action.payload]: {
          item: item,
          itemCount: getItemCount(item),
          itemPrice: getItemPrice(item),
        },
      };

      return {
        ...state,
        users: {
          ...state.users,
          [state.users[state.currentUser.id].id]: {
            ...state.users[state.currentUser.id],
            cart: fullItem,
          },
        },
        totalCount: getTotalCount(state.users[state.currentUser.id].cart),

        totalPrice: getTotalPrice(state.users[state.currentUser.id].cart),
      };
    }

    case "REMOVE_ITEM": {
      const result = {
        ...state.users[state.currentUser.id].cart,
      };
      const removeItemLength = result[action.payload].item.length;
      const removeItemPrice = result[action.payload].itemPrice;

      delete result[action.payload];

      return {
        ...state,
        users: {
          ...state.users,
          [state.users[state.currentUser.id].id]: {
            ...state.users[state.currentUser.id],
            cart: result,
          },
        },
        totalCount: state.totalCount - removeItemLength,
        totalPrice: state.totalPrice - removeItemPrice,
      };
    }
    case "REMOVE_CART": {
      return {
        ...state,
        users: {
          ...state.users,
          [state.users[state.currentUser.id].id]: {
            ...state.users[state.currentUser.id],
            cart: {},
          },
        },
        totalCount: 0,
        totalPrice: 0,
      };
    }

    case "ADD_NEW_PRODUCT": {
      const newItem = {
        products: [
          ...state.users[state.currentUser.id].products,
          action.payload,
        ],
      };

      return {
        ...state,
        users: {
          ...state.users,
          [state.users[state.currentUser.id].id]: {
            ...state.users[state.currentUser.id],
            products: newItem.products,
          },
        },
      };
    }
    case "LOG_OUT_OF_PROFILE": {
      const newItem = {
        ...state.users[state.currentUser.id],
        isAuth: false,
      };

      return {
        ...state,
        users: {
          ...state.users,
          [state.users[state.currentUser.id].id]: newItem,
        },
        online: false,
      };
    }

    case 'ADD_NEW_COMMENT':{
      
        const newItem=action.payload

      return{
        ...state,
        users:{
          ...state.users,
          [action.payload.userId]:{
            ...state.users[action.payload.userId],
            comments:[
              ...state.users[action.payload.userId].comments,newItem
            ]

          }

        }
      }
    }
    case 'REMOVE_ITEM_FROM_PRODUCTS':{
   const item=[ ...state.users[state.currentUser.id].products].filter(el=>el.id!==action.payload)
   let users=state.users

      for(let key in users){
        delete users[key].cart[action.payload]
      }
 

      return{
        ...state,
        users:{
          ...state.users,
          [state.users[state.currentUser.id].id]:{
            ...state.users[state.currentUser.id],
            products:item
          }
        }
      }
    }
    case 'ADD_NEW_USER':{
      return{
        ...state,
        users:{
          ...state.users,
          [action.payload.id]:{
            ...action.payload
          }
        }
      }
    }

    default:
      return state;
  }
}
