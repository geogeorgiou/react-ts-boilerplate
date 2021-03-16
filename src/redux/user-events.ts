import {AnyAction} from "redux";

interface UserEvent {
    id: number;
    title: string;
    dateStart: string;
    dateEnd: string;
}

//NORMALISING DATA

//functionality to expose with our reducer

interface UserEventsState {
    byIds: Record<UserEvent['id'], UserEvent>;
    allIds: UserEvent['id'][];
}

const initialState: UserEventsState = {
    byIds: {},
    allIds: []
}

const userEventsReducer = (state: UserEventsState = initialState, action: AnyAction) => {

    switch (action.type) {
        default:
            return state;
    }

};


export default userEventsReducer;