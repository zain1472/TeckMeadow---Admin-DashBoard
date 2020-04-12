import React, { Fragment } from "react";
import { connect } from "react-redux";

const Alert = ({ alert }) => {
  if (alert.length > 0) {
    return alert.map(a => (
      <div key={a.id} className={`alert alert-${a.type}`}>
        {a.msg}
      </div>
    ));
  } else {
    return <Fragment></Fragment>;
  }
};
const mapStateToProps = state => ({
  alert: state.alert.alert
});
export default connect(mapStateToProps)(Alert);
