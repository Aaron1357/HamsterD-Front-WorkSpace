import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/login";

const asyncLogin = createAsyncThunk("userSlice/asyncLogin", async (data) => {
  //   console.log(data);
  const result = await login(data);
  console.log(result.data);
  return result.data;
});

const userSlice = createSlice({
  name: "loginSlice",
  initialState: {},
  reducers: {
    userSave: (state, action) => {
      return action.payload;
    },
    userLogout: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      // 로그인 성공시 localStorage로 해당 정보 관리
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    });
  },
});

export default userSlice;
export { asyncLogin };
export const { userSave, userLogout } = userSlice.actions;
