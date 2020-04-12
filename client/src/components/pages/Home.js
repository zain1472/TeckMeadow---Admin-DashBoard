import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
// Layout Components
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
import Navigation from "../layout/Navigation";
import LiveChat from "../contents/chatbox/LiveChat";
import Alert from "../layout/Alert";
// Contents || Pages
import ChatContent from "../contents/chat/ChatContent";
import Profile from "../contents/profile/Profile";
import EmployeesContent from "../contents/userlist/EmployeesContent";
import ProjectsContent from "../contents/projects/ProjectsContent";
import ProjectDetail from "../contents/projects/ProjectDetail";
import EditProject from "../contents/projects/editProject/EditProject";
// Actions
import { loadUser } from "../../actions/authActions";
import { getEmployees } from "../../actions/ChatActions";
import { loadProjects } from "../../actions/AppActions";
// Routing
import AdminRoute from "../../routing/AdminRoute";
import PrivateRoute from "../../routing/PrivateRoute";
const Home = ({ match, loadUser, getEmployees, loadProjects, isAdmin }) => {
  useEffect(() => {
    loadUser();
    loadProjects();
    if (isAdmin === true) {
      getEmployees();

      loadUser();
    }
    document.body.classList = "small-navigation boxed-layout";
    // eslint-disable-next-line
  }, [isAdmin]);
  return (
    <Fragment>
      <SideBar />
      <div className="layout-wrapper">
        <Header />
        <div className="content-wrapper">
          <Navigation />

          <div className="content-body">
            <div className="content">
              <Alert />
              <Switch>
                <PrivateRoute
                  path={match.url}
                  exact={true}
                  component={Profile}
                />
                <AdminRoute
                  path={match.url + "chat"}
                  exact={true}
                  component={ChatContent}
                />
                <AdminRoute
                  path={match.url + "employees"}
                  exact={true}
                  component={EmployeesContent}
                />
                <Route
                  path={match.url + "projects"}
                  exact={true}
                  component={ProjectsContent}
                />
                <Route
                  exact
                  path={match.url + "projects" + "/:id"}
                  render={(props) => <ProjectDetail {...props} />}
                />
                <AdminRoute
                  exact
                  path={match.url + "projects" + "/:id" + "/edit"}
                  render={(props) => <EditProject {...props} />}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
      <LiveChat />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps, {
  loadUser,
  getEmployees,
  loadProjects,
})(Home);
