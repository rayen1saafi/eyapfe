import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// add cours
export const createQuizz = createAsyncThunk("quizz/add", async (quizz) => {
  try {
    let result = await axios.post(`http://localhost:5000/quizz/add`, quizz);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be caught by the rejected case
  }
});

// get cours
export const getQuizz = createAsyncThunk("quizz/get", async () => {
  try {
    let result = await axios.get(`http://localhost:5000/quizz/all/`);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be caught by the rejected case
  }
});
//del file
export const deletQuizz = createAsyncThunk("quizz/delete", async ({ id }) => {
  try {
    let result = await axios.delete(`http://localhost:5000/quizz/delete/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateQuizz = createAsyncThunk(
  "quizz/update",
  async ({ id, quizz }) => {
    try {
      let result = axios.put(`http://localhost:5000/quizz/update/${id}`, quizz);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  quizz: null, // Initialize as an empty array
  status: null,
};

export const quizzSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuizz.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createQuizz.fulfilled, (state, action) => {
        state.status = "success";
        state.quizz = action.payload.quizz;

        return state;
      })
      .addCase(createQuizz.rejected, (state) => {
        state.status = "fail";
      });

    builder
      .addCase(getQuizz.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuizz.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.quizz = action?.payload.quizz; // Assign the files array directly
      })
      .addCase(getQuizz.rejected, (state) => {
        state.status = "failed";
      });
    // -----------------------DELETE file ----------------------
    builder
      .addCase(deletQuizz.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deletQuizz.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
      })
      .addCase(deletQuizz.rejected, (state) => {
        state.status = "rejected";
      });
    // ------------------------ update file --------------
    builder
      .addCase(updateQuizz.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateQuizz.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(updateQuizz.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default quizzSlice.reducer;
