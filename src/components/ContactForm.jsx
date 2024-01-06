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

    const onlyLettersRegex = /^[a-zA-Z]+$/;

    if (!onlyLettersRegex.test(newName) || newName.trim() === "") {
      alert("Name not valid");
      setNewName("");
      setNewPhone("");
      return;
    }

    const contactExists = contacts.some(
      (c) => c.name.toLowerCase() === newName.toLowerCase()
    );

    if (contactExists) {
      alert("Contact with the same name already exists in the phonebook!");
      setNewName("");
      setNewPhone("");
    } else {
      const newContact = { name: newName, number: newPhone };
      handleFormSubmit(newContact);
      alert("Contact added successfully");
      setNewName("");
      setNewPhone("");
    }
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
