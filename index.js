const manager = require("./library/manager");
const engie = require("./library/engie");
const intern = require("./library/intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const output_dir = path.resolve(__dirname, "output");
const outputPath = path.join(output_dir, "profile.html");

const render = require("./library/htmlRenderer")

const teamMemb = [];

function start() {
    managerQuery();
}

function managerQuery() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the team manager?",
              },
              {
                type: "input",
                name: "id",
                message: "Team Manager's ID number:",
              },
              {
                type: "input",
                name: "email",
                message: "Team Manager's email address:",
              },
              {
                type: "input",
                name: "officeNumber",
                message: "Team Manager's office number:",
              },
            ])
            .then((val) => {
              const manager1 = new manager(
                val.name,
                val.id,
                val.email,
                val.officeNumber
              );
              console.table(manager1);
              teamMemb.push(manager1);
              addMember();
            });
}

function addMember() {
    inquirer
        .prompt([
            {
        type: "list",
        name: "what_type",
        message: "Add an engineer or intern to the team?",
        choices: ["Engineer", "Intern", "Not at this time"],
      },
    ])
    .then((val) => {
      if (val.what_type === "Engineer") {
        engineerQuery();
      } else if (val.what_type === "Intern") {
        internQuery();
      } else {
        createFile();
      }
    });
}

function enigeQuery() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Engineer's name?",
              },
              {
                type: "input",
                name: "id",
                message: "Engineer's ID number:",
              },
              {
                type: "input",
                name: "email",
                message: "Engineer's email address:",
              },
              {
                type: "input",
                name: "github",
                message: "What is the Engineer's GitHub Username?",
              },
            ])
            .then((val) => {
              const engineer1 = new engineer(val.name, val.id, val.email, val.github);
              console.table(engineer1);
              teamMemb.push(engineer1);
              addMember();
            });
}


function internQuery() {
    inquirer
        .prompt([
            {
          type: "input",
          name: "name",
          message: "Intern's name?",
        },
        {
          type: "input",
          name: "id",
          message: "Intern's ID number:",
        },
        {
          type: "input",
          name: "email",
          message: "Intern's email address:",
        },
        {
          type: "input",
          name: "school",
          message: "What school does/did the intern attend?",
        },
      ])
      .then((val) => {
        const intern1 = new intern(val.name, val.id, val.email, val.school);
        console.table(intern1)
        teamMemb.push(intern1);
        addMember();
      });
}

function createFile() {
    if (!fs.existsSync(output_dir)) {
        fs.mkdirSync(output_dir);
      } else {
    
        fs.writeFileSync(outputPath, render(teamMemb), "UTF-8");
        console.log("File created");
      }
}

start();