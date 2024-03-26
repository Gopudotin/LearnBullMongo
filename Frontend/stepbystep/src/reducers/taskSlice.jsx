import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks:[],  //Array to hold all tasks
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask(state, action) {
      //here action payload will contain the new task data
      // Add the new task to the tasks array
      state.tasks.push(action.payload)
    },
    getTask(state, action) {
      //
    },
  },
});

export const { addTask, getTask } = taskSlice.actions;
export default taskSlice.reducer; 
