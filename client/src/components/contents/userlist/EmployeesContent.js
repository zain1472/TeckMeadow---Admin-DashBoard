import React from "react";
import Employees from "./Employees";
import EmployeeSearch from "./EmployeeSearch";
import Footer from "../../layout/Footer";
const EmployeesContent = () => {
  return (
    <div className="">
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-4 mb-2">
                    <EmployeeSearch />
                  </div>
                </div>
                <div className="table-responsive">
                  <Employees />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EmployeesContent;
