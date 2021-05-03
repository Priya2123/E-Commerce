import React from 'react'
import {Typography, Button, Card, CardContent, CardActions, CardMedia} from '@material-ui/core'
import useStyles from './styles';

const CardItem = ({item, handleRemoveFromCart, handleUpdateCartQty}) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h6" style={{fontStyle: 'bold'}}>{item.name}</Typography>
                {/* line_total : price of that item * no of that particular item (quantity) ---> 30*6=180 */}
                <Typography variant="h6" >{item.line_total.formatted_with_symbol}</Typography> 
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CardItem
