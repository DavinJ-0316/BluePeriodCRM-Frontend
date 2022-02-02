import { Tab, Box, Divider } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import styles from './TabFilter.module.scss';

export interface IFilter {
    name: string;
    filterEventHandler?: () => void;
    children?: React.ReactNode;
}

interface ITabFilter {
    filter: IFilter[];
}

const TabFilter: React.FC<ITabFilter> = (props) => {
    const { filter } = props;
    const [value, setValue] = useState(filter[0].name);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const buttons = filter.map((e) => (
        <Tab
            className={styles.buttonGroup}
            disableRipple
            label={e.name}
            value={e.name}
            key={e.name}
            onClick={e.filterEventHandler}
            sx={{ textTransform: 'capitalize' }}
        />
    ));

    const content = filter.map((e) =>
        e.children ? (
            <TabPanel key={e.name} value={e.name} className={styles.tabfilter}>
                {e.children}
            </TabPanel>
        ) : (
            false
        ),
    );

    return (
        <Box sx={{ width: '100%' }} className={styles.buttonGroup}>
            <TabContext value={value}>
                <TabList
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                    textColor="inherit"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: '#08192d',
                        },
                    }}
                >
                    {buttons}
                </TabList>
                <Divider />
                {content}
            </TabContext>
        </Box>
    );
};

export default TabFilter;
