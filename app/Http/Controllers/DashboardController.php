<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;

class DashboardController extends Controller
{
    function index()
    {
        $user = auth()->user();
        $totalPendingTasks = Task::query()->where('status', 'pending')->count();
        $myPendingTasks = Task::query()
            ->where('status', 'pending')
            ->where('assigned_to', $user->id)
            ->count();

        $totalInProgressTasks = Task::query()->where('status', 'in_progress')->count();
        $myInProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->where('assigned_to', $user->id)
            ->count();

        $totalCompletedTasks = Task::query()->where('status', 'completed')->count();
        $myCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->where('assigned_to', $user->id)
            ->count();

        $activeTasks = Task::query()
            ->whereIn('status', ['in_progress', 'pending'])
            ->where('assigned_to', $user->id)
            ->with('project')
            ->limit(10)
            ->get();

        $activeTasks = TaskResource::collection($activeTasks);

        return inertia('Dashboard',
            compact(
                'totalPendingTasks',
                'myPendingTasks',
                'totalInProgressTasks',
                'myInProgressTasks',
                'totalCompletedTasks',
                'myCompletedTasks',
                'activeTasks'
            )
        );
    }
}
