## Getting Started

### 1. Build the project

The cloned/downloaded repository desn't contain prebuilt version of the project and you need to build it. You need to have [NodeJs](https://nodejs.org/en/) with npm. You also need to have [Bower](http://bower.io/) installed globally. 


Install npm dependencies 
```
npm install
```

Install bower dependencies 
```
bower install
```

Build the project and start local web server
```
npm first && npm start
```

Open the project [http://localhost:4000](http://localhost:4000).


**Warning!** all changes made in ```dist/``` folder would be overwriten on application build.

<br>

You can also <strong>[run the project in docker](#running-in-docker)</strong> thanks to @japrogramer

<br>

## Folder Structure

```
├── bower_components/       # vendor libraries installed by bower
├── build/                  # app build tasks and tools
├── node_modules/           # node dependencies        
├── dist/                   # compiled result
├── src/                    # source files
│── bower.json              # bower configuration file
└── package.json            # npm configuration file
```

#### ```src/``` folder

This folder contains our application source files. 
The folder structure reflects the app component structure.


Each non-underscored folder represents a single component module. Modules can be nested inside each other.

There are also special folders which start with an underscore. 
For example ```_common/``` folder contains common components that are used by other components at the same level.

This file structuring makes our app file organization very semantic and scalable. Also It's very easy to work on separate components even if you're developing large-scale applications.

```
├── _assets/                           # application assets
├── _common/                           # common components
|   ├── helpers/                       # handlebars helpers
|   └── styles/                        # application common styles
├── _themes/                           # different theme versions
├── app/                               # app module (dashboard view)
│   ├── _common/                       # app common components
│   |   ├── editor/                    # wysiwyg editor files
│   |   ├── footer/                    # footer files
│   |   ├── header/                    # header files
│   |   ├── modals/                    # common modal dialogs (confirm, image library, etc)
│   |   └── sidebar/                   # sidebar files
│   ├── {different modules}
│   ├── app-layout.hbs                 # app view layout
│   └── app.scss                       # main app view styles
├── auth/                              # auth module (login/signup/recover)
│   ├── {different modules}
│   ├── auth-layout.hbs                # auth view layout
│   └── auth.scss                      # main auth view styles
├── _context.js                        # main handlebars variables
├── _main.scss                         # main styles
├── _variables.scss                    # variables
├── config.js                          # javascript configs
└── main.js                            # main script file

```

#### ```build/``` folder

This folder contains files related to our application compilation. That can be styles preprocessing (LESS,SASS,PostCSS) and template engine compilation, script file concatenation and minification and other related tasks.

```
├── paths/                           # application file paths
|   ├── app.js                       # application file paths
|   └── vendor.js                    # 3-rd party plugins paths
├── tasks/                           # tasks folder
|   └── {different tasks}            # each file represents a single build task
├── utils/                           # some utils
├── config.js                        # build configs
└── gulpfile.js                      # main build file for gulp build system

```

#### ```dist/``` folder

Compiled state of our app with processed styles, templates, scripts and assets.

**Warning! Never work inside this folder, because your changes would be overwritten on every build**

<br>

## File Types

Our app consists of different file types.

#### Styles (*.scss)

We use [SASS](http://sass-lang.com/) as CSS preprocessor language. 
Main variables are defined in ```src/_variables.scss``` folder. 
For making life easier we broke down styles into components, and on build we're just merging all ```.scss``` files together and processing it to ```dist/css/app.css``` file. Style files are merged in the following order

```
{variables.scss}
{bootstrap variables}
{bootstrap mixins}
{rest style files}
```
The remaining style files are merged in the alphabetical order.

There are also different theme variations located in ```src/_themes/ folder```, where you can change the main variables to get different themes. There are a few predefined themes built in. You can add new themes by adding a new file in ```src/_themes/``` folder. The file name must end with ```-theme.scss```.

#### Scripts (*.js)

We separate application's scripts across its components. For simplicity we use ES5 in this version, and just wrap each component's script in jQuery ```$(function() { })```. JS configurations are defined in ```src/config.js``` file. On build, application script files are merged together and copied to ```dist/js/app.js``` folder. The script files are merged in the following order.

```
{config.js}
{all .js files except main.js}
{main.js}
```

#### Templates (*.hbs)

Templates are pieces of HTML files written in template engine language. We use [Handlebars](http://handlebarsjs.com/), which allows to have conditions in HTML, reuse partials in different pages (e.g. sidebars, footers), use loops, layouts etc.

#### Pages (*-page.hbs)

Templates themselves are just parts of the markup, and aren't compiled as separate files. What we really want in the final output is a ```.html``` page in the ```dist/``` folder. There are special handlebar templates for it, their filenames ending with ```-page.hbs```. Each ```{pagename}-page.hbs``` file would be compiled to ```dist/{pagename}.html``` page with a flatened file structure.

Pages can consist of different templates (partials) which can be included thanks to handlebars partial including feature. Also each page has its context, which is a data passed into the template on rendering. That data is used in template expressions and variables. page contexts can be defined in two ways:

**YAML** headers ([example](https://github.com/modularcode/modular-admin-html/blob/master/src/app/dashboard/index-page.hbs))

```
---
foo: bar
list: 
  - One
  - Two
  - Three
---
```
and **_context.js** files.
```
module.exports = {
  foo: 'bar',
  foo2: function() {
    // do some magic, return some string
  },
  list: [
    'One', 'Two', 'Three'
  ]
}
```

The final result of page context is a combination of both ways. Moreover, different depth level _context.js files are extending each other and then are extended with YAML headers data. For simplicity we use only **YAML** headers.

#### Layouts (*-layout.hbs)

If different pages have a lot of common components like sidebars, headers, footers, then it's a good idea to define a layout for those common pages, and define in page files only the content which is unique.

Layout is a page content wrapper. If the page has a layout in output we'll get page's content inserted into the layout. Layouts should have ```{{{body}}}``` handlebars tag, which is entry point for the page content. ([example](https://github.com/modularcode/modular-admin-html/blob/master/src/app/app-layout.hbs))

To define a page layout you need to specify page file context's ```layout``` variable. It can be done both with a YAML header or a _context.js file. ([example](https://github.com/modularcode/modular-admin-html/blob/master/src/app/forms/forms-page.hbs)).

Layouts can also have contexts and parent layouts.

```
{_main-layout.hbs}                  # main layout with doctype, head, scripts declaration
    {app/app-layout.hbs}            # dashboard layout with sidebar, header and footer
        {app/forms/forms-page.hbs}  # any dashboard page
```


If you need more advanced layouting with multiple content blocks at the same time you can use [handlebar-layouts](https://www.npmjs.com/package/handlebars-layouts) helper approach, which is also available out of the box.

#### Vendor files

In addition to application files, there are also third party plugin files (e.g. Bootstrap). They are managed by using [Bower](http://bower.io/). Usually vendor libraries consist from scripts, styles and assets (images, fonts). The build system will concatenate and copy all the script and style files accordingly to ```dist/js/vendor.js``` and ```dist/css/vendor.css```. It also will copy all assets to the ```dist/assets/``` folder.

<br>

## Running in Docker

You can run the project in docker. To build the container, you need to install docker and docker-compose than launch the docker daemon. After launching the daemon run the following commands from the project folder:
```
Build the image
```
docker-compose build
```

Launch the container
```
docker-compose up


