const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
let connection;

const main = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "password",
      database: "employeeDB",
    });

    console.log(`Connected to db with id: ${connection.threadId}`);
    await runSearch(connection);
    connection.end();
  } catch (error) {
    console.log(error);
  }
};
const runSearch = async (connection) => {
  const { action } = await inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "View all employee",
      "View all employee's Department",
      "view employee by manager",
      "add employee",
      "remove employee",
      "update employee role",
      "update employee master",
    ],
  });

  switch (action) {
    case "View all employee":
      viewEmployees(connection);
      break;
    case "View all employee's Department":
      viewDepartments(connection);
      break;
    default:
      connection.end();
      break;
  }
};
main();
