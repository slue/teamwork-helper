import middlewares from './middlewares'

export const STORAGE_KEY = 'teamwork-helper'

const state = {
    last_tasks: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

const mutations = {
    ADD_TASK (state, task_id, task_name, project_name) {
        state.last_tasks.unshift({
            task_id: task_id,
            task_name: task_name,
            project_name: project_name
        })
    }
}

export default new Vuex.Store({
    state,
    mutations,
    middlewares
})