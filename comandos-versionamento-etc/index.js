const _ = require('underscore')

const result = _.contains([1, 2, 3], 2)
console.log(result)

// -Every Node application has a package.json file that includes metadata about the application.This includes the name of the application, its version, dependencies, etc. 
// - We use NPM to download and install 3rd party packages from NPM registry: 
// -All the installed packages and their dependencies are stored under node_modules folders.This folder should be excluded from the source control.
// - Node packages follow semantic versioning: major.minor.patch

// - Useful NPM commands are: 

// Install a package
// npm i <packageName>

// Install a specific version of a package 
// npm i <packageName>@<version>

// Install a package as a development dependency
// npm i <packageName> —save-dev

// Uninstall a package
// npm un <packageName>

// List installed packages
// npm list —depth=0

// View outdated packages
// npm outdated

// Update packages
// npm update 

// -To install uninstall packages globally, use -g flag.