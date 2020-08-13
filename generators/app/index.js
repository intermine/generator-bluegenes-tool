const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const inquirer = require('inquirer');

const idList = [1215734, 1161508, 1020855];
module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('generator-license'), {
      defaultLicense: 'MIT' // (optional) Select a default license
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the laudable ${chalk.red('generator-bluegenes-tool')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'toolNameCljs',
        message:
          'What shall we name your project? This is a computer name with no spaces or special characters.',
        default: 'bluegenesToolNameHere',
        validate: input => {
          input = input.trim();
          if (input === '') {
            return 'App name cannot be empty!';
          }
          if (input.search('-') !== -1 || input.search(' ') !== -1) {
            return 'Oops! Project name cannot contain spaces or special characters!';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'toolNameNpm',
        message:
          'NPM package name? This is a computer name with no capital letters or special characters apart from the - dash.',
        default: 'bluegenes-tool-name-here'
      },
      {
        type: 'input',
        name: 'toolNameHuman',
        message:
          'Thanks! Now, give me a human name for the project - e.g. "Protein Feature Viewer"',
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
        message:
          'Fabulous. Which report pages do you expect this tool to work for, e.g. "Gene" or "Protein"? Separate with commas and put * for all.',
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
      },
      {
        type: 'confirm',
        message:
          'Initialise with React and Babel? This will allow you to use React and ECMAscript 2015+ features.',
        name: 'reactReq',
        default: false
      },
      {
        type: 'confirm',
        message:
          'Would you like to add CSS-loader to your tool? It would allow you to import css files along with less in your components',
        name: 'CSSLoaderReq',
        default: false
      }
    ];
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Short way, this update this to `react-setup` if required
    let reactSetupReq = '';
    let CSSLoader = '';
    let CSSLoaderDependency = '';
    if (this.props.reactReq) {
      reactSetupReq = '.react-setup';
    }
    if (this.props.CSSLoaderReq) {
      /* eslint-disable */
      CSSLoader = `{
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },`;
      /* eslint-enable */
      CSSLoaderDependency = `,
      "style-loader": "^1.1.3",
      "css-loader": "^3.4.2"`;
    }

    this.fs.copyTpl(this.templatePath('demo.html'), this.destinationPath('demo.html'), {
      title: this.props.toolNameHuman,
      toolNameCljs: this.props.toolNameCljs,
      mineUrl: 'https://www.humanmine.org/humanmine',
      reactReq: this.props.reactReq,
      classes: getFirstElement(this.props.classes),
      format: this.props.accepts[0],
      value: getValue(this.props.accepts[0])
    });

    this.fs.copyTpl(
      this.templatePath(`webpack.config${reactSetupReq}.js`),
      this.destinationPath('webpack.config.js'),
      {
        toolNameCljs: this.props.toolNameCljs,
        CSSLoader
      }
    );

    this.fs.copyTpl(
      this.templatePath('config.json'),
      this.destinationPath('config.json'),
      {
        accepts: JSON.stringify(this.props.accepts),
        toolNameHuman: this.props.toolNameHuman,
        toolNameCljs: this.props.toolNameCljs,
        classes: stringToMultiValue(this.props.classes)
      }
    );

    this.fs.copyTpl(
      this.templatePath(`package${reactSetupReq}.json`),
      this.destinationPath('package.json'),
      {
        author: this.props.author,
        toolNameNpm: this.props.toolNameNpm,
        licence: this.props.licence,
        CSSLoaderDependency
      }
    );

    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
      author: this.props.author,
      toolNameHuman: this.props.toolNameHuman,
      toolNameNpm: this.props.toolNameNpm,
      toolNameCljs: this.props.toolNameCljs,
      licence: this.props.licence
    });

    this.fs.copyTpl(
      this.templatePath('src/style.less'),
      this.destinationPath('src/style.less'),
      {
        toolNameCljs: this.props.toolNameCljs
      }
    );

    this.fs.copyTpl(
      this.templatePath(`src/index${reactSetupReq}.js`),
      this.destinationPath('src/index.js'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('dev/serve.js'),
      this.destinationPath('dev/serve.js'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath(`.eslintrc${reactSetupReq}`),
      this.destinationPath('.eslintrc'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('.prettierrc'),
      this.destinationPath('.prettierrc'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('tests/index.test.js'),
      this.destinationPath('tests/index.test.js'),
      {}
    );

    this.fs.copyTpl(this.templatePath('TODO.md'), this.destinationPath('TODO.md'), {});

    if (reactSetupReq) {
      this.fs.copyTpl(
        this.templatePath('src/RootContainer.react-setup.js'),
        this.destinationPath('src/RootContainer.js')
      );

      this.fs.copyTpl(
        this.templatePath('.babelrc.react-setup'),
        this.destinationPath('.babelrc')
      );
    }
  }

  install() {
    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['add', '.']);
    this.spawnCommandSync('git', [
      'commit',
      '-m',
      'intial commit - scaffolded tool via CLI'
    ]);
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};

function stringToMultiValue(values) {
  // Split and trim values. Return pseudo-aray.
  let vals = values.split(',');
  // No more whitespace, please
  vals = vals.map(val => val.replace(/\s+/g, ''));
  return JSON.stringify(vals);
}

function getFirstElement(value) {
  let vals = value.split(',');
  return vals[0];
}

function getValue(val) {
  if (val === 'id') return idList[0];
  return JSON.stringify(idList);
}
