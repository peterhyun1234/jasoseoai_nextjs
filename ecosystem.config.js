module.exports = {
  apps: [{
    script: "node_modules/next/dist/bin/next",
    args: "start -p 4000",
    cwd: "./",
    exec_mode: "cluster",
    instances: 0,
    autorestart: true,
    watch: false,
    time: true,
    env: {
      NEXT_PUBLIC_DEPLOY_MODE: "production",
    },
  }, ],
};
