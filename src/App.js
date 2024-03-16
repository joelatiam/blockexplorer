import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import TransactionList from './components/TransactionList/TransactionList.component';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [latestBlockNumber, setlatestBlockNumber] = useState(undefined);

  useEffect(() => {
    async function getBlockNumber() {
      const block = await alchemy.core.getBlockNumber();
      setlatestBlockNumber(block);
    }

    getBlockNumber();
  });


  return (
          <div className="App">
            <h2>{ latestBlockNumber ? `Latest Block Number: ${latestBlockNumber}`: 'Loading Latest Block' }</h2>
            <hr/>
            <TransactionList alchemy={alchemy} blockNumber={latestBlockNumber} />
          </div>
        );
}

export default App;
