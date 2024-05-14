import React, { useState, useEffect } from 'react';

import { ticketsApi } from "../../services/TicketsService";

import { ITicket } from '../../models/ITicket';

import TicketList from '../TicketList/TicketList';
import Sorter from '../Sorter/Sorter';
import Filter from '../Filter/Filter';

import { getSortedTickets } from './helpers';

// import { ReactComponent as Logo } from '../../assets/images/logo.svg';

import * as styles from './TicketPage.module.sass';

const TicketPage: React.FC = () => {
    const [displayedItems, setDisplayedItems] = useState<ITicket[]>([]);
    const [sortedTickets, setSortedTickets] = useState<ITicket[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [stopsFilter, setStopsFilter] = useState<number | null>(null);
    const [sortType, setSortType] = useState<string>('cheapest');

    const { data: tickets, isLoading, error } = ticketsApi.useGetTicketsQuery({
        stops: stopsFilter === null ? undefined : stopsFilter
    });

    useEffect(() => {
        if (tickets) {
            const sortedList = getSortedTickets(tickets, sortType);
            const initialItems = sortedList.slice(0, 5);
            setSortedTickets(sortedList);
            setDisplayedItems(initialItems);
            setStartIndex(5);
        }
    }, [tickets, sortType]);

    const loadMoreItems = () => {
        const nextItems = sortedTickets.slice(startIndex, startIndex + 5);
        setDisplayedItems((prevItems) => [...prevItems, ...nextItems]);
        setStartIndex((prevIndex) => prevIndex + 5);
    };

    const handleFilterChange = (stops: number | null) => {
        setStopsFilter(stops);
    };

    const handleSorterChange = (sortType: string) => {
        setSortType(sortType);
    };

    const canLoadMore = tickets && displayedItems.length < tickets.length;

    return (
        <div className={styles.container}>
            <a href="http://localhost:9000/" className={styles.container__logoLink}>
                {/* Правильно було б використати ReactComponent,
                але нажаль сама іконка svg працює некоректно в браузері*/}
                {/* <Logo className={styles.container__logo} /> */}
            </a>
            <div className={styles.container__row}>
                <Filter onFilterChange={handleFilterChange} />
                <div className={styles.container__column}>
                    <Sorter onSorterChange={handleSorterChange} />
                    {isLoading && <div> Loading... </div>}
                    {error && <div> Error: Failed to load tickets! </div>}
                    {(!error && !isLoading) &&
                        <TicketList
                            canLoadMore={canLoadMore}
                            loadMoreItems={loadMoreItems}
                            ticketsList={displayedItems} />}
                </div>
            </div>
        </div>
    );
};


export default TicketPage;
