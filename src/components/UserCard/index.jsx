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
import * as utils from '../../utils';

/**
 * estilos usados no card utilizando o makeStyles do Material
 */
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});
/*
 * Card com as infos do user qnd achado
 */
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
   * principal componente a ser renderizado (UserCardImage)
   */
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={utils.hasValidProperty(user, 'avatar_url')}
          title={utils.hasValidProperty(user, 'name')}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {utils.hasValidProperty(user, 'name')}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {utils.hasValidProperty(user, 'bio')}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/user/${utils.hasValidProperty(user, 'login')}`}
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
