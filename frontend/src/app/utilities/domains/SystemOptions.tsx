const adminOptions = [
  {
    nombre: "Acerca de",
    icono: "bi bi-grid",
    ruta: "/home/about",
    hijos: [],
  },
  {
    nombre: "Perfiles",
    icono: "bi bi-clipboard-data",
    ruta: "",
    hijos: [
      {
        nombre: "Listado",
        icono: "bi bi-circle",
        ruta: "/home/listprofiles",
      },
      { nombre: "Nuevo", icono: "bi bi-circle", ruta: "/home/addprofile" },
      {
        nombre: "Administración",
        icono: "bi bi-circle",
        ruta: "/home/admprofile",
      },
    ],
  },
  {
    nombre: "Anthony López",
    icono: "bi bi-grid",
    ruta: "/home/about",
    hijos: [],
  },
  {
    nombre: "Vehiculos",
    icono: "bi bi-clipboard-data",
    ruta: "",
    hijos: [
      {
        nombre: "Listado",
        icono: "bi bi-circle",
        ruta: "/home/listvec",
      },
      { nombre: "Nuevo", icono: "bi bi-circle", ruta: "/home/addvec" },
      {
        nombre: "Administración",
        icono: "bi bi-circle",
        ruta: "/home/admvec",
      },
    ],
  },
  {
    nombre: "Perfiles",
    icono: "bi bi-clipboard-data",
    ruta: "",
    hijos: [
      {
        nombre: "Listado",
        icono: "bi bi-circle",
        ruta: "/home/listprofiles",
      },
      { nombre: "Nuevo", icono: "bi bi-circle", ruta: "/home/addprofile" },
      {
        nombre: "Administración",
        icono: "bi bi-circle",
        ruta: "/home/admprofile",
      },
    ],
  },
  {
    nombre: "Usuarios",
    icono: "bi bi-person-lines-fill",
    ruta: "",
    hijos: [
      {
        nombre: "Listado",
        icono: "bi bi-circle",
        ruta: "/home/listusers",
      },
      { nombre: "Nuevo", icono: "bi bi-circle", ruta: "/home/adduser" },
      {
        nombre: "Administración",
        icono: "bi bi-circle",
        ruta: "/home/admuser",
      },
    ],
  },
  {
    nombre: "Citas",
    icono: "bi bi-calendar",
    ruta: "",
    hijos: [
      { nombre: "Listado", icono: "bi bi-circle", ruta: "/home/listma" },
      { nombre: "Nuevo", icono: "bi bi-circle", ruta: "/home/addma" },
      {
        nombre: "Administración",
        icono: "bi bi-circle",
        ruta: "/home/admma",
      },
    ],
  },
];

// *********************************************************************************

const guestOptions = [
  {
    nombre: "Acerca de",
    icono: "bi bi-grid",
    ruta: "/home/about",
    hijos: [],
  },
  {
    nombre: "Compras",
    icono: "bi bi-clipboard-data",
    ruta: "",
    hijos: [
      {
        nombre: "Pendientes",
        icono: "bi bi-circle",
        ruta: "/home/admuser",
      },
      {
        nombre: "Productos",
        icono: "bi bi-circle",
        ruta: "/home/admuser",
      },
      { nombre: "Antiguas", icono: "bi bi-circle", ruta: "/home/admuser" },
    ],
  },
];

export { adminOptions, guestOptions };
