import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { getGithubUserByUsername } from '../../api/services';
import CustomSearchInput from '../../components/SearchInput/index';
import UserCardImage from '../../components/UserCard/index';
import SadIcon from '../../assets/icons/sad.svg';

function Search({ match }) {
  /**
   * estado que salva o retorno da requisição de GET do usuario, caso status 200
   */
  const [githubUser, setGithubUser] = useState(null);

  /**
   * estado que salva o retorno da requisição de GET do usuario, caso status 200
   */
  const [usernameRouteParam, setUsernameRouteParam] = useState(null);

  /**
   * estado que salva se o usuário foi encontrado ou não
   * @type {boolean}
   */
  const [githubUserFound, setGithubUserFound] = useState(false);

  /**
   * estado que controla se o redirecionamento deve ser feito
   * @type {boolean}
   */
  const [redirectToSearchPage, setRedirectToSearchPage] = useState(false);

  /**
   * método que chama o método do service para obter o user
   */
  async function callApiToGetUser() {
    if (usernameRouteParam !== null) {
      const response = await getGithubUserByUsername(usernameRouteParam);
      if (!response.error) {
        setGithubUserFound(true);
        setGithubUser(response.data);
      } else {
        setGithubUserFound(false);
      }
    }
  }

  /**
   * hook de efeito de estado que é executado quando essa page é montada,
   * ao ser montada recebe o username da rota e seta com o state
   */
  useEffect(() => {
    const { username } = match.params;
    setUsernameRouteParam(username);
    callApiToGetUser();
  }, []);

  /**
   * hook de efeito de estado que é executado quando a usernameRouteParam recebe mudança
   * @param {string} usernameRouteParam - username do usuário que vem pela rota
   */
  useEffect(() => {
    callApiToGetUser();
  }, [usernameRouteParam]);

  /**
   * componente que faz o redirect caso haja o submit do user
   * @type {JSX.Element}
   */
  function redirectToSearchPageIfHadUser() {
    if (redirectToSearchPage && usernameRouteParam) {
      return <Redirect to={`/search/${usernameRouteParam}`} />;
    }
    return null;
  }

  /**
   * método que verifica o nome e faz o redirecionamento para a pagina de busca
   * @param {string} username - nome do usuário a ser procurado, passado do input.
   */
  function getUsernameAndRedirect(username) {
    if (username && username !== '') {
      setRedirectToSearchPage(true);
      setUsernameRouteParam(username);
    }
  }

  /**
   * função que controla a renderização de acordo com estado, verificando se o usuário foi
   * encontrado ou não, caso sim retorna o card com dados, caso não volta para tela inicial
   */
  function renderContentIfUserFound() {
    if (githubUserFound && githubUser !== null) {
      /**
       * userDataTemp é um obj para passar apenas as infos necessárias para o card
       */
      const userDataTemp = {
        name: githubUser.name,
        bio: githubUser.bio,
        avatar_url: githubUser.avatar_url,
        login: githubUser.login,
      };
      return (
        <Grid container xs={12} style={styles.containerGridStyle}>
          <UserCardImage userData={userDataTemp} />
        </Grid>
      );
    }
    return (
      <div style={styles.explainContainerStyle}>
        <Grid item xs={12} style={styles.containerGridStyle}>
          Não conseguimos encontrar um usuário com esse login!
        </Grid>
        <Grid item xs={12} style={styles.containerGridStyle}>
          <img src={SadIcon} alt="sad icon" style={styles.sadIconStyle} />
        </Grid>
      </div>
    );
  }

  /**
   * principal componente a ser renderizado (Search)
   */
  return (
    <>
      {redirectToSearchPageIfHadUser()}
      <CssBaseline />
      <Container maxWidth="sm" style={styles.containerStyle}>
        <CustomSearchInput
          placeholder="Digite um usuário para procurar"
          submitFunction={getUsernameAndRedirect}
        />
        {renderContentIfUserFound()}
      </Container>
    </>
  );
}

/**
 * objeto contendo os estilos usados nessa página
 */
const styles = {
  sadIconStyle: {
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
    fontSize: 18,
  },
  containerGridStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
};

/**
 * validação das props recebidas do componente Home
 */
Search.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(Search);
