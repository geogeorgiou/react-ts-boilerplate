import React from 'react';
import {useStateDispatch} from "./AppState";

import {CartItem} from "./AppState";

export interface AddToCartProps {
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

export function withAddToCart<OriginalProps extends AddToCartProps>(ChildComponent: React.ComponentType<OriginalProps>) {

    const AddToCartHOC = (props: Omit<OriginalProps, keyof AddToCartProps>) => {

        //retrieve the setState function using the custom hook from AppState
        const dispatch = useStateDispatch();

        //classic REDUX like dispatch action event
        const handleAddToCartClick: AddToCartProps['addToCart'] = (item)  => {
            dispatch({
                type: 'ADD_TO_CART',
                payload: { item }
            })
        }

        //thats a TS issue which needs somehow to infer the type of the props because they are being modified with Omit
        return <ChildComponent {...props as OriginalProps} addToCart={handleAddToCartClick}/>
    };


    return AddToCartHOC;

}

//HOC with Render props pattern
//React doesnt like getting function for props and return a JSX element so we must write our implementation
export const WithAddToCartProps: React.FC<{
    children: (props: AddToCartProps) => JSX.Element;
}> = ({ children }) => {

    //cross cutting logic added here
    const dispatch = useStateDispatch();
    const addToCart: AddToCartProps['addToCart'] = (item) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                item,
            },
        });
    };
    return children({ addToCart });
};
