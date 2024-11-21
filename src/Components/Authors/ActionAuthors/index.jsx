import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';

const DateAuthor = ({ initialStartDate, initialEndDate, onDateChange, showErrorMessage }) => {
  // Utility function to ensure date parsing
  const parseDate = (date) => (date instanceof Date ? date : new Date(date));

  const [state, setState] = useState([
    {
      startDate: parseDate(initialStartDate) || new Date(),
      endDate: parseDate(initialEndDate) || addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const [showPicker, setShowPicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setState([
      {
        startDate: parseDate(initialStartDate),
        endDate: parseDate(initialEndDate),
        key: 'selection',
      },
    ]);
  }, [initialStartDate, initialEndDate]);

  const handleDateChange = (item) => {
    const startDate = parseDate(item.selection.startDate);
    const endDate = parseDate(item.selection.endDate);

    if (startDate > endDate) {
      setErrorMessage('Ngày sinh không thể lớn hơn ngày mất!');
    } else {
      setErrorMessage('');
      setState([item.selection]);
      if (onDateChange) {
        onDateChange(
          startDate.toISOString().split('T')[0], // Format YYYY-MM-DD
          endDate.toISOString().split('T')[0]
        );
      }
    }
  };

  const togglePicker = () => setShowPicker(!showPicker);

  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        value={state[0].startDate.toLocaleDateString()}
        onClick={togglePicker}
        placeholder="Start Date"
        className="border rounded-md p-2 cursor-pointer mr-2"
      />
      <input
        type="text"
        readOnly
        value={state[0].endDate.toLocaleDateString()}
        onClick={togglePicker}
        placeholder="End Date"
        className="border rounded-md p-2 cursor-pointer"
      />
      {showPicker && (
        <div className="absolute z-10 mt-2">
          <DateRangePicker
            ranges={state}
            onChange={handleDateChange}
            className="shadow-lg"
          />
        </div>
      )}
      {errorMessage && (
        <div className="text-red-600 mt-2">
          <strong>{errorMessage}</strong>
        </div>
      )}
    </div>
  );
};

export default DateAuthor;
