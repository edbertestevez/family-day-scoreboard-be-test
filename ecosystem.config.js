module.exports = {
  apps : [{
      name: "family-day-be",
      script: 'npm',
      args: "run app",
      env: {
          NODE_ENV: "production",
          PORT: 7070
      }
  }]
};
