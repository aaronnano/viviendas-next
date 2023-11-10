'use client';

import { 
  DateRange, 
  Range, 
  RangeKeyDict,
  DateRangePicker
} from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
  value: Range,
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
  months?: number
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates,
  months = 2
}) => {
  return ( 
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      preventSnapRefocus
      direction="horizontal"
      months={months}
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
   );
}
 
