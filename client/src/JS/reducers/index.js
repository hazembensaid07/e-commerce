import {combineReducers} from "redux";
import {productReducer} from "./products";
import {orderReducer} from "./orders";
import {messageReducer} from "./message"

export const rootReducer=combineReducers({ productReducer,orderReducer,messageReducer });

