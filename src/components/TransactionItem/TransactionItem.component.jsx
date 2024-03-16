import React, { useState } from 'react';

import TransactionDetailPopup from '../TransactionDetailsPopup/TransactionDetailsPopup.component'

import './transaction-item.scss';

export default function TransactionItem({ transaction }) {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="transaction-item" onClick={togglePopup}>
            <div>
                <strong>Transaction Index:</strong> {transaction.transactionIndex}
            </div>
            <div>
                <strong>Value:</strong> {parseInt(transaction.value._hex, 16)} ETH
            </div>
            <div>
                <strong>Gas Price:</strong> {parseInt(transaction.gasPrice._hex, 16)} Gwei
            </div>
            <div>
                <strong>From:</strong> {truncateAddress(transaction.from)}
            </div>
            <div>
                <strong>To:</strong> {truncateAddress(transaction.to)}
            </div>
            {showPopup && <TransactionDetailPopup transaction={transaction} togglePopup={togglePopup} />}
        </div>
    );
}

// Helper function to truncate Ethereum addresses for display
function truncateAddress(address) {
  if (!address) return '';
  return address.slice(0, 8) + '...' + address.slice(-8);
}
