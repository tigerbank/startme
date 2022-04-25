import React, { useState, useEffect } from "react";
import { Moment } from "moment";

import buildCalendar from "./build";
import CalendarHeader from "./header";

function Calendar({ value, onChange }: any) {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  // function isSelected(day) {
  //   return value.isSame(day, "day");
  // }

  function beforeToday(day: Moment) {
    return day.isBefore(new Date(), "day");
  }

  function isToday(day: Moment) {
    return day.isSame(new Date(), "day");
  }

  function dayStyles(day: Moment) {
    if (beforeToday(day)) return "text-[#B8B8B8]";
    // if (isSelected(day)) return "bg-[#042675] text-white";
    if (isToday(day)) return "bg-[#042675] text-white";
    return "";
  }

  return (
    <div className="w-[360px] content-center">
      <div className="flex justify-center py-3 text-[#042675] ">
        <CalendarHeader value={value} setValue={onChange} />
      </div>
      <div>
        <div className={`flex  justify-center mb-2 `}>
          {["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"].map((day, index) => (
            <div key={index} className="text-center text-[#042675] w-[50px] ">
              {day}
            </div>
          ))}
        </div>
        {calendar.map((week: any, i: number) => (
          <div key={i} className="flex">
            {week.map((day: any, index: number) => (
              <div
                key={index}
                className={`flex w-[60px]  justify-center `}
                // onClick={() => setValue(day)}
              >
                <div className={` p-2 text-sm`}>
                  <span
                    className={`${dayStyles(day)} rounded-full  m-0 px-2 py-1`}
                  >
                    {day.format("D")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
