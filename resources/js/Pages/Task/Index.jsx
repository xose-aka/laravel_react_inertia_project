import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Index({auth, tasks, queryParams, success }) {

    const deleteTask = (task) => {
        if ( window.confirm("Are you sure to delete task") ) {
            router.delete(route('tasks.destroy', task))
        } else {
            return;
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>
                    <Link href={route('tasks.create')}
                          className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                        Add new
                    </Link>
                </div>

            }
        >
            <Head title="Tasks"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    { success &&
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    }
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable tasks={tasks} deleteTask={deleteTask} hideProjectName={false} queryParams={queryParams}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
