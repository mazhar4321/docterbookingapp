import { createSlice } from '@reduxjs/toolkit';

const createAccountSlice = createSlice({
  name: 'createAccount',
  initialState: {
    id:"",
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    avatar: null
  },
  reducers: {
    setId:(state, action)=>{
      state.id = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
        state.lastName = action.payload;
      },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setgender: (state, action) => {
      state.gender = action.payload;
    },
    setAvatar: (state, action) =>{
     state.avatar = action.payload
    }
  },
});

export const { setId,setFirstName,setLastName, setEmail, setgender , setAvatar} = createAccountSlice.actions;
export default createAccountSlice.reducer;