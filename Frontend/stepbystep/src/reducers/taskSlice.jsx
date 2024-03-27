import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk action to fetch tasks from the API
export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async ({ page, perPage }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tasks?page=${page}&perPage=${perPage}`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch tasks");
      }
    } catch (error) {
      throw new Error("Error occurred while fetching tasks:", error.message);
    }
  }
);

const initialState = {
  tasks: [], // Array to hold all tasks
  status: "idle",
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask(state, action) {
      // Add the new task to the tasks array
      state.tasks.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
