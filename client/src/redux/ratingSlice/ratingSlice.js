import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//add rating
export const createRating = createAsyncThunk("rating/add", async (rating) => {
  try {
    let result = await axios.post(
      `http://localhost:5000/rating/add`,
      rating
    );
    // console.log(result.data)
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

//get rating 
export const getRating = createAsyncThunk(
  "rating/get",
  async () => {
    try {
      let result = await axios.get(
        `http://localhost:5000/rating/all/`,
      );
      console.log(result);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//delet rating
export const deleteRating = createAsyncThunk("rating/delete", async ({id}) => {
  try {
    let result =await axios.delete(`http://localhost:5000/rating/delete/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

//update rating 
//update rating
// update rating
export const updateRating = createAsyncThunk(
    "rating/update",
    async ({ id, rating }) => {
      try {
        const result = await axios.put(
          `http://localhost:5000/rating/update/${id}`,
          { rate: rating } // Sending the updated rating value
        );
        return result.data;
      } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to handle it in the component
      }
    }
  );
  




const initialState = {
  rating: null,
  status: null,
};

export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //add rating extra reducers
    builder
    .addCase(createRating.pending, (state) => {
      state.status = "loading...";
    })
    .addCase(createRating.fulfilled, (state, action) => {
      state.status = "success";
      state.rating = Array.isArray(action.payload.rating) ? [action.payload.rating, ...state?.rating] : state.rating;
      return state;
    })
    .addCase(createRating.rejected, (state) => {
      state.status = "fail";
    })
    // ------------------ GET PACK---------------------------
    builder
      .addCase(getRating.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRating.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.rating = action.payload?.ratings;
      })
      .addCase(getRating.rejected, (state) => {
        state.status = "failed";
      });
      // -----------------------DELETE PACK ----------------------
      builder
      .addCase(deleteRating.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteRating.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
      })
      .addCase(deleteRating.rejected, (state) => {
        state.status = "rejected";
      });
      // ------------------------ update rating --------------
      builder
      .addCase(updateRating.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateRating.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(updateRating.rejected, (state) => {
        state.status = "rejected";
      });

 
  },
});

export default ratingSlice.reducer;
