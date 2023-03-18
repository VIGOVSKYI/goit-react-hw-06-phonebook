import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/contacts-slice';
import { getFilteredContact } from 'redux/contacts/contacts-selectors';

import styles from './my-contact-list.module.css';

const MyContactList = () => {
  const filteredContacts = useSelector(getFilteredContact);
  const contacts = filteredContacts;
  const dispatch = useDispatch();
  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const items = contacts.map(({ id, name, number }) => (
    <li key={id} className={styles.item}>
      {name}: {number}
      <button onClick={() => handleDeleteContact(id)} className={styles.btn}>
        Delete
      </button>
    </li>
  ));
  return (
    <>
      {filteredContacts.length > 0 && <ul>{items}</ul>}

      {!filteredContacts.length && (
        <p className={styles.message}>No contacts in the list</p>
      )}
    </>
  );
};

export default MyContactList;
