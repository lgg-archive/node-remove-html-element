// Init vars
var jsdom = require("jsdom");
var fs = require("fs");
var jquery = require('jquery');

//export
module.exports = function run(files, remove_selector) {
    //If we need to remove few selectors in 1 file
    if (!Array.isArray(remove_selector)) {
        remove_selector = [remove_selector];
    }

    //check we have few files
    if (Array.isArray(files)) {
        //run all files
        files.forEach((file) => {
            //file = [filename, [selectors]]

            //If we have personal selector
            if (file[1]) {
                run(file[0], file[1]);
            } else {
                run(file[0], remove_selector);
            }
        });
    } else {
        //run all selectors
        remove_selector.forEach((selector) => {
            removeSelector(files, selector);
        });
    }
};


//Main func
function removeSelector(filename, remove_selector) {
    var config = {};
    config.file = filename;
    config.scripts = [];

    // This func will be executed, when virtual .html document will be created
    config.done = (error, window) => {
        handleError(error);

        jsdom.jQueryify(
            window,
            [],
            () => {
                // Load jquery
                window.$ = jquery(window);

                // start parsing
                handleDocument(window, filename, remove_selector);
            }
        );
    };

    //Run
    jsdom.env(config);
}


//Error handling
function handleError(error) {
    if (error) {
        console.log('ERROR:', error);
    }
}


//Removing func
function handleDocument(window, filename, remove_selector) {
    try {
        //remove selector
        window.$(remove_selector).remove();
        console.log('removed:', remove_selector);

        //clear jsdom scripts
        window.$('.jsdom').remove();

        //save to file
        //get new html
        var new_html = window.$('html')[0].outerHTML;

        //write to file
        fs.writeFileSync(filename, new_html);
        console.log(filename, 'updated');

        //Free memory
        window.close();

    } catch (error) {
        handleError(error);
    }
}