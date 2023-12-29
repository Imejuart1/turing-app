import React from 'react';

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

const UserContactListComponent = ({ contactList, listId }) => (
  <div>
    {contactList.map((contact, index) => {
      const validatedName = validateName(contact.name);
      const validatedPhone = validatePhone(contact.phone);
      const validatedPicture = validatePicture(contact.thumbnail);

      // Display the contact only if all validations pass
      //if (true){
      if (validatedName && validatedPhone && validatedPicture) {
        return (
          <div key={index} id={`contactInfo_${listId}_${contact.id}`} className="contactInfoWrapper">
            <div className="contactInfoDescriptionWrapper">
              <div className="contactInfoThumbnail">
                <img src={validatedPicture} alt={`Thumbnail for ${validatedName}`} />
              </div>
              <div className="contactInfoText">
                <p>Name: {validatedName}</p>
                <p>Phone: {validatedPhone}</p>
              </div>
            </div>
          </div>
        );
      } else {
        // Return null for invalid data
        return null;
      }
    })}
  </div>
);

export default UserContactListComponent;

