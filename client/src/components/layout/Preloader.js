import React from "react";
import { connect } from "react-redux";
const Preloader = ({ loading }) => {
  return (
    loading && (
      <div id="preloader">
        <div id="preloader-icon"></div>
      </div>
    )
  );
};
const mapStateToProps = (state) => ({
  loading: state.chat.loading,
});
export default connect(mapStateToProps)(Preloader);
