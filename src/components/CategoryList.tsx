import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory, fetchTotalCategories, categorySlice } from '../store/categorySlice';

import DataTable, { TableStyles } from 'react-data-table-component';
import { AppDispatch, RootState } from '../store/store';
import ErrorComp from './ErrorComp';

const customStyles: TableStyles = {
    header: {
        style: {
            fontSize: '36px',
            textAlign: 'center',
            minHeight: '56px',
            marginBlock: '50px 20px',
        },
    },
    headRow: {
        style: {
            minHeight: '56px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#E5E5E5',
        },
    },
};

const CategoryList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.categories.items);
    const status = useSelector((state: RootState) => state.categories.status);
    const totalItems = useSelector((state: RootState) => state.categories.totalItems);

    const [page, setPage] = React.useState(0);
    const [size, setSize] = React.useState(10);

    useEffect(() => {
        if (!totalItems) return;
        dispatch(fetchCategories({ page, size }));
    }, [page, size, totalItems]);
    
    useEffect(() => {
        dispatch(fetchTotalCategories());
    }, []);

    const handleDelete = (id: number) => {
        dispatch(deleteCategory(id))
            .unwrap()
            .then(() => {
                dispatch(fetchTotalCategories())
            }).catch((e) => console.log(e));

    };

    const columns = [
        { name: 'ID', selector: (row: CategoryItem) => row.id, sortable: true, maxWidth: '50px' },
        { name: 'Name', selector: (row: CategoryItem) => row.name, sortable: true },
        { name: 'Description', selector: (row: CategoryItem) => row.description, sortable: true, grow: 3 },
        {
            name: '',
            cell: (row: CategoryItem) => (
                <button onClick={() => handleDelete(row.id)}
                    className='text-zinc-400 hover:text-red-700 hover:underline transition-all hover:pl-6 font-bold p-2'
                >Delete</button>
            ),
            grow: 1
        },
    ];

    return (
        <>
            {
                status === 'failed' ?
                    <ErrorComp text="Failed to complete the operation" cb={() => dispatch(categorySlice.actions.resetStatus())} /> :
                    <DataTable
                        title="Categories list"
                        columns={columns}
                        data={items}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        paginationServer
                        progressPending={status === 'loading'}
                        paginationTotalRows={totalItems}
                        onChangePage={(page) => {
                            setPage(page - 1)
                        }}
                        onChangeRowsPerPage={(size) => {
                            setSize(size)
                        }}
                        customStyles={customStyles}
                    />
            }
        </>

    );
};

export default CategoryList;
