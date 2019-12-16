var express=require('express');
var router=express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://root:root@localhost:27017/"; //esto puede cambiar dependiendo de su instancia


//INSERTARES-----------------------------------------------------------------------------------------
router.use('/crearCliente',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
    //Datos principales de clientes
    var id=objeto.id;
    var nombre=objeto.nombre;
    var apellido=objeto.nombre;
    var telefono=objeto.telefono;
  
    if(id=="" || nombre=="" || apellido=="" || telefono==""){
      res.send("Error de insercion: No debe de haber campos vacios");
    }else{
      //conectamos a mongo
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
        var myobj = { id: id, nombre: nombre,apellido:apellido,telefono:telefono};
        dbo.collection("clientes").count({}, function(error, contadorClientes){
          if(error) throw err;
          if(contadorClientes==0){
            dbo.collection("clientes").insertOne(myobj, function(err, result) {
              if (err) throw err;
              res.send("Se ha insertado un cliente: "+result);
              db.close();
            });
          }else{
            dbo.collection("clientes").findOne({id: id}, function(err, result) {
              if (err) throw err;
              if(result==null){
                dbo.collection("clientes").insertOne(myobj, function(err, result) {
                  if (err) throw err;
                  res.send("Se ha insertado un cliente:  "+result);
                  db.close();
                });
              }else{
                res.send("No se puede insertar la identificacion existe");
              }
              db.close();
            });
          }
        })  
      })  
    }
  });


  router.use('/agregarMascotaPorCliente',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
    //Datos principales de clientes
    var idMascota=objeto.idMascota;
    var nombre=objeto.nombre;
    var raza=objeto.raza;
    var idCliente=objeto.idCliente;
  
    var objetoMascota = {idCliente:idCliente, idMascota:idMascota,nombre:nombre,raza:raza};
  
    if(idMascota=="" || nombre=="" || raza=="" || idCliente==""){
      res.send("Error de insercion: No debe de haber campos vacios");
    }else{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
        dbo.collection("clientes").findOne({id: idCliente}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("No existe el cliente");
          }else{
            dbo.collection("mascotasCliente").count({}, function(error, contadorMascotasClientes){
                if(error) throw err;
                if(contadorMascotasClientes==0){
                  dbo.collection("mascotasCliente").insertOne(objetoMascota, function(err, result) {
                    if (err) throw err;
                    res.send("Se ha insertado un mascotaCliente: "+result);
                    db.close();
                  });
                }else{
                    dbo.collection("mascotasCliente").findOne({idMascota: idMascota}, function(err, result) {
                        if (err) throw err;
                        if(result==null){
                          dbo.collection("mascotasCliente").insertOne(objetoMascota, function(err, result) {
                            if (err) throw err;
                            res.send("Se ha insertado un mascotaCliente: "+result);
                            db.close();
                          });
                        }else{
                          res.send("No se puede insertar mascota la identificacion existe");
                        }
                        db.close();
                      });
                }
            })    
          }          
        })  
      })  
    }
  }) 


  router.use('/crearVeterinario',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
    //Datos principales de clientes
    var id=objeto.id;
    var nombre=objeto.nombre;
    var apellido=objeto.nombre;
    var especialidad=objeto.especialidad;
    var telefono=objeto.telefono;
  
    if(id=="" || nombre=="" || apellido=="" || especialidad=="" || telefono==""){
      res.send("Error de insercion: No debe de haber campos vacios");
    }else{
      //conectamos a mongo
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
        var myobj = { id: id, nombre: nombre,apellido:apellido,especialidad:especialidad,telefono:telefono};
        dbo.collection("veterinarios").count({}, function(error, contadorVeterinarios){
          if(error) throw err;
          if(contadorVeterinarios==0){
            dbo.collection("veterinarios").insertOne(myobj, function(err, result) {
              if (err) throw err;
              res.send("Se ha insertado un veterinario: "+result);
              db.close();
            });
          }else{
            dbo.collection("veterinarios").findOne({id: id}, function(err, result) {
              if (err) throw err;
              if(result==null){
                dbo.collection("veterinarios").insertOne(myobj, function(err, result) {
                  if (err) throw err;
                  res.send("Se ha insertado un veterinario: "+result);
                  db.close();
                });
              }else{
                res.send("No se puede insertar la identificacion existe");
              }
              db.close();
            });
          }
        })  
      })  
    }
  })



  router.use('/agregarCitasMascota',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
    let now= new Date();
    //Datos principales de clientes
    var idCliente=objeto.idCliente;
    var idMascota=objeto.idMascota;
    var idVeterinario=objeto.idVeterinario;
    var detalles=objeto.detalles;
    var facturacion=objeto.facturacion;
    var fechaHora=now;
    var timestamp=now.getTime();
  
    var myobjMascota = {idCliente:idCliente,idMascota:idMascota, idVeterinario: idVeterinario, detalles: detalles,facturacion:facturacion,fechaHora:fechaHora,timestamp:timestamp};
    var myobjVeterinario = {idMascota:idMascota, idVeterinario: idVeterinario, idCliente: idCliente, idMascota: idMascota,fechaHora:fechaHora,timestamp:timestamp};
    
  
    if(idCliente=="" || idMascota=="" || idVeterinario=="" || detalles=="" || facturacion==""){
      res.send("Error de insercion: No debe de haber campos vacios");
    }else{
      //conectamos a mongo
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
        dbo.collection("veterinarios").findOne({id: idVeterinario}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error de insercion: No se encuentra ningún veterinario");
          }else{
            dbo.collection("clientes").findOne({id: idCliente}, function(err, result) {
              if (err) throw err;
              if(result==null){
                res.send("Error de insercion: No se encuentra ningún cliente");
              }else{
                 
                dbo.collection("mascotasCliente").findOne({idMascota: idMascota}, function(err, result) {
                    if (err) throw err;
                    if(result==null){
                        res.send("Error de insercion: No se encuentra ninguna mascotaCliente");
                    }else{
                        dbo.collection("consultaMascotaVeterinario").insertOne(myobjMascota, function(err, result) {
                            if (err) throw err;
                            db.close();
                        });
        
                        dbo.collection("citaMascotaCliente").insertOne(myobjVeterinario, function(err, result) {
                            if (err) throw err;
                            db.close();
                        })
          
                        res.send("Se agregado la consulta-cita mascota");
                    }

                })    
              }
            })           
          }
        })    
      }) 
    }
  })  

  
