import React, { useEffect, useState } from "react";
import "./Footer.css";

const getTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let hourPostFix = "AM";
  let min = date.getMinutes();
  if (hour >= 12) {
    hour -= 12;
    hourPostFix = "PM";
  }
  if (hour === 0) {
    hour = 12;
  }
  if (min < 10) {
    min = "0" + min;
  }
  return `${hour}:${min} ${hourPostFix}`;
};

const getDate = (month, year) => {
  const date = new Date(year, month, 1);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const firstDay = date.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return {
    month: monthNames[month],
    year: year,
    day: new Date().getDate(),
    firstDay,
    daysInMonth,
    monthNames,
  };
};

const setClockAngles = () => {
  const hourHand = document.querySelector(".hour");
  const minuteHand = document.querySelector(".minute");
  const secondHand = document.querySelector(".second");

  if (!hourHand || !minuteHand || !secondHand) return;

  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const minutes = now.getMinutes();
  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
};

const Footer = () => {
  const [time, setTime] = useState(getTime);
  const [date, setDate] = useState(getDate(new Date().getMonth(), new Date().getFullYear()));
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
      setClockAngles();
    }, 1000);
    setClockAngles(); // Call it initially to set the time immediately
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const currentDate = new Date();
      setDate(getDate(currentDate.getMonth(), currentDate.getFullYear()));
      setSelectedDay(currentDate.getDate());
      setClockAngles(); // Set clock angles when the window becomes visible
    }
  }, [isVisible]);

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    const monthIndex = date.monthNames.indexOf(newMonth);
    setDate(getDate(monthIndex, date.year));
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    setDate(getDate(date.monthNames.indexOf(date.month), newYear));
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const countDays = () => {
    const numbers = [];
    for (let i = 0; i < date.firstDay; i++) {
      numbers.push(<li key={`empty-${i}`}></li>);
    }
    for (let i = 1; i <= date.daysInMonth; i++) {
      numbers.push(
        <li key={i} className={`nums ${i === selectedDay ? "Today" : ""}`} onClick={() => handleDayClick(i)}>
          {i}
        </li>
      );
    }
    return numbers;
  };


  const renderDialLines = () => {
    const lines = [];
    for (let i = 0; i < 60; i++) {
      const isHourMark = i % 5 === 0;
      lines.push(
        <div
          className={isHourMark ? "diallines hour-mark" : "diallines"}
          key={i}
          style={{ transform: `rotate(${6 * i}deg)` }}
        ></div>
      );
    }
    return lines;
  };
  return (
    <>
      <div className="footer taskBar">
        <div className="start">
          <img src="../../images/download (14).png" alt="" />
        </div>
        <div className="clock">
          <div className="footer-icon">
            <img src="../../images/download (11).png" alt="" />
          </div>
          <div className="footer-icon">
            <img src="../../images/download (12).png" alt="" />
          </div>
          <div className="footer-icon">
            <img src="../../images/download (13).png" alt="" />
          </div>
          <div className="footer-clock">
            <span onClick={() => setIsVisible(!isVisible)}>{time}</span>
            {isVisible && (
              <div className="dateTime">
                <div className="title-bar timeDate-menu">
                  <h2 className="title-bar-text">Date and Time Properties</h2>
                  <div className="title-bar-controlx">
                    <button className="minimize title-btn"></button>
                    <button className="maxmize title-btn"></button>
                    <button
                      onClick={() => setIsVisible(!isVisible)}
                      className="close title-btn"
                    ></button>
                  </div>
                </div>
                <div className="window-body">
                  <menu className="tabList">
                    <button>Date & Time</button>
                    <button>Time Zone</button>
                    <button>Internet Time</button>
                  </menu>
                  <article className="tabPanel" id="DateTime">
                    <fieldset className="date">
                      <legend>Date</legend>
                      <div className="monthYear">
                        <select
                          name="month"
                          id="month"
                          value={date.month}
                          onChange={handleMonthChange}
                        >
                          {date.monthNames.map((month, index) => (
                            <option key={index} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                        <select
                          name="year"
                          id="year"
                          value={date.year}
                          onChange={handleYearChange}
                        >
                          {Array.from({ length: 20 }, (_, i) => 2005 + i).map(
                            (year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="calendar">
                        <ul className="day-list">
                          <li>Su</li>
                          <li>Mo</li>
                          <li>Tu</li>
                          <li>We</li>
                          <li>Th</li>
                          <li>Fr</li>
                          <li>Sa</li>
                        </ul>
                        <ul className="date-list">{countDays()}</ul>
                      </div>
                    </fieldset>
                    <fieldset className="watch">
                      <legend>Time</legend>
                      <div className="analogClock">
                        <div className="center"></div>
                        <div className="Clock">
                          <div className="hour"></div>
                          <div className="minute"></div>
                          <div className="second"></div>
                        </div>
                        {renderDialLines()}
                      </div>
                    </fieldset>
                  </article>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
