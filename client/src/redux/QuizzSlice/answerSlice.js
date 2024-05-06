import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createAnswer = createAsyncThunk("answer/add", async (answer) => {
  try {
    const result = await axios.post(`http://localhost:5000/answer/add`, answer);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getAnswer = createAsyncThunk("answer/get", async () => {
  try {
    const result = await axios.get(`http://localhost:5000/answer/all/`);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const deleteAnswer = createAsyncThunk("answer/delete", async (id) => {
  try {
    const result = await axios.delete(
      `http://localhost:5000/answer/delete/${id}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const deleteAnswerByQuizz = createAsyncThunk(
  "answer/deleteByQuizz",
  async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/answer/delete_quizzid/${id}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updateAnswer = createAsyncThunk(
  "answer/update",
  async ({ id, answer }) => {
    try {
      const result = await axios.put(
        `http://localhost:5000/answer/update/${id}`,
        answer
      );
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  answers: null,
  status: null,
};

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAnswer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAnswer.fulfilled, (state, action) => {
        state.status = "success";
        state.answers = action.payload.answer;
      })
      .addCase(createAnswer.rejected, (state) => {
        state.status = "fail";
      });

    builder
      .addCase(getAnswer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAnswer.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.answers = action.payload.answer;
      })
      .addCase(getAnswer.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(deleteAnswer.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteAnswer.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(deleteAnswer.rejected, (state) => {
        state.status = "rejected";
      });

    builder
      .addCase(deleteAnswerByQuizz.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteAnswerByQuizz.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(deleteAnswerByQuizz.rejected, (state) => {
        state.status = "rejected";
      });

    builder
      .addCase(updateAnswer.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateAnswer.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(updateAnswer.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default answerSlice.reducer;
