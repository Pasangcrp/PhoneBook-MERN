const http = require("http");
const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/api/contacts", (req, res) => {
  fs.readFile("pb.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading pb.json" });
    }

    try {
      const contacts = JSON.parse(data).contacts;
      res.json(contacts);
    } catch (parseError) {
      console.error("Error parsing pb.json:", parseError);
      res.status(500).json({ error: "Error parsing pb.json" });
    }
  });
});

app.get("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id);

  fs.readFile("pb.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading pb.json" });
    }

    try {
      const contacts = JSON.parse(data).contacts;
      const contact = contacts.find((contact) => contact.id === id);

      if (contact) {
        res.json(contact);
      } else {
        res.status(404).json({ error: "Contact not found" });
      }
    } catch (parseError) {
      console.error("Error parsing pb.json:", parseError);
      res.status(500).json({ error: "Error parsing pb.json" });
    }
  });
});

app.post("/api/contacts", (req, res) => {
  fs.readFile("pb.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error reading pb.json" });
    }

    try {
      const parsedData = JSON.parse(data);
      const contacts = parsedData.contacts;

      const maxId = contacts.reduce(
        (max, contact) => (contact.id > max ? contact.id : max),
        0
      );

      const newContact = {
        id: maxId + 1,
        name: req.body.name,
        number: req.body.number,
      };

      contacts.push(newContact);
      parsedData.contacts = contacts;
      fs.writeFile("pb.json", JSON.stringify(parsedData), (writeErr) => {
        if (writeErr) {
          console.error("Error writing to pb.json:", writeErr);
          res.status(500).json({ error: "Error updating pb.json" });
        } else {
          res.status(201).json(newContact); // Return the newly created contact
        }
      });
    } catch (parseError) {
      console.error("Error parsing pb.json:", parseError);
      res.status(500).json({ error: "Error parsing pb.json" });
    }
  });
});

app.delete("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id);

  fs.readFile("pb.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading pb.json" });
    }

    try {
      const parsedData = JSON.parse(data);
      const contacts = parsedData.contacts;

      const updatedContacts = contacts.filter((contact) => contact.id !== id);

      if (contacts.length !== updatedContacts.length) {
        // Contact was found and deleted
        parsedData.contacts = updatedContacts;
        fs.writeFile("pb.json", JSON.stringify(parsedData), (writeErr) => {
          if (writeErr) {
            console.error("Error writing to pb.json:", writeErr);
            res.status(500).json({ error: "Error updating pb.json" });
          } else {
            res.json({ message: "Contact deleted successfully" });
          }
        });
      } else {
        // Contact was not found
        res.status(404).json({ error: "Contact not found" });
      }
    } catch (parseError) {
      console.error("Error parsing pb.json:", parseError);
      res.status(500).json({ error: "Error parsing pb.json" });
    }
  });
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
