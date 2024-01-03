const ContactList = ({ contacts }) => (
  <ul>
    {contacts.map((contact, index) => (
      <li key={index}>
        {contact.name}: {contact.number}
      </li>
    ))}
  </ul>
);

export default ContactList;
