Rise Vision Common Header [![Circle CI](https://circleci.com/gh/Rise-Vision/common-header.svg?style=svg)](https://circleci.com/gh/Rise-Vision/common-header)  [![Coverage Status](https://coveralls.io/repos/Rise-Vision/common-header/badge.svg?branch=&service=github)](https://coveralls.io/github/Rise-Vision/common-header?branch=)
==============
![](screenshots/header.png)

## Introduction

A responsive AngularJS-based common header implementation to be used across Rise Vision web applications and pages.

<!-- Include a description of Project Name and what it's purpose is.
This does this to achieve this for you.
Do not use acronyms.
If applicable include screenshots and other images,
links to demonstration examples,
user documentation and any other applicable reference materials.
-->

Rise Vision Common Header works in conjunction with [Rise Vision](http://www.risevision.com), the [digital signage management application](http://rva.risevision.com/) that runs on [Google Cloud](https://cloud.google.com).

At this time Chrome is the only browser that this project and Rise Vision supports.

## Built With
<!-- example list follows, replace with actual tools used -->

- [ng-gapi-loader](https://github.com/Rise-Vision/ng-gapi-loader.git)
- [ng-core-api-client](https://github.com/Rise-Vision/ng-core-api-client.git)
- [angular-ui-flow-manager](https://github.com/Rise-Vision/angular-ui-flow-manager.git)
- [NPM (node package manager)](https://www.npmjs.org/)
- [Bower](http://bower.io/)
- [AngularJS](https://https://angularjs.org/)
- [Gulp](http://gulpjs.com/)
- [Karma](https://github.com/karma-runner/karma) and [Protractor](https://github.com/angular/protractor) for testing
- [Rise Vision Gulp Factory](https://github.com/Rise-Vision/widget-tester.git)

## Development
- [Development FAQ](https://developer.risevision.com/documentation/common-header/development-faq)
- [Developer's Guide](https://developer.risevision.com/documentation/common-header/common-header)

### Prerequisites
- [NPM (node package manager)](https://www.npmjs.org/)
- [Bower](http://bower.io/)
- (Optional) [Karma](https://github.com/karma-runner/karma) and [Protractor](https://github.com/angular/protractor) for running tests


### Local Development Environment Setup and Installation
<!--provide exact details on how to setup the local environment for at least Windows, and if doable, Linux and Mac-->

``` bash
npm run dev
```

### Run Local
<!--include how to run the application locally if applicable-->

``` bash
gulp server-watch
```

And navigate to http://localhost:8099/test/e2e/index.html

#### bower.json
``` js
"dependencies": {
  "rise-vision-common-header": "https://github.com/Rise-Vision/common-header.git"
}
```

#### html
Be sure to load angular first.  Then....
``` html
    <!-- build:js script/common-header.min.js -->
    <script src="components/common-header/dist/common-header.js"></script>
    <!-- endbuild -->

    <!-- build:jsdev nothing-->
    <script src="components/common-header/src/common-header.js"></script>
    <!-- endbuild -->
```

#### gulpfile.js
For the build output, process the html file with gulp-usemin, ensuring the js
target is included and the jsdev target is ignored so that it gets removed from the html file.
...

``` js
.pipe(usemin({
  js: [uglify({mangle:false, outSourceMap: true})]
})
.pipe(gulp.dest("dist/");
```

### Testing

To run all tests at once, do

``` bash
npm run test
```

#### Unit Testing
``` bash
gulp test:unit
```

#### Protractor End-to-End Testing
A mock Google API server is included for End-to-End testing. To run tests, do

``` bash
gulp test:e2e
```

## Submitting Issues
If you encounter problems or find defects we really want to hear about them. If you could take the time to add them as issues to this Repository it would be most appreciated. When reporting issues please use the following format where applicable:

**Reproduction Steps**

1. did this
2. then that
3. followed by this (screenshots / video captures always help)

**Expected Results**

What you expected to happen.

**Actual Results**

What actually happened. (screenshots / video captures always help)

## Contributing
All contributions are greatly appreciated and welcome! If you would first like to sound out your contribution ideas please post your thoughts to our [community](https://help.risevision.com/hc/en-us/community/topics/), otherwise submit a pull request and we will do our best to incorporate it

### Languages
<!--*If this Project supports Internationalization include this section:*

If you would like translate the user interface for this product to another language please complete the following:
- Download the english translation file from this repository.
- Download and install POEdit. This is software that you can use to write translations into another language.
- Open the translation file in the [POEdit](http://www.poedit.net/) program and set the language for which you are writing a translation.
- In the Source text window, you will see the English word or phrase to be translated. You can provide a translation for it in the Translation window.
- When the translation is complete, save it with a .po extension and email the file to support@risevision.com. Please be sure to indicate the Widget or app the translation file is for, as well as the language that it has been translated into, and we will integrate it after the translation has been verified.

*if the Project does not support Internationalization include this section and include this need in our suggested contributions*-->

In order to support languages i18n needs to be added to this repository.  Please refer to our Suggested Contributions.

### Suggested Contributions
- Add more broadcast events as needed
- I18n support

## Resources
If you have any questions or problems please don't hesitate to join our lively and responsive community at https://help.risevision.com/hc/en-us/community/topics/.

If you are looking for user documentation on Rise Vision please see http://www.risevision.com/help/users/

If you would like more information on developing applications for Rise Vision please visit http://www.risevision.com/help/developers/.

**Facilitator**

* [Xiyang Chen](https://github.com/settinghead "Xiyang Chen")
* [Varun Vachhar](https://github.com/winkervsbecks "Varun Vachhar")
