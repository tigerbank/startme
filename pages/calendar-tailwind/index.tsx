import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import moment, { Moment } from "moment";
import Calendar from "@/components/Calendar";

function CalendarTailwind() {
  const [value, setValue] = useState<Moment>(moment());
  return (
    <Box mt="100px" className="container">
      <div>
        <Calendar value={value} onChange={setValue} />
      </div>
    </Box>
  );
}

export default CalendarTailwind;
