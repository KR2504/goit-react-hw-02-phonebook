import React, { Component } from "react";
import shortid from "shortid";
import Section from "./components/Section";
import ContactForm from './components/ContactForm'
import Filter from "./components/Filter";
import contacts from "./components/data/contacts.json";
import Contacts from './components/ContactsList'

class App extends Component {

  state = {
    contacts,
    filter: '',
  };
  
  addContact = (name, number) => {
    const { contacts } = this.state;
    const newName = {
      id: shortid.generate(),
      name,
      number,
    };

    if (contacts.every(({ name }) =>
      name.toLowerCase() !== newName.name.toLowerCase())) {
      this.setState(prevState => (
        { contacts: [newName, ...prevState.contacts] }));
    } else {
      alert(`${newName.name} is already in contacts`)
    }
  };

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  };

  handleChangeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const convertFilter = filter.toLowerCase();
    const visibleNames = contacts.filter(contact =>
      contact.name.toLowerCase().includes(convertFilter));

    return (
      <div
        style={{
          height: '100vh',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>

        <Section title="Contacts">
          <Filter value={filter} onChange={this.handleChangeFilter} />
          <Contacts contacts={visibleNames} onDeleteContact={this.deleteContact} />
        </Section>
      </div>
    );
  };
};

export default App;


