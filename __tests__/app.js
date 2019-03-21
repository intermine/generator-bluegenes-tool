'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-bluegenes-tool:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file([
      'src/index.js',
      'src/style.less',
      'dev/serve.js',
      'config.json',
      'demo.html',
      'package.json',
      'README.md',
      'webpack.config.js',
      'TODO.md'
    ]);
  });
});
