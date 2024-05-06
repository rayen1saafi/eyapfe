import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// add cours
export const createFile = createAsyncThunk("file/add", async (file) => {
  try {
    let result = await axios.post(`http://localhost:5000/file/add`, file);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be caught by the rejected case
  }
});

// get cours
export const getFile = createAsyncThunk("file/get", async () => {
  try {
    let result = await axios.get(`http://localhost:5000/file/all/`);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be caught by the rejected case
  }
});
//del file
export const deleteFile = createAsyncThunk("file/delete", async ({ id }) => {
  try {
    let result = await axios.delete(`http://localhost:5000/file/delete/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});
export const updatFile = createAsyncThunk(
  "file/update",
  async ({ id, file }) => {
    try {
      console.log(file);
      let result = axios.put(`http://localhost:5000/file/update/${id}`, file);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatedone = createAsyncThunk(
  "done/update",
  async ({ id, done }) => {
    try {
      let result = axios.put(`http://localhost:5000/file/done/${id}`, done);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
  files: null, // Initialize as an empty array
  status: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ----------------------- get Cours------------------
    builder
      .addCase(getFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFile.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.files = action?.payload.files; // Assign the files array directly
      })
      .addCase(getFile.rejected, (state) => {
        state.status = "failed";
      });
    // -----------------------DELETE file ----------------------
    builder
      .addCase(deleteFile.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
      })
      .addCase(deleteFile.rejected, (state) => {
        state.status = "rejected";
      });
    // ------------------------ update file --------------
    builder
      .addCase(updatFile.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updatFile.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(updatFile.rejected, (state) => {
        state.status = "rejected";
      });
    builder
      .addCase(updatedone.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updatedone.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(updatedone.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default fileSlice.reducer;
