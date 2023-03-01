export const getAllContacts = store => store.contacts;

export const getFilteredContact = ({ contacts, filter }) => {
  if (!filter) {
    return contacts;
  }

  const normalizedFilter = filter.toLocaleLowerCase();
  const result = contacts.filter(
    ({ name, number }) =>
      name.toLocaleLowerCase().includes(normalizedFilter) ||
      number.toLocaleLowerCase().includes(normalizedFilter)
  );
  return result;
};
