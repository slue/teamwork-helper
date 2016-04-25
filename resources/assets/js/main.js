Vue.config.devtools = true;
Vue.http.headers.common['Authorization'] = 'Basic ' + teamwork_auth_key;

import NewTask from './components/new-task.vue'

new Vue({
    el: '#app',
    components: {NewTask},
    data: {
        projects: project_list
    }
});