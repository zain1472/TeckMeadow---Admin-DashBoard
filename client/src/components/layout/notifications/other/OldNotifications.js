import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NotificationItem from "./NotificationItem";
const OldNotifications = ({ notifications }) => {
  let count = 0;
  notifications.forEach((n) => {
    if (n.isRead) {
      count++;
    }
  });
  return (
    <Fragment>
      {count !== 0 && (
        <li className="text-divider small pb-2 pl-3 pt-3">
          {" "}
          <span>Old notifications</span>{" "}
        </li>
      )}
      {notifications.map(
        (notification) =>
          notification.isRead && (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          )
      )}
    </Fragment>
  );
};

OldNotifications.propTypes = {
  notifications: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  notifications: state.notification.notifications,
});
export default connect(mapStateToProps)(OldNotifications);
