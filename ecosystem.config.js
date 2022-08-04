module.exports = {
  apps: [
    {
      name: 'winery-flashlabs-nft',
      script: './server/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5050,
      },
    },
  ],
}

