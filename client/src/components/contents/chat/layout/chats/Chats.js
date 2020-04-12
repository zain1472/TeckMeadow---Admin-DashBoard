import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChatItem from "./ChatItem";
const Chats = ({ employees, filtered }) => {
  let date = new Date(Date.now());
  if (filtered && filtered !== null) {
    employees = filtered;
  }
  employees.sort((a, b) => {
    let date1 = date,
      date2 = date;
    if (a.messages.length !== 0) {
      date1 = a.messages[a.messages.length - 1].date;
    }
    if (b.messages.length !== 0) {
      date2 = b.messages[b.messages.length - 1].date;
    }
    if (date1 > date2) {
      return 1;
    }
    if (date1 < date2) {
      return -1;
    }
    return 0;
  });
  // employees.sort(function(a, b) {
  //   if (a.firstname.charAt(0) > b.firstname.charAt(0)) {
  //     return 1;
  //   }
  //   if (b.firstname.charAt(0) > a.firstname.charAt(0)) {
  //     return -1;
  //   }
  //   return 0;
  // });
  return (
    <div
      className="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <div className="chat-lists">
        <div className="list-group list-group-flush">
          {filtered && <p>Search Results...</p>}
          {employees.length === 0 && <p>No chats to show</p>}
          {employees.length > 0 &&
            employees.map((employee, key) => (
              <ChatItem key={key} employee={employee} />
            ))}
        </div>
      </div>
    </div>
  );
};
Chats.propTypes = {
  employees: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  employees: state.chat.employees,
  filtered: state.chat.filtered
});
export default connect(mapStateToProps)(Chats);
