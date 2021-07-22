import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar as MuiAppBar, Toolbar } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { appBarHeight } from '../../../../common/shared/dimensions';
import { fetchCoins, selectCoins } from '../../../../features/coinsSlice';
import { fetchCoinCategories, selectCoinCategories } from '../../../../features/coinCategoriesSlice';
import { useCleanReduxState } from '../../../../common/hooks/useCleanReduxState';
import AppBarActions from '../molecules/AppBarActions';
import SideUtils from '../molecules/SideUtils';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
    '& .MuiToolbar-root': {
      minHeight: appBarHeight,
      justifyContent: 'space-between',
    }
  }
}));

const AppBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const coinCategories = useAppSelector(selectCoinCategories);

  useEffect(() => {
    if (coins.value.length === 0 && coins.status === 'IDLE') {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.status, coins.value.length]);

  useEffect(() => {
    if (coinCategories.value.length === 0 && coinCategories.status === 'IDLE') {
      dispatch(fetchCoinCategories());
    }
  }, [dispatch, coinCategories.value, coinCategories.status]);

  useCleanReduxState();

  return (
    <MuiAppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <AppBarActions />
        <SideUtils />
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar;
