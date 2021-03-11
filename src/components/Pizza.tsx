import React from 'react';
import PizzaCSS from './Pizza.module.css';
import {useSetState} from './AppState';

interface Pizza {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface Props{
    pizza: Pizza
}

const Pizza: React.FunctionComponent<Props> = ({pizza}) => {

    //retrieve the setState function using the custom hook from AppState
    const setState = useSetState();

    const handleAddToCartClick = () => {

        //this setState will update the state of the AppState
        //search for existing pizzas with the same id (if yes update quantity)
        //if not then simply set default value for quantity
        setState((prevState => {

            const itemExists = prevState.cart.items.find(item => {
                return item.id === pizza.id
            })

            return {
                ...prevState,
                cart: {
                    ...prevState.cart,
                    items: itemExists ? prevState.cart.items.map(item => {
                            if (item.id === pizza.id) {
                                return {
                                    ...item,
                                    quantity: item.quantity + 1
                                }
                            }
                            return item;
                        })
                        : [
                            ...prevState.cart.items,
                            {id: pizza.id, name: pizza.name, price: pizza.price, quantity: 1 }
                        ]
                }
            };
        }));
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

export default Pizza;