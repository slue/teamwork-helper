export const addTask = makeAction('ADD_TASK')

function makeAction (type) {
    return ({ dispatch }, ...args) => dispatch(type, ...args)
}