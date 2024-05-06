import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// add cours
export const createAnswerStudent = createAsyncThunk(
  "answerstudent/add",
  async (answerstudent) => {
    try {
      let result = await axios.post(
        `http://localhost:5000/answerstudent/add`,
        answerstudent
      );
      return result.data;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error to be caught by the rejected case
    }
  }
);
// get cours
export const getAnswerStudent = createAsyncThunk(
  "answerstudent/get",
  async () => {
    try {
      let result = await axios.get(`http://localhost:5000/answerstudent/all/`);
      return result.data;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error to be caught by the rejected case
    }
  }
);
export const deletAnswerstudentbyquizz = createAsyncThunk(
  "answerstudent/deleteByQuizz",
  async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/answerstudent/delete_quizzid/${id}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
const initialState = {
  answerstudent: null, // Initialize as an empty array
  status: null,
};

export const answerstudentSlice = createSlice({
  name: "answerstudent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAnswerStudent.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createAnswerStudent.fulfilled, (state, action) => {
        state.status = "success";
        state.answerstudent = action?.payload?.answerstudent;

        return state;
      })
      .addCase(createAnswerStudent.rejected, (state) => {
        state.status = "fail";
      });
    builder
      .addCase(getAnswerStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAnswerStudent.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.answerstudent = action?.payload.answerStudent; // Assign the files array directly
      })
      .addCase(getAnswerStudent.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(deletAnswerstudentbyquizz.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deletAnswerstudentbyquizz.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(deletAnswerstudentbyquizz.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default answerstudentSlice.reducer;
