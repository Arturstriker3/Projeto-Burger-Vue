<template>
  <div id="acessos">
      <AcessoLogout @deslogou="deslogar" v-if="esta_logado == true"/>
      <AcessoLogin @logou="logar" v-if="esta_logado == false"/>
  </div>
</template>

<script>
import AcessoLogin from "../components/AcessoLogin.vue"
import AcessoLogout from "../components/AcessoLogout.vue"
import { mapState, mapMutations } from 'vuex'

  export default {  

    name: "estado",
    computed: {
      ...mapState ({
        esta_logado: state => state.esta_logado
      })
    },

    methods: {
      ...mapMutations(['logar', 'deslogar']),
    },

    components: {
      AcessoLogin,
      AcessoLogout
    },
  }

</script>

<style scoped>
  #acessos {
    max-width: 400px;
    margin: 0 auto;
    padding: 40px;
  }
</style>