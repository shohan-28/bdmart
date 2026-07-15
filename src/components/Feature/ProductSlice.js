import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchProduct = createAsyncThunk(
    "product/fetchProduct",
    async()=> {
        const res = await fetch("/ProductData.json");
        return await res.json();
    }
);

const ProductSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
});

export default ProductSlice.reducer;