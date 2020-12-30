import mysql from 'mysql';
import { MYSQL_CONFIG } from '../config';

var connection = mysql.createConnection(MYSQL_CONFIG);

connection.connect(function(err) {
  if (err) throw err;
});

export default connection;