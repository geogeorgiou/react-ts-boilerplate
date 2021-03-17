import React, {useEffect, useRef, useState} from 'react';
import {deleteUserEvent, updateUserEvent, UserEvent} from "../../redux/user-events";
import {useDispatch} from "react-redux";

interface Props {
    event: UserEvent;
}

const EventItem: React.FunctionComponent<Props> = ({event}) => {

    const dispatch = useDispatch();

    const handleDeleteClick = () => {
        dispatch(deleteUserEvent(event.id));
    }

    const [editable, setEditable] = useState(false);

    const handleTitleClick = () => {
        setEditable(true);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    //focus is a side effect so we ll focus on useEffect
    useEffect(() => {

        if (editable) {

            //The optional chaining operator (?) provides a way to simplify accessing values
            // through connected objects when it's possible that a reference or function may be undefined or null.
            inputRef.current?.focus();

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editable])

    const [title, setTitle] = useState(event.title);

    //so it's change event and not ChangeEventHandler...
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setTitle(e.target.value);
    }


    const handleBlur = (e:  React.FocusEvent<HTMLInputElement>) => {

        //if user actually changes the original event title
        //disable focus and re-render as span and dispatch update action
        if (title !== event.title) {

            dispatch(updateUserEvent({
                ...event,
                title
            }));

        }

        setEditable(false);


    }

    return (
        <div className="calendar-event">
            <div className="calendar-event-info">
                <div className="calendar-event-time">10:00 - 12:00</div>
                <div className="calendar-event-title">
                    {
                        editable ?
                            (
                                <input
                                    type="text"
                                    ref={inputRef}
                                    value={title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />)
                            :
                            (
                                <span
                                    onClick={handleTitleClick}>
                                    {event.title}
                                </span>
                            )
                    }
                </div>
            </div>
            <button className="calendar-event-delete-button" onClick={handleDeleteClick}>
                &times;
            </button>
        </div>
    )
};

export default EventItem;