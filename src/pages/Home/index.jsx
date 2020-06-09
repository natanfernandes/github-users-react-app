import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import CustomSearchInput from '../../components/SearchInput/index';
import SearchPeopleIcon from '../../assets/icons/search.svg';

function Home() {
  /**
   * estado que salva o retorno da requisição de GET do usuario, caso status 200
   */
  const [githubUser, setGithubUser] = useState(null);
  /**
   * estado que controla se o redirecionamento deve ser feito
   * @type {boolean}
   */
  const [redirectToSearchPage, setRedirectToSearchPage] = useState(false);

  /**
   * componente que faz o redirect caso haja o submit do user
   * @type {JSX.Element}
   */
  function redirectToSearchPageIfHadUser() {
    if (redirectToSearchPage && githubUser) {
      return <Redirect to={`/search/${githubUser}`} />;
    }
    return null;
  }

  /**
   * método que verifica o nome e faz o redirecionamento para a pagina de busca
   * @param {string} username - nome do usuário a ser procurado, passado do input.
   */
  function getGithubUserByUsername(username) {
    if (username && username !== '') {
      setRedirectToSearchPage(true);
      setGithubUser(username);
    }
  }
  /**
   * principal componente a ser renderizado (Home)
   */
  return (
    <>
      {redirectToSearchPageIfHadUser()}
      <CssBaseline />
      <Container maxWidth="sm" style={styles.containerStyle}>
        <CustomSearchInput
          placeholder="Digite um usuário para procurar"
          submitFunction={getGithubUserByUsername}
        />
        <div style={styles.explainContainerStyle}>
          <Grid item xs={12} style={styles.containerGridStyle}>
            Essa é uma aplicação que consome a API do GitHub e mostra dados
            sobre o usuário e seus repositórios, para saber mais sobre algum
            usuário basta digitar seu username.
          </Grid>
          <Grid item xs={12} style={styles.containerGridStyle}>
            <img
              src={SearchPeopleIcon}
              alt="happy icon"
              style={styles.searchPeopleStyle}
            />
          </Grid>
        </div>
      </Container>
    </>
  );
}

/**
 * objeto contendo os estilos usados nessa página
 */
const styles = {
  searchPeopleStyle: {
    width: '50%',
    heigth: '50%',
  },
  containerStyle: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  explainContainerStyle: {
    marginTop: 50,
    fontWeight: 'semi-bold',
    fontSize: 19,
  },
  containerGridStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
};

export default Home;
