import taskReducer from './reducers/taskSlice';
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer: {
        task: taskReducer,
    },
});

export default store;
