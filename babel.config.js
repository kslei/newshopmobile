module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: 'react-native-dotenv',
          path: '.env',
          verbose: false,
        },
      ],
        '@babel/plugin-proposal-export-namespace-from',
        'react-native-reanimated/plugin',
    ],
  };
};
