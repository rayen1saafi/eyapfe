import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//add cours
export const createLesson = createAsyncThunk("lesson/add", async (lesson) => {
  try {
    let result = await axios.post(`http://localhost:5000/lessons/add`, lesson);
    // console.log(result.data)
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

//get cours
export const getLesson = createAsyncThunk("lesson/get", async () => {
  try {
    let result = await axios.get(`http://localhost:5000/lessons/all/`);
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

//del lesson
export const deleteLesson = createAsyncThunk("lessons/delete", async ({ id }) => {
  try {
    let result = await axios.delete(`http://localhost:5000/lessons/delete/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  lessons: null,
  status: null,
};

export const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //add lessons extra reducers
    builder
      .addCase(createLesson.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.status = "success";
        state.lessons = action.payload.lessons;

        return state;
      })
      .addCase(createLesson.rejected, (state) => {
        state.status = "fail";
      });
    // ----------------------- get Cours------------------
    builder
      .addCase(getLesson.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLesson.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.lessons = action.payload?.lesson;
      })
      .addCase(getLesson.rejected, (state) => {
        state.status = "failed";
      });

          // -----------------------DELETE lesson ----------------------
    builder
    .addCase(deleteLesson.pending, (state) => {
      state.status = "pending";
    })
    .addCase(deleteLesson.fulfilled, (state, action) => {
      state.status = "fulfilled";
      console.log(action.payload);
    })
    .addCase(deleteLesson.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export default lessonSlice.reducer;
