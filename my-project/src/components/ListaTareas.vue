<template>
  <form action="">
    <h1>{{ msg }}</h1>
    <div>
      <!-- {{ info }} -->
    </div>
    <!-- como crear ina tabla con vue -->
    <div class="container">
      <table class="table table-hover" >
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Coemtario</th>
            <th scope="col">Titulo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in usuarios" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.body }}</td>
            <td>{{ item.title }}</td>
          </tr>
        </tbody>
      </table>
      
    </div>
  </form>
</template>

<script>
/* En este apartado podemos importar las dependencias que vamos a utilizar */
//Esta dependencia se instala con el comando npm i axios
import axios from "axios";

/*en este apartado podemos requerir el diseño de bootraps*/
// esto esta en la carpeta de src/assets/css
require("@/assets/css/bootstrap.css");


export default {
  name: "ListaTareas",
  data() {
    return {
      // Inicializamos usuarios[] para pintar los datos en nuestra tabla
      usuarios: [],
      // Variables que se usan para entorno del componente v-model
      msg: "Listado de Tareas",
      info: null
    };
  },
  /* Aqui estan todos los metodos para crear nuestras peticiones GET/POST/PUT/DELETE */
  methods: {
    /* La palabra “async” ante una función significa solamente una cosa: que la
    función siempre devolverá una promesa. */
    async listarTareas() {
      /*Lo que hace await es esperar a que se resuelva la promesa,
       mientras permite continuar ejecutando otras tareas que puedan realizarse.*/
      await axios
        .get(
          "https://jsonplaceholder.typicode.com/posts"
        ) /*Consumiendo api rest y retornamos un json*/
        .then(response => {
          // console.log(response.data);
         this.usuarios = response.data;
    
        })
        .catch(e => {
          console.log("error" + e);
        });
    }
  },
  mounted() {
    this.listarTareas();
  }
};
</script>

<style scoped>

</style>
