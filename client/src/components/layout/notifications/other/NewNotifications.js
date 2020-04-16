import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NotificationItem from "./NotificationItem";
const NewNotifications = ({ notifications }) => {
  return (
    <Fragment>
      {notifications.map(
        (notification) =>
          !notification.isRead && (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          )
      )}
    </Fragment>
  );
};

NewNotifications.propTypes = {
  notifications: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  notifications: state.notification.notifications,
});
export default connect(mapStateToProps)(NewNotifications);
