export class BluetoothSyncAPIService {
    
    const sync = async () => { 
      const BLUETOOTH_SYNC_API = 'https://randomuser.me/api/?results=1000';   
      const response =  await fetch(BLUETOOTH_SYNC_API);
      const data = await response.json();

      return Promise.resolve(data);

    }
    
  }
  