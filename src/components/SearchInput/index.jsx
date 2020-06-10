import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

/**
 * estilos usados no input utilizando o makeStyles do Material
 */
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

/*
 * input usado na home na search para procurar usuario
 */
export default function CustomSearchInput({ placeholder, submitFunction }) {
  /**
   * estado para controlar o valor digitado no input
   */

  const [usernameTextInput, setUsernameTextInput] = useState(null);

  const classes = useStyles();

  /**
   * método captura o evento de submit do input e chama o método de GET da api do github.
   * @param {HTMLFormElement} event - evento capturado do submit do form.
   */
  function handleSubmit(event) {
    if (usernameTextInput !== null) {
      // método passado por props que retorna o nome do usuário para a home
      submitFunction(usernameTextInput);
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
        onChange={(text) => setUsernameTextInput(text.target.value)}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

/**
 * validação das props recebidas do componente Home
 */
CustomSearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  submitFunction: PropTypes.func.isRequired,
};
