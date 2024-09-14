import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";

export default function Dashboard({ auth,
                                      myPendingTasks,
                                      totalPendingTasks,
                                      totalInProgressTasks,
                                      myInProgressTasks,
                                      totalCompletedTasks,
                                      myCompletedTasks,
                                      activeTasks
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-amber-600 font-semibold text-2xl">Pending Tasks</h3>
                            <p className="text-xl mt-4">
                                <span className="mr-2">{myPendingTasks}</span>/
                                <span className="ml-2">{totalPendingTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-blue-600 font-semibold text-2xl">In Progress Tasks</h3>
                            <p className="text-xl mt-4">
                                <span className="mr-2">{myInProgressTasks}</span>/
                                <span className="ml-2">{totalInProgressTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-green-600 font-semibold text-2xl">Completed Tasks</h3>
                            <p className="text-xl mt-4">
                                <span className="mr-2">{myCompletedTasks}</span>/
                                <span className="ml-2">{totalCompletedTasks}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-gray-200 font-semibold text-xl mb-3">My Active Tasks</h3>
                            <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400
                                                  border-b-2 border-gray-500">
                                <tr>
                                    <th className="px-3 py-3">ID</th>
                                    <th className="px-3 py-3">Project Name</th>
                                    <th className="px-3 py-3">Status</th>
                                    <th className="px-3 py-3">Name</th>
                                    <th className="px-3 py-3">Due Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        activeTasks.data.map(task => (
                                            <tr key={task.id}>
                                                <td className="px-3 py-2">
                                                    {task.id}
                                                </td>
                                                <td className="px-3 py-2 text-white hover:underline">
                                                    <Link href={route('projects.show', task.project.id)}>
                                                        {task.project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <span className={"px-3 py-1 rounded text-white " +
                                                        TASK_STATUS_CLASS_MAP[task.status]
                                                    }>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                                </td>
                                                <td className="px-3 py-2 text-white hover:underline">
                                                    <Link href={route('tasks.show', task.id)}>
                                                        {task.name}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.due_date}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
        </AuthenticatedLayout>
);
}
