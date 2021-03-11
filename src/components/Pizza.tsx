import React from 'react';

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

    return <li>
        <h2>{pizza.name}</h2>
        <p>{pizza.description}</p>
        <p>{pizza.price}</p>
    </li>
}

export default Pizza;