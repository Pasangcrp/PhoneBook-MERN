import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/contacts").then((response) => {
      setContacts(response.data);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newContact = { name: newName, number: newPhone };

    axios
      .post("http://localhost:3001/contacts", newContact)
      .then((response) => {
        setContacts(contacts.concat(response.data));
        setNewName("");
        setNewPhone("");
      });
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <form onSubmit={handleFormSubmit}>
        Name: <input type="text" value={newName} onChange={handleNameChange} />
        Phone Number:{" "}
        <input type="tel" value={newPhone} onChange={handlePhoneChange} />
        <button type="submit">Add</button>
      </form>
      <h2>Numbers:</h2>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact.name}: {contact.number}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
