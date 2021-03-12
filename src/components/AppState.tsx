import React, {createContext, useContext, useEffect, useReducer} from 'react';

//setup a reusable item shared across the interfaces in AppState
export interface CartItem { id: number,name: string; price: number, quantity: number; }

interface AppStateValue {
    cart: {
        items: CartItem[];
    };
}

const defaultStateValue: AppStateValue = {
    cart: {
        items: []
    }
};

export const AppStateContext = createContext(defaultStateValue);

export const AppDispatchContext = createContext<React.Dispatch<AddToCartAction> | undefined>(undefined);

interface Action<T> {
    type: T;
}

interface InitializeCartAction extends Action<'INITIALIZE_CART'> {
    payload: {
        cart: AppStateValue['cart']
    }
}

//IMPORTANT! Since we handle the quantity property in the reducer
//the add CartItem payload should not have quantity
interface AddToCartAction extends Action<'ADD_TO_CART'> {
    payload: {
        item: Omit<CartItem, 'quantity'>
    }
}


//Redux like logic
//reducer function that exists to update the AppState state when update action is dispatched
//when multiple Actions are possible we will use a union to describe this action
const reducer = (
    state: AppStateValue,
    action: AddToCartAction | InitializeCartAction
) => {

    if (action.type === 'ADD_TO_CART') {

        const itemToAdd = action.payload.item;

        //this snippet will update the state of the AppState
        //search for existing pizzas with the same id in the payload (if yes update quantity)
        //if not then simply set default value for quantity
        const itemExists = state.cart.items.find(item => {
            return item.id === itemToAdd.id
        });


        return {
            ...state,
            cart: {
                ...state.cart,
                items: itemExists ? state.cart.items.map(item => {
                        if (item.id === itemToAdd.id) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            }
                        }
                        return item;
                    })
                    : [
                        ...state.cart.items,
                        {...itemToAdd, quantity: 1}
                    ]
            }
        };

    } else if (action.type === 'INITIALIZE_CART') {

        return {
            ...state,
            cart: action.payload.cart
        };

    }

    return state;

}


//implementing custom hook to use whenever we want to access setState function
export const useStateDispatch = () => {
    const dispatch = useContext(AppDispatchContext);

    //typeguard for invalid set state
    if (!dispatch)
        throw new Error('useDispatchState was called outside of AppStateContext Provider');

    return dispatch;
}

const AppStateProvider: React.FunctionComponent = ({children}) => {

    //define here that the reducer state will hold AppStateValue as a generic interface
    const [state, dispatch] = useReducer(reducer, defaultStateValue);

    //IMPORTANT NOTE THE ORDER OF THE USE EFFECTS DOES MATTER

    //loadCart Data from LS on init
    useEffect(() => {

        const cart = window.localStorage.getItem('cart');

        if (cart) {
            dispatch({type: 'INITIALIZE_CART', payload: {cart: JSON.parse(cart)}})
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //store state to localStorage when rendering
    useEffect(() => {

        window.localStorage.setItem('cart', JSON.stringify(state.cart));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.cart]);


    //by passing state only and not an object with {state, setState} on each re-render no new object will be made
    //thus no re-renders for all the child components wrapped by the provider
    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    )

}

export default AppStateProvider;