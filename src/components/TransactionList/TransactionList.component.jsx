import React, { Fragment, useEffect, useState } from 'react';
import TransactionItem from '../TransactionItem/TransactionItem.component';
import './transaction-list.scss';

export default function TransactionList({ alchemy, blockNumber }) {
  const [currentBlockNumber, setCurrentBlockNumber] = useState(blockNumber);
  const [currentBlockHasTransactions, setCurrentBlockHasTransactions] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [warning, setWarning] = useState('');

  let timer;

  const onBlockSearchChange = (event) => {
    clearTimeout(timer);
    let searchFieldString = event.target.value;
    if (!searchFieldString.length) {
      searchFieldString = `${blockNumber}`
    }

    const parsedValue = parseInt(searchFieldString, 10);
      if (!isNaN(parsedValue)) {
        if (parsedValue <= blockNumber) {
          setWarning(''); // Reset warning if input is valid
          timer = setTimeout(() => {
            setCurrentBlockNumber(parsedValue);
          }, 500); // Adjust the delay as needed
        } else {
          setWarning(`Block number should not exceed ${blockNumber}`);
        }
      } else{
        setWarning('Invalid Block Number')
      }
  };
  
  useEffect(() => {
    async function fetchTransactions() {
      try {
        if (blockNumber && isNaN(currentBlockNumber)) {
          setCurrentBlockNumber(blockNumber);
        }
        const block = await alchemy.core.getBlockWithTransactions(currentBlockNumber);
        setTransactions(block.transactions);
        setCurrentBlockHasTransactions(!!block.transactions.length)
      } catch (error) {
        console.error('😭😭😭', error);
      }
    }

    fetchTransactions();
    return () => {
      clearTimeout(timer); // Clear the timeout on component unmount
    };
  }, [currentBlockNumber, blockNumber]);

  return (
    <div>
      <div>
        <p>Search Block</p>
        <input type="search" placeholder={blockNumber ? `<= ${blockNumber}` : ''} onChange={onBlockSearchChange} />
        <span style={{ color: 'red' }}>{warning}</span>
        <hr />
      </div>
      <div>
        <ListLoadingMessage
        transactions = {transactions}
        currentBlockNumber = {currentBlockNumber}
        currentBlockHasTransactions = {currentBlockHasTransactions}
        />
        <div className="transaction-list">
          {transactions.slice(0, 20).map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ListLoadingMessage({transactions, currentBlockHasTransactions, currentBlockNumber}){
  if(currentBlockNumber){
    if(currentBlockHasTransactions && !transactions.length){
      return (
        <p>Loanding Transactions List From Block <b>{currentBlockNumber}</b></p>
      )
    } else if(!currentBlockHasTransactions){
      return (
        <p>Block <b>{currentBlockNumber}</b> has no transaction</p>
      )
    }
    return (
      <p><b>{transactions.length}</b> Transactions in Block <b>{currentBlockNumber}</b></p>
    )
    
  }
  
  return (
    <Fragment></Fragment>
  )
}
