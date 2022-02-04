module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: './',
                extensions: ['.tsx', '.ts', '.js', '.json'],
                alias: {},
            },
        ],
        'react-native-reanimated/plugin',
        'inline-dotenv',
    ],
};
