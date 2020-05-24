const mysql = require("mysql2/promise");
const { prompt } = require("inquirer");

const main = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Cupcakesc4360",
      database: "employeesDB",
    });

    console.log(`Connected to db with id: ${connection.threadId}`);
    await runSearch(connection);
    connection.end();
  } catch (error) {
    console.log(error);
  }
};
main();
const runSearch = async (connection) => {
  const { action } = await prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "View all employee's Department",
      "view employee by manager",
      "add employee",
      "remove employee",
      "update employee role",
      "update employee master",
    ],
  });

  switch (action) {
    case "View all employees":
      await viewEmployees(connection);
      break;
    // case "View all employee's Department":
    //   viewDepartments(connection);
    //   break;
    default:
      connection.end();
      break;
  }
};

const viewEmployees = async (connection) => {
  try {
    const sqlQuery = "SELECT * FROM employees";
    const [rows, fields] = await connection.query(sqlQuery);
    console.table(rows);
  } catch (err) {
    console.log(err);
  }
};
// const addEmployees = async (connection) => {
//   const sqlQuery = "INSERT emplpoyees SET ?";
//   //set is the quantity and second "?" is price  where is flaor and? is the id and means all or none of the rows
//   const params = [
//     { roleId: },
//     { price: 3.7 },
//     { flavor: "boofa" },
//     { id: 4 },
//   ];

//   const [rows, field] = await connection.query(sqlQuery, params);
//   console.log(rows);
// };
