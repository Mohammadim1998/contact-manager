import { createContext } from "react";

export const ContactContext = createContext({
    loading: false,
    setLoading: () => { },
    contact: {},
    contacts: [],
    setContacts: () => { },
    contacts: [],
    filteredContacts: [],
    setFilteredContacts: () => { },
    groups: [],
    errors: [],
    setGroups: () => {},
    onContactChange: () => { },
    deleteContact: () => { },
    updateContact: () => { },
    createContact: () => { },
    contactSearch: () => { },
});