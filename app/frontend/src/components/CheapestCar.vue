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
        <v-btn :disabled="!valid" color="primary" @click="findCheapestCar">Encontrar Carro</v-btn>
      </v-form>
  
      <v-alert type="error" v-if="errorMessage">{{ errorMessage }}</v-alert>
  
      <div v-if="result">
        <h2>Carro Mais Barato</h2>
        <v-card>
          <v-card-title>{{ result.car.manufacturer }} {{ result.car.model }}</v-card-title>
          <v-card-text>
            Preço: {{ formatCurrency(result.price) }}
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  interface Car {
    manufacturer: string;
    model: string;
  }
  
  interface SearchParams {
    startDate: string;
    endDate: string;
    loyaltyProgram: boolean;
    email?: string;
  }
  
  interface Result {
    car: Car;
    price: number;
  }
  
  interface Form extends HTMLFormElement {
    validate(): boolean;
  }
  
  export default defineComponent({
    name: 'CheapestCar',
    data() {
      return {
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
        if ((this.$refs.form as Form).validate()) {
          axios
            .post('/api/cheapest-car', this.searchParams)
            .then((response) => {
              this.result = response.data;
              if (this.searchParams.email) {
                alert('Resultado enviado para o seu e-mail.');
              }
            })
            .catch((error) => {
              this.errorMessage =
                error.response?.data?.message || 'Ocorreu um erro';
            });
        }
      },
      formatCurrency(value: number) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      },
    },
  });
  </script>
  