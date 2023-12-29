import React, { useState, useEffect } from 'react';

const BluetoothSyncAPIService = {
  
  BLUETOOTH_SYNC_API : 'https://randomuser.me/api/?results=100',

    sync : async() => {    
      console.log("hi there")
      const response = await fetch(BluetoothSyncAPIService.BLUETOOTH_SYNC_API);
          const data = await response.json();
          return Promise.resolve(data);
    }

  }

  export default BluetoothSyncAPIService;
  