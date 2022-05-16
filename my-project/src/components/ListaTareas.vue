<template>
  <div>
    <h1>{{ msg }}</h1>

    <div class="container">
      <!-- agregar una nueva tarea -->

      <form>
        <div class="row">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Comentario"
              v-model="usuarios.body"
            />
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Titulo"
              v-model="usuarios.title"
            />
          </div>

          <button @click="addItem" class="btn btn-dark">
            <i class="fas fa-plus fa-lg"></i>
          </button>
        </div>
      </form>

      <br />
      <!-- como crear una tabla con vue -->
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Comentario</th>
            <th scope="col">Titulo</th>
            <th class="col-2">Edit/Del</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in datosPaginados" :key="index">
            <td>{{ item.id }}</td>
            <td>
              <input
                v-if="item.edit"
                type="text"
                v-model="item.body"
                v-on:keyup.enter="item.edit = !item.edit"
              />
              <span v-else>{{ item.body }} </span>
            </td>
            <!-- <td>{{ item.body }}</td> -->
            <td>
              <input
                v-if="item.edit"
                type="text"
                v-model="item.title"
                v-on:keyup.enter="item.edit = !item.edit"
              />
              <span v-else>{{ item.title }} </span>
            </td>
            <!-- <td>{{ item.title }}</td> -->
            
            <td>
              <button @click="item.edit = !item.edit" class="btn btn-info">
                Editar
              </button>
              <button @click="removeItem(index)" class="btn btn-danger">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" v-on:click="getPreviousPage()">
            <a class="page-link" href="#">Previous</a>
          </li>
          <li
            v-for="(pagina, index) in totalPaginas()"
            :key="index"
            @click="getDataPagina(pagina)"
            class="page-item"
            v-bind:class="isActive(pagina)"
          >
            <a class="page-link" href="#">{{ pagina }}</a>
          </li>
          <li class="page-item" v-on:click="getNextPage()">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
/* En este apartado podemos importar las dependencias que vamos a utilizar */
//Esta dependencia se instala con el comando npm i axios
import axios from "axios";

/*en este apartado podemos requerir el diseño de bootraps*/
// esto esta en la carpeta de src/assets/css
require("@/assets/css/bootstrap.css");
require("@/assets/css/fontawesome.min.css");

export default {
  name: "ListaTareas",
  data() {
    return {
      usuarios: { id:"",body: "", title: "", edit: false },
      // Inicializamos usuarios[] para pintar los datos en nuestra tabla
      usuarios: [],
      // Variables que se utilizan para la paginación
      elementosPorPagina: 5,
      datosPaginados: [],
      paginaActual: 1,
      // Variables que se usan para entorno del componente v-model
      msg: "Listado de Tareas",
      info: null
    };
  },
  /* Aqui estan todos los metodos para crear nuestras peticiones GET/POST/PUT/DELETE */
  methods: {
    /* La palabra “async” ante una función significa solamente una cosa: que la
    función siempre devolverá una promesa. */
    async getDataPagina(noPagina) {
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
      let ini = noPagina * this.elementosPorPagina - this.elementosPorPagina;
      let fin = noPagina * this.elementosPorPagina;
      this.datosPaginados = this.usuarios.slice(ini, fin);
    },
    totalPaginas() {
      return Math.ceil(this.usuarios.length / this.elementosPorPagina);
    },
    getPreviousPage() {
      if (this.paginaActual > 1) {
        this.paginaActual--;
      }
      this.getDataPagina(this.paginaActual);
    },
    getNextPage() {
      if (this.paginaActual < this.totalPaginas()) {
        this.paginaActual++;
      }
      this.getDataPagina(this.paginaActual);
    },
    isActive(noPagina) {
      return noPagina == this.paginaActual ? "active" : "";
    },
    /*Aquí finaliza la paginación*/
    /*Agregar y editar*/
    addItem() {
      var datos = {
        body: this.usuarios.body,
        title: this.usuarios.title,
        edit: false
      };

      axios
        .post("https://jsonplaceholder.typicode.com/posts", datos)
        .then(res => {
          console.log(res);

          datos = this.datosPaginados.push({
            body: this.usuarios.body,
            title: this.usuarios.title,
            edit: false
          });
          //  this.usuarios = [];
        })
        .catch(e => {
          console.log("error" + e);
        });

      // $("#form-name").focus();
    },
    //Eliminar
    removeItem(index) {
     
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${index}`).
      then(res=>{
        this.datosPaginados.splice(index, 1)
         console.log(res);
      })
      
    },
    
  },
  async mounted() {
    // this.listarTareas();
    this.getDataPagina(1);
  }
};
</script>

<style scoped></style>
