import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * estilos usados na app bar utilizando o makeStyles do Material
 */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBarStyle: {
    backgroundColor: 'orange',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  /**
   * principal componente a ser renderizado (AppBar)
   */
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBarStyle}>
        <Toolbar>
          <Tooltip title="Voltar para página inicial">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
