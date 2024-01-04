const app = require('./app');
const connection = require('./database');

function main() {
  connection.connect((err) => {
    if (err) {
      database.error('No se pudo conectar a la base de datos', err);
    } else {
      console.log('Conexión exitosa con la base de datos');
      startApp();
    }
  });

  function startApp() {
    app.listen(3000, () => {
      console.log('Escuchando el servidor en el puerto 3000');
    });
  }
}
main()