//agregar vacunas

router.use('/agregarVacunaMascota',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
    let now= new Date();
    //Datos principales de clientes
    var idCliente=objeto.idCliente;
    var idMascota=objeto.idMascota;
    var idVeterinario=objeto.idVeterinario;
    var nombreVacuna=objeto.nombreVacuna;
    var detallesVacuna=objeto.detallesVacuna;
    var fechaHora=now;
    var timestamp=now.getTime();
  
    var myobjVacuna = {idCliente: idCliente,idMascota: idMascota,idVeterinario: idVeterinario,nombreVacuna:nombreVacuna,detallesVacuna:detallesVacuna,fechaHora:fechaHora,timestamp:timestamp};
  
    if(idCliente=="" || idVeterinario=="" || nombreVacuna=="" || detallesVacuna=="" ){
      res.send("Error de insercion: No debe de haber campos vacios");
    }else{
      //conectamos a mongo
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
        dbo.collection("veterinarios").findOne({id: idVeterinario}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error de insercion: No se encuentra ningún veterinario");
          }else{
            dbo.collection("clientes").findOne({id: idCliente}, function(err, result) {
              if (err) throw err;
              if(result==null){
                res.send("Error de insercion: No se encuentra ningún cliente");
              }else{
                dbo.collection("mascotasCliente").findOne({idMascota: idMascota}, function(err, result) {
                    if (err) throw err;
                    if(result==null){
                        res.send("Error de insercion: No se encuentra ninguna mascotaCliente");
                    }else{
                        dbo.collection("vacunasMascota").insertOne(myobjVacuna, function(err, result) {
                            if (err) throw err;
                            res.send("Se agregado la vacunaMascota: "+result);
                            db.close();
                        });      
                        
                    }

                })     
              }
            }) 
          }
        })
      })    
    }
  }) 



  

//------------------------------------------------------------------------

