import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currentUser:null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{ //reducers are basically logics and function
        signInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        
        signInSuccess:(state,action)=>{ //action is the response that we will add later
            state.currentUser=action.payload //the user data is payload
            state.loading=false;
            state.error=null;
        },

        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        }
    }
})

export const { signInStart, signInSuccess, signInFailure}=userSlice.actions;
export default userSlice.reducer;