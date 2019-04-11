const config = {
  app: {
    src: './src',
    dest: './dest',
  },
  htmls: {
    src: './src/views/**/*.html',
    dest: './dest',
  },
  styles: {
    entrypoint: './src/assets/stylesheets/application.scss',
    src: './src/assets/stylesheets/**/*.scss',
    dest: './dest/assets/stylesheets/',
    bundleFileName: 'bundle',
  },
  scripts: {
    entrypoint: './src/assets/javascripts/application.js',
    src: './src/assets/javascripts/**/*.js',
    dest: './dest/assets/javascripts/',
    bunleFileName: 'bundle',
  },
};

module.exports = {
  config,
};
