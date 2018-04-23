const rewired = require('react-app-rewired');

function rewireSass(config) {
    let oneOf = config.module.rules.find(rule => rule.oneOf).oneOf;

    const cssLoader = rewired.getLoader(
        config.module.rules,
        rule => rule.test && String(rule.test) === String(/\.css$/)
    );

    const sassLoader = {
        test: /\.scss$/,
        use: [...(cssLoader.loader || cssLoader.use), 'sass-loader']
    };

    // const babelLoader = rewired.getBabelLoader(config.module.rules);
    
    // oneOf = oneOf.filter(i => {

    //     if (i.test) {

    //         return !new RegExp('svg').test(i.test.source);
    //     }

    //     return true;
    // });

    // const svgLoader = {
    //     test: /\.svg$/,
    //     use: [
    //         {
    //             loader: babelLoader.loader,
    //             options: babelLoader.options
    //         },
    //         { 
    //             loader: require.resolve(`svgr/webpack`),
    //             query: {
    //                 compact: false
    //             }
    //         },
    //     ]
    // };

    oneOf.unshift(sassLoader);
    // oneOf.unshift(svgLoader);

    return config;
}

module.exports = function override(config, env) {
    config = rewireSass(config, env);
    return config;
};
