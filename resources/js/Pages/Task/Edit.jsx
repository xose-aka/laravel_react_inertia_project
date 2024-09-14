import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Edit({auth, task, projects, users, success}) {

    const {data, setData, post, processing, errors, reset} = useForm({
        image: '',
        image_path: task.image_path || '',
        name: task.name || '',
        status: task.status || '',
        description: task.description || '',
        due_date: task.due_date || '',
        priority: task.priority || '',
        assigned_user: task.assignedUser.id || '',
        task_project: task.project.id || '',
        _method: 'PUT'
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('tasks.update', task.id))
    }

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit task {task.name}</h2>
                </div>
            }>

            <Head title="Tasks"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    { success &&
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    }
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="mb-4">
                                <img src={task.image_path} alt={task.name} className="w-64"/>
                            </div>
                            <div>
                                <InputLabel htmlFor={'image'} value={"Task Image"}/>
                                <TextInput
                                    id={'image'}
                                    type={'file'}
                                    name={'image'}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor={'task_project'} value={"Task Project"}/>
                                <SelectInput
                                    id={'task_project'}
                                    name={'task_project'}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('task_project', e.target.value)}
                                >
                                    <option value="">Please select project</option>
                                    {
                                        projects.data.map(project => (
                                            <option value={project.id} selected={project.id === data.task_project} key={project.id}>{project.name}</option>
                                        ))
                                    }
                                </SelectInput>
                                <InputError message={errors.task_project} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor={'task_name'} value={"Task Name"}/>
                                <TextInput
                                    id={'task_name'}
                                    type={'text'}
                                    name={'name'}
                                    value={data.name}
                                    isFocused={true}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor={'description'} value={"Task Description"}/>
                                <TextAreaInput
                                    id={'description'}
                                    name={'description'}
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor={'due_date'} value={"Task Deadline"}/>
                                <TextInput
                                    id={'due_date'}
                                    name={'due_date'}
                                    type={'date'}
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('due_date', e.target.value)}
                                />
                                <InputError message={errors.due_date} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor={'status'} value={"Task Status"}/>
                                <SelectInput
                                    id={'status'}
                                    name={'status'}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="">Please select status</option>
                                    <option value="pending" selected={data.status === 'pending'}>Pending</option>
                                    <option value="in_progress" selected={data.status === 'in_progress'}>In Progress</option>
                                    <option value="completed" selected={data.status === 'completed'}>Completed</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor={'priority'} value={"Task Priority"}/>
                                <SelectInput
                                    id={'priority'}
                                    name={'priority'}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('priority', e.target.value)}
                                >
                                    <option value="">Please select priority</option>
                                    <option value="low" selected={data.priority === 'low'}>Low</option>
                                    <option value="medium" selected={data.priority === 'medium'}>Medium</option>
                                    <option value="high" selected={data.priority === 'high'}>High</option>
                                </SelectInput>
                                <InputError message={errors.priority} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor={'assigned_user'} value={"Assigned user"}/>
                                <SelectInput
                                    id={'assigned_user'}
                                    name={'assigned_user'}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('assigned_user', e.target.value)}
                                >
                                    <option value="">Please select user to assign</option>
                                    {
                                        users.data.map(user => (
                                            <option value={user.id} selected={user.id === data.assigned_user} key={user.id}>{user.name}</option>
                                        ))
                                    }
                                </SelectInput>
                                <InputError message={errors.assigned_user} className="mt-2"/>
                            </div>
                            <div className="mt-4 text-right">
                                <Link href={route('tasks.index')} className="bg-gray-100 py-2 px-3 text-gray-800 rounded
                                                shadow transition-all hover:bg-gray-200 mr-2">
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all
                                hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
