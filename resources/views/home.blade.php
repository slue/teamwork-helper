@extends('layouts.app')

@section('content')
    <div id="app" class="container">
        <div class="row">
            <div class="col-md-12">
                <new-task></new-task>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">Recently created tasks</div>
                    <div class="panel-body">
                        <ul class="task-list">
                            <li v-for="task in last_tasks | limitBy 15">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <span class="text-primary proj-name-label">@{{ task.project_name }}</span>
                                    </div>
                                    <div class="col-sm-7">@{{ task.task_name }}</div>
                                    <div class="col-sm-2 text-right">
                                        <a href="https://campaigning-bureau.teamwork.com/tasks/@{{ task.task_id }}"
                                           target="_blank">Show me</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
