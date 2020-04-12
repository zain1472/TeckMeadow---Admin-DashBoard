import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setIsChatActive,
  setCurrentEmployee,
} from "../../../../../actions/ChatActions";
const ContactItem = ({ contact, setIsChatActive, setCurrentEmployee }) => {
  return (
    <li
      className="list-group-item d-flex align-items-center"
      onClick={() => {
        setIsChatActive();
        setCurrentEmployee(contact);
      }}
    >
      <a href="#!">
        <div className="pr-3">
          <div className="avatar">
            <span className="avatar-title bg-success rounded-circle">
              {contact.firstname.charAt(0)}
            </span>
          </div>
        </div>
      </a>
      <a href="#!">
        <div>
          <h6 className="mb-1">{contact.firstname + " " + contact.lastname}</h6>
          <div className="small text-muted">{contact.country}</div>
        </div>
      </a>
    </li>
  );
};
ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  setIsChatActive: PropTypes.func.isRequired,
};
export default connect(null, { setIsChatActive, setCurrentEmployee })(
  ContactItem
);
