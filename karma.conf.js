// Export the Karma configuration function
module.exports = function (config) {
  config.set({
    basePath: '', // Base path that will be used to resolve all patterns (e.g., files, exclude)

    frameworks: ['jasmine', '@angular-devkit/build-angular'], // Use Jasmine and Angular CLI test framework

    plugins: [
      require('karma-jasmine'), // Jasmine plugin for Karma
      require('karma-chrome-launcher'), // Allows tests to run in Chrome
      //  You can add Edge support with: require('karma-edge-launcher'),
      require('karma-jasmine-html-reporter'), // Shows test results in the browser
      require('karma-coverage'), // Collects test coverage
      require('@angular-devkit/build-angular/plugins/karma') // Angular CLI build plugin
    ],

    client: {
      clearContext: false, // Keep the Jasmine Spec Runner output visible in the browser
    },

    files: [
      { pattern: './src/test.ts', watched: false }
    ],

    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'), // 👈 Directory where the coverage reports will be saved
      subdir: '.', // 👈 Use the root of the above directory (i.e., save directly in /coverage folder)
      reporters: [
        { type: 'html' }, // 👈 Creates a full HTML report you can open in your browser to explore coverage file by file
        { type: 'text-summary' } // 👈 Prints a short summary (like % covered) directly in the terminal/console
      ]
    },
    reporters: ['progress', 'kjhtml'], // Display progress and HTML reports in browser

    port: 4203, // Port where Karma runs
    colors: true, // Enable colored output
    logLevel: config.LOG_INFO, // Log level
    autoWatch: true, // Re-run tests when files change

    // 👉 Currently using only Chrome
    // To run in Edge as well, update to: browsers: ['Chrome', 'Edge']
    browsers: ['Chrome'], 

    singleRun: false, // Set to true for CI - runs tests once and exits
    restartOnFileChange: true // Auto-restart tests when any file changes
  });
};


// Output Folder Example:
// When tests are run, you’ll get:

// /your-project
//   └── /coverage
//        ├── index.html        👈 Open this file in your browser to view the coverage report
//        ├── *.js.html         👈 Individual file coverage breakdown
//        └── ...               👈 Other assets and data


// files: [
//   { pattern: './src/test.ts', watched: false }
// ],