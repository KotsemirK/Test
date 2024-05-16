import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from './../../hooks/redux';
import { fetchTickets } from '../../redux/store/reducers/ActionCreators';

import TicketList from '../TicketList/TicketList';
import Sorter from '../Sorter/Sorter';
import Filter from '../Filter/Filter';

// import { ReactComponent as Logo } from '../../assets/images/logo.svg';

import * as styles from './TicketPage.module.sass';

const TicketPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const ticketsList = useAppSelector(state => state.ticketsReducer);

    const [startIndex, setStartIndex] = useState(0);
    const [stopsFilter, setStopsFilter] = useState<number | null>(null);
    const [sortType, setSortType] = useState<string>('cheapest');
    
    useEffect(() => {
        dispatch(
          fetchTickets({transfersNumber: null, orederBy: "cheapest", startIndex: 0}));
      }, []);

    const loadMoreItems = () => {
        setStartIndex((prevIndex) => prevIndex + 5);
        dispatch(
            fetchTickets({transfersNumber: stopsFilter, orederBy: sortType, startIndex: startIndex + 5})
        );
    };

    const handleFilterChange = (stops: number | null) => {
        setStopsFilter(stops);
        dispatch(
            fetchTickets({transfersNumber: stops, orederBy: sortType, startIndex: 0})
        );
    };

    const handleSorterChange = (sortType: string) => {
        setSortType(sortType);
        dispatch(
            fetchTickets({transfersNumber: stopsFilter, orederBy: sortType, startIndex: 0})
        );
    };

    return (
        <div className={styles.container}>
            <a href="http://localhost:9000/" className={styles.container__logoLink}>
                {/* It would be better to use ReactComponent, but 
                    the layout svg icon doesn't work correctly in the browser*/}
                {/* <Logo className={styles.container__logo} /> */}
            </a>
            <div className={styles.container__row}>
                <Filter onFilterChange={handleFilterChange} />
                <div className={styles.container__column}>
                    <Sorter onSorterChange={handleSorterChange} />
                    {ticketsList.isLoading && <div> Loading... </div>}
                    {ticketsList.error && <div> Error: Failed to load tickets! </div>}
                    {(!ticketsList.error && !ticketsList.isLoading) &&
                        <TicketList
                            canLoadMore={ticketsList.canLoadMore}
                            loadMoreItems={loadMoreItems}
                            ticketsList={ticketsList.tickets} />}
                </div>
            </div>
        </div>
    );
};


export default TicketPage;
