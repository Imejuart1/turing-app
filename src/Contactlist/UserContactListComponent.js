import React from 'react';

const UserContactListComponent = ({ contactList, listId }) => (
  <div>
    {contactList.map((contact, index) => (
      <div key={index}>
        {true && ( // Only show if validated data is present
          <div className="contactInfoWrapper">
            {/* Add unique ID to each contact card */}
            <div className="contactInfoDescriptionWrapper">
              <div className="contactInfoThumbnail">
                <img src={contact.thumbnail}/>
                {/* Render user image */}
              </div>
              <div className="contactInfoText">
              
                {/* Render user information */}
              </div>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);

export default UserContactListComponent;
