import React from 'react';

import Ticket from '../Ticket/Ticket';

import { ITicket } from '../../models/ITicket';

import * as styles from './TicketList.module.sass';


interface TicketListProps {
    ticketsList: ITicket[];
    loadMoreItems: () => void;
    canLoadMore?: boolean;
}

const TicketList: React.FC<TicketListProps> = ({
    ticketsList, 
    loadMoreItems, 
    canLoadMore}) => {

    return (
        <div className={styles.ticketList}>
            {ticketsList.map((ticket) => (
                <Ticket key={ticket.id} ticket={ticket} />
            ))}
            {canLoadMore && (
                <button className={styles.ticketList__btn} 
                    onClick={loadMoreItems}>
                    Показати ще 5 квитків
                </button>
            )}
        </div>
    );
};

export default TicketList;
