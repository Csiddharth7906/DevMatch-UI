import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeUserFromFeed: (state, action) => {
            const newFeed = state.filter(user => user._id !== action.payload);
            return newFeed.length > 0 ? newFeed : null; // Return null if no
            
        }
    }
})

export const { addFeed ,removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;