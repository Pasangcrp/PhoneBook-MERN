const ContactForm = ({
  contacts,
  newName,
  setNewName,
  newPhone,
  setNewPhone,
  handleFormSubmit,
}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newId = contacts.length + 1;

    handleFormSubmit({ id: newId, name: newName, number: newPhone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={newName}
        onChange={handleNameChange}
      />

      <label htmlFor="phone">Phone Number:</label>
      <input
        type="tel"
        id="phone"
        value={newPhone}
        onChange={handlePhoneChange}
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default ContactForm;
