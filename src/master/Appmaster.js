import React, { useState, useEffect } from 'react';
import BluetoothSyncAPIService from '../services/bluetooth-sync-api.service';
import UserContactListComponent from '../Contactlist/UserContactListComponent';

const Appmaster = () => {
  const [contactList, setContactList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [currentPageList, setCurrentPageList] = useState([]);
  //const [newList, setNewList] = useState([]);
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
  const [filterTerm, setFilterTerm] = useState('');

  const validateName = (name) => {
    return name ? name.slice(0, 20) : null;
  };
  
  const validatePhone = (phone) => {
    const isValidPhone = phone && phone.length >= 8 && phone.length <= 14 && /^\d+$/.test(phone);
    return isValidPhone ? phone : null;
  };
  
  const validatePicture = (picture) => {
    // Assuming a simple validation for HTTP URL, you might want to enhance it
    return picture && /^http/.test(picture) ? picture : null;
  };
  useEffect(() => {
    // ComponentDidMount logic
    setTotal(filteredList.length);
    updatePropertyState();
    setIsLastPage(offset + count >= filteredList.length);
    setIsFirstPage(offset < count);

    const validContacts = filteredList.filter((contact) => {
      const validatedName = validateName(contact.name);
      const validatedPhone = validatePhone(contact.phone);
      const validatedPicture = validatePicture(contact.thumbnail);

      return validatedName && validatedPhone && validatedPicture;
    });

    setFilteredList(validContacts)

    if (retryCount === 2) {
      // Hint: Set error message and ensure API call is not triggered.
      setError('Failed to sync data');
      
    }

    if (retryCount !== 0 && retryCount < 3) {
      // Hint: Call BluetoothSyncAPI service for 3 tries
      sync()
    }
  }, [filteredList, offset, count, retryCount]);

  const updatePropertyState = () => {
    const newPage =
      offset > 0 ? Math.floor(offset / count) + 1 : filteredList.length > 0 ? 1 : 0;

      setPage(newPage);
    setTotalPages(filteredList.length > 0 ? Math.ceil(filteredList.length / count) : 0);
    setTotal(filteredList.length);
    setCurrentPageList(filteredList.slice(offset, offset + count));
    setIsLastPage(offset + count >= filteredList.length);
    setIsFirstPage(offset < count);
  };

  const nextPage = () => {
    if (offset + count < contactList.length) {
      // Hint: update the offset to go to next page
      setOffset(offset + count);
      updatePropertyState();
    }
  };

  const prevPage = () => {
    if (offset - count >= 0) {
      // Hint: update the offset to go to previous page
      setOffset(offset - count);
      updatePropertyState();
    }
  };

  const onFilter = (term) => {
    if (!term.target.value) {
      // Reseting the offset and setting contactlist to initial data as search value is blank
      setFilteredList(contactList);
      setOffset(0);
    } else {
      // filter the list and update data & offset accordingly
      const newList = contactList.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(term.target.value.toLowerCase()) ||
          contact.email.toLowerCase().includes(term.target.value.toLowerCase())
        );
      });
      setFilteredList(newList);
    setOffset(0);
    }
    updatePropertyState();
  };

  const sync = async () => {
    setIsSyncing(true);
    setError(' ');

    while (retryCount < 3) {
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
      //setRetryCount(0);

      break;
    } catch (err) {
      setRetryCount(retryCount + 1);
      // Hint: Catch the error, and implement logic to retry 3 times.
    } finally {
      setIsSyncing(false); //set isSyncing to false
    }
  }

  if (retryCount === 3) {
    setError('Failed to sync data');
  }
    updatePropertyState(); //update property state after all other operations have been completed
  };

  return (
    <div>
          <label htmlFor="filterInput">Filter: </label>
      <input
        type="text"
        id="filterInput"
        value={filterTerm}
        onChange={(e) => {
          setFilterTerm(e.target.value);
          onFilter(e);
        }}
      />
    <button onClick={sync} disabled={isSyncing}>
        {isSyncing ? 'Syncing...' : 'Sync'}
      </button>
      {/* Your JSX/HTML content here hi : {error} / {retryCount}*/}
      
      <UserContactListComponent contactList={currentPageList} listId={listId} />

      <div>
      <span>
          Page {page} of {totalPages} 
        </span>
        <button onClick={prevPage} disabled={isFirstPage}>
          Previous
        </button>
        <button onClick={nextPage} disabled={isLastPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Appmaster;
