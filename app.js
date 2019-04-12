const {addTask, deleteTask, listTask, getTask} = require('./todo')
const yargs = require('yargs')

yargs.command({
    command: 'add',
    describe: 'Add Todo Task To File',
    builder: {
        title: {
            describe: 'add title of task',
            alias: 't',
            demandOption: true,
            type: 'string',
        },
        description: {
            describe: 'add description of task',
            alias: 'd',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => {
        addTask(argv.title, argv.description)
    }
})
yargs.command({
    command: 'delete',
    describe: 'Delete Todo Task From File',
    builder: {
        title: {
            describe: 'delete task',
            alias: 't',
            demandOption: true,
            type: 'string',
        },
    },
    handler: ({title}) => {
        deleteTask(title)
    }
})

yargs.command({
    command: 'get',
    describe: 'Get Specific Todo Task From File',
    builder: {
        title: {
            describe: 'get task',
            alias: 't',
            demandOption: true,
            type: 'string',
        },
    },
    handler: ({title}) => {
        getTask(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List Todo Task From File',
    handler() {
        listTask()
    }
})

yargs.parse()



