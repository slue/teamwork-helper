import { STORAGE_KEY } from './store'

const localStorageMiddleware = {
    onMutation (mutation, { last_tasks }) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(last_tasks))
    }
};

export default [localStorageMiddleware]