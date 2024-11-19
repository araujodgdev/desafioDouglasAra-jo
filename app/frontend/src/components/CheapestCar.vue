<template>
  <v-container>
    <h1>Encontrar Carro Mais Barato</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="searchParams.startDate"
        :rules="[rules.required]"
        label="Data de Início"
        type="date"
        required
      ></v-text-field>
      <v-text-field
        v-model="searchParams.endDate"
        :rules="[rules.required]"
        label="Data de Fim"
        type="date"
        required
      ></v-text-field>
      <v-checkbox
        v-model="searchParams.loyaltyProgram"
        label="Participa do Programa de Fidelidade"
      ></v-checkbox>
      <v-text-field
        v-model="searchParams.email"
        :rules="[rules.email]"
        label="E-mail (opcional)"
        type="email"
      ></v-text-field>
      <v-btn :disabled="!valid" color="primary" @click="findCheapestCar"
        >Encontrar Carro</v-btn
      >
    </v-form>

    <v-alert type="error" v-if="errorMessage">{{ errorMessage }}</v-alert>

    <div v-if="result">
      <h2>Carro Mais Barato Encontrado</h2>
      <v-card>
        <v-card-title>
          {{ result.car.manufacturer }} {{ result.car.model }} ({{
            result.car.modelYear
          }})
        </v-card-title>
        <v-card-subtitle>
          Categoria: {{ formatCategory(result.car.category) }}
        </v-card-subtitle>
        <v-card-text>
          <p>Preço Total: {{ formatCurrency(result.totalPrice) }}</p>
          <p>
            Preço Dia de Semana:
            {{ formatCurrency(result.car.rentWeekdayPrice) }}
          </p>
          <p>
            Preço Fim de Semana:
            {{ formatCurrency(result.car.rentWeekendPrice) }}
          </p>
          <p>
            Preço Dia de Semana (Fidelidade):
            {{ formatCurrency(result.car.rentWeekdayPriceLoyalty) }}
          </p>
          <p>
            Preço Fim de Semana (Fidelidade):
            {{ formatCurrency(result.car.rentWeekendPriceLoyalty) }}
          </p>
        </v-card-text>
      </v-card>
    </div>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      timeout="5000"
      top
    >
      {{ snackbar.text }}
      <template #actions>
        <v-btn icon @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from '../axios';

interface Car {
  id: number;
  manufacturer: string;
  model: string;
  modelYear: number;
  category: string;
  rentWeekdayPrice: number;
  rentWeekdayPriceLoyalty: number;
  rentWeekendPrice: number;
  rentWeekendPriceLoyalty: number;
}

interface SearchParams {
  startDate: string;
  endDate: string;
  loyaltyProgram: boolean;
  email?: string;
}
interface Result {
  car: Car;
  totalPrice: number;
}

interface Form extends HTMLFormElement {
  validate(): boolean;
}

export default defineComponent({
  name: 'CheapestCar',
  data() {
    return {
      snackbar: {
        show: false,
        text: '',
        color: '',
      },
      searchParams: {
        startDate: '',
        endDate: '',
        loyaltyProgram: false,
        email: '',
      } as SearchParams,
      result: null as Result | null,
      valid: false,
      errorMessage: '',
      rules: {
        required: (value: any) => !!value || 'Campo obrigatório',
        email: (value: string) => {
          const pattern =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return !value || pattern.test(value) || 'E-mail inválido';
        },
      },
    };
  },
  methods: {
    findCheapestCar() {
      if ((this.$refs.form as any).validate()) {
        const requestData = {
          startDate: this.searchParams.startDate,
          endDate: this.searchParams.endDate,
          loyaltyProgram: this.searchParams.loyaltyProgram,
          email: this.searchParams.email || undefined,
        };

        axios
          .post('/api/cars/cheapest', requestData)
          .then((response) => {
            if (response.data.length === 0) {
                return this.showSnackbar('Nenhum carro encontrado!', 'error')
            }
            this.result = response.data;
            if (this.searchParams.email) {
              this.showSnackbar(
                'Resultado enviado para o seu e-mail.',
                'success'
              );
            } else {
              this.showSnackbar('Carro encontrado com sucesso!', 'success');
            }
          })
          .catch((error) => {
            const message =
              error.response?.data?.message ||
              'Ocorreu um erro ao buscar o carro mais barato.';
            this.showSnackbar(message, 'error');
          });
      }
    },
    formatCurrency(value: number) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    },
    formatCategory(value: string) {
      const formatted = value.replace(/_/g, ' ').toLowerCase();
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    },
    showSnackbar(message: string, color: string) {
      this.snackbar.text = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
  },
});
</script>
