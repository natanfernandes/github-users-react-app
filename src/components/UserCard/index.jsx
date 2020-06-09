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
import * as userNullCheck from '../../utils/userNullCheck';
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
   * principal componente a ser renderizado (UserCardImage)
   */
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={userNullCheck.returnUserImageIfUserIsValid(user)}
          title={userNullCheck.returnUserNameIfUserIsValid(user)}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {userNullCheck.returnUserNameIfUserIsValid(user)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {userNullCheck.returnUserBioIfUserIsValid(user)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/user/${userNullCheck.returnUserLoginIfUserIsValid(user)}`}
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
