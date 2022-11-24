import { forwardRef } from 'react';
import PropTypes from 'prop-types';
// material
import {
  Slide,
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

// ----------------------------------------------------------------------

DialogMoreDetail.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleClickOpen: PropTypes.func,
  excFunc: PropTypes.func,
};

// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

// ----------------------------------------------------------------------

export default function DialogMoreDetail({ open, handleClose, title, message }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-slide-title">{!!title ? title : 'Thông báo'}</DialogTitle>
        <DialogContent >{message}</DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
