import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Contacts from './components/contact/Contacts';
import Contact from './components/contact/Contact';
import AddContact from './components/contact/AddContact';
import EditContact from './components/contact/EditContact';
import ViewContact from './components/contact/ViewContact';


const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  return (
    <div className="App">
      <Navbar />
      <Contacts contacts={contacts} loading={loading} />
    </div>
  );
}

export default App;