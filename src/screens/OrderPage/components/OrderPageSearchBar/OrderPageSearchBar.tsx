import { useState, useEffect } from 'react';
import SearchBar from '../../../../components/SearchBar';
import styles from './OrderPageSearchBar.module.scss';
import { useAppDispatch } from '../../../../hooks/redux';
import { updateLocalFilters, cleanUpLocalFilters } from '../../../../store/slices/filterSlice';

const OrderPageSearchBar = () => {
    const [searchWords, setSearchWords] = useState<string>('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(updateLocalFilters({ field: 'orderId', query: searchWords }));
        return () => {
            dispatch(cleanUpLocalFilters());
        };
    }, [dispatch, searchWords]);
    return (
        <div className={styles.searchbar}>
            <SearchBar
                placeHolder="Search by Order-Id"
                className={styles.input}
                searchByClick={(data: string) => setSearchWords(data.toLowerCase().trim())}
            />
        </div>
    );
};
export default OrderPageSearchBar;
