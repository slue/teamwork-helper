@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div id="new-task" class="panel panel-default">
                    <div class="panel-heading">Add New Teamwork Task</div>
                    <div class="panel-body">
                        <section>
                            <header>
                                <h4>1. Choose your project:</h4>
                            </header>
                            <div class="section-body">
                                <div class="project-list">
                                    @foreach($projects as $project)
                                        <a href="#" class="btn btn-primary btn-toggle">{{$project['name']}}</a>
                                    @endforeach
                                </div>
                            </div>
                        </section>
                        <hr>
                        <section>
                            <header>
                                <h4>2. What's the problem?</h4>
                            </header>
                            <div class="section-body">
                                <input type="text" class="form-control input-lg" placeholder="could you please...">
                            </div>
                            <div class="section-footer text-right">
                                <a class="btn btn-primary">Submit</a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
