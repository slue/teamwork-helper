<div id="new-task" class="panel panel-default">
    <div class="panel-heading">Add New Teamwork Task</div>
    <div class="panel-body">
        <section>
            <header>
                <h4>1. Choose your project:</h4>
            </header>
            <div class="section-body">
                <div class="project-list">
                    <a v-for="project in projects" v-on:click="chooseProject(project.dev_tasklist_id)"
                       v-bind:class="{ 'is-selected' : project.dev_tasklist_id == tasklist_id }"
                       class="btn btn-primary btn-toggle">@{{ project.name }}</a>
                </div>
            </div>
        </section>
        <section v-if="step > 1" transition="add-section">
            <header>
                <h4>2. What's the problem?</h4>
            </header>
            <div class="section-body">
                <div class="input-group">
                    <input id="new-task-name" type="text" class="form-control input-lg" placeholder="could you please..."
                            v-model="new_task_name">
                    <span class="input-group-btn">
                        <a class="btn btn-lg btn-primary" v-on:click="addTask">Submit</a>
                    </span>
                </div>
            </div>
        </section>
    </div>
</div>