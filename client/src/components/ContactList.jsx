const ContactList = ({ contacts, deleteContact }) => (
  <ul>
    {contacts.map((contact, index) => (
      <li key={index}>
        {contact.name}: {contact.number}
        {"  "}
        <button onClick={() => deleteContact(contact.id)}>
          Remove contact
        </button>
        <hr />
      </li>
    ))}
  </ul>
);

export default ContactList;
