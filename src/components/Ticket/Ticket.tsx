import React from 'react';

import { ITicketProps } from "../../models/ITicketProps";

import { getStopsLabel, formatNumberWithSpaceSeparator } from './helpers';

import { ReactComponent as Logo } from '../../assets/images/airline_logo.svg';

import * as styles from './Ticket.module.sass';


const Ticket: React.FC<ITicketProps> = ({ ticket }) => {
    return (
        <div className={styles.ticket}>
            <div className={styles.ticket__row}>
                <span className={styles.ticket__price}>
                    {formatNumberWithSpaceSeparator(ticket.price)} {ticket.currency}
                </span>
                {/* The svg icon from the layout have 
                a background that cannot be removed*/}
                <div className={styles.ticket__logo}><Logo /></div>
            </div>

            <div className={styles.ticket__row}>
                <div className={styles.ticket__field}>
                    <span className={styles.ticket__fieldName}>
                        {ticket.route}</span>
                    {ticket.schedule}
                </div>

                <div className={styles.ticket__field}>
                    <span className={styles.ticket__fieldName}>
                        В ДОРОЗІ</span>
                    {ticket.duration}
                </div>

                <div className={styles.ticket__field}>
                    <span className={styles.ticket__fieldName}>
                        {getStopsLabel(ticket.stops)}</span>
                    {ticket.terminals}
                </div>
            </div>

            <div className={styles.ticket__row}>
                <div className={styles.ticket__field}>
                    <span className={styles.ticket__fieldName}>
                        {ticket.reverse_route}</span>
                    {ticket.reverse_schedule}
                </div>

                <div className={styles.ticket__field}>
                    <span className={styles.ticket__fieldName}>
                        В ДОРОЗІ</span>
                    {ticket.reverse_duration}
                </div>

                <div className={styles.ticket__field}>
                    <span className={styles.ticket__fieldName}>
                        {getStopsLabel(ticket.stops)}</span>
                    {ticket.terminals}
                </div>
            </div>
        </div>
    );
};

export default Ticket;
