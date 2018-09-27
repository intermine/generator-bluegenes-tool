'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const inquirer = require('inquirer')

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('generator-license'), {
    defaultLicense: 'MIT' // (optional) Select a default license
  })
}

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the laudable ${chalk.red('generator-bluegenes-tool')} generator!`)
    );

    const prompts = [{
        type: 'input',
        name: 'toolNameCljs',
        message: 'What shall we name your project? This is a computer name with no spaces or special characters.',
        default: 'bluegenesToolNameHere'
      },
      {
          type: 'input',
          name: 'toolNameNpm',
          message: 'NPM package name? This is a computer name with no capital letters or special characters apart from the - dash.',
          default: 'bluegenes-tool-name-here'
        },
      {
        type: 'input',
        name: 'toolNameHuman',
        message: 'Thanks! Now, give me a human name for the project - e.g. "Protein Feature Viewer"',
        default: 'New Bluegenes Tool'
      },
      // {
      //   type: 'input',
      //   name: 'mine',
      //   message: 'Brilliant. What InterMine would you like to start with?',
      //   default: 'New Bluegenes Tool'
      // }
      {
        type: 'input',
        name: 'classes',
        message: 'Fabulous. Which report pages do you expect this tool to work for, e.g. "Gene" or "Protein"? Separate with commas and put * for all.',
        default: 'Gene'
      },
      {
        type: 'checkbox',
        message: 'Awesome. What type of InterMine data can you work with?',
        name: 'accepts',
        choices: [
          new inquirer.Separator(' = Report page = '),
          {
            name: 'id',
            checked: true
          },
          new inquirer.Separator(' = List page = '),
          {
            name: 'ids'
          },
          {
            name: 'rows'
          },
          {
            name: 'records'
          },
          {
            name: 'tablerows'
          }
        ]
      }
    ];
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('demo.html'),
      this.destinationPath('demo.html'), {
        title: this.props.toolNameHuman,
        toolNameCljs: this.props.toolNameCljs,
        mineUrl: 'http://humanmine.org/human'
      }
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'), {
        toolNameCljs: this.props.toolNameCljs
      }
    );

    this.fs.copyTpl(
      this.templatePath('config.json'),
      this.destinationPath('config.json'), {
        accepts: JSON.stringify(this.props.accepts),
        toolNameHuman: this.props.toolNameHuman,
        toolNameCljs: this.props.toolNameCljs,
        classes: stringToMultiValue(this.props.classes)
      }
    );

  this.fs.copyTpl(
    this.templatePath('package.json'),
    this.destinationPath('package.json'), {
      author: this.props.author,
      toolNameNpm: this.props.toolNameNpm,
      licence: this.props.licence
    }
  );

  this.fs.copyTpl(
    this.templatePath('README.md'),
    this.destinationPath('README.md'), {
      author: this.props.author,
      toolNameHuman: this.props.toolNameHuman,
      toolNameNpm: this.props.toolNameNpm,
      toolNameCljs: this.props.toolNameCljs,
      licence: this.props.licence
    }
  );

  this.fs.copyTpl(
    this.templatePath('src/style.less'),
    this.destinationPath('src/style.less'), {
      toolNameCljs: this.props.toolNameCljs
    }
  );

  this.fs.copyTpl(
    this.templatePath('src/index.js'),
    this.destinationPath('src/index.js'), {}
  );
}
install() {
  this.installDependencies({
      npm: true,
      bower: false,
      yarn: false});
}
};

function stringToMultiValue(values) {
  //split and trim values. Return pseudo-aray.
  var vals = values.split(",");
  //no more whitespace, please
  vals = vals.map(val => val.replace(/\s+/g, ''))
  return JSON.stringify(vals);
}
