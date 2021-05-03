import React from 'react'
import {Typography, Grid, Card, CardContent, CardActions, CardMedia} from '@material-ui/core'
import useStyles from './styles';

const CardItem = ({item}) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                {/* line_total : price of that item * no of that particular item (quantity) ---> 30*6=180 */}
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography> 
            </CardContent>
        </Card>
    )
}

export default CardItem
