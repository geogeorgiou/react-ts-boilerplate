import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./store";

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

const LOAD_REQUEST = 'userEvents/load_request';

interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {}

const LOAD_SUCCESS = 'userEvents/load_success';

interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
  payload: {
    events: UserEvent[];
  };
}

const LOAD_FAILURE = 'userEvents/load_failure';

interface LoadFailureAction extends Action<typeof LOAD_FAILURE> {
  error: string;
}

export const loadUserEvents = (): ThunkAction<
    void, //return type
    RootState, //state
    undefined, //extra argument
    LoadRequestAction | LoadSuccessAction | LoadFailureAction
> => async (dispatch,getState) => {

    dispatch({
        type: LOAD_REQUEST
    });

    try {
        const response = await fetch('http://localhost:3001/events');

        const events: UserEvent[] = await response.json();

        dispatch({
            type: LOAD_SUCCESS,
            payload: { events }
        });

    } catch (e) {

        dispatch({
            type: LOAD_FAILURE,
            error: 'Failed to load events.'
        });
    }
}

const initialState: UserEventsState = {
    byIds: {},
    allIds: []
}

const userEventsReducer = (
    state: UserEventsState = initialState,
    action: LoadSuccessAction
) => {

    switch (action.type) {

        case LOAD_SUCCESS:
            const { events } = action.payload;
            return {
                ...state,
                allIds: events.map(({ id }) => id),
                byIds: events.reduce<UserEventsState['byIds']>((byIds, event) => {
                    byIds[event.id] = event;
                    return byIds;
                }, {})
            };
        // case (LOAD_REQUEST)
        // case (LOAD_FAILURE):
        //     return {
        //
        //     }

        default:
            return state;
    }

};


export default userEventsReducer;