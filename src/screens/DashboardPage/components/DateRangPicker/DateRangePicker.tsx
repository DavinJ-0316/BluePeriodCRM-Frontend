import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import * as React from 'react';
import { Box, TextField } from '@mui/material';
import { DateRange } from '@mui/lab/DateRangePicker';
import styles from './DateRangPicker.module.scss';

const DateRangPicker = () => {
    const [date, setDate] = React.useState<DateRange<Date | null>>([
        new Date('2022-1-11'),
        new Date('2022-1-20'),
    ]);
    return (
        <div className={styles.daterangepicker}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDateRangePicker
                    displayStaticWrapperAs="mobile"
                    className={styles['daterangepicker-container']}
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate);
                    }}
                    renderInput={(startProps, endProps) => (
                        <>
                            <TextField {...startProps} />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} />
                        </>
                    )}
                />
            </LocalizationProvider>
        </div>
    );
};

export default DateRangPicker;
