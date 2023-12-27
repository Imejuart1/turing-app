import React, { useState, useEffect } from 'react';
import BluetoothSyncAPIService from './services/bluetooth-sync-api.service';

const App = () => {
  const [contactList, setContactList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [currentPageList, setCurrentPageList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(5);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState('');
  const listId = 'page';

  useEffect(() => {
    // ComponentDidMount logic
    setTotal(filteredList.length);

    setIsLastPage(offset + count >= filteredList.length);
    setIsFirstPage(offset < count);

    if (retryCount === 2) {
      // Hint: Set error message and ensure API call is not triggered.
    }

    if (retryCount !== 0 && retryCount < 3) {
      // Hint: Call BluetoothSyncAPI service for 3 tries
    }
  }, [filteredList, offset, count, retryCount]);

  const updatePropertyState = () => {
    const newPage =
      offset > 0 ? Math.floor(offset / count) + 1 : filteredList.length > 0 ? 1 : 0;

    setTotalPages(filteredList.length > 0 ? Math.ceil(filteredList.length / count) : 0);
    setTotal(filteredList.length);
    setCurrentPageList(filteredList.slice(offset, offset + count));
    setIsLastPage(offset + count >= filteredList.length);
    setIsFirstPage(offset < count);
    setPage(newPage);
  };

  const nextPage = () => {
    if (offset + count < contactList.length) {
      // Hint: update the offset to go to next page
      setOffset(offset + count);
    }
  };

  const prevPage = () => {
    if (offset - count >= 0) {
      // Hint: update the offset to go to previous page
      setOffset(offset - count);
    }
  };

  const onFilter = (term) => {
    if (!term.target.value) {
      // Reseting the offset and setting contactlist to initial data as search value is blank
      setFilteredList(contactList);
      setOffset(0);
    } else {
      // filter the list and update data & offset accordingly
      const newList = contactList;
      // Apply your filter logic here
    }
    updatePropertyState();
  };

  const sync = async () => {
    setIsSyncing(true);
    try {
      const user = await BluetoothSyncAPIService.sync();
      const filterUser = user?.results.map((r) => ({
        name: r.name.first,
        thumbnail: r.picture.thumbnail,
        email: r.email,
        phone: r.phone,
        id: `${r.id.name}-${r.id.value}`,
      }));

      setContactList([...filterUser]);
      setFilteredList([...filterUser]);
      setOffset(0);
    } catch (err) {
      // Hint: Catch the error, and implement logic to retry 3 times.
    } finally {
      setIsSyncing(false); //set isSyncing to false
    }
    updatePropertyState(); //update property state after all other operations have been completed
  };

  return (
    <div>
      {/* Your JSX/HTML content here */}
    </div>
  );
};

export default App;
