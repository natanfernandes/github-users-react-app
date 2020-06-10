import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
/*
 * componente de loading
 */
export default function BackdropLoading({ openState }) {
  const classes = useStyles();

  /*
   * hook de efeito detecta mudança na props e abre ou fecha o load
   */
  useEffect(() => {
    setOpen(openState);
  }, [openState]);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

/*
 * validação das props
 */
BackdropLoading.propTypes = {
  openState: PropTypes.bool.isRequired,
};
