import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import * as utils from '../../utils';
/**
 * estilos usados no card utilizando o makeStyles do Material
 */
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 100,
    width: '100%',
  },
});

/*
 * card com as infos de um repositorio
 */
export default function RepositoryCard({ repositoryData }) {
  /**
   * estado que controla os dados do user recebidos via props
   */
  const [repository, setRepository] = useState(null);

  const classes = useStyles();

  /**
   * hook de efeito que identifica sempre que há alguma mudança na props repositoryData
   */
  useEffect(() => {
    setRepository(repositoryData);
  }, [repositoryData]);

  /**
   * principal componente a ser renderizado (RepositoryCard)
   */
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {utils.hasValidProperty(repository, 'name')}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="h5">
            {utils.hasValidProperty(repository, 'description')}
          </Typography>
          <Grid container xs={12} sm={12}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                <Grid
                  container
                  xs={12}
                  sm={12}
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <FiberManualRecordIcon />
                  {utils.hasValidProperty(repository, 'language')}
                </Grid>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                <Grid
                  container
                  xs={12}
                  sm={12}
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <StarIcon />
                  {utils.hasValidNumberProperty(repository, 'stargazers_count')}
                </Grid>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

/**
 * validação das props recebidas do componente Home
 */
RepositoryCard.propTypes = {
  repositoryData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    stargazers_count: PropTypes.number.isRequired,
    avatar_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
};
