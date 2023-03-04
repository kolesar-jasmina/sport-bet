import React from 'react';
import { Container, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
    backgroundColor: '#FFFFFF',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" component="footer" className={classes.footer}>
      <Typography variant="h6" color="textPrimary" gutterBottom>
        Footer
        </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Placeholder text for footer content
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="#">
          Privacy Policy
        </Link>
        {' | '}
        <Link color="inherit" href="#">
          Terms of Service
        </Link>
        {' | '}
        <Link color="inherit" href="#">
          Contact Us
        </Link>
      </Typography>
    </Container>
  );
};

export default Footer;
