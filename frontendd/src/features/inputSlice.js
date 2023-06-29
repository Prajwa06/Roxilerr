import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  input:'',
};

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addinput: (state ,action) => {
     state.input=action.payload;
    },
    removeinput: (state) => {
      state.input=null;
    },
   
  },
 
});

export const { addinput,removeinput } = inputSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.input.value)`
export const selectinput = (state) => state.input.input;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default inputSlice.reducer;
