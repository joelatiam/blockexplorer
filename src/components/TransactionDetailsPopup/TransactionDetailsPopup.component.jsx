import React from 'react';
import './transaction-details-popup.scss'; // Import SCSS file for styling

function TransactionDetailPopup({ transaction, togglePopup }) {
  return (
    <div className="popup" onClick={togglePopup}>
      <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={togglePopup}>
          Close
        </button>
        <div>
          <strong>Data:</strong> {transaction.data}
        </div>
        <div>
          <strong>Block Hash:</strong> {transaction.blockHash}
        </div>
        <div>
          <strong>Transaction Index:</strong> {transaction.transactionIndex}
        </div>
        <div>
          <strong>Value:</strong> {transaction.value._hex}
        </div>
        <div>
          <strong>Gas Price:</strong> {transaction.gasPrice._hex}
        </div>
        <div>
          <strong>From:</strong> {transaction.from}
        </div>
        <div>
          <strong>To:</strong> {transaction.to}
        </div>
        <div>
          <strong>Nonce:</strong> {transaction.nonce}
        </div>
        <div>
          <strong>Confirmations:</strong> {transaction.confirmations}
        </div>
      </div>
    </div>
  );
}

export default TransactionDetailPopup;
