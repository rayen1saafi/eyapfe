import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//add pack
export const createPack = createAsyncThunk("pack/add", async (pack) => {
  try {
    let result = await axios.post(
      `http://localhost:5000/pack/add`,
      pack
    );
    // console.log(result.data)
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

//get pack 
export const getPack = createAsyncThunk(
  "pack/get",
  async () => {
    try {
      let result = await axios.get(
        `http://localhost:5000/pack/all/`,
      );
      console.log(result);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//delet pack
export const deletePack = createAsyncThunk("pack/delete", async ({id}) => {
  try {
    let result =await axios.delete(`http://localhost:5000/pack/delete/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

//update pack 
//update pack
export const updatPack = createAsyncThunk(
  "pack/update",
  async ({ id, pack }) => {
    try {
      console.log(pack);
      let result = axios.put(
        `http://localhost:5000/pack/update/${id}`,
        pack
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateinscri=createAsyncThunk("inscri/update",async({id,inscri})=>{
  try {
    let result=axios.put(`http://localhost:5000/pack/inscri/${id}`,inscri);
    return result;
  } catch (error) {
    console.log(error)
  }
})

export const updatestudent=createAsyncThunk("student/update",async({id,student})=>{
  try {
    let result=axios.put(`http://localhost:5000/pack/student/${id}`,student);
    return result;
  } catch (error) {
    console.log(error)
  }
})
const initialState = {
  pack: null,
  status: null,
};

export const packSlice = createSlice({
  name: "pack",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //add pack extra reducers
    builder
    .addCase(createPack.pending, (state) => {
      state.status = "loading...";
    })
    .addCase(createPack.fulfilled, (state, action) => {
      state.status = "success";
      state.pack = [action.payload?.pack, ...state.pack];
      return state;
    })
    .addCase(createPack.rejected, (state) => {
      state.status = "fail";
    })
    // ------------------ GET PACK---------------------------
    builder
      .addCase(getPack.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPack.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.pack = action.payload?.packs;
      })
      .addCase(getPack.rejected, (state) => {
        state.status = "failed";
      });
      // -----------------------DELETE PACK ----------------------
      builder
      .addCase(deletePack.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deletePack.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
      })
      .addCase(deletePack.rejected, (state) => {
        state.status = "rejected";
      });
      // ------------------------ update pack --------------
      builder
      .addCase(updatPack.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updatPack.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(updatPack.rejected, (state) => {
        state.status = "rejected";
      });

      builder
      .addCase(updateinscri.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateinscri.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(updateinscri.rejected, (state) => {
        state.status = "rejected";
      });

      builder
      .addCase(updatestudent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updatestudent.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(updatestudent.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default packSlice.reducer;
