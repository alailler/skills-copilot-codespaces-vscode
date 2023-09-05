function skillMembers() {
  return [
    {
      name: 'member',
      type: 'input',
      message: 'What is the name of the team member?',
    },
    {
      name: 'role',
      type: 'list',
      message: 'What is the role of the team member?',
      choices: ['Engineer', 'Intern', 'Manager'],
    },
    {
      name: 'id',
      type: 'input',
      message: 'What is the ID of the team member?',
    },
    {
      name: 'email',
      type: 'input',
      message: 'What is the email of the team member?',
    },
    {
      name: 'github',
      type: 'input',
      message: 'What is the GitHub username of the team member?',
      when: (answers) => answers.role === 'Engineer',
    },
    {
      name: 'school',
      type: 'input',
      message: 'What is the school of the team member?',
      when: (answers) => answers.role === 'Intern',
    },
    {
      name: 'officeNumber',
      type: 'input',
      message: 'What is the office number of the team member?',
      when: (answers) => answers.role === 'Manager',
    },
    {
      name: 'addMember',
      type: 'confirm',
      message: 'Would you like to add another team member?',
    },
  ];
}