import React from "react";
import { connect } from "react-redux";
import EmployeeItem from "./EmployeeItem";
const Employees = ({ employees, filtered }) => {
  return (
    <table id="user-list" className="table table-lg">
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Country</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
        {filtered &&
          filtered.map((e, key) => (
            <EmployeeItem key={key} id={key} employee={e} />
          ))}
        {employees != null &&
          !filtered &&
          employees.map((e, key) => (
            <EmployeeItem key={key} id={key} employee={e} />
          ))}
      </thead>
      <tbody></tbody>
    </table>
  );
};
const mapStateToProps = (state) => ({
  employees: state.chat.employees,
  filtered: state.chat.filtered,
});
export default connect(mapStateToProps)(Employees);
