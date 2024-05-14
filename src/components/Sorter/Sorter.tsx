import React, { useState } from 'react';

import classNames from 'classnames';

import * as styles from './Sorter.module.sass';

interface TicketSorterProps {
  onSorterChange: (stops: string) => void;
}

const sortOptions = [
  { title: 'Найдешевший', value: 'cheapest' },
  { title: 'Найшвидший', value: 'fastest' },
  { title: 'Оптимальний', value: 'optimal' },
];

const Sorter: React.FC<TicketSorterProps> = ({ onSorterChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('cheapest');

  const handleSortChange = (value: string) => {
    setSelectedOption(value);
    onSorterChange(value);
  };

  return (
    <ul className={styles.sorter}>
      {sortOptions.map((option) => (
        <li className={classNames([
          styles.sorter__option,
          { [styles.sorter__option_active]: selectedOption === option.value },
        ])}
          key={option.value}>
          <label>
            <input type="radio"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => handleSortChange(option.value)} />
            {option.title}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Sorter;
