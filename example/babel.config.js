const path = require('path');
const pak = require('../package.json');

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: './',
                    extensions: ['.tsx', '.ts', '.js', '.json'],
                    alias: {
                        [pak.name]: path.join(__dirname, '..', pak.main),
                        '@/utils': './src/utils',
                        '@/constants': './src/constants',
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
