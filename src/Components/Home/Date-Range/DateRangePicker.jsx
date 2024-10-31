import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';

function DateRangeComponent() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (item) => {
    setState([item.selection]);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        value={state[0].startDate.toLocaleDateString()}
        onClick={togglePicker}
        placeholder="Early"
        className="border rounded-md p-2 cursor-pointer mr-2"
      />
      {/* <span onClick={togglePicker} className="rdrDateInput rdrDateDisplayItem cursor-pointer"> */}
        <input
          type="text"
          readOnly
          value={state[0].endDate.toLocaleDateString()}
          onClick={togglePicker}
          placeholder="Continuous"
          className="border rounded-md p-2 cursor-pointer"
        />
      {/* </span> */}
      {showPicker && (
        <div className="absolute z-10 mt-2">
          <DateRangePicker
            ranges={state}
            onChange={handleDateChange}
            className="shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default DateRangeComponent;
