function TransactionDetails({ transaction }) {
    return (
      <div>
        <h2>Transaction Details</h2>
        <pre>{JSON.stringify(transaction, null, 2)}</pre>
      </div>
    );
  }
