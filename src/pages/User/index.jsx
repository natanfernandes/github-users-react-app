import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Paper from '@material-ui/core/Paper';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import api from '../../api/index';
import * as userNullCheck from '../../utils/userNullCheck';

function User({ match }) {
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
   * método que faz a requisição GET de acordo com o login do user
   * caso status 200 salva os dados do user e seta como true a variavel de estado que controla se o user foi encontrado
   * caso 404 seta como false a variavel que controla se o user foi achado, mostrando msg de erro
   */
  async function getGithubUserByUsername() {
    try {
      if (usernameRouteParam !== null) {
        const response = await api.get(`/users/${usernameRouteParam}`);
        setGithubUserFound(true);
        setGithubUser(response.data);
        console.log(response);
      }
    } catch (error) {
      setGithubUserFound(false);
    }
  }

  /**
   * hook de efeito de estado que é executado quando essa page é montada,
   * ao ser montada recebe o username da rota e seta com o state
   */
  useEffect(() => {
    const { username } = match.params;
    setUsernameRouteParam(username);
    getGithubUserByUsername();
  }, []);

  /**
   * hook de efeito de estado que é executado quando a usernameRouteParam recebe mudança
   * @param {string} usernameRouteParam - username do usuário que vem pela rota
   */
  useEffect(() => {
    getGithubUserByUsername();
  }, [usernameRouteParam]);

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} style={styles.containerGridStyle}>
          <Avatar
            src={userNullCheck.returnUserImageIfUserIsValid(githubUser)}
            style={styles.userImageIconSize}
          />
          <div style={styles.userNameStyle}>
            {userNullCheck.returnUserNameIfUserIsValid(githubUser)}
          </div>
          <div style={styles.anotherInfosStyle}>
            {userNullCheck.returnUserBioIfUserIsValid(githubUser)}
          </div>
          <Grid item xs={12} sm={8} style={styles.profileInfoWithIconContainer}>
            <EmailIcon />
            <div style={styles.anotherInfosStyle}>
              {userNullCheck.returnEmailIfUserIsValid(githubUser)}
            </div>
          </Grid>
          <Grid item xs={12} sm={8} style={styles.profileInfoWithIconContainer}>
            <PersonPinIcon />
            <div style={styles.anotherInfosStyle}>
              {userNullCheck.returnLocationIfUserIsValid(githubUser)}
            </div>
          </Grid>
        </Grid>
        <Grid container xs={12} sm={8} style={styles.containerGridRowStyle}>
          <Grid
            item
            xs={12}
            sm={12}
            style={styles.profileInfoWithIconContainerColumn}
          >
            <h3>
              Alguns dados sobre :
              {userNullCheck.returnUserLoginIfUserIsValid(githubUser)}
            </h3>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={styles.profileInfoWithIconContainerColumn}
          >
            <Paper elevation={2} style={styles.paperInfoStyle}>
              <div style={styles.anotherInfosStyleBold}>Seguindo</div>
              <div>
                {userNullCheck.returnFollowingIfUserIsValid(githubUser)}
              </div>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={styles.profileInfoWithIconContainerColumn}
          >
            <Paper elevation={2} style={styles.paperInfoStyle}>
              <div style={styles.anotherInfosStyleBold}>Seguidores</div>
              <div>
                {userNullCheck.returnFollowersIfUserIsValid(githubUser)}
              </div>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={styles.profileInfoWithIconContainerColumn}
          >
            <Paper elevation={2} style={styles.paperInfoStyle}>
              <div style={styles.anotherInfosStyleBold}>Repositórios</div>
              <div>{userNullCheck.returnQtdReposIfUserIsValid(githubUser)}</div>
              <Button
                variant="outlined"
                color="default"
                component={Link}
                to={`/user/${usernameRouteParam}/repos`}
              >
                Visualizar todos
              </Button>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={styles.profileInfoWithIconContainerColumn}
          >
            <Paper elevation={2} style={styles.paperInfoStyle}>
              <div style={styles.anotherInfosStyleBold}>Gists</div>
              <div>{userNullCheck.returnQtdGistsIfUserIsValid(githubUser)}</div>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={styles.profileInfoWithIconContainerColumn}
          >
            <Paper elevation={2} style={styles.paperInfoStyle}>
              <div style={styles.anotherInfosStyleBold}>Entrou em</div>
              <div>
                <Moment format="DD/MM/YYYY">
                  {userNullCheck.returnCreatedAtIfUserIsValid(githubUser)}
                </Moment>
              </div>
            </Paper>
          </Grid>
          <Grid container xs={12} sm={12} />
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
    fontSize: 25,
    margin: 5,
  },
  anotherInfosStyle: {
    fontWeight: 'semi-bold',
    fontSize: 20,
    margin: 5,
  },
  anotherInfosStyleBold: {
    fontWeight: 'bold',
    fontSize: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    padding: 25,
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
