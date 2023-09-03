<template>
<div>
  <Message :msg="msg" v-show="msg" />
  <div id="burger-form-geral">
    <form id="burger-form" method="POST" @submit="createBurger">
      <div class="input-container">
        <label for="nome">Nome do cliente:</label>
        <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome">
      </div>
      <div class="input-container">
        <label for="tamanho">Escolha o tamanho do lanche:</label>
        <select name="tamanho" id="tamanho" v-model="tamanho">
          <option value="">Selecione o tamanho</option>
          <option v-for="tamanho in tamanhos" :key="tamanho.id" :value="tamanho.tipo" >{{ tamanho.tipo }}</option>
        </select>
      </div>
      <div class="input-container">
        <label for="pao">Escolha o pão:</label>
        <select name="pao" id="pao" v-model="pao">
          <option value="">Selecione o seu pão</option>
          <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">{{ pao.tipo }}</option>
        </select>
      </div>
      <div class="input-container">
        <label for="carne">Escolha a carne do seu Burger:</label>
        <select name="carne" id="carne" v-model="carne">
          <option value="">Selecione o tipo de carne</option>
          <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>
        </select>
      </div>
      <div id="opcionais-container" class="input-container">
        <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
        <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
          <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
          <span>{{ opcional.tipo }}</span>
        </div>
      </div>
      <div class="input-container">
        <label for="pao">Valor do pedido:</label>
        <p id="valor"> R$ {{ preco }} </p>
      </div>
      <div class="input-container">
        <input class="submit-btn" type="submit" value="Criar meu Burger!">
      </div>
    </form>
  </div>
</div>
</template>

<script>
import Message from "../components/Message.vue";
import axios from "axios";

export default {
  name: "BurgerForm",

  computed: {
    preco() {
      let total = 0.0;

      if (this.tamanho) {
        const tamanhoSelecionado = this.tamanhos.find(tamanho => tamanho.tipo === this.tamanho);
        total += tamanhoSelecionado.valor;
      }

      if (this.pao) {
        const paoSelecionado = this.paes.find(pao => pao.tipo === this.pao);
        total += paoSelecionado.valor;
      }

      if (this.carne) {
        const carneSelecionada = this.carnes.find(carne => carne.tipo === this.carne);
        total += carneSelecionada.valor;
      }

      this.opcionais.forEach(opcional => {
        const opcionalSelecionado = this.opcionaisdata.find(opc => opc.tipo === opcional);
        total += opcionalSelecionado.valor;
      });

      return total.toFixed(2); // Arredonda o valor para 2 casas decimais
    },
  },

  data() {
    return {
      tamanhos: null,
      paes: null,
      carnes: null,
      opcionaisdata: null,
      nome: null,
      pao: null,
      carne: null,
      tamanho: null,
      opcionais: [],
      status: "Solicitado",
      msg: null,
    };
  },

  methods: {
    async getIngredientes() {
      try {
        const response = await axios.get("https://extreme-odd-inspiration.glitch.me/api/ingredientes");
        const data = response.data;

        this.tamanhos = data.tamanhos;
        this.paes = data.paes;
        this.carnes = data.carnes;
        this.opcionaisdata = data.opcionais;
      } catch (error) {
        console.error("Erro ao buscar ingredientes:", error);
      }
    },

    async createBurger(e) {
      e.preventDefault();

      const data = {
        nome: this.nome,
        tamanho: this.tamanho,
        carne: this.carne,
        pao: this.pao,
        preco: parseFloat(this.preco), // Converter para float
        opcionais: Array.from(this.opcionais),
        status: "Solicitado",
      };

      try {
        const response = await axios.post("https://extreme-odd-inspiration.glitch.me/api/burgers", data, {
          headers: { "Content-Type": "application/json" },
        });

        const res = response.data;

        console.log(res);

        this.msg = `Pedido Nº ${res.id} realizado com sucesso!`;

        // Limpar a mensagem após 3 segundos
        setTimeout(() => (this.msg = ""), 3000);

        // Limpar campos do formulário
        this.nome = "";
        this.tamanho = "";
        this.carne = "";
        this.pao = "";
        this.preco = 0.0; // Redefinir preco para 0.0 após criar o burger com sucesso
        this.opcionais = [];
      } catch (error) {
        console.error("Erro ao criar o burger:", error);
      }
    },
  },

  mounted() {
    this.getIngredientes();
  },

  components: {
    Message,
  },
};
</script>

<style scoped>
  #burger-form {
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

  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }

  #opcionais-title {
    width: 100%;
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }

  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }

  .checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
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

  #valor {
    display: flex;
    align-content: center;
    max-width: 300px;
    margin: 0 auto;
  }

</style>