import { useEffect, useState } from 'react'
import { useStore } from '../../store/UpdateStore'
import { docStore } from '../../store/DocStore';
import { CiTrash } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';

const AssignTaskModal = ({ onClose }) => {
  const { getDetails, employees } = useStore();
  const { addTask, tasks, getTasks, DeleteTask, toggleTaskSubmit } = docStore();
  const [selectBranch, setSelectBranch] = useState('Dombivali');
  const filteredEmployees = employees.filter(employee => employee?.role != 'doctor' && employee?.branch === selectBranch);
  const [Task, settask] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [username, setusername] = useState();

  useEffect(() => {
    getDetails();
    getTasks();
  }, [isSubmit]);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await addTask(Task, username);
      setIsSubmit((prev) => !prev);
      toggleTaskSubmit();
      settask('');
      setusername('');
    } catch (error) {
      console.log(error.message);
    }
  }
  async function Delete(id) {
    await DeleteTask(id);
    const updatedTasks = tasks.filter(task => task._id !== id);
    docStore.setState({ tasks: updatedTasks });

  }

  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] max-h-[90vh] max-w-[97vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
        <button
          onClick={onClose}
          className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
        >
          <RxCross2 size={24} />
        </button>
        <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">
          Assign Task
        </h1>
        <div className="flex flex-col  md:justify-around md:flex-row ">
          <div className="bg-white p-5 rounded-lg md:w-96 ">
            <div className='flex flex-col gap-4 mt-4'>
              <p className='text-black mb-2 text-lg font-semibold'>Select Branch:</p>
              <div className='h-9 bg-[#c8c8ce] mx-auto rounded-[18px]'>
                <button onClick={() => setSelectBranch('Dombivali')} className={`py-1 ${selectBranch === 'Dombivali' ? 'bg-blue-500 rounded-[18px] text-white' : ''} py-1.5 px-5 cursor-pointer`}>Dombivali</button>
                <button onClick={() => setSelectBranch('Mulund')} className={`py-1.5 px-5 ${selectBranch === 'Mulund' ? 'bg-blue-500 rounded-[18px] text-white' : ''} cursor-pointer`}>Mulund</button>
              </div>
            </div>
            <form onSubmit={handleSubmit} >
              <div className='mb-3 '>
                <h1 className="text-black mb-2 text-lg font-semibold">Task:</h1>

                <textarea value={Task} onChange={(e) => settask(e.target.value)} placeholder='Enter Task Description' className='w-full  h-56  pl-3 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition
            duration-200'></textarea>
              </div>
              <div className='mb-3'>
                <h1 className="text-black mb-2 text-lg font-semibold">Assign To:</h1>
                <select
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  name="select employee"
                  id="employee-select"
                  className="py-2 rounded-lg w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
                >
                  <option value="" disabled selected>Select Staff Here</option>
                  {filteredEmployees.map((employee, index) => (
                    <option key={index}>{employee?.fullname}-{employee?.username}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-500 w-full transition-all duration-300 cursor-pointer hover:bg-blue-600 py-2 rounded-lg mt-3 text-white"
              >
                Add
              </button>
            </form>
          </div>
          <div className='p-2  overflow-auto  '>
            <h1 className='text-xl text-center font-semibold text-blue-600 mb-4'>Task Details</h1>

            <table className="border-collapse w-[734px]  border-2 border-gray-500 ">
              <thead>
                <tr className="bg-blue-500 text-white ">
                  <th className="border border-gray-500 px-1 py-2">Serial No.</th>
                  <th className="border border-gray-500 px-1 py-2">Task</th>
                  <th className="border border-gray-500 px-1 py-2">Assigned To</th>
                  <th className="border border-gray-500 px-1 py-2">Assigned On</th>
                  <th className="border border-gray-500 px-1 py-2">Status</th>
                  <th className="border border-gray-500 px-1 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, idx) => (
                  <tr key={idx} className="hover:bg-blue-300  bg-blue-200 transition-all">
                    <td className="border border-gray-300 px-1 py-2 text-center">{idx + 1}</td>
                    <td className="border border-gray-300 px-1 py-2 text-center">{task?.task}</td>
                    <td className="border border-gray-300 px-1 py-2 text-center">{task?.username}</td>
                    <td className="border border-gray-300 px-1 py-2 text-center">{new Date(task?.AssignedOn).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td className={`px-1 py-2 text-center ${task?.status === 'INCOMPLETE' ? "text-red-600" : "text-green-600"}`}>{task?.status}</td>
                    <td className="border border-gray-300 px-1 py-2 text-center"><button onClick={() => Delete(task?._id)} type='button' className='cursor-pointer text-red-500  hover:text-red-700'><CiTrash /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignTaskModal