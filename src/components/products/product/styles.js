import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        maxWidth: '100%'
    },
    media: {
        height: 0,
        padding: '35%'
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      cartActions: {
        display: 'flex',  
        justifyContent: 'flex-end',
      },
      buttons: {
        display: 'flex',
        alignItems: 'center',
      },
}))