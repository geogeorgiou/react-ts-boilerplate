import React, {createContext, useContext, useState} from 'react';

interface AppStateValue {
    cart: {
        items: { id: number,name: string; price: number, quantity: number }[];
    }
}

const defaultStateValue: AppStateValue = {
    cart: {
        items: []
    }
}

export const AppStateContext = createContext(defaultStateValue);

export const AppSetStateContext = createContext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(undefined);

//implementing custom hook to use whenever we want to access setState function
export const useSetState = () => {
    const setState = useContext(AppSetStateContext);

    //typeguard for invalid set state
    if (!setState)
        throw new Error('useSetState was called outside of AppStateContext Provider');

    return setState;
}

const AppStateProvider: React.FunctionComponent = ({children}) => {

    //define here that the state will have the AppStateValue as a generic interface
    const [state, setState] = useState(defaultStateValue);

    //by passing state only and not an object with {state, setState} on each re-render no new object will be made
    //thus no re-renders for all the child components wrapped by the provider
    return (
        <AppStateContext.Provider value={state}>
            <AppSetStateContext.Provider value={setState}>
                {children}
            </AppSetStateContext.Provider>
        </AppStateContext.Provider>
    )

}

export default AppStateProvider;