<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query->where("status", "=", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name')->get();
        $users = User::query()->orderBy('name')->get();
        return inertia("Task/Create",
            [
                'projects' => ProjectResource::collection($projects),
                'users' => UserResource::collection($users),
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        /** @var UploadedFile $image */
        $image = $data['image'] ?? null;
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        $data['assigned_to'] = $data['assigned_user'];
        $data['project_id'] = $data['task_project'];

        if ( $image ) {
            $data['image_path'] = $image->store('task-' . Str::random(), 'public');
        }

        Task::query()->create($data);
        return to_route("tasks.index")->with('success', 'Task was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $query = $task->tasks();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query->where("status", "=", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Task/Show', [
            'task' => new TaskResource($task),
            'tasks'   => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name')->get();
        $users = User::query()->orderBy('name')->get();
        return inertia("Task/Edit",
            [
                'projects' => ProjectResource::collection($projects),
                'users' => UserResource::collection($users),
                'task' => new TaskResource($task)
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        /** @var UploadedFile $image */
        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->id();
        $data['assigned_to'] = $data['assigned_user'];
        $data['project_id'] = $data['task_project'];

        if ( $image ) {

            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }

            $data['image_path'] = $image->store('task-' . Str::random(), 'public');
        }

        $task->update($data);

        return to_route('tasks.edit', $task)->with('success', 'Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $image_path = $task->image_path;

        $task->delete();

        if ($image_path) {
            Storage::disk('public')->deleteDirectory(dirname($image_path));
        }

        return to_route('tasks.index')->with('success', "Task \"$name\" was deleted");
    }
}
