import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

const AddEmployee = () => {
    const navigate = useNavigate();

    const initialValues = {   id: "",
    firstName: "",
    lastName: "",
    emailId: "", };
    const [formErrors, setFormErrors] = useState({});
    const [employee, setemployee] = useState({
        initialValues
    });
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange =(e) =>{
        const value = e.target.value;
        // setFormErrors(validate(employee));
        // setIsSubmit(true) ;
        setemployee({ ...employee,[e.target.name]: value})
    };


    const saveEmployee =(e) => {
        e.preventDefault();
        EmployeeService.saveEmployee(employee).then((response) => {
         console.log(response);
         navigate("/employeeList") 
        }).catch((error) => {
            console.log(error);
        });
    };

    // useEffect(() => {
    //     console.log(formErrors);
    //     if (Object.keys(formErrors).length === 0 && isSubmit) {
    //       console.log(employee);
    //     }
    //   }, [formErrors]);
    //   const validate = (employee) => {
    //     const errors = {};
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //     if (!employee.firstName) {
    //       errors.firstName = "firstName is required!";
    //     }
    //     if (!employee.emailId) {
    //       errors.emailId = "Email is required!";
    //     } else if (!regex.test(employee.emailId)) {
    //       errors.emailId = "This is not a valid email format!";
    //     }
    //     // if (!values.password) {
    //     //   errors.password = "Password is required";
    //     // } else if (values.password.length < 4) {
    //     //   errors.password = "Password must be more than 4 characters";
    //     // } else if (values.password.length > 10) {
    //     //   errors.password = "Password cannot exceed more than 10 characters";
    //     // }
    //     return errors;
    //   };

    const reset = (e) => {
        e.preventDefault();
        setemployee({        
        id: "",
        firstName: "",
        lastName: "",
        emailId: "",
    })


    }

  return (
    <div className="flex max-w-2xl mx-auto  shadow border-b">
        <div className="px-8 py-8">

            <div className="font-thin text-2xl tracking-wider">
                <h1>Add New Employee</h1>
            </div>
            <div className="items-center justify-center h-14 w-full my-4">
                <label className="block text-gray-600 text-sm font-medium">First Name</label>
                <input
                type="text"
                name="firstName"
                value={employee.firstName}
                onChange={(e) => handleChange(e)}
                className="h-10 w-96 border mt-2 px-2 py-2"></input>
            </div>
            <p>{formErrors.firstName}</p>
            <div className="items-center justify-center h-14 w-full my-4">
                <label className="block text-gray-600 text-sm font-medium">Last Name</label>
                <input
                type="text"
                name="lastName"
                value={employee.lastName}
                onChange={(e) => handleChange(e)}
                className="h-10 w-96 border mt-2 px-2 py-2"></input>
            </div>
            <div className="items-center justify-center h-14 w-full my-4">
                <label className="block text-gray-600 text-sm font-medium">Email</label>
                <input
                type="email"
                name="emailId"
                value={employee.emailId}
                onChange={(e) => handleChange(e)}
                className="h-10 w-96 border mt-2 px-2 py-2"></input>
            </div>
            <p>{formErrors.email}</p>
            <div className="flex justify-end h-10 w-full my-6 space-x-2">
              <button onClick={reset}  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "> clear</button>
               <button onClick={saveEmployee} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "> submit</button>
    
              
               </div>
        </div>
    </div>
  )
}

export default AddEmployee