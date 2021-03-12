import React from 'react';
import PizzaCSS from './Pizza.module.css';
import {Pizza} from "../types";
import {AddToCartProps, withAddToCart} from "./AddToCart";
// import { userAddToCart } from "./AddToCart";


interface Props extends AddToCartProps{
    pizza: Pizza
}

// interface Props {
//     pizza: Pizza
// }

const PizzaItem: React.FunctionComponent<Props> = ({pizza, addToCart}) => {
// const PizzaItem: React.FunctionComponent<Props> = ({pizza}) => {

    // const addToCart = userAddToCart();

    const handleAddToCartClick = () => {
        addToCart({
            id: pizza.id,
            name: pizza.name,
            price: pizza.price
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

export default withAddToCart(PizzaItem);
// export default PizzaItem;