<template>
    <footer id="footer">
        <p>Faça Seu Burger &copy; {{ new Date().getFullYear() }}</p>
        <p id="apis" :style="{ color: apiStatusColor }">Api {{ apiStatus }}</p>
    </footer>
</template>

<script>
import axios from 'axios';

export default {
  name: "Footer",
  data() {
    return {
      apiStatus: "Desconectada", // Inicialmente definido como "Desconectada"
      apiStatusColor: "red", // Inicialmente definido como vermelho
    };
  },
  created() {
    // Fazer uma solicitação GET para a rota da API
    axios.get('https://api-burgervue-production.up.railway.app/api/funcionando')
      .then(response => {
        // Verificar se a resposta contém a mensagem "Funcionando"
        if (response.data.message === "Funcionando") {
          this.apiStatus = "Conectada"; // Atualizar para "Conectada"
          this.apiStatusColor = "green"; // Atualizar a cor para verde
        }
      })
      .catch(error => {
        // Em caso de erro na solicitação, a API permanece "Desconectada"
        console.error(error);
      });
  },
};
</script>

<style scoped>
    #footer {
        height: 200px;
        background-color: #222;
        border-top: 4px solid #111;
        color: #fbca03;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        flex-direction: column; /* Linha para Estilizar Status da Api */
    }

    #apis{
        font-weight: bold;
    }
</style>