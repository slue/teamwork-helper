<template>
    <div id="new-task" class="panel panel-default">
        <div class="panel-heading">Add New Teamwork Task</div>
        <div class="panel-body">
            <section transition="fade">
                <header>
                    <h4>1. Choose your project:</h4>
                    <span class="help"><i class="fa fa-info-circle"></i> - only projects with a tasklist called <strong>DEV</strong> are listed here</span>
                </header>
                <div class="section-body">
                    <div class="project-list">
                        <a v-for="project in projects" @click="chooseProject(project.dev_tasklist_id, project.name)"
                           v-bind:class="{ 'is-selected' : project.dev_tasklist_id == tasklist_id }"
                           class="btn btn-primary btn-toggle">{{ project.name }}</a>
                    </div>
                </div>
            </section>
            <section v-if="step > 1" transition="fade">
                <header>
                    <h4>2. What's the problem?</h4>
                </header>
                <div class="section-body">
                    <div class="input-group">
                        <input id="new-task-name"
                               type="text"
                               class="form-control input-lg"
                               placeholder="could you please..."
                               v-model="new_task_name"
                               @keyup.enter="tryAddTask"
                               :disabled="submitting" >
                            <span class="input-group-btn">
                                <a class="btn btn-lg btn-primary" @click="tryAddTask" :disabled="submitting">&nbsp;<i class="fa fa-fw" v-bind:class="{'fa-spin fa-circle-o-notch': submitting, 'fa-send': !submitting}"></i></a>
                            </span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    import {
            addTask
    } from '../vuex/actions'

    export default {
        data   : () => {
            return {
                projects            : project_list,
                step                : 1,
                new_task            : {},
                tasklist_id         : "",
                current_project_name: "",
                submitting          : false,
                new_task_name       : "" //needed for data binding
            }
        },
        vuex   : {
            actions: {
                addTask
            }
        },
        methods: {
            resetTask     : function(step = 1) {

                var due_date_in_days = 2,

                    today            = moment(),
                    tomorrow         = moment().add(due_date_in_days, 'days');


                this.new_task      = {
                    "content": "",
                    "notify" : true,

                    "start-date": today.format('YYYYMMDD'),
                    "due-date"  : tomorrow.format('YYYYMMDD'),
                };
                this.new_task_name = "";
                this.submitting = false;
                this.step = step;

                if(step == 2) {
                    this._focusTaskName();
                }
            },
            chooseProject : function(tasklist_id, project_name) {
                console.debug('chooseProject', tasklist_id);
                this.tasklist_id          = tasklist_id;
                this.current_project_name = project_name;

                if(this.step == 1) {
                    this.step++;
                }

                this._focusTaskName();
            },
            _focusTaskName: () => {
                Vue.nextTick(() => {
                    jQuery('#new-task-name').focus();
                });
            },
            tryAddTask    : function() {
                if(this.submitting) return;
                if(this.new_task_name.length < 1 || this.tasklist_id.length < 1) {
                    console.error('invalid data');
                    return;
                }

                this.submitting = true;
                this.new_task.content = this.new_task_name;


                //send it baby
                this.$http.post('https://campaigningbureau.teamwork.com/tasklists/' + this.tasklist_id + '/tasks.json',
                        {
                            "todo-item": this.new_task
                        }).then(
                        function(response) {
                            this.addTask(123123, this.new_task_name, this.current_project_name);
                            this.resetTask(2);
                        },
                        function(response) {
                            alert('Es gab leider einen Fehler:' + response);
                            this.resetTask();
                            console.debug(response);
                        }
                );
            }
        },
        created: function() {
            this.resetTask();
        }
    }
</script>