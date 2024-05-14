import React, { useState } from 'react';

import classNames from 'classnames';

import * as styles from './Filter.module.sass';

interface TicketFilterProps {
    onFilterChange: (stops: number | null) => void;
}

const filterOptions = [
    { title: 'Всі', value: null },
    { title: 'Без пересадок', value: 0 },
    { title: '1 пересадка', value: 1 },
    { title: '2 пересадки', value: 2 },
    { title: '3 пересадки', value: 3 },
]

const Filter: React.FC<TicketFilterProps> = ({ onFilterChange }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleFilterChange = (stops: number | null) => {
        onFilterChange(stops);
        setSelectedOption(stops);
    };

    return (
        <div className={styles.filter}>
            <h4 className={styles.filter__title}>
                КІЛЬКІСТЬ ПЕРЕСАДОК</h4>
            <ul className={styles.filter__list}>
                {filterOptions.map((option) => (
                    <li className={classNames([
                        styles.filter__item,
                        { [styles.filter__item_active]: selectedOption === option.value },
                    ])}
                        key={option.value}>
                        <label className={styles.filter__itemWrap}>
                            <input
                                type="radio"
                                name="stopsFilter"
                                value={option.value !== null ? option.value.toString() : ''}
                                onChange={() => handleFilterChange(option.value)}
                            />
                            {option.title}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filter;
