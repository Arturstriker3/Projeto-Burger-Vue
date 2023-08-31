<template>
  <div>
    <Message :msg="msg" v-show="showMsg" />
    <div id="burger-form-geral">
      <!--<form id="login-form"-->
        <div class="input-container">
          <label>Usuário:</label>
          <input id="user" type="text" placeholder="Digite seu Usuário" autocomplete="off">
        </div>
        <div class="input-container">
          <label>Senha:</label>
          <input id="password" type="password" placeholder="Digite sua Senha" autocomplete="off">
        </div>
        <div class="input-container">
          <button class="submit-btn" @click="autentica()"> LOGIN </button>
        </div>
    </div>
  </div>
</template>

<script>
  import Message from "../components/Message.vue"

  export default {
    name: 'AcessoLogin',

    data: () => ({
      msg: '',
      showMsg: false,
    }),

    methods: {
      autentica(){
        var username = document.body.querySelector('#user').value;
        var password = document.body.querySelector('#password').value;
        if(username === '123' && password === '123'){
          //if(password === '123'){
          this.$emit('logou')
          //}
        }
        else {
          this.showMsg = true;
          this.msg = "Usuário ou Senha Incorretos!"

         // clear message
          setTimeout(() => (this.msg = "",this.showMsg = false), 4000)
        }
      }
     },

    components: {
      Message
    }
  }
</script>

<style scoped>

  #login-form {
    max-width: 400px;
    margin: 0 auto;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;;
    padding: 5px 10px;
    border-left: 4px solid #fcba03;
  }

  input, select {
    padding: 5px 10px;
    width: 300px;
  }

  .submit-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }

  .submit-btn:hover {
    background-color: transparent;
    color: #222;
  }
/*Centralização Nova da Página*/
  #burger-form-geral {
    max-width: 300px;
    margin: 0 auto;
  }
</style>