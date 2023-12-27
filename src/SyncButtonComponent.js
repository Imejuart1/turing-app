import React, { useState } from 'react';
import { BluetoothSyncAPIService } from './Bluetoothsync.ts'

const SyncButtonComponent = () => {
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    const bluetoothSyncService = new BluetoothSyncAPIService();

    try {
      setSyncing(true);
      const data = await bluetoothSyncService.sync();
      // Handle the data (e.g., update state, display on the UI)
      console.log(data);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error(error.message);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <button onClick={handleSync} disabled={syncing}>
      {syncing ? 'Syncing...' : 'Sync'}
    </button>
  );
};

export default SyncButtonComponent;
