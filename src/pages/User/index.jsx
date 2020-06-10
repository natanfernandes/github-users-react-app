import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import ProfilesInfos from '../../components/ProfileInfos/index';
import RepositoryCard from '../../components/RepositoryCard/index';
import BackdropLoading from '../../components/BackdropLoading/index';
import {
  getGithubUserByUsername,
  getGithubUserRepositoriesByUsername,
} from '../../api/services';

function User({ match }) {
  /**
   * estado que salva o retorno da requisição de GET do usuario, caso status 200
   */
  const [githubUser, setGithubUser] = useState(null);

  /**
   * estado que salva o retorno da requisição de GET dos repos do usuario, caso status 200
   */
  const [githubUserRepos, setGithubUserRepos] = useState(null);

  /**
   * estado que salva o username vindo path
   * @type {string}
   */
  const [usernameRouteParam, setUsernameRouteParam] = useState(null);

  /**
   * estado que controla tela de loading enquanto a requisicao não termina
   * @type {boolean}
   */
  const [waitingForUser, setWaitingForUser] = useState(true);
  /**
   * estado que controla tela de loading enquanto a requisicao não termina
   * @type {boolean}
   */
  const [waitingForRepos, setWaitingForRepos] = useState(true);
  /**
   * estado que controla tela de loading enquanto a requisicao não termina
   * @type {boolean}
   */
  const [waitingForUserAndRepos, setWaitingForUserAndRepos] = useState(true);

  /**
   * método que chama o método do service para obter o user
   */
  async function callApiToGetUser() {
    if (usernameRouteParam !== null) {
      // controlando o loading
      setWaitingForUser(true);

      const response = await getGithubUserByUsername(usernameRouteParam);
      if (response && response.data !== undefined) {
        if (!response.error) {
          // controlando o loading
          setWaitingForUser(false);

          setGithubUser(response.data);
        } else {
          // controlando o loading
          setWaitingForUser(false);
        }
      } else {
        // controlando o loading
        setWaitingForUser(false);
      }
    }
  }
  /**
   * método que chama o método do service para obter os repositórios user
   */
  async function callApiToGetUserRepositories() {
    if (usernameRouteParam !== null) {
      // controlando o loading do user e repositório
      setWaitingForRepos(true);

      const response = await getGithubUserRepositoriesByUsername(
        usernameRouteParam
      );
      if (response && response.data !== undefined) {
        if (!response.error) {
          // controlando o loading
          setWaitingForRepos(false);

          // fazendo uma cópia do array
          let arrayOfRepos = response.data.slice();
          // ordenando por valores de stars nos repos
          arrayOfRepos.sort((repository1, repository2) => {
            const repository1Key = repository1.stargazers_count;
            const repository2Key = repository2.stargazers_count;
            return repository2Key - repository1Key;
          });
          // obtendo apenas os 4 primeiros repos com mais stars
          arrayOfRepos = arrayOfRepos.slice(0, 4);
          setGithubUserRepos(arrayOfRepos);
        }
      }
      // controlando o loading
      setWaitingForRepos(false);
    }
  }

  /**
   * hook de efeito que controla o loading do user e dos repositorios
   */
  useEffect(() => {
    if (!waitingForUser && !waitingForRepos) {
      setWaitingForUserAndRepos(false);
    } else {
      setWaitingForUserAndRepos(true);
    }
  }, [waitingForUser, waitingForRepos]);

  /**
   * hook de efeito de estado que é executado quando essa page é montada,
   * ao ser montada recebe o username da rota e seta com o state
   */
  useEffect(() => {
    const { username } = match.params;
    setUsernameRouteParam(username);
    callApiToGetUser();
    callApiToGetUserRepositories();
  }, []);

  /**
   * hook de efeito de estado que é executado quando a usernameRouteParam recebe mudança
   * @param {string} usernameRouteParam - username do usuário que vem pela rota
   */
  useEffect(() => {
    callApiToGetUser();
    callApiToGetUserRepositories();
  }, [usernameRouteParam]);

  return (
    <div style={{ flexGrow: 1 }}>
      {/* componente de loading */}
      <BackdropLoading openState={waitingForUserAndRepos} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} style={styles.containerGridStyle}>
          <ProfilesInfos githubUser={githubUser} />
        </Grid>
        <Grid container xs={12} sm={8} style={styles.containerGridRowStyle}>
          <Grid
            item
            xs={12}
            sm={12}
            style={styles.profileInfoWithIconContainerColumn}
          >
            <h3>Repositórios populares</h3>
            <Button
              variant="outlined"
              color="default"
              component={Link}
              to={`/user/${usernameRouteParam}/repos`}
            >
              Visualizar todos os repositórios de
              {` : ${usernameRouteParam}`}
            </Button>
          </Grid>
          <Grid container xs={12} sm={12} style={styles.popularReposContainer}>
            {githubUserRepos &&
              githubUserRepos.map((repo) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={styles.profileInfoWithIconContainerColumn}
                >
                  <RepositoryCard repositoryData={repo} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

/**
 * objeto contendo os estilos usados nessa página
 */
const styles = {
  userImageIconSize: {
    width: 150,
    height: 150,
  },
  userNameStyle: {
    fontWeight: 'bold',
    fontSize: 21,
    margin: 5,
  },
  anotherInfosStyle: {
    fontWeight: 'semi-bold',
    fontSize: 18,
    margin: 5,
  },
  anotherInfosStyleBold: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5,
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
    display: 'flex',
    flexDirection: 'column',
    minHeight: 200,
  },
  containerGridRowStyle: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileInfoWithIconContainer: {
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    margin: 5,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  popularReposContainer: {
    alignItems: 'center',
    textAlign: 'center',
    margin: 5,
  },
  profileInfoWithIconContainerColumn: {
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  paperInfoStyle: {
    backgroundColor: '#f7f7f7',
    padding: 18,
    minWidth: 90,
    margin: 5,
  },
};

/**
 * validação das props
 */
User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default withRouter(User);
