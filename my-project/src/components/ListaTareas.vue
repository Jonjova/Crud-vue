<template>
  <form action="">
    <h1>{{ msg }}</h1>
    <div>
      <!-- {{this.getDataPagina(1)}} -->
    </div>
    <!-- como crear ina tabla con vue -->
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Comentario</th>
            <th scope="col">Titulo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in datosPaginados" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.body }}</td>
            <td>{{ item.title }}</td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" v-on:click="getPreviousPage()" ><a class="page-link" href="#">Previous</a></li>
        <li v-for="(pagina, index) in totalPaginas()" :key="index" @click="getDataPagina(pagina)" class="page-item" v-bind:class="isActive(pagina)"><a class="page-link" href="#">{{pagina}}</a></li>
        <li class="page-item" v-on:click="getNextPage()"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
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
      elementosPorPagina:5,
       datosPaginados:[],
       paginaActual:1,
      // Variables que se usan para entorno del componente v-model
      msg: "Listado de Tareas",
      info: null
    };
  },
  /* Aqui estan todos los metodos para crear nuestras peticiones GET/POST/PUT/DELETE */
  methods: {
   
     /* La palabra “async” ante una función significa solamente una cosa: que la
    función siempre devolverá una promesa. */
    async getDataPagina(noPagina){
       /*Lo que hace await es esperar a que se resuelva la promesa,
       mientras permite continuar ejecutando otras tareas que puedan realizarse.*/
       await axios
        .get(
          "https://jsonplaceholder.typicode.com/posts"
        ) /*Consumiendo api rest con get y retornamos un json*/
        .then(response => {
          // console.log(response.data);
          // igualamos usuarios[] con la respuesta de nuestra api
          this.usuarios = response.data;
        })
        .catch(e => {
          console.log("error" + e);
        });
      /*Desde aquí comienza la paginación*/
      this.paginaActual = noPagina;
      this.datosPaginados = [];
      let ini = (noPagina * this.elementosPorPagina) - this.elementosPorPagina;
      let fin = (noPagina * this.elementosPorPagina);
      this.datosPaginados= this.usuarios.slice(ini,fin);
     
    },
    totalPaginas(){
      return Math.ceil(this.usuarios.length/this.elementosPorPagina);
    },
    getPreviousPage(){
        if (this.paginaActual>1) {
          this.paginaActual--;
        }
        this.getDataPagina(this.paginaActual);
    },
    getNextPage(){
       if (this.paginaActual<this.totalPaginas()) {
          this.paginaActual++;
        }
        this.getDataPagina(this.paginaActual);
    },
    isActive(noPagina){
      return noPagina == this.paginaActual ? 'active':'';
    },
    /*Aquí finaliza la paginación*/
  },
  async mounted() {    
    // this.listarTareas();
    this.getDataPagina(1);
  },
};
</script>

<style scoped></style>
