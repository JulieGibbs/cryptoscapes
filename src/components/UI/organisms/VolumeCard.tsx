import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { CardHeader } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import CardLayout from '../molecules/CardLayout';
import { useAppSelector } from '../../../app/hooks';
import { selectGlobalCoinData } from '../../../features/globalCoinDataSlice';
import { shortenNumber } from '../../../common/helpers/shortenNumber';

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    height: '100%',
    width: '100%',
    marginTop: -35,
  }
}));

const VolumeCard: React.FC = () => {
  const classes = useStyles(0);

  const globalCoinData = useAppSelector(selectGlobalCoinData);

  return (
    <CardLayout>
      <CardHeader
        title="Total Volume"
        titleTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
        subheader={
          globalCoinData.value !== null ?
            `US$${shortenNumber(globalCoinData.value.totalVolume.usd)}` :
            <Skeleton animation="wave" height={32} width={50} />
        }
        subheaderTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
      />
      <div className={classes.chartWrapper}>

      </div>
    </CardLayout>
  )
}

export default VolumeCard