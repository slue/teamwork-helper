<template xmlns:v-on="http://www.w3.org/1999/xhtml">
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
                       class="btn btn-primary btn-toggle">{{ project.name }}</a>
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
                            v-model="new_task_name" v-on:keyup.enter="addTask">
                    <span class="input-group-btn">
                        <a class="btn btn-lg btn-primary" v-on:click="addTask">Submit</a>
                    </span>
                </div>
            </div>
        </section>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
    module.exports = {
        data: () => { return {
            projects: project_list,
            step: 1,
            new_task: {},
            tasklist_id: "",
            new_task_name: "" //needed for data binding
        }},
        methods: {
            resetTask: function () {
                console.debug('reset task');
                var due_date_in_days = 2,

                    today = moment(),
                    tomorrow = moment().add(due_date_in_days, 'days');


                this.new_task = {
                    "content": "",
                    "notify": true,

                    "start-date": today.format('YYYYMMDD'),
                    "due-date": tomorrow.format('YYYYMMDD'),
                };

                this.step = 1;
            },
            chooseProject: function (tasklist_id) {
                console.debug('chooseProject', tasklist_id);
                this.tasklist_id = tasklist_id;

                if (this.step == 1) {
                    this.step++;
                }

                Vue.nextTick(() => {
                    jQuery('#new-task-name').focus();
            });
            },
            addTask: function () {
                if (this.new_task_name.length < 1 || this.tasklist_id.length < 1) {
                    console.error('invalid data');
                    return;
                }

                this.new_task.content = this.new_task_name;


                //send it baby
                this.$http.post('https://campaigningbureau.teamwork.com/tasklists/' + this.tasklist_id + '/tasks.json',
                        {
                            "todo-item": this.new_task
                        }).then(
                        function (response) {
                            console.debug(response);
                        },
                        function (response) {
                            console.debug(response);
                        }
                );
            }
        },
        created: function () {
            this.resetTask();
        }
    }
</script>