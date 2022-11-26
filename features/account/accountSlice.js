import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, userExisted , updateUser} from "../../firebaseFunction";

export const createUserWithEmailAndPass = createAsyncThunk(
  "/user",
  async (userObj) => {
    let data = await userExisted(userObj);
    if (data) {
      alert("Account in used");
      return false;
    }
    data = await createUser(userObj);
    return true;
  }
);
export const loginUserWithEmailAndPass = createAsyncThunk(
  "user/loging",
  async (userObj) => {
    let data = await loginUser(userObj);
    return data;
  }
);

export const UpdateProfile = createAsyncThunk(
  "user/profile",
  async (objUser) => {
    let data = await updateUser(objUser);
    return data;
  }
);
const initialState = {
  user: {},
  signUp: {
    status: false,
  },
  login: {
    status: false,
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    reload: (state, action) => {
      state.signUp.status = false;
    },
    userSignOut: (state, action) => {
      state.login.status = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUserWithEmailAndPass.fulfilled, (state, action) => {
      if (action.payload) state.signUp.status = action.payload;
    });
    builder.addCase(loginUserWithEmailAndPass.fulfilled, (state, action) => {
      if (action.payload) state.login.status = true;
      state.user = action.payload;
    });
    builder.addCase(UpdateProfile.fulfilled, (state, action) => {
      if (action.payload) state.login.status = true;
      state.user = action.payload;
    });
  },
});

export const { reload, userSignOut } = accountSlice.actions;

export default accountSlice.reducer;
