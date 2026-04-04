import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <>
    <header className={classes['navbar navbar-expand-lg navbar-dark bg-dark px-4"']}>
      <Navigation />
    </header>
  </>
  );
};

export default MainHeader;