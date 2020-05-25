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
    case "add employee":
      await addEmployees(connection);
      break;
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
  main();
};
const addEmployees = async (connection) => {
  const data = await prompt([
    {
      name: "firstName",
      type: "input",
      message: "first name of jedi",
    },
    {
      name: "lastName",
      type: "input",
      message: "last name of jedi",
    },
    {
      name: "role",
      type: "input",
      message: "what is there role in the Jedi order",
      choices: ["jedi Knight", "padawan", "jedi master", "Gandmaster"],
    },
    {
      name: "theirMaster",
      type: "input",
      message: "who trained the jedi",
    },
  ]);
  const sqlQuery = "INSERT INTO employees SET ?";

  const params = {
    firstName: data.firstName,
    lastName: data.lastName,
    roleId: data.role,
    managerId: data.theirMaster,
  };

  const [rows, field] = await connection.query(sqlQuery, params);
  console.table(rows);
};

// const addEmployees = async (connection) => {
//   try {
//     const sqlQuery = "SELECT * FROM employees";
//     const [rows, fields] = await connection.query(sqlQuery);
//     console.table(rows);
//   } catch (err) {
//     console.log(err);
//   }
//   main();
// };

// const addEmployees = async (connection) => {
//   const sqlQuery = "INSERT emplpoyees SET ?";
//   //set is the quantity and second "?" is price  where is flaor and? is the id and means all or none of the rows
//   const params = [
//     { roleId: 8 },
//     { price: 3.7 },
//     { flavor: "boofa" },
//     { id: 4 },
//   ];

//   const [rows, field] = await connection.query(sqlQuery, params);

//   console.log(rows);
// };

// function addEmployees() {
//   inquirer
//     .prompt([
//       {
//         name: "firstName",
//         type: "input",
//         message: "first name of jedi",
//       },
//       {
//         name: "lastName",
//         type: "input",
//         message: "last name of jedi",
//       },
//       {
//         name: "role",
//         type: "input",
//         message: "what is there role in the Jedi order",
//         choices: ["jedi Knight", "padawan", "jedi master", "Gandmaster"],
//       },
//       {
//         name: "theirMaster",
//         type: "input",
//         message: "who trained the jedi",
//       },
//     ])
//     .then((data) => {
//       const sqlQuery = "INSERT INTO employees SET ?";

//       const params = [
//         { firstName: data.firstName },
//         { lastName: data.lastName },
//         { roleId: data.role },
//         { managerId: data.theirMaster },
//       ];

//       const rows = connection.query(sqlQuery, params);
//       console.table(rows.sql);
//     });
// }
