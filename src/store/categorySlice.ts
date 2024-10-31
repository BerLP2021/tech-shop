import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../configs/axiosConfig';

type StatusType = 'idle' | 'loading' | 'failed';

interface CategoriesState {
    items: CategoryItem[];
    hasNext: boolean;
    totalItems: number;
    totalPages: number;
    status: StatusType
    addNewStatus: StatusType
}

const initialState: CategoriesState = {
    items: [],
    hasNext: false,
    totalItems: 0,
    totalPages: 0,
    status: 'idle',
    addNewStatus: 'idle',
};

export const fetchTotalCategories = createAsyncThunk(
    'categories/fetchTotalCategories',
    async () => {
        const response = await axiosInstance.get(`/admin/categories?page=0&size=500`);
        return response.data;
    },
);

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async ({ page, size }: { page: number; size: number }) => {
        const response = await axiosInstance.get(`/admin/categories?page=${page}&size=${size}`);
        return response.data;
    },
);

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (newCategory: { name: string; description: string; slug: string }) => {
        // return Promise.reject('Not implemented'); // для тестування ексепшенів
        const response = await axiosInstance.post('/admin/categories', newCategory);
        return response.data;
    },
);

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id: number) => {
    // return Promise.reject('Not implemented'); // для тестування ексепшенів
    await axiosInstance.delete(`/admin/categories/${id}`);
    return id;
});

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        resetAddNewStatus: (state) => {
            state.addNewStatus = 'idle';
        },
        resetStatus: (state) => {
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchTotalCategories.fulfilled,
                (state, action: PayloadAction<CategoriesState>) => {
                    state.totalItems = action.payload.items.length;
                    state.hasNext = Boolean(action.payload.items.length);
                },
            )
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<CategoriesState>) => {
                state.items = action.payload.items;
                state.hasNext = action.payload.hasNext;
                state.totalPages = action.payload.totalPages;
                state.status = 'idle';
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(createCategory.pending, (state) => {
                state.addNewStatus = 'loading';
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.addNewStatus = 'idle';
            })
            .addCase(createCategory.rejected, (state) => {
                state.addNewStatus = 'failed';
            })
            .addCase(deleteCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
                state.status = 'idle';
            })
            .addCase(deleteCategory.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default categorySlice.reducer;
