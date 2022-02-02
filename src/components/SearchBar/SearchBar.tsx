import { FC, useState, ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ButtonPrimary from '../Button';
import style from './searchBar.module.scss';

interface SearchBarProps {
    placeHolder: string;
    className: string;
    searchByClick: (keyword: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ placeHolder, className, searchByClick }) => {
    const [keywords, setKeyWords] = useState('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyWords(event.target.value);
    };

    const handleSearch = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        searchByClick(keywords);
    };

    const onKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Enter') {
            event.preventDefault();
            searchByClick(keywords);
        }
    };

    return (
        <div className={style.SearchBar}>
            <Toolbar className={style.toolBar}>
                <div className={style.Search}>
                    <div className={style.searchIconWrapper}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        className={`${style.styledInputBase} ${className}`}
                        placeholder={placeHolder}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                    />
                </div>
            </Toolbar>
            <ButtonPrimary onClick={handleSearch} type="submit" className={style.Button}>
                Search
            </ButtonPrimary>
        </div>
    );
};

export default SearchBar;
