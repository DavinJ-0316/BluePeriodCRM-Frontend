import * as React from 'react';
import { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ButtonPrimary from '../Button/ButtonPrimary';
import styles from './deleteConfirmation.module.scss';

interface DeleteConfirmProps {
    openPopup: boolean;
    setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    name: string;
}

const DeleteConfirmation: FC<DeleteConfirmProps> = ({ onClick, openPopup, setOpenPopup, name }) => {
    const handleClose = () => {
        setOpenPopup(false);
    };
    return (
        <Dialog open={openPopup} onClose={handleClose}>
            <DialogTitle>
                <h2>Are you sure?</h2>
            </DialogTitle>
            <DialogContent>
                <p>
                    Deleting will permanently remove <strong>{name}</strong> from the system.
                </p>
            </DialogContent>
            <DialogActions className={styles.dialogue_btnsection}>
                <ButtonPrimary
                    onClick={onClick}
                    className={styles['dialogue_btnsection-delete']}
                    type="submit"
                >
                    Delete
                </ButtonPrimary>
                <ButtonPrimary
                    onClick={handleClose}
                    className={styles['dialogue_btnsection-cancel']}
                >
                    Cancel
                </ButtonPrimary>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmation;
