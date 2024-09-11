import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Edit({auth, user, success}) {

    const {data, setData, post, processing, errors, reset} = useForm({
        email: user.email || '',
        name: user.name || '',
        password: '',
        password_confirmation: '',
        _method: 'PUT'
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('users.update', user.id))
    }

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit user {user.name}</h2>
                </div>
            }>

            <Head title="Projects"/>

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
                                <img src={user.image_path} alt={user.name} className="w-64"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor={'user_name'} value={"User Name"}/>
                                <TextInput
                                    id={'user_name'}
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
                                <InputLabel htmlFor={'email'} value={"User Email"}/>
                                <TextInput
                                    id={'email'}
                                    name={'email'}
                                    type={'text'}
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor={'password'} value={"User Password"}/>
                                <TextInput
                                    id={'password'}
                                    type={'password'}
                                    name={'password'}
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor={'password_confirmation'} value={"User Password Confirmation"}/>
                                <TextInput
                                    id={'password_confirmation'}
                                    type={'password'}
                                    name={'password_confirmation'}
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                />
                                <InputError message={errors.password_confirmation} className="mt-2"/>
                            </div>
                            <div className="mt-4 text-right">
                                <Link href={route('users.index')} className="bg-gray-100 py-2 px-3 text-gray-800 rounded
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
