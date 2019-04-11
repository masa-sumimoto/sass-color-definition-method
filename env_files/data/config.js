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
  images: {
    src: ['./src/assets/images/**/*.{png,jpg,svg,gif}', '!./src/assets/images/**/__*.{png,jpg,svg,gif}'],
    srcNoBuild: './src/assets/images/**/__*.{png,jpg,svg,gif}',
    dest: './dest/assets/images',
  },
  webpImages: {
    src: ['./src/assets/images/**/*.{png,jpg}', '!./src/assets/images/**/__*.{png,jpg}'],
    dest: './dest/assets/images',
  },
  fonts: {
    src: './src/assets/fonts/**/*',
    dest: './dest/assets/fonts',
  },
};

module.exports = {
  config,
};
