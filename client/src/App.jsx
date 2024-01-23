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
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(lowerCaseSearchInput)
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };

  const handleFormSubmit = (contact) => {
    const existingContact = contacts.find(
      (c) => c.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (existingContact) {
      axios
        .put(`http://localhost:3001/contacts/${existingContact.id}`, contact)
        .then((response) => {
          const updatedContact = response.data;

          setContacts((prevContacts) =>
            prevContacts.map((c) =>
              c.id === updatedContact.id ? updatedContact : c
            )
          );

          setFilteredContacts((prevFiltered) =>
            prevFiltered.map((c) =>
              c.id === updatedContact.id ? updatedContact : c
            )
          );

          setNewName("");
          setNewPhone("");
          setSearchInput("");
        })
        .catch((error) => {
          console.error("Error updating contact:", error.message);
        });
    } else {
      axios
        .post("http://localhost:3001/contacts", contact)
        .then((response) => {
          const newContact = response.data;

          setContacts((prevContacts) => [...prevContacts, newContact]);
          setFilteredContacts((prevFiltered) => [...prevFiltered, newContact]);

          alert("Contact added successfully");
          setNewName("");
          setNewPhone("");
          setSearchInput("");
        })
        .catch((error) => {
          console.error("Error adding contact:", error.message);
        });
    }
  };

  const deleteContact = (id) => {
    axios
      .delete(`http://localhost:3001/contacts/${id}`)
      .then(() => {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== id)
        );
        setFilteredContacts((prevFiltered) =>
          prevFiltered.filter((contact) => contact.id !== id)
        );
      })
      .catch((error) => {
        console.log("Error deleting contact", error);
      });
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
        contacts={contacts}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        handleFormSubmit={handleFormSubmit}
      />

      <h2>Numbers:</h2>
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
