import { useSelector, useDispatch } from 'react-redux';

import MyContactList from '../MyContactList/MyContactList.jsx';
import MyContactFilter from '../MycontactFilter/MyContactFilter.jsx';
import MyContactForm from '../MyContcatForm/MyContactForm.jsx';

import { addContact, deleteContact } from '../../redux/contacts/contacts-slice';
import { setFilter } from '../../redux/filter/filter-slice';

import {
  getFilteredContact,
  getAllContacts,
} from '../../redux/contacts/contacts-selectors';
import { getFilter } from '../../redux/filter/filter-selectors';

import styles from './my-contacts.module.css';

const MyContacts = () => {
  const contacts = useSelector(getAllContacts);
  const filteredContacts = useSelector(getFilteredContact);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const isDublicate = (name, number) => {
    const normalizedTitle = name.toLowerCase();
    const normalizedAuthor = number.toLowerCase();
    const result = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedTitle ||
        number.toLowerCase() === normalizedAuthor
      );
    });
    return result;
  };

  const onAddContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      alert(`${name}. Contact: ${number} is already present`);
      return;
    }
    const action = addContact({ name, number });
    dispatch(action);
  };

  const onDeleteContact = id => {
    const action = deleteContact(id);
    dispatch(action);
  };

  const handlFilter = ({ target }) => {
    const action = setFilter(target.value);
    dispatch(action);
  };

  return (
    <div>
      <h3 className={styles.title}>My contacts</h3>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h4 className={styles.title}>Name</h4>
          <MyContactForm onSubmit={onAddContact} />
        </div>
        <div className={styles.block}>
          <h4 className={styles.title}>Contacts</h4>
          <MyContactFilter value={filter} handlFilter={handlFilter} />
          <MyContactList
            deleteContact={onDeleteContact}
            contacts={filteredContacts}
          />
          {!filteredContacts.length && (
            <p className={styles.message}>No contacts in the list</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyContacts;
