// sample-config.js
module.exports = {
    'applications': [{
        'name': 'app',
        'mode': 'fork',
        'ready-on': 'message',
        'stop-signal': 'message',
        'run': './../apps/sample-app.js',
        'start-timeout': 2000,
        'stop-timeout': 2000,
        'restart-crashing-delay': 300,
        'instances': 3,
    }, {
        'name': 'app-uniform',
        'mode': 'fork',
        'ready-on': 'message',
        'stop-signal': 'message',
        'run': './../apps/sample-app.js',
        'instances': 3,
        'unique-instances': false
    }, {
        'name': 'app-listen',
        'args': ['listen'],
        'mode': 'fork',
        'ready-on': 'instant', // Can't use 'listen' in fork mode
        'stop-signal': 'message',
        'run': './../apps/sample-app.js',
    }, {
        'name': 'app-message',
        'mode': 'fork',
        'ready-on': 'message',
        'stop-signal': 'message',
        'run': './../apps/sample-app.js',
    }, {
        'name': 'app-disconnect',
        'mode': 'fork',
        'ready-on': 'message',
        'stop-signal': 'disconnect',
        'run': './../apps/sample-app.js',
    }, {
        'name': 'app-instant',
        'mode': 'fork',
        'ready-on': 'instant',
        'stop-signal': 'message',
        'run': './../apps/sample-app.js',
    }, {
        'name': 'crashing',
        'mode': 'fork',
        'ready-on': 'message',
        'stop-signal': 'message',
        'run': './../apps/crashing-app.js',
    }, {
        'name': 'never-starts',
        'ready-on': 'message',
        'mode': 'fork',
        'max-instances': 2,
        'run': './../apps/never-starting-app.js',
    }, {
        'name': 'never-stops',
        'mode': 'fork',
        'ready-on': 'message',
        'run': './../apps/never-stopping-app.js',
    }, {
        'name': 'start-timeout',
        'ready-on': 'message',
        'mode': 'fork',
        'start-timeout': 1,
        'run': './../apps/never-starting-app.js',
    }, {
        'name': 'stop-timeout',
        'mode': 'fork',
        'ready-on': 'message',
        'stop-timeout': 1,
        'run': './../apps/never-stopping-app.js',
    }, {
        'name': 'zombie',
        'mode': 'fork',
        'ready-on': 'message',
        'run': './../apps/zombie.js',
        'kill-signal': 'SIGTERM',
        'start-timeout': 1 // immediately become a zombie
    }]
};