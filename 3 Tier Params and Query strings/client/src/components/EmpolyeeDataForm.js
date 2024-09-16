import React, { useEffect, useRef, useState } from "react";

function EmpolyeeDataForm() {
  let countrySelectedRef = useRef();
  let genderSelectedRef = useRef();
  let departmentSelectedRef = useRef();
 
  
  useEffect(() => {
    getListFromDB();
  }, []);

  let [list, setList] = useState({});

  let getListFromDB = async () => {
    let requestOptions = { method: "GET" };
    let jsonData = await fetch("http://localhost:1234/lists", requestOptions);
    let jsoData = await jsonData.json();
    console.log(jsoData);
    setList(jsoData);
  };

  let [employee, setEmployee] = useState([]);
  let getEmployeeDataFromDB = async () => {
     let url = `http://localhost:1234/getEmployeeData?gender=${genderSelectedRef.current.value}&department=${departmentSelectedRef.current.value}&country=${countrySelectedRef.current.value}`;
     url = `http://localhost:1234/getEmployeeData/${genderSelectedRef.current.value}/${departmentSelectedRef.current.value}/${countrySelectedRef.current.value}`;

    let requestOptions = { method: "GET" };
    let jsonData = await fetch(url, requestOptions);
    let jsoData = await jsonData.json();

    console.log(jsoData);
    setEmployee(jsoData);
  };
  return (
    <div>
      <form className="form">
        <div>
          <label className="label">Gender</label>
          <select ref={genderSelectedRef}>
            {list.genders
              ? list.genders.map((ele, i) => {
                  return <option key={i}>{ele}</option>;
                })
              : null}
          </select>
        </div>
        <div>
          <label className="label">Department</label>
          <select ref={departmentSelectedRef}>
            {list.departments
              ? list.departments.map((ele, i) => {
                  return <option key={i}>{ele}</option>;
                })
              : null}
          </select>
        </div>
        <div>
          <label className="label">Country</label>
          <select ref={countrySelectedRef}>
            {list.countries
              ? list.countries.map((ele, i) => {
                  return <option key={i}>{ele}</option>;
                })
              : null}
          </select>
        </div>
            
        

        <button
          type="button"
          onClick={() => {
            getEmployeeDataFromDB();
          }}
        >
          Get Employees
        </button>
      </form>
      <table>
        <thead>
          <th>S.NO</th>
          <th>Id</th>
          <th>ProfilePic</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Department</th>
          <th>Country</th>
        </thead>
        <tbody>
          {employee.map((ele, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{ele.id}</td>
                <td>
                  <img src={ele.profilePic} alt="Description"></img>
                </td>
                <td>{ele.firstName}</td>
                <td>{ele.lastName}</td>
                <td>{ele.gender}</td>
                <td>{ele.email}</td>
                <td><p>{ele.department}</p></td>
                <td>{ele.country}</td>
              </tr>
              );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default EmpolyeeDataForm;
