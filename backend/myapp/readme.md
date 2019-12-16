Requisitos
-Tener MongoDB instalado
-Tener NodeJs Instalado

Recomendaciones
-Tener postman para correr el api, los parametros entran como body en x-www-form-urlencoded

Route Database= mongodb://root:root@localhost:27017/admin

Acceso Api= http://localhost:8080/api

Notas: He creado varios esquemas para manejar mejor la informacion, pudiese implementar arrays pero por eficiencia y rapidez utilizo varios esquemas para consultar entre otras cosas

ENDPOINTS
--Inserciones
 * /crearCliente
 Parametros: id(unico),nombre,apellido,telefono

 * /agregarMascotaPorCliente
 Parametros: idMascota(unico),nombre,raza,idCliente(unico)

* /crearVeterinario
Parametros: id(unico),nombre,apellido,especialidad,telefono

* /agregarCitasMascota
Parametros: idCliente(unico),idMascota(unico),idVeterinario(unico),detalles,facturacion

* /agregarVacunaMascota
Parametros: idCliente(unico),idMascota(unico),idVeterinario(unico),nombreVacuna,detallesVacuna


--Modificares

 * /modificarCliente
 Parametros: idCliente(unico),nombre,apellido,telefono


* /modificarVeterinario
Parametros: idVeterinario(unico),nombre,apellido,especialidad,telefono

* /modificarMascota
Parametros: idMascota(unico),idCliente(unico),nombre,raza





--Eliminares: Los eliminares funcionan por llaves si hay un id en algun esquema es eliminado, para el trato de la informacion se debe mejor habilitar/desabilitar por asuntos de ejercicio solo elimina los esquemas

 * /eliminarMascotaCliente
 Parametros: idMascota(unico),idCliente(unico)


  * /eliminarVeterinario
 Parametros: idVeterinario(unico)


  * /eliminarCliente
 Parametros: idCliente(unico)



--Consultares

 * /consultarCliente
 Parametros: idCliente(unico)


* /consultarVeterinario
Parametros: idVeterinario(unico)

* /consultarMascotaCliente
Parametros: idCliente(unico),idMascota(unico)

* /consultarCitas
Parametros: idVeterinario(unico),idMascota(unico)

* /consultarDetallesMascotaCliente
Parametros: idCliente(unico),idMascota(unico)

* /consultarVacunaMascotaCliente
Parametros: idCliente(unico),idMascota(unico)