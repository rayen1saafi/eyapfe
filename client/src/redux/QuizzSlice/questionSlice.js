import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// add cours
export const createQuestion = createAsyncThunk(
  "question/add",
  async (question) => {
    try {
      let result = await axios.post(
        `http://localhost:5000/question/add`,
        question
      );
      return result.data;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error to be caught by the rejected case
    }
  }
);

// get cours
export const getQuestion = createAsyncThunk("question/get", async () => {
  try {
    let result = await axios.get(`http://localhost:5000/question/all`);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be caught by the rejected case
  }
});
//del question
export const deletQuestion = createAsyncThunk(
  "question/delete",
  async ({ id }) => {
    try {
      let result = await axios.delete(
        `http://localhost:5000/question/delete/${id}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deletQuestionbyquizz = createAsyncThunk(
  "question/deleteByQuizz",
  async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/question/delete_quizzid/${id}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "question/update",
  async ({ id, question }) => {
    try {
      let result = axios.put(
        `http://localhost:5000/question/update/${id}`,
        question
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  questions: null, // Initialize as an empty array
  status: null,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuestion.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.status = "success";
        state.questions = action.payload.questions;

        return state;
      })
      .addCase(createQuestion.rejected, (state) => {
        state.status = "fail";
      });

    builder
      .addCase(getQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.questions = action?.payload.question; // Assign the files array directly
      })
      .addCase(getQuestion.rejected, (state) => {
        state.status = "failed";
      });
    // -----------------------DELETE file ----------------------
    builder
      .addCase(deletQuestion.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deletQuestion.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
      })
      .addCase(deletQuestion.rejected, (state) => {
        state.status = "rejected";
      });

    builder
      .addCase(deletQuestionbyquizz.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deletQuestionbyquizz.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(deletQuestionbyquizz.rejected, (state) => {
        state.status = "rejected";
      });
    // ------------------------ update file --------------
    builder
      .addCase(updateQuestion.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateQuestion.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(updateQuestion.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default questionSlice.reducer;
