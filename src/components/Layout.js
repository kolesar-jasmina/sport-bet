import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@material-ui/core';

const Layout = ({ user, handleLogout, children }) => {
  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <Box component="main">{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;