import {  configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import { persistStore , persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "@reduxjs/toolkit";


const persistConfig = {
    key: 'root',
    storage,
  };

  const reducer = combineReducers({
    user: userReducer,
  })

  const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore({
    reducer: persistedReducer
       
    
})