//Eliminares----------------------------------------------------------
router.use('/eliminarMascotaCliente',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
    //Datos principales de clientes
    var idMascota=objeto.idMascota;
    var idCliente=objeto.idCliente;
  
    if(idCliente=="" || idMascota==""){
      res.send("Error: No debe de haber campos vacios");
    }else{
      //conectamos a mongo
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
  
        dbo.collection("clientes").findOne({id: idCliente}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error: No se encuentra ningún cliente");
          }else{
            dbo.collection("mascotasCliente").findOne({idMascota: idMascota}, function(err, result) {
                if (err) throw err;
                if(result==null){
                    res.send("Error: No se encuentra ninguna mascotaCliente");
                }else{
                    dbo.collection("mascotasCliente").deleteOne({idMascota: idMascota}, function(err, obj) {
                        if (err) throw err;
                        
                        db.close();
                    });

                    dbo.collection("citaMascotaCliente").deleteOne({idMascota: idMascota}, function(err, obj) {
                        if (err) throw err;
                        
                        db.close();
                    });

                    dbo.collection("consultaMascotaVeterinario").deleteOne({idMascota: idMascota}, function(err, obj) {
                        if (err) throw err;
                        
                        db.close();
                    });

                    dbo.collection("vacunasMascota").deleteOne({idMascota: idMascota}, function(err, obj) {
                        if (err) throw err;
                        
                        db.close();
                    });

                    res.send("Eliminado mascota con ID: "+idMascota);
                }    
            })  
          }
        })  
      }) 
    }
  }) 
  
  
  router.use('/eliminarVeterinario',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
    //Datos principales de veterinario
    var idVeterinario=objeto.idVeterinario;
  
    if(idVeterinario=="" ){
      res.send("Error: No debe de haber campos vacios");
    }else{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
  
        dbo.collection("veterinarios").findOne({id: idVeterinario}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error: No se encuentra ningún veterinario");
          }else{
            dbo.collection("veterinarios").deleteOne({id: idVeterinario}, function(err, obj) {
              if (err) throw err;
              
              db.close();
            });

            dbo.collection("citaMascotaCliente").deleteOne({idVeterinario: idVeterinario}, function(err, obj) {
                if (err) throw err;
                
                db.close();
            });

            dbo.collection("consultaMascotaVeterinario").deleteOne({idVeterinario: idVeterinario}, function(err, obj) {
                if (err) throw err;
                
                db.close();
            });

            dbo.collection("vacunasMascota").deleteOne({idVeterinario: idVeterinario}, function(err, obj) {
                if (err) throw err;
                
                db.close();
            });

            res.send("Eliminado veterinario con ID: "+result);
          }
        })
      })    
    }
  })  
  
  router.use('/eliminarCliente',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
    //Datos principales de veterinario
    var idCliente=objeto.idCliente;
  
    if(idCliente=="" ){
      res.send("Error: No debe de haber campos vacios");
    }else{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
  
        dbo.collection("clientes").findOne({id: idCliente}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error: No se encuentra ningún cliente");
          }else{
            dbo.collection("clientes").deleteOne({id: idCliente}, function(err, obj) {
              if (err) throw err;
              
              db.close();
            });

            dbo.collection("citaMascotaCliente").deleteOne({idCliente: idCliente}, function(err, obj) {
                if (err) throw err;
                
                db.close();
            });

            dbo.collection("consultaMascotaVeterinario").deleteOne({idCliente: idCliente}, function(err, obj) {
                if (err) throw err;
                
                db.close();
            });

            dbo.collection("vacunasMascota").deleteOne({idCliente: idCliente}, function(err, obj) {
                if (err) throw err;
                
                db.close();
            });

            res.send("Eliminado cliente con ID: "+result);
          }
        })
      })    
    }
  }) 
  
  //Modificares----------------------------------------------------------
  
  router.use('/modificarCliente',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
    //Datos principales de cliente
    var idCliente=objeto.idCliente;
    var nombre=objeto.nombre;
    var apellido=objeto.apellido;
    var telefono=objeto.telefono;
  
    if(idCliente=="" || nombre=="" || apellido=="" || telefono=="" ){
      res.send("Error: No debe de haber campos vacios");
    }else{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
  
        dbo.collection("clientes").findOne({id: idCliente}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error: No se encuentra ningún cliente");
          }else{
            dbo.collection("clientes").updateOne({id: idCliente},{$set: {nombre:nombre,apellido:apellido,telefono:telefono}}, {upsert:true}, function(err, result)
            {
              res.send("Se actualizo cliente con ID: "+idCliente);
            });
          }
        })
      })    
    }
  })  
  
  
  router.use('/modificarVeterinario',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
    //Datos principales de cliente
    var idVeterinario=objeto.idVeterinario;
    var nombre=objeto.nombre;
    var apellido=objeto.apellido;
    var especialidad=objeto.especialidad;
    var telefono=objeto.telefono;
  
    if(idVeterinario=="" || nombre=="" || apellido=="" || especialidad=="" ||telefono=="" ){
      res.send("Error: No debe de haber campos vacios");
    }else{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
  
        dbo.collection("veterinarios").findOne({id: idVeterinario}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error: No se encuentra ningún veterinario");
          }else{
            dbo.collection("veterinarios").updateOne({id: idVeterinario},{$set: {nombre:nombre,apellido:apellido,especialidad:especialidad,telefono:telefono}}, {upsert:true}, function(err, result)
            {
              res.send("Se actualizo veterinario con ID: "+idVeterinario);
            });
          }
        })
      })    
    }
  })  
  
  router.use('/modificarMascota',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
    //Datos principales de mascota
    var idMascota=objeto.idMascota;
    var idCliente=objeto.idCliente;
    var nombre=objeto.nombre;
    var raza=objeto.raza;
  
    if(idMascota=="" || idCliente=="" || nombre=="" || raza==""){
      res.send("Error: No debe de haber campos vacios");
    }else{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
  
        dbo.collection("clientes").findOne({id: idCliente}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error: No se encuentra ningún cliente");
          }else{
            dbo.collection("mascotasCliente").findOne({idMascota: idMascota}, function(err, result) {
                if (err) throw err;
                if(result==null){
                    res.send("Error: No se encuentra ninguna mascotaCliente");
                }else{
                    dbo.collection("mascotasCliente").updateOne({idMascota: idMascota},{$set: {nombre:nombre,raza:raza}}, {upsert:true}, function(err, result)
                    {
                        res.send("Se actualizo mascota con ID: "+idMascota+" de cliente con ID: "+idCliente);
                    });
                }
            })    
          }
        })
      })    
    }
  })  
  
  
  
  //Consultas------------------------------------------------------------
  router.get('/consultarCliente',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
  
    var idCliente=objeto.idCliente;
  
    if(idCliente==""){
      res.send("Error: No debe de haber campos vacios");
    }else{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
  
        dbo.collection("clientes").findOne({id: idCliente}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error: No se encuentra ningún cliente");
          }else{
            res.send(result);
          }
        })
      }) 
    }
  })  
  
  
  router.get('/consultarVeterinario',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
  
    var idVeterinario=objeto.idVeterinario;
  
    if(idVeterinario==""){
      res.send("Error: No debe de haber campos vacios");
    }else{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
  
        dbo.collection("veterinarios").findOne({id: idVeterinario}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error: No se encuentra ningún veterinario");
          }else{
            res.send(result);
          }
        })
      }) 
    }
  })
  
  
  router.get('/consultarMascotaCliente',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
  
    var idCliente=objeto.idCliente;
    var idMascota=objeto.idMascota;
  
    if(idCliente=="" || idMascota==""){
      res.send("Error: No debe de haber campos vacios");
    }else{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
        
        dbo.collection("mascotasCliente").findOne({idCliente: idCliente,idMascota:idMascota}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error: No se encuentra ningún cliente");
          }else{
            res.send(result);
          }
        })
      }) 
    }
  })  

  router.get('/consultarCitas',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
  
    var idVeterinario=objeto.idVeterinario;
    var idMascota=objeto.idMascota;
  
    if(idCliente=="" || idMascota==""){
      res.send("Error: No debe de haber campos vacios");
    }else{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
        
        dbo.collection("citaMascotaCliente").findOne({idVeterinario: idVeterinario,idMascota:idMascota}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error: No se encuentra ningún cita");
          }else{
            res.send(result);
          }
        })
      }) 
    }
  })  


  router.get('/consultarDetallesMascotaCliente',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
  
    var idCliente=objeto.idCliente;
    var idMascota=objeto.idMascota;
  
    if(idCliente=="" || idMascota==""){
      res.send("Error: No debe de haber campos vacios");
    }else{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
        
        dbo.collection("consultaMascotaVeterinario").findOne({idCliente: idCliente,idMascota:idMascota}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error: No se encuentra ninguna consulta");
          }else{
            res.send(result);
          }
        })
      }) 
    }
  }) 


  router.get('/consultarVacunaMascotaCliente',function (req, res, next) {
    //Objeto para sacar datos
    var objeto=req.body;
  
    var idCliente=objeto.idCliente;
    var idMascota=objeto.idMascota;
  
    if(idCliente=="" || idMascota==""){
      res.send("Error: No debe de haber campos vacios");
    }else{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
        
        dbo.collection("vacunaMascota").findOne({idCliente: idCliente,idMascota:idMascota}, function(err, result) {
          if (err) throw err;
          if(result==null){
            res.send("Error: No se encuentra ninguna vacuna");
          }else{
            res.send(result);
          }
        })
      }) 
    }
  }) 
  


router.get('/some',function(req,res){
    res.send("sone");
});



router.get('/some1',function(req,res){
    res.send("sone");
});


module.exports=router;
