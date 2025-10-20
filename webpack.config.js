const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path          = require( 'path' );
const glob          = require( 'glob' );

// Start building our config here so we can add entry's with the functions below
let config = {
    ...defaultConfig,
    entry: {
        ...defaultConfig.entry,
    },
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                // @link https://stackoverflow.com/a/69041786
                generator: {
                    filename  : '[name][ext]',
                    publicPath: '//build/fonts/',
                    outputPath: 'fonts/',
                },
                type: 'asset/resource',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                generator: {
                    filename  : '[name][ext]',
                    publicPath: '//build/img/',   /* @link https://webpack.js.org/configuration/module/#rulegeneratorpublicpath*/
                    outputPath: 'img/',
                },
                type: 'asset/resource',
            },
        ]
    }
}

/**
 * Merge all files and blocks in a source folder without having to keep adding here. Based on link below but iterated on.
 * 
 * @link https://github.com/webpack/webpack/issues/1732#issuecomment-163522781
 */
let frontend           = glob.sync('src/frontend/**/*.{js,css,scss}'),   // gets all JS, CSS or SCSS files to stop trying to build subfolders
    frontendJsChildren = glob.sync('src/frontend/**/*/index.js'),        // gets all JS, CSS or SCSS files to stop trying to build subfolders
    blocks             = glob.sync('src/blocks/**/*.{js,css,scss}'),
    admin              = glob.sync('src/admin/**/*.{js,css,scss}');

if ( frontend.length  ) {

    toObject(frontend);

}

if ( frontendJsChildren.length  ) {

    toObject(frontendJsChildren);

}

if ( blocks.length  ) {

    toObject(blocks);

}

if ( admin.length  ) {

    toObject(admin);

}


/**
 * Take an array of file paths and add them to the config entry array
 * ready to be built.
 * 
 * @param {Array} pathsArray an array of file paths
 */
function toObject( pathsArray ) {

    pathsArray.forEach(function(paths) {

        let pathSplit      = paths.split('/'),                                // Split path to use in path.resolve
            fileName       = pathSplit[pathSplit.length - 1].split('.')[0],   // need to remove the ".file-extension" when building (e.g. style.css to style)
            fileExtension  = pathSplit[pathSplit.length - 1].split('.')[1],
            folderName     = pathSplit[1],
            outputFilename = '';
        
            
        // Need different output folders/structure depending on whether it's a block/frontend/admin
        if ( folderName == 'blocks' ) {

            outputFilename = '/blocks/' + pathSplit[2] + '/' + fileName;

        } else if ( folderName == 'frontend' ) {

            outputFilename = '/app/' + fileName;

        } else if ( folderName == 'admin' ) {

            outputFilename = '/admin/' + fileName;

        }

        // Stop files with the same name but different extension overwriting each other by adding the extension to the key
        if ( outputFilename in config.entry ) {

            outputFilename += '-' + fileExtension;

        }

        // At the moment pathSplit is done based on our current file system, might need to update in future or get it working programmatically
        config.entry[outputFilename] = path.resolve( process.cwd(), paths );

    });
  
}

module.exports = config;