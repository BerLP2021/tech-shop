import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createCategory, fetchTotalCategories, categorySlice } from '../store/categorySlice';
import { AppDispatch, RootState } from '../store/store';
import ErrorComp from './ErrorComp';

const inputStyle = 'mb-4 px-4 py-2 border rounded-lg w-full';
const helperStyle = 'bold text-red-500 mb-4 self-start';

const CategoryForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<NewCategoryItem>();
    const dispatch = useDispatch<AppDispatch>();
    const addNewStatus = useSelector((state: RootState) => state.categories.addNewStatus);

    const onSubmit = (data: NewCategoryItem) => {
        dispatch(createCategory(data))
            .unwrap()
            .then(() => {
                dispatch(fetchTotalCategories())
            });
        reset();
    };

    return (
        <>
            {
                addNewStatus === 'failed' ? <ErrorComp text='Something went wrong' cb={() => dispatch(categorySlice.actions.resetAddNewStatus())} /> :
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full max-w-[450px] mx-auto'>
                        <input autoComplete='off' {...register('name', { required: true })} placeholder="Name" className={inputStyle} />
                        {errors.name && <span className={helperStyle}>This field is required</span>}

                        <input autoComplete='off' {...register('description', { required: true })} placeholder="Description" className={inputStyle} />
                        {errors.description && <span className={helperStyle}>This field is required</span>}

                        <input autoComplete='off' {...register('slug', { required: true })} placeholder="Slug" className={inputStyle} />
                        {errors.slug && <span className={helperStyle}>This field is required</span>}

                        <button
                            type="submit"
                            disabled={addNewStatus === 'loading'}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
                        >Create Category</button>
                    </form>
            }
        </>

    );
};

export default CategoryForm;
