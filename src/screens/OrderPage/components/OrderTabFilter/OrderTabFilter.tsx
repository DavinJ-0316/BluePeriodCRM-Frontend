import { useEffect } from 'react';
import TabFilter from '../../../../components/TabFilter';
import { cleanUpFilters, updateFilter } from '../../../../store/slices/filterSlice';
import { useAppDispatch } from '../../../../hooks/redux';

const OrderTabFilter = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        cleanUpFilters();
        return () => {
            dispatch(cleanUpFilters());
        };
    }, [dispatch]);
    const orderFilters = [
        {
            name: 'all',
            filterEventHandler: () => dispatch(updateFilter({ id: 'status', query: '' })),
        },
        {
            name: 'canceled',
            filterEventHandler: () => dispatch(updateFilter({ id: 'status', query: 'CANCELED' })),
        },
        {
            name: 'completed',
            filterEventHandler: () => dispatch(updateFilter({ id: 'status', query: 'COMPLETED' })),
        },
        {
            name: 'pending',
            filterEventHandler: () => dispatch(updateFilter({ id: 'status', query: 'PENDING' })),
        },
        {
            name: 'rejected',
            filterEventHandler: () => dispatch(updateFilter({ id: 'status', query: 'REJECTED' })),
        },
    ];

    return <TabFilter filter={orderFilters} />;
};

export default OrderTabFilter;
