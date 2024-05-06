import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//add cours
export const createCours = createAsyncThunk("cours/add", async (cours) => {
  try {
    let result = await axios.post(
      `http://localhost:5000/cours/add`,
      cours
    );
    // console.log(result.data)
    return result.data;
  } catch (error) {
    console.log(error);
  }
});


//get cours 
export const getCours = createAsyncThunk(
  "cours/get",
  async () => {
    try {
      let result = await axios.get(
        `http://localhost:5000/cours/all/`,
      );
      console.log(result);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//delet cours
export const deleteCours = createAsyncThunk("cours/delete", async ({id}) => {
  try {
    let result =await axios.delete(`http://localhost:5000/cours/delete/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

//update cours
export const updatCours = createAsyncThunk(
  "cours/update",
  async ({ id, cours }) => {
    try {
      console.log(cours);
      let result = axios.put(
        `http://localhost:5000/cours/update/${id}`,
        cours
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);


const initialState = {
  cours: null,
  status: null,
};

export const coursSlice = createSlice({
  name: "cours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

        //add cours extra reducers
        builder
        .addCase(createCours.pending, (state) => {
          state.status = "loading...";
        })
        .addCase(createCours.fulfilled, (state, action) => {
          state.status = "success";
          state.cours = [action.payload.cours, ...state.cours];
          return state;
        })
        .addCase(createCours.rejected, (state) => {
          state.status = "fail";
        })
    // ----------------------- get Cours------------------
    builder
      .addCase(getCours.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCours.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.cours = action.payload?.courss;
      })
      .addCase(getCours.rejected, (state) => {
        state.status = "failed";
      });
           // -----------------------DELETE COURS ----------------------
           builder
           .addCase(deleteCours.pending, (state) => {
             state.status = "pending";
           })
           .addCase(deleteCours.fulfilled, (state, action) => {
             state.status = "fulfilled";
             console.log(action.payload);
           })
           .addCase(deleteCours.rejected, (state) => {
             state.status = "rejected";
           });

               // ------------------------ update cours --------------
      builder
      .addCase(updatCours.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updatCours.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(updatCours.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default coursSlice.reducer;
