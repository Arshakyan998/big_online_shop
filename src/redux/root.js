import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools  } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { getItems } from "./reducers/getItems";
import { users } from "./reducers/users";




const root=combineReducers({
        getItems,
        users,
})

export const store=createStore(root,composeWithDevTools(applyMiddleware(thunk)))

 