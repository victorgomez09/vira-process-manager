// sample-config.js
module.exports = {
  'applications': [
    {
      'name': 'app',
      'ready-on': 'message',
      'run': './sample-app.js',
      // 'cwd': './'
    },
    {
      'name': 'node',
      'ready-on': 'message',
      'run': '/opt/nodejs/14.20.1/bin/node',
      'args': ['sample-app.js'],
      'mode': 'fork',
    },
    {
      'name': 'node-cluster',
      'ready-on': 'message',
      'cwd': './',
      'run': 'sample-app.js',
      // 'args': ['./sample-app.js'],
      'instances': 3,
      'mode': 'cluster',
    },
  ]
};
