const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        ie: '10',
      },
      loose: true,
      modules: 'commonjs',
      corejs: 3,
      useBuiltIns: 'usage',
    },
  ],
  ['@babel/preset-react'],
  ['@babel/preset-typescript', { jsxPragma: 'h' }],
];

const plugins = [
  ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
  [
    'babel-plugin-styled-components',
    {
      minify: true,
      pure: true,
    },
  ],
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
];

module.exports = { presets, plugins };
