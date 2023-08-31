<template>
    <div id="burger-form-geral">
      <div class="input-container">
        <!-- <button class="submit-btn" @click="autentica()"> LOGIN </button> -->
        <button class="submit-btn" @click="deslogar()"> LOGOUT </button>
      </div>
  </div>
</template>

<script>
  export default {
    methods: {
      deslogar() {
        this.$emit('deslogou')
      }
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