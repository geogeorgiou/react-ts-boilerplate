import React, { useRef, useState, useEffect } from 'react';
import './Recorder.css';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { start, stop, selectDateStart } from '../../redux/recorder';
import { addZero } from '../../lib/utils';
import {createUserEvent} from "../../redux/user-events";

const Recorder = () => {

  //dispatch hook to dispatch events
  const dispatch = useDispatch();

  const dateStart = useSelector(selectDateStart);
  const started = dateStart !== '';

  //NOTE we use a ref here to preserve the value between renders otherwise it won't work!
  let interval = useRef<number>(0);

  //local UI state
  const [, setCount] = useState<number>(0);

  const handleClick = () => {
    if (started) {
      window.clearInterval(interval.current);

      //create user event action
      dispatch(createUserEvent());

      //stop action
      dispatch(stop());
    } else {
      dispatch(start());
      interval.current = window.setInterval(() => {
        setCount(count => count + 1);
      }, 1000);
    }
  };

  //again to prevent mem leak clear interval on unmount
  useEffect(() => {
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);

  let seconds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;
  const hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
  seconds -= hours * 60 * 60;
  const minutes = seconds ? Math.floor(seconds / 60) : 0;
  seconds -= minutes * 60;

  return (
    <div className={cx('recorder', { 'recorder-started': started })}>
      <button onClick={handleClick} className="recorder-record">
        <span></span>
      </button>
      <div className="recorder-counter">
        {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
      </div>
    </div>
  );
};

export default Recorder;
