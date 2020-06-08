import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomSearchInput({ placeholder, submitFunction }) {
  const [usernameTextInput, setUsernameTextInput] = useState(null);

  const classes = useStyles();

  function handleSubmit(event) {
    if(usernameTextInput !== null){
      submitFunction(usernameTextInput)
      alert('Um nome foi enviado: ' + usernameTextInput);
    }
    event.preventDefault();
  }

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <PersonIcon />
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        onChange={text => setUsernameTextInput(text.target.value)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}