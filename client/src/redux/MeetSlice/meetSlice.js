import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// add cours
export const createMeet = createAsyncThunk("meet/add", async (meet) => {
  try {
    let result = await axios.post(`http://localhost:5000/meet/add`, meet);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be caught by the rejected case
  }
});

// get cours
export const getMeet = createAsyncThunk("meet/get", async () => {
  try {
    let result = await axios.get(`http://localhost:5000/meet/all/`);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be caught by the rejected case
  }
});
//del file
export const deletMeet = createAsyncThunk("meet/delete", async ({ id }) => {
  try {
    let result = await axios.delete(`http://localhost:5000/meet/delete/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateMeet = createAsyncThunk(
  "meet/update",
  async ({ id, meet }) => {
    try {
      let result = axios.put(`http://localhost:5000/meet/update/${id}`, meet);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  meet: null, // Initialize as an empty array
  status: null,
};

export const meetSlice = createSlice({
  name: "meet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMeet.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createMeet.fulfilled, (state, action) => {
        state.status = "success";
        state.meet = action.payload.meet;

        return state;
      })
      .addCase(createMeet.rejected, (state) => {
        state.status = "fail";
      });

    builder
      .addCase(getMeet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMeet.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.meet = action?.payload.meet; // Assign the files array directly
      })
      .addCase(getMeet.rejected, (state) => {
        state.status = "failed";
      });
    // -----------------------DELETE file ----------------------
    builder
      .addCase(deletMeet.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deletMeet.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
      })
      .addCase(deletMeet.rejected, (state) => {
        state.status = "rejected";
      });
    // ------------------------ update file --------------
    builder
      .addCase(updateMeet.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateMeet.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(updateMeet.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default meetSlice.reducer;
