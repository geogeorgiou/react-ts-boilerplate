import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './Calendar.css';
import { RootState } from '../../redux/store';
import {
  selectUserEventsArray,
  loadUserEvents,
  UserEvent, deleteUserEvent
} from '../../redux/user-events';
import { addZero } from '../../lib/utils';
import EventItem from "./EventItem";

const mapState = (state: RootState) => ({
  events: selectUserEventsArray(state)
});

const mapDispatch = {
  loadUserEvents,
  deleteUserEvent
};

const connector = connect(mapState, mapDispatch);

//we need a generic way to extract props from redux (via Connected Props!)
type PropsFromRedux = ConnectedProps<typeof connector>;

//then connect those props to an interface we can use
interface Props extends PropsFromRedux {}

const createDateKey = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${year}-${addZero(month)}-${addZero(day)}`;
};

const groupEventsByDay = (events: UserEvent[]) => {
  const groups: Record<string, UserEvent[]> = {};

  const addToGroup = (dateKey: string, event: UserEvent) => {
    if (groups[dateKey] === undefined) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(event);
  };

  events.forEach(event => {
    const dateStartKey = createDateKey(new Date(event.dateStart));
    const dateEndKey = createDateKey(new Date(event.dateEnd));

    addToGroup(dateStartKey, event);

    if (dateEndKey !== dateStartKey) {
      addToGroup(dateEndKey, event);
    }
  });

  return groups;
};

const Calendar: React.FC<Props> = ({ events, loadUserEvents, deleteUserEvent }) => {

  useEffect(() => {
    loadUserEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //get type of grouped events
  let groupedEvents: ReturnType<typeof groupEventsByDay> | undefined;
  let sortedGroupKeys: string[] | undefined;

  if (events.length) {
    groupedEvents = groupEventsByDay(events);

    //compare dates by converting them to UNIX timestamps (DESC order)
    sortedGroupKeys = Object.keys(groupedEvents).sort(
      (date1, date2) => +new Date(date2) - +new Date(date1)
    );
  }

  return groupedEvents && sortedGroupKeys ? (
    <div className="calendar">
      {sortedGroupKeys.map(dayKey => {

        // Assert that groupEvents is defined and dateKey property
        // const events = groupedEvents![dateKey];

        const events = groupedEvents ? groupedEvents[dayKey] : [];
        const groupDate = new Date(dayKey);
        const day = groupDate.getDate();
        const month = groupDate.toLocaleString(undefined, { month: 'long' });

        return (
          <div className="calendar-day">
            <div className="calendar-day-label">
              <span>
                {day} {month}
              </span>
            </div>
            <div className="calendar-events">
              {events.map(event => {
                 return <EventItem key={`event_${event.id}`} event={event}/>
              })}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default connector(Calendar);
