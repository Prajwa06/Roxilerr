import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  month:null,
};

export const monthSlice = createSlice({
  name: 'month',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setmonth:(state,action) =>{
      state.month=action.payload;
    },
    removemonth: (state) => {
      state.month=null;
    },
   
  },
 
});

export const { setmonth, removemonth } = monthSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.month.value)`
export const selectmonth = (state) => state.month.month;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default monthSlice.reducer;
