import React from "react";
import App from "./App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { configureStore } from '@reduxjs/toolkit';
import bathroomssReducer from "./reducers/bathroomsSlice";
import usersReducer from "./reducers/usersSlice";
import reviewsReducer from "./reducers/reviewsSlice";


const store = configureStore({
    // this is the root reducer
    reducer: {
      bathrooms: bathroomssReducer, //how we grab state
      users: usersReducer,
      reviews: reviewsReducer
    }
  })

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
