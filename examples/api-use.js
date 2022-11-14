const viraPM = require('../');

const addAppViaAPI = async () => {
  const client = await viraPM.client.connect(
    "ws+unix:///home/codespace/.vira-pm/daemon.sock"
  );
  const app = {
    name: "app",
    type: "application",
    mode: "cluster",
    "base-path": "./",
    cwd: "./",
    run: "sample-app.js",
    args: [],
    "node-args": [],
    env: {},
    "ready-on": "message",
    "stop-signal": "SIGINT",
    "kill-signal": "SIGKILL",
    instances: 1,
    "max-instances": 0,
    "unique-instances": true,
    "restart-crashing": true,
    "restart-new-crashing": true,
    "restart-crashing-delay": 1000,
    logger: "file-logger",
    "logger-args": ["log.txt"],
    "max-buffered-log-bytes": 262144,
    "log-retention-timeout": 86400000,
    "max-log-line-length": 5120,
    "stop-timeout": null,
    "start-timeout": null,
    "config-path": "/workspaces/process-manager/examples/process-config.js",
    // revision: 1,
  };
  const info = await client.invoke("add", app);
  console.log("add", info);
  return;
};

addAppViaAPI();
