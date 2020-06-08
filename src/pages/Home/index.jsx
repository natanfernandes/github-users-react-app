import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import api from '../../api/index';
import CustomSearchInput from '../../components/SearchInput/index';
import HappyIcon from '../../assets/icons/happy.svg';

function Home() {
  /**
   * estado que salva o retorno da requisição, caso status 200
   */
  const [githubUser, setGithubUser] = useState(null);

  /**
   * método que faz a requisição a API do github e atribui caso sucesso a resposta no estado .
   * @param {string} username - nome do usuário a ser procurado, passado do input.
   */
  async function getGithubUserByUsername(username) {
    try {
      const response = await api.get(`/users/${username}`);
      console.log(response);
      setGithubUser(response);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
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
              src={HappyIcon}
              alt="happy icon"
              style={styles.happyIconStyle}
            />
          </Grid>
        </div>
      </Container>
    </>
  );
}

const styles = {
  happyIconStyle: {
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
