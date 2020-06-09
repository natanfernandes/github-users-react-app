import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import EmailIcon from '@material-ui/icons/Email';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import * as utils from '../../utils';

/**
 * componente que contem as infos do usuário usado na User e Repos page
 */
function ProfileInfos({ githubUser }) {
  return (
    <Grid container style={styles.centerAlign}>
      <div style={styles.centerAlign}>
        <Avatar
          src={utils.hasValidProperty(githubUser, 'avatar_url')}
          style={styles.userImageIconSize}
        />
      </div>
      <Grid item xs={12} sm={12} style={styles.userNameStyle}>
        {utils.hasValidProperty(githubUser, 'name')}
      </Grid>
      <Grid item xs={12} sm={12} style={styles.anotherInfosStyle}>
        {utils.hasValidProperty(githubUser, 'bio')}
      </Grid>
      <Grid item xs={12} sm={12} style={styles.profileInfoWithIconContainer}>
        <EmailIcon />
        <div style={styles.anotherInfosStyle}>
          {utils.hasValidProperty(githubUser, 'email')}
        </div>
      </Grid>
      <Grid item xs={12} sm={12} style={styles.profileInfoWithIconContainer}>
        <PersonPinIcon />
        <div style={styles.anotherInfosStyle}>
          {utils.hasValidProperty(githubUser, 'location')}
        </div>
      </Grid>
      <Grid item xs={12} sm={12} style={styles.profileInfoWithIconContainer}>
        <Paper elevation={2} style={styles.paperInfoStyle}>
          <div style={styles.anotherInfosStyleBold}>Seguindo</div>
          <div>{utils.hasValidNumberProperty(githubUser, 'following')}</div>
        </Paper>
        <Paper elevation={2} style={styles.paperInfoStyle}>
          <div style={styles.anotherInfosStyleBold}>Seguidores</div>
          <div>{utils.hasValidNumberProperty(githubUser, 'followers')}</div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} style={styles.profileInfoWithIconContainer}>
        <Paper elevation={2} style={styles.paperInfoStyle}>
          <div style={styles.anotherInfosStyleBold}>Gists</div>
          <div>{utils.hasValidNumberProperty(githubUser, 'public_gists')}</div>
        </Paper>
        <Paper elevation={2} style={styles.paperInfoStyle}>
          <div style={styles.anotherInfosStyleBold}>Entrou em</div>
          <div>
            <Moment format="DD/MM/YYYY">
              {utils.hasValidProperty(githubUser, 'created_at')}
            </Moment>
          </div>
        </Paper>
      </Grid>
    </Grid>
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
    justifyContent: 'center',
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
  centerAlign: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'inline-block',
  },
};

/**
 * validação das props
 */
ProfileInfos.propTypes = {
  githubUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};
export default ProfileInfos;
