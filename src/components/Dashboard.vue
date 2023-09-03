<template>
  <div id="burger-table" v-if="burgers">
    <Message :msg="msg" v-show="msg" />
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Valor:</div>  
        <div>Tamanho:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>   
        <div>Ações:</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.nome }}</div>
        <div>R$ {{ burger.preco }}</div>
        <div>{{ burger.tamanho }}</div> 
        <div>{{ burger.pao }}</div>
        <div>{{ burger.carne }}</div>
        <div>
          <ul v-for="(opcional, index) in burger.opcionais" :key="index">
            <li>{{ opcional }}</li>
          </ul>
        
        </div>
        <div>
          <select name="status" class="status" @change="updateBurger($event, burger.id)">
            <option :value="s.tipo" v-for="s in status" :key="s.id" :selected="burger.status == s.tipo">
              {{ s.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Não há pedidos no momento!</h2>
  </div>
</template>

<script>
import Message from "./Message.vue";
import axios from 'axios';

export default {
  name: "Dashboard",
  data() {
    return {
      burgers: null,
      burger_id: null,
      status: [],
      msg: null,
    };
  },
  components: {
    Message,
  },
  methods: {
    async getPedidos() {
      try {
        const response = await axios.get('https://api-burgervue-production.up.railway.app/api/burgers'); // Usa o Axios para fazer a solicitação GET
        this.burgers = response.data;

        // Resgata os status de pedidos
        this.getStatus();
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    },
    async getStatus() {
      try {
        const response = await axios.get('https://api-burgervue-production.up.railway.app/api/status'); // Usa o Axios para fazer a solicitação GET
        this.status = response.data;
      } catch (error) {
        console.error('Erro ao buscar status:', error);
      }
    },
    async deleteBurger(id) {
      try {
        const response = await axios.delete(`https://api-burgervue-production.up.railway.app/api/burgers/${id}`);
        this.msg = `Pedido removido com sucesso!`;

        // Limpa a mensagem após 3 segundos
        setTimeout(() => (this.msg = ''), 3000);

        this.getPedidos();
      } catch (error) {
        console.error('Erro ao excluir pedido:', error);
      }
    },
    async updateBurger(event, id) {
      const option = event.target.value;
      const data = { status: option };

      try {
        const response = await axios.patch(`https://api-burgervue-production.up.railway.app/api/burgers/${id}`, data, {
          headers: { 'Content-Type': 'application/json' },
        });

        this.msg = `Pedido Nº ${response.data.id} foi atualizado para ${response.data.status}!`;

        // Limpa a mensagem após 3 segundos
        setTimeout(() => (this.msg = ''), 3000);
      } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
      }
    },
  },
  mounted() {
    this.getPedidos();
  },
};
</script>

<style scoped>
  #burger-table {
    max-width: 1200px;
    margin: 0 auto;
  }

  #burger-table-heading,
  .burger-table-row {
    display: flex;
    flex-wrap: nowrap;
  }

  #burger-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  .burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
  }

  #burger-table-heading div,
  .burger-table-row div {
    width: 15%;
  }

  #burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 5%;
  }

  select {
    padding: 12px 6px;
    margin-right: 12px;
  }

  .delete-btn {
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
  
  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }
  
</style>