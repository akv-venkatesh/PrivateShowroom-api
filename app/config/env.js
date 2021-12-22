const env = {
  database: 'virtual_showroom',
  username: 'virtual_showroom',
  password: 'virtual_showroom_DBpass123!',
  host: '183.82.250.141',
  dialect: 'mysql',
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  },
  dialectOptions: {
    /* useUTC: true, **deprecated** */ 
   timezone: 'utc'
 },
 rootPath:'/api',

 password_token: "maestro_virtual_showroom",
 node_server_port: 8080,

};

module.exports = env;


