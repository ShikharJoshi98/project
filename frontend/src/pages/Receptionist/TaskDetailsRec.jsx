import React, { useEffect, useState } from 'react'
import RecNavbar from '../../components/Receptionist/RecNavbar'
import RecSidebar from '../../components/Receptionist/RecSidebar'
import { docStore } from '../../store/DocStore';
import { useAuthStore } from '../../store/authStore';

const TaskDetailsRec = () => {
    const { tasks, getTasks, updateTaskStatus } = docStore();
    const { user } = useAuthStore();
    const recTasks = tasks.filter((task) => task?.username === user?.username);

    useEffect(() => {
        getTasks(user?.username);
    }, [getTasks])

    return (
        <div>
            <RecNavbar />
            <div className="flex">
                <RecSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Task Details</h1>
                        <div className='p-2 mx-auto mt-5 overflow-x-auto '>
                            <table className="border-collapse w-full border-2 border-gray-500 ">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className='px-4 py-2'>Serial No.</th>
                                        <th className='px-4 py-2'>Task</th>
                                        <th className='px-4 py-2'>Assigned To</th>
                                        <th className='px-4 py-2'>Assigned On</th>
                                        <th className='px-4 py-2'>Status</th>
                                        <th className='px-4 py-2'>Change Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        recTasks.map((task, idx) => (
                                            <tr key={idx} className="hover:bg-blue-300 text-lg font-medium bg-blue-200 transition-all " >
                                                <td className='px-4 py-2 text-center'>{idx + 1}</td>
                                                <td className='px-4 py-2 text-center'>{task?.task}</td>
                                                <td className='px-4 py-2 text-center'>{task?.username}</td>
                                                <td className='px-4 py-2 text-center'>{new Date(task?.AssignedOn).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                                                <td className={`px-4 py-2 text-center ${task?.status === 'INCOMPLETE' ? "text-red-600" : "text-green-600"}`}>{task?.status}</td>
                                                <td className='px-4 py-2 text-center'><button onClick={() => { updateTaskStatus(task?._id); alert("Task completed") }} type='button' className='p-1 cursor-pointer bg-blue-500 hover:bg-blue-600 font-semibold transition-all duration-300 text-white rounded-lg '>Mark as Done</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetailsRec