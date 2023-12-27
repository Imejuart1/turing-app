export class BluetoothSyncAPIService {
    public BLUETOOTH_SYNC_API = 'https://randomuser.me/api/?results=1000';
    private maxRetries = 3;
  
    constructor() {}
  
    async sync(): Promise<any> {
      try {
        // Disable the sync button during the sync process
        // Implement your logic to disable the button here
        
        let retryCount = 0;
        let response;
  
        do {
          // Make the API call using fetch
          response = await fetch(this.BLUETOOTH_SYNC_API);
  
          if (!response.ok) {
            // If the response is not OK, throw an error to trigger a retry
            throw new Error('Failed to fetch data');
          }
  
          // Parse the JSON response
          const data = await response.json();
  
          // Enable the sync button after a successful sync
          // Implement your logic to enable the button here
  
          return data.results;
        } while (++retryCount < this.maxRetries);
  
        // If the maximum number of retries is reached, display an error message
        throw new Error('Failed to sync data');
      } catch (error) {
        // Handle errors here (e.g., display an error message)
        console.error(error);
  
        // Enable the sync button after an error
        // Implement your logic to enable the button here
  
        throw error;
      }
    }
  }
  