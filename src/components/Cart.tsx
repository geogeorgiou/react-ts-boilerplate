import React, {createRef} from 'react';

import {FiShoppingCart} from 'react-icons/fi';
import CartCSS from './Cart.module.css';
import {AppStateContext} from "./AppState";

interface Props {}

interface State {
    isOpen: boolean
}

class Cart extends React.Component<Props, State> {

    #containerRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false
        }
        // this.handleClick = this.handleClick.bind(this);

        this.#containerRef = createRef();
    }

    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // console.log(e.target)
        // if ((e.target as HTMLElement).nodeName === 'SPAN') {
        //     (e.target as HTMLSpanElement).
        // }
        this.setState((prevState) => ({isOpen: !prevState.isOpen}));
    }

    handleOutsideClick = (e: MouseEvent) => {
        document.addEventListener('mousedown', (e) => {

            //we know by Node DOM definitions that Node extends EventTarget
            //Node may refer to htmlelement but also to text, comment etc
            //so the order is like Node -> ... -> HTMLElement -> HTMLDivElement

            if (this.#containerRef.current &&
                !this.#containerRef.current.contains(e.target as Node)) {
                this.setState({isOpen: false});
            }
        })
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick);
    }

    //to avoid memory leaks we need to remove event listener when component unmounts
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
    }


    render() {
        return (
            <AppStateContext.Consumer>
                {(state) => {

                    //total Pizza item counter
                    const itemsCount = state.cart.items.reduce((sum, item) => {
                        return sum + item.quantity;
                    }, 0);

                    return (
                        <div className={CartCSS.cartContainer} ref={this.#containerRef}>
                            <button type="button" className={CartCSS.button} onClick={this.handleClick}>
                                <FiShoppingCart/>
                                <span>{itemsCount} pizza(s)</span>
                            </button>
                            <div className={CartCSS.cartDropDown} style={{
                                display: this.state.isOpen ? 'block' : 'none'
                            }}>
                                <ul>
                                    {
                                        state.cart.items.map(item => {
                                            return (
                                                <li key={item.id}>
                                                    {item.name} &times; {item.quantity}
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    )
                }}
            </AppStateContext.Consumer>

        )
    }

}

export default Cart;