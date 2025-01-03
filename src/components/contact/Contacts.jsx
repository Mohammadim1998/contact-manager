import Contact from "./Contact";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import Spinner from "../Spinner";

const Contacts = ({ contacts, loading }) => {
    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <button className="btn mx-2" style={{ backgroundColor: PINK }}>
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2" />
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {loading ? <Spinner /> : (
                <section className="container">
                    <div className="row">
                        {/* Contact */}
                        {contacts.length == 0
                            ? (<div className="text-center py-5"
                                style={{ backgroundColor: CURRENTLINE }}
                            >
                                <p className="h3" style={{ color: ORANGE }}>مخاطبی یافت نشد...</p>

                                <img src={require("../../assets/no-found.gif")}
                                    alt="پیدا نشد"
                                    className="w-25"
                                />

                            </div>)
                            : contacts.map((contact) => <Contact key={contact.id} contact={contact} />)
                        }
                    </div>
                </section>
            )}
        </>
    );
};

export default Contacts;
