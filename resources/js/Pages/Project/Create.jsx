import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function Create({auth}) {

    const {data, setData, post, processing, errors, reset} = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('projects.store'))
    }

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create new project</h2>
                </div>
            }>

            <Head title="Projects"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div>
                                <InputLabel htmlFor={'project_image_path'} value={"Project Image"}/>
                                <TextInput
                                    id={'project_image_path'}
                                    type={'file'}
                                    name={'image'}
                                    value={ data.image }
                                    className="mt-1 block w-full"
                                    onChange={ e => setData('image', e.target.value) }
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
