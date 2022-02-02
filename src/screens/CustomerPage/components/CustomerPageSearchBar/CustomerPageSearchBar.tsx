import { useState, useEffect } from 'react';
import SearchBar from '../../../../components/SearchBar';
import { useAppDispatch } from '../../../../hooks/redux';
import styles from './CustomerPageSearchBar.module.scss';
import { updateFilter, cleanUpFilters } from '../../../../store/slices/filterSlice';

const CustomerPageSearchBar = () => {
    const [searchWords, setSearchWords] = useState<string>('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(updateFilter({ id: 'fullName', query: searchWords }));
        return () => {
            dispatch(cleanUpFilters());
        };
    }, [dispatch, searchWords]);

    return (
        <div className={styles.searchbar}>
            <SearchBar
                placeHolder="Enter Customer Name"
                className={styles.styledInputBase}
                searchByClick={(data: string) => setSearchWords(data.trim())}
            />
        </div>
    );
};

export default CustomerPageSearchBar;
