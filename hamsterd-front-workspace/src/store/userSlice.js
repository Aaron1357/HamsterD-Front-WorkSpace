import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateMember, deleteMember, login } from "../api/login";
import { useDispatch } from "react-redux";

const asyncLogin = createAsyncThunk("userSlice/asyncLogin", async (data) => {
  //   console.log(data);
  const result = await login(data);
  console.log(result.data);
  return result.data;
});

const putMember = createAsyncThunk("userSlice/putMember", async (data) => {
  //   console.log(data);
  const result = await updateMember(data);
  console.log(result.data);
  return result.data;
});

const delMember = createAsyncThunk("userSlice/deleteMember", async (data) => {
  //   console.log(data);
  const result = await deleteMember(data);
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

    builder.addCase(putMember.fulfilled, (state, action) => {
      return state;
    });

    builder.addCase(delMember.fulfilled, (state, action) => {
      const dispatch = useDispatch();
      localStorage.clear("user");
      dispatch(userLogout());
    });
  },
});

export default userSlice;
export { asyncLogin, putMember, delMember };
export const { userSave, userLogout } = userSlice.actions;
