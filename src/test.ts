// test.ts

// Import Zone.js for Angular testing support
import 'zone.js/testing';

// Angular testing utility to configure the test environment
import { getTestBed } from '@angular/core/testing';

// Required testing modules to bootstrap the Angular testing environment in the browser
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Declare the `require` function used by Webpack to load files dynamically.
// This is used to find and load all the test files (*.spec.ts)
declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];           // Returns an array of matched file paths
    <T>(id: string): T;         // Imports the module at the given path
  };
};

// Initialize the Angular testing environment with necessary modules
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,     // Module to configure browser-based testing
  platformBrowserDynamicTesting(), // Platform that supports dynamic browser tests
);

// Use Webpack's require.context to search the project directory recursively
// for all test files that end with `.spec.ts`
const context = require.context('./', true, /\.spec\.ts$/);

// Load each matched test file so its tests are executed
context.keys().forEach(context);
