import React ,{ useState ,useEffect} from 'react'
import { useParams , useNavigate} from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';


const UpdateEmployee = () => {



        const {id} = useParams();
        const navigate = useNavigate();
        const [employee, setemployee] = useState({       
         id: id,
        firstName: "",
        lastName: "",
        emailId: "",
    });

    const handleChange =(e) =>{
        const value = e.target.value;
        setemployee({ ...employee,[e.target.name]: value})
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
             const response = await EmployeeService.getEmployeeById(id);
             setemployee(response.data);
            }catch (error) {
                console.log(error)

            }
        };
   fetchData();
    }, [])
    
        const updateEmployee = (e) => {
            e.preventDefault();
            EmployeeService.updateEmployee(employee, id).then((response) =>{
             navigate("/employeeList");
            }).catch((error) => {
                console.log(error)
            });
        };
    
  return (
    <div className="flex max-w-2xl mx-auto  shadow border-b">
    <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
            <h1>Update New Employee</h1>
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
        <div className="flex justify-end h-10 w-full my-6 space-x-2">
          <button onClick={() => navigate("/employeeList")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "> cancel</button>
           <button onClick={updateEmployee} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "> update</button>

          
           </div>
    </div>
</div>
  )
}

export default UpdateEmployee