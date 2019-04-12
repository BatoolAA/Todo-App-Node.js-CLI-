const fs = require('fs')
const chalk = require('chalk')
let data = []

// Add task from user
const addTask = (title, description) => {

    data = loadData()       
    const newTask = {
        title,
        description,
    }

    const duplicate = chkForDuplicate(title, data)
    if(!duplicate){
        const newData = [...data, newTask]
        saveTask(newData)
        console.log(chalk.bold.underline.greenBright("Task is added !!"))
    }
    else{
        console.log(chalk.bold.blueBright("Title already exists.."))
    }
}

const loadData = () => {

    try{
        const rawData = fs.readFileSync("data.txt")
        const parsedData = JSON.parse(rawData)
        return parsedData
    }
    catch(e) {
        return []
    }
}

const chkForDuplicate = (title, data) => {
    const duplicateData = data.find((d) => d.title === title)
    return (!duplicateData) ? false : true
}

const saveTask = (newData) => {
    const mergedData = JSON.stringify(newData)
    fs.writeFileSync("data.txt", mergedData)
}

// Delete Task from user
const deleteTask = (title) => {

    const data = loadData()
    if(data.length === 0){
        console.log(chalk.bold.redBright("Empty List.."))
    }
    else{
        chkForDeleteTask(title, data)
    }
    
}

const chkForDeleteTask = (title, data) => {
    const duplicate = data.find((d) => d.title === title)
    if(duplicate){
        const newData = data.filter((d) => d.title !== title)
        saveTask(newData)
        console.log(chalk.bold.underline.greenBright("Task is deleted !!"))
    }
    else{
        console.log(chalk.bold.magentaBright("Task does not found"))
    }
}

// List of all Tasks
const listTask = () => {
    const data = loadData()
    if(data.length === 0){
        console.log(chalk.bold.redBright("Empty List.."))
    }
    else{
        console.log(chalk.bold.whiteBright.bgBlue("List of all Tasks: "))
        data.map(
                rec =>  {
                    console.log(chalk`{greenBright ${rec.title}}`)
                    console.log(chalk.cyanBright("     " + rec.description))}
            )
        }
}

// Get specific Task 
const getTask = (title) => {
    const data = loadData()
    if(data.length === 0){
        console.log(chalk.bold.redBright("Empty List.."))
    }
    else{
        const duplicateData = data.find((d) => d.title === title)
        if(duplicateData){
            console.log(chalk.bold.whiteBright.bgBlue("Getting Task: "))
            console.log(chalk`{cyanBright Title:  } {magentaBright ${duplicateData.title}}`)
            console.log(chalk`{cyanBright Description:  } {magentaBright ${duplicateData.description}}`)
        }
        else{
            console.log(chalk.bold.yellowBright("Title does not match.."))
        }
    }
}

module.exports = {
    addTask,
    deleteTask,
    listTask,
    getTask,
}