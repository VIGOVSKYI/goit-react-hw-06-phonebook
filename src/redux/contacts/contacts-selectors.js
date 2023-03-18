export const getAllContacts = store => store.contacts;

export const getFilteredContact = ({ contacts, filter }) => {
  if (!filter) {
    return contacts;
  }

  const normalizedFilter = filter.toLowerCase();

  const result = contacts.filter(({ name, number }) => {
    return (name.toLowerCase().includes(normalizedFilter) ||
           number.toLowerCase().includes(normalizedFilter))
  });
  return result;
};
