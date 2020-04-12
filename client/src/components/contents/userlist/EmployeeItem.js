import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentEmployee } from "../../../actions/ChatActions";
import { deleteUser } from "../../../actions/AppActions";
import { Link } from "react-router-dom";

const EmployeeItem = ({ id, employee, setCurrentEmployee, deleteUser }) => {
  const { firstname, lastname, image, email, country, isAdmin } = employee;
  return (
    <tr>
      <td></td>
      <td>{id + 1}</td>
      <td>
        <img src="" alt="" />
        <Link to="/" onClick={() => setCurrentEmployee(employee)}>
          <figure className="avatar avatar-sm mr-2">
            <img
              src={`/uploads/${image}`}
              className="rounded-circle"
              alt="avatar"
            />
          </figure>
          {firstname + " " + lastname}
        </Link>
      </td>
      <td>{email}</td>
      <td>{country}</td>

      <td>
        {isAdmin ? (
          <span className="badge bg-success-bright text-success">Admin</span>
        ) : (
          <span className="badge bg-info-bright text-info">Employee</span>
        )}
      </td>
      <td>
        <a
          href="#!"
          onClick={() => deleteUser(employee)}
          className="text-danger ml-2"
          data-toggle="tooltip"
          title="Delete"
        >
          <i className="fas fa-trash"></i>
        </a>
      </td>
    </tr>
  );
};

EmployeeItem.propTypes = {
  employee: PropTypes.object.isRequired,
};

export default connect(null, { setCurrentEmployee, deleteUser })(EmployeeItem);
