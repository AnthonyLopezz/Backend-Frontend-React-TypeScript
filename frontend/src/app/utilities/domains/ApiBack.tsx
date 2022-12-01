const ApiBack = {
  URL: "http://localhost:3123",
  USUARIO_PUBLICO_CREAR: "/api/publico/usuario/crear",
  USUARIO_PUBLICO_INICIAR: "/api/publico/usuario/iniciar",

  PERFILES_CREAR: "/api/privado/perfil/crear",
  PERFILES_OBTENER: "/api/privado/perfil/todos",
  PERFILES_ELIMINAR: "/api/privado/perfil/eliminar",
  PERFILES_OBTENER_UNO: "/api/privado/perfil/uno",
  PERFILES_ACTUALIZAR: "/api/privado/perfil/actualizar",

  USUARIOS_CREAR: "/api/privado/usuario/crear",
  USUARIOS_OBTENER: "/api/privado/usuario/todos",
  USUARIOS_OBTENER_UNO: "/api/privado/usuario/uno",
  USUARIOS_ELIMINAR: "/api/privado/usuario/eliminar",
  USUARIOS_ACTUALIZAR: "/api/privado/usuario/actualizar",

  VEHICLE_CREAR: "/api/privado/vehicle/crear",
  VEHICLE_OBTENER: "/api/privado/vehicle/todos",
  VEHICLE_OBTENER_UNO: "/api/privado/vehicle/uno",
  VEHICLE_ELIMINAR: "/api/privado/vehicle/eliminar",
  VEHICLE_ACTUALIZAR: "/api/privado/vehicle/actualizar"
};

export default ApiBack;
