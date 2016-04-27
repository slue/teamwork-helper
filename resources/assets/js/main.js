import NewTask from './components/new-task.vue'
import store from './vuex/store'

Vue.config.devtools = true;
Vue.http.headers.common['Authorization'] = 'Basic ' + teamwork_auth_key;

new Vue({
    el: '#app',
    components: {NewTask},
    store: store,
    vuex: {
        getters: {
            last_tasks: state => state.last_tasks
        }
    },
    data: {
        projects: project_list
        //recent_tasks: TaskListMgr.tasks
    }
});