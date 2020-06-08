import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

/**
 * estilos usados no card utilizando o makeStyles do Material
 */
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function UserCardImage({ userData }) {
  /**
   * estado que controla os dados do user recebidos via props
   */
  const [user, setUser] = useState(null);

  const classes = useStyles();

  /**
   * hook de efeito que identifica sempre que há alguma mudança na props userData
   */
  useEffect(() => {
    setUser(userData);
  }, [userData]);

  /**
   * método que retorna o avatar se o user for válido
   */
  function returnUserImage() {
    if (user) {
      return user.avatar;
    }
    return null;
  }

  /**
   * método que retorna o nome se o user for válido
   */
  function returnUserName() {
    if (user) {
      return user.name;
    }
    return null;
  }

  /**
   * método que retorna a bio se o user for válido
   */
  function returnUserBio() {
    if (user) {
      return user.bio;
    }
    return null;
  }

  /**
   * método que retorna o login ou username se o user for válido
   */
  function returnUserLogin() {
    if (user) {
      return user.login;
    }
    return null;
  }

  /**
   * principal componente a ser renderizado (UserCardImage)
   */
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={returnUserImage()}
          title={returnUserName()}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {returnUserName()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {returnUserBio()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/user/${returnUserLogin()}`}
          color="primary"
        >
          Ver perfil
        </Button>
      </CardActions>
    </Card>
  );
}

/**
 * validação das props recebidas do componente Home
 */
UserCardImage.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
};
