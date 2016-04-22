/**
 * Created by christophschleifer on 20.04.16.
 */

Vue.config.devtools = true;
Vue.http.headers.common['Authorization'] = 'Basic ' + teamwork_auth_key;

new Vue({
    el: '#new-task',
    data: {
        projects: project_list,
        step: 1,
        new_task: {},
        tasklist_id: "",
        new_task_name: "" //needed for data binding
    },
    methods: {
        resetTask: function() {
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
        chooseProject: function(tasklist_id) {
            console.debug('chooseProject',tasklist_id);
            this.tasklist_id = tasklist_id;

            if(this.step == 1){
                this.step++;
            }

            Vue.nextTick(function() {
            jQuery('#new-task-name').focus();
            });
        },
        addTask: function() {
            if(this.new_task_name.length < 1 || this.tasklist_id.length < 1) {
                console.error('invalid data');
                return;
            }

            this.new_task.content = this.new_task_name;


            ////send it baby
            //this.$http.post('https://campaigningbureau.teamwork.com/tasklists/'+this.tasklist_id+'/tasks.json',this.new_task).then(
            //    function(response) { console.debug(response); },
            //    function(response) { console.debug(response); }
            //);
        }
    },
    created: function() {
        this.resetTask();

        this.$http.get('https://campaigningbureau.teamwork.com/projects.json').then(
            function(response) { console.debug(response); },
            function(response) { console.debug(response); }
        );
    }
});