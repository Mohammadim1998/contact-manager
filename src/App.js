import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Contacts from './components/contact/Contacts';
import Contact from './components/contact/Contact';
import AddContact from './components/contact/AddContact';
import EditContact from './components/contact/EditContact';
import ViewContact from './components/contact/ViewContact';
import { Navigate, Route, Routes } from 'react-router-dom';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to={"/contacts"} />} />
        <Route path='/contacts' element={<Contacts contacts={contacts} loading={loading} />} />
        <Route path='/contacts/:contactId' element={<Contact />} />
        <Route path='/contacts/add' element={<AddContact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact />} />
      </Routes>
      <Contacts contacts={contacts} loading={loading} />
    </div>
  );
}

export default App;