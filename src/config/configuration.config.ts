export default () => ({
  app: {
    name: process.env.APPNAME,
    port: parseInt(process.env.APP_PORT ?? '3000', 10),  
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  }
});