import React ,{ useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';
import { Employee } from './Employee';


    

export const EmployeeList = () => {
    const navigate = useNavigate();

    const [Loading, setLoading] = useState(true)
    const [employees, setemployees] = useState(null)
    useEffect(() => {
      const fetchData = async () => 
      {
          setLoading(true);
          try{
              const response = await EmployeeService.getEmployee();
              setemployees(response.data)
          } catch (error) {
              console.log(error)
          }
          setLoading(false);

      };
    
      fetchData();
    }, [])

    const deleteEmployee =(e, id) => {
     e.preventDefault();
     EmployeeService.deleteEmployee(id).then((res) => {
        if(employees) {
            setemployees((prevElement) => {
                return prevElement.filter((employee) => employee.id !==id);
            });
        }
     });

     };

    
    
  return (
    <>
    <div className="container mx-auto my-8">
    <div className="h-12">
        <button
        onClick={()=>navigate("/addEmployee") }
         className="roundeed bg-slate-800 text-white px-6 py-2">
             Add Employee</button>
    </div>
    <div className="flex shadow border-b">
        <table className="min-w-full">
         <thead className="bg-gray-200">
          
             <tr>
                 <th className="text-left font-medium text-gray-500  py-3 px-5 ">First Name </th>
                 <th className="text-left font-medium text-gray-500  py-3 px-5 ">Last Name  </th>
                 <th className="text-left font-medium text-gray-500  py-3 px-5 "> Email </th>
                 <th className="text-right font-medium text-gray-500  py-3 px-5 "> Action  </th>
             </tr>
         </thead>
         {!Loading  && (
<tbody className="bg-white">
    {employees.map((employee) => (
    <Employee 
    employee={employee}
    deleteEmployee={deleteEmployee}
     key={employee.id}>
     </Employee>
))}
</tbody>
)}
        </table>

    </div>
    </div>
    </>
  )
  
}
