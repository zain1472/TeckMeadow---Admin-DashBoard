import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateUser } from "../../../actions/AppActions";
import ProgressBar from "../../layout/ProgressBar";
import { clearUploadProgress } from "../../../actions/AppActions";
const Permissions = ({
  currentUser,
  currentEmployee,
  updateUser,
  uploadProgress,
  clearUploadProgress,
}) => {
  const [photo, setphoto] = useState("");
  useEffect(() => {
    if (currentEmployee !== null) {
      setphoto(currentEmployee.image);
      setUser(currentEmployee);
    } else if (currentUser !== null) {
      setphoto(currentUser.image);
      setUser(currentUser);
    }
    // eslint-disable-next-line
  }, [currentUser, currentEmployee]);
  useEffect(() => {
    clearUploadProgress();
    // eslint-disable-next-line
  }, []);
  const [user, setUser] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    image: "",
    country: "",
    email: "",
    isAdmin: false,
  });
  const { firstname, lastname, email, country, isAdmin } = user;
  const name = firstname + " " + lastname;
  const onSubmit = (e) => {
    e.preventDefault();

    updateUser(user);
    console.log(user);
  };
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="tab-pane fade show active" id="home" role="tabpanel">
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">Permissions</h6>
          <form onSubmit={onSubmit}>
            <div className="d-flex mb-3">
              <figure className="mr-3">
                <img
                  width="100"
                  className="rounded"
                  src={`/uploads/${photo}`}
                  alt="..."
                />
              </figure>
              <div>
                <p>{name}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mt-4">
                  <div className="custom-file ">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      name="photo"
                      onChange={(e) => {
                        setUser({ ...user, image: e.target.files[0] });
                      }}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Upload Photo
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Firstname</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstname}
                    onChange={(e) => onChange(e)}
                    name="firstname"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => onChange(e)}
                    value={country}
                    name="country"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Email
                    <span className="text-muted">(Can't Change)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => {}}
                    name="email"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Lastname</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => onChange(e)}
                    value={lastname}
                    name="lastname"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Role{" "}
                    {currentEmployee === null && (
                      <span className="text-muted">(Can't Change)</span>
                    )}
                  </label>

                  <select
                    className="form-control"
                    name="isAdmin"
                    value={isAdmin}
                    readOnly={currentEmployee === null}
                    onChange={(e) => {
                      const isAdmin = e.target.value === "true";
                      setUser({ ...user, isAdmin });
                    }}
                  >
                    <option value={true}>Admin</option>
                    <option value={false}>Employee</option>
                  </select>
                </div>
              </div>
            </div>

            {uploadProgress === null && (
              <button className="btn btn-primary">Save Changes</button>
            )}
          </form>

          <ProgressBar />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
  currentEmployee: state.chat.currentEmployee,
  uploadProgress: state.chat.uploadProgress,
});
export default connect(mapStateToProps, { updateUser, clearUploadProgress })(
  Permissions
);
