const fs = require('fs');
const inquirer = require('inquirer');  // Use require to import 'inquirer'

function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the project title:'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a project description:'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Enter installation instructions:'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Enter usage information:'
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Enter contribution guidelines:'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Enter test instructions:'
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license for your application:',
            choices: ['MIT', 'Apache 2.0', 'GPL 3.0']
        },
        {
            type: 'input',
            name: 'githubUsername',
            message: 'Enter your GitHub username:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address:'
        }
    ]);
}

function generateMarkdown(data) {
    let licenseBadge = '';
    if (data.license === 'MIT') {
        licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
    } else if (data.license === 'Apache 2.0') {
        licenseBadge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
    } else if (data.license === 'GPL 3.0') {
        licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
    }

    let licenseInfo = '';
    if (data.license === 'MIT') {
        licenseInfo = 'This application is covered under the [MIT license](https://opensource.org/licenses/MIT).';
    } else if (data.license === 'Apache 2.0') {
        licenseInfo = 'This application is covered under the [Apache 2.0 license](https://opensource.org/licenses/Apache-2.0).';
    } else if (data.license === 'GPL 3.0') {
        licenseInfo = 'This application is covered under the [GPL v3 license](https://www.gnu.org/licenses/gpl-3.0).';
    }

    const markdownContent = `
# ${data.title}

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## License
${licenseBadge}

${licenseInfo}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
For questions about this project, please contact:
- GitHub: [${data.githubUsername}](https://github.com/${data.githubUsername})
- Email: ${data.email}
`;

    return markdownContent;
}

function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
}

async function init() {
    try {
        console.log('Welcome to the README.md generator!\n');

        const userResponses = await promptUser();

        const markdown = generateMarkdown(userResponses);

        writeToFile('README.md', markdown);

        console.log('Successfully created README.md file!');
    } catch (error) {
        console.error('Error generating README:', error);
    }
}

init();