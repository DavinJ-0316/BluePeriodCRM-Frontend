import { useState, useEffect } from 'react';
import SearchBar from '../../../../components/SearchBar';
import { useAppDispatch } from '../../../../hooks/redux';
import styles from './ProductPageSearchBar.module.scss';
import { updateLocalFilters, cleanUpLocalFilters } from '../../../../store/slices/filterSlice';

const ProductPageSearchBar = () => {
    const [searchWords, setSearchWords] = useState<string>('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(updateLocalFilters({ field: 'productName', query: searchWords }));
        return () => {
            dispatch(cleanUpLocalFilters());
        };
    }, [dispatch, searchWords]);

    return (
        <div className={styles.searchbar}>
            <SearchBar
                placeHolder="Search by product name"
                className={styles.input}
                searchByClick={(data: string) => setSearchWords(data.toLowerCase().trim())}
            />
        </div>
    );
};

export default ProductPageSearchBar;
