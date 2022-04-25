import React from "react";

function CalendarHeader({ value, setValue }: any) {
  function currMonthName() {
    return value.format("MMMM");
  }

  function currYear() {
    return value.format("YYYY");
  }
  function prevMonth() {
    return value.clone().subtract(1, "month");
  }

  function nextMonth() {
    return value.clone().add(1, "month");
  }

  return (
    <>
      <div onClick={() => setValue(prevMonth())}>
        {String.fromCharCode(171)}
      </div>
      <div className="px-10">
        {currMonthName()} {currYear()}
      </div>
      <div onClick={() => setValue(nextMonth())}>
        {String.fromCharCode(187)}
      </div>
    </>
  );
}

export default CalendarHeader;
