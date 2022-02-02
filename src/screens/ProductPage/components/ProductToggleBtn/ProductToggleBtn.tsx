import { useEffect } from 'react';
import TabFilter from '../../../../components/TabFilter';
import { cleanUpFilters, updateFilter } from '../../../../store/slices/filterSlice';
import { useAppDispatch } from '../../../../hooks/redux';

const ProductToggleBtn = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        cleanUpFilters();
        return () => {
            dispatch(cleanUpFilters());
        };
    }, [dispatch]);

    const PRODUCT_FILTER = [
        {
            name: 'All',
            filterEventHandler: () => dispatch(updateFilter({ id: 'status', query: '' })),
        },
        {
            name: 'In Stock',
            filterEventHandler: () => dispatch(updateFilter({ id: 'status', query: 'IN STOCK' })),
        },
        {
            name: 'Limited',
            filterEventHandler: () => dispatch(updateFilter({ id: 'status', query: 'LIMITED' })),
        },
        {
            name: 'Out of Stock',
            filterEventHandler: () =>
                dispatch(updateFilter({ id: 'status', query: 'OUT OF STOCK' })),
        },
    ];
    return <TabFilter filter={PRODUCT_FILTER} />;
};

export default ProductToggleBtn;
