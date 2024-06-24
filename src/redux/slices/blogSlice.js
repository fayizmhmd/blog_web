import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

 const initialState = {

    blogsList:[],
    isLoading:false,
    isError:false,
    errorMessage:""
 }

 export const getBlogs = createAsyncThunk("blogs/getblogs",async()=>{
    const response = await axios.get("http://localhost:3000/blogs")
    
    return response.data
 })


 export const createBlog = createAsyncThunk("blogs/createBlog",async(data)=>{
    const response = await axios.post("http://localhost:3000/blogs",data)
    
    return response.data
 })

 export const editBlog = createAsyncThunk("blogs/editBlog",async(data)=>{
    const response = await axios.patch(`http://localhost:3000/blogs/${data.id}/`,data)
    
    return response.data
 })


 export const deleteBlog = createAsyncThunk("blogs/deleteBlog",async(id)=>{
    const response = await axios.delete(`http://localhost:3000/blogs/${id}/`,)
    
    return response.data
 })

 const blogSlice = createSlice({
    name:"blogs",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getBlogs.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getBlogs.fulfilled,(state,action)=>{
            state.isLoading = false
            state.blogsList = action.payload
        })
        .addCase(getBlogs.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.error.message
            state.blogsList = action.payload
        })

        .addCase(createBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createBlog.fulfilled,(state)=>{
            state.isLoading = false
        })
        .addCase(createBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.error.message
         })

        .addCase(deleteBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteBlog.fulfilled,(state)=>{
            state.isLoading = false  
        })
        .addCase(deleteBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.error.message
         })


         .addCase(editBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(editBlog.fulfilled,(state)=>{
            state.isLoading = false  
        })
        .addCase(editBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.error.message
         })
    }
 })

 export default blogSlice.reducer