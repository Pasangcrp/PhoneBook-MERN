import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/contacts")
      .then((response) => {
        setContacts(response.data);
        setFilteredContacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error.message);
      });
  }, []);

  const searchContacts = (input) => {
    const lowerCaseSearchInput = input.toLowerCase();

    if (lowerCaseSearchInput) {
      const filtered = contacts.filter((c) =>
        c.name.toLowerCase().includes(lowerCaseSearchInput)
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };

  const handleFormSubmit = (contact) => {
    const contactExists = contacts.some(
      (c) => c.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (contactExists) {
      alert("Contact with the name already exists in the phonebook!");
    } else {
      axios
        .post("http://localhost:3001/contacts", contact)
        .then((response) => {
          setContacts((prevContacts) => [...prevContacts, response.data]);
          setFilteredContacts((prevFiltered) => [
            ...prevFiltered,
            response.data,
          ]);
          setNewName("");
          setNewPhone("");
          setSearchInput("");
        })
        .catch((error) => {
          console.error("Error adding contact:", error.message);
        });
    }
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchContacts={searchContacts}
      />
      <ContactForm
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        handleFormSubmit={handleFormSubmit}
      />

      <h2>Numbers:</h2>
      <ContactList contacts={filteredContacts} />
    </div>
  );
};

export default App;
