import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import api from '../../api/index';
import CustomSearchInput from '../../components/SearchInput/index';
import UserCardImage from '../../components/UserCard/index';
import SearchPeopleIcon from '../../assets/icons/search.svg';

function Home() {
  /**
   * estado que salva o retorno da requisição de GET do usuario, caso status 200
   */
  const [githubUser, setGithubUser] = useState(null);

  /**
   * estado que salva se o usuário foi encontrado ou não
   * @type {boolean}
   */
  const [githubUserFound, setGithubUserFound] = useState(false);

  /**
   * método que faz a requisição a API do github e atribui caso sucesso a resposta no estado .
   * @param {string} username - nome do usuário a ser procurado, passado do input.
   */
  async function getGithubUserByUsername(username) {
    try {
      const response = await api.get(`/users/${username}`);
      setGithubUserFound(true);
      setGithubUser(response.data);
    } catch (error) {
      setGithubUserFound(false);
    }
  }

  /**
   * função que controla a renderização de acordo com estado, verificando se o usuário foi
   * encontrado ou não, caso sim retorna o card com dados, caso não volta para tela inicial
   */
  function renderContentIfUserFound() {
    if (githubUserFound && githubUser !== null) {
      const userDataTemp = {
        name: githubUser.name,
        bio: githubUser.bio,
        avatar: githubUser.avatar_url,
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
          Essa é uma aplicação que consome a API do GitHub e mostra dados sobre
          o usuário e seus repositórios, para saber mais sobre algum usuário
          basta digitar seu username.
        </Grid>
        <Grid item xs={12} style={styles.containerGridStyle}>
          <img
            src={SearchPeopleIcon}
            alt="happy icon"
            style={styles.searchPeopleStyle}
          />
        </Grid>
      </div>
    );
  }

  /**
   * principal componente a ser renderizado (Home)
   */
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" style={styles.containerStyle}>
        <CustomSearchInput
          placeholder="Digite um usuário para procurar"
          submitFunction={getGithubUserByUsername}
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
    fontSize: 18,
  },
  containerGridStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
};

export default Home;
