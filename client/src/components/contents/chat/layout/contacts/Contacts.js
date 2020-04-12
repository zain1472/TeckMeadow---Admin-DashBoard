import React from "react";
import { connect } from "react-redux";
import ContactItem from "./ContactItem";
const Contacts = ({ contacts, filtered }) => {
  if (filtered && filtered !== null) {
    contacts = filtered;
  }
  contacts.sort(function (a, b) {
    if (a.firstname.charAt(0) > b.firstname.charAt(0)) {
      return 1;
    }
    if (b.firstname.charAt(0) > a.firstname.charAt(0)) {
      return -1;
    }
    return 0;
  });
  return (
    <div
      className="tab-pane fade"
      id="pills-contact"
      role="tabpanel"
      aria-labelledby="pills-contact-tab"
    >
      {filtered && <p>Search Results...</p>}
      {contacts.length === 0 ? (
        <p>No contacts to show</p>
      ) : (
        <p>{contacts.length + " "}Contacts</p>
      )}
      <div>
        <ul className="list-group list-group-flush">
          {contacts.length > 0 &&
            contacts.map((contact, key) => (
              <ContactItem key={key} contact={contact} />
            ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.chat.employees,
  filtered: state.chat.filtered,
});
export default connect(mapStateToProps)(Contacts);
