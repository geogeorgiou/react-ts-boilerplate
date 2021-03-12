import React from 'react';
import PizzaCSS from './Pizza.module.css';
import {useStateDispatch} from './AppState';
import {Pizza} from "../types";


interface Props{
    pizza: Pizza
}

const PizzaItem: React.FunctionComponent<Props> = ({pizza}) => {

    //retrieve the setState function using the custom hook from AppState
    const dispatch = useStateDispatch();

    //classic REDUX like dispatch action event
    const handleAddToCartClick = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                item: {
                    id: pizza.id, name: pizza.name, price: pizza.price
                }
            }
        })
    }

    return (
        <li className={PizzaCSS.container}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <button type='button' onClick={handleAddToCartClick}>Add to Cart</button>
        </li>
    )
}

export default PizzaItem;