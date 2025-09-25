module.exports = {
  apps: [
    {
      name: 'App',
      port: '3000',
      exec_mode: 'cluster',
      instances: '20',
      script: '/app/server/index.mjs',
    },
  ],
}
