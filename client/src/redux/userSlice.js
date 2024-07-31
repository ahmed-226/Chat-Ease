import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: "",
  name: "",
  email: "",
  profile_pic: "",
  token: "",
  editProfile: false,
  onlineUsers: [],
  socketConnections: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id
      state.name = action.payload.name
      state.email = action.payload.email
      state.profile_pic = action.payload.profile_pic
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    logout: (state, action) => {
      state._id = ""
      state.name = ""
      state.email = ""
      state.profile_pic = ""
      state.token = ""
      state.socketConnections = null
    },
    editProfileOpen: (state, action) => {
      state.editProfile = action.payload.editProfile;
    },
    setOnLineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSocketConnections: (state, action) => {
      state.socketConnections = action.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken,setSocketConnections, setOnLineUsers,logout, editProfileOpen } = userSlice.actions

export default userSlice.reducer