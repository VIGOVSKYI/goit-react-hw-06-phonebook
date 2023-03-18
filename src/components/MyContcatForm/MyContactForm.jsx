import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contacts-slice';
import { getAllContacts } from '../../redux/contacts/contacts-selectors';

import styles from './my-contact-form.module.css';

const MyContactForm = () => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const allContacts = useSelector(getAllContacts);

  const dispatch = useDispatch();

  const handleAddContact = ({ name, number }) => {
    
    if (isDublicate(name, number)) {
      alert(`${name}. Contact: ${number} is already present`);
      return false;
    }
    dispatch(addContact({ name, number }));
  };

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const contact = allContacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
      );
    });

    return Boolean(contact);
  };

const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddContact({ name, number });
    setState({ name: '', number: '' });
  };

  const { name, number } = state;
  
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <input
          type="text"
          value={name}
          name="name"
          onChange={handleChange}
          className={styles.input}
          placeholder="Name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <input
          onChange={handleChange}
          value={number}
          className={styles.input}
          type="tel"
          name="number"
          placeholder="Number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button className={styles.btn}>Add contact</button>
    </form>
  );
};

export default MyContactForm;
