import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

/*
 * snack de erro
 */
export default function ErrorSnackbar({ snackMessage, openState }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  /*
   * hook de efeito detecta mudança na props e seta a msg
   */
  useEffect(() => {
    setMessage(snackMessage);
  }, [snackMessage]);

  /*
   * hook de efeito detecta mudança na props e abre ou fecha a msg
   */
  useEffect(() => {
    setOpen(openState);
  }, [openState]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
/**
 * validação das props recebidas do componente Home
 */
ErrorSnackbar.propTypes = {
  snackMessage: PropTypes.string.isRequired,
  openState: PropTypes.bool.isRequired,
};
