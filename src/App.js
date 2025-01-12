import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Contacts from './components/contact/Contacts';
import AddContact from './components/contact/AddContact';
import EditContact from './components/contact/EditContact';
import ViewContact from './components/contact/ViewContact';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { createContact, deleteContact, getAllContacts, getAllGroups } from './services/contactService';
import Swal from 'sweetalert2';
import { ContactContext } from './context/ContactContext';
import RefExample from './components/HooksInReactjs/RefExample';
import { contactSchema } from './validations/contactValidation';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [errors, setErrors] = useState([]);
  const [contact, setContact] = useState({
    fullname: '',
    photo: '',
    mobile: '',
    email: '',
    job: '',
    group: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setGroups(groupsData);
        setFilteredContacts(contactsData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const { data: contactsData } = await getAllContacts();

  //       setContacts(contactsData);
  //       setFilteredContacts(contactsData);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, [forceRender]);

  const createContactForm = async (event) => {
    event.preventDefault();

    try {
      setLoading((prevLoading) => !prevLoading);
      await contactSchema.validate(contact, { abortEarly: false });

      const { status, data } = await createContact(contact);
      if (status === 201) {

        const allContacts = [...contacts, data];

        setContacts(allContacts);
        setFilteredContacts(allContacts);

        setContact({});
        setErrors([]);
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      } 
    } catch (err) {
      setLoading((prevLoading) => !prevLoading);
      console.log(err.message);
      setErrors(err.inner);
    }
  };

  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  }

  const removeContact = async (id) => {
    // Contacts Copy
    const allContacts = [...contacts];

    try {
      Swal.fire({
        title: "مخاطب حذف شود؟ 😧",
        text: "مخاطب شما حذف خواهد شد",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "نه",
        confirmButtonText: "بله, حذفش کن"
      }).then(async (result) => {
        if ((result.isConfirmed)) {
          const updatedContact = contacts.filter((c) => c.id !== id);
          setContacts(updatedContact);
          setFilteredContacts(updatedContact);

          // Sending delete request to server
          const { status } = await deleteContact(id);

          if (status !== 200) {
            setContacts(allContacts);
            setFilteredContacts(allContacts);
          }
          if (status !== 200) {
            Swal.fire({
              title: "حذف شد 😃",
              text: "مخاطب مورد نظر حذف شد",
              icon: "success"
            })
              .then(() => {
                window.location.reload();
              })
          }
        }
      });
    } catch (err) {
      console.log(err.message);
      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  }

  let filtereTimeout;
  const contactSearch = (query) => {
    // setContactQuery({ ...contactQuery, text: query });
    clearTimeout(filtereTimeout);

    if (!query) return setFilteredContacts([...contacts])

    filtereTimeout = setTimeout(() => {
      setFilteredContacts(
        contacts.filter((contact) => {
          return contact.fullname.toLowerCase().includes(query.toLowerCase());
        })
      );
    }, 1000);

  }

  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      contact,
      setContacts,
      contacts,
      filteredContacts,
      setFilteredContacts,
      groups,
      errors,
      setGroups,
      onContactChange,
      deleteContact: removeContact,
      createContact: createContactForm,
      contactSearch,
    }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to={"/contacts"} />} />
          <Route path='/contacts' element={<Contacts />} />
          {/* <Route path='/contacts/:contactId' element={<Contact />} /> */}
          <Route path='/contacts/add' element={<AddContact />} />
          <Route path='/contacts/:contactId' element={<ViewContact />} />
          <Route path='/contacts/edit/:contactId' element={<EditContact />} />
          <Route path='/ref' element={<RefExample />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
}

export default App;