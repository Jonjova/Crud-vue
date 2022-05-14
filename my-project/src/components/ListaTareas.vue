<template>
    <form action="">
   <h1>{{ msg }}</h1>
     <div>
           {{ info }}
     </div>
    </form>
</template>
<script>

import axios from 'axios';
export default {
    name:'ListaTareas',
    data() {
        return{
            msg:'Listado de Tareas',
            info: null
        }
    },
    mounted(){
        axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response));
    }
}
</script>
