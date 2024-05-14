import React from 'react';

import TicketList from './components/TicketPage/TicketPage';

import * as styles from './styles/styles.sass';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <TicketList />
    </div>
  );
}

export default App;
