<template>
    <v-container>
      <h1>Cadastrar Carro</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="car.manufacturer"
          :rules="[rules.required]"
          label="Fabricante"
          required
        ></v-text-field>
        <v-text-field
          v-model="car.model"
          :rules="[rules.required]"
          label="Modelo"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="car.modelYear"
          :rules="[rules.required, rules.year]"
          label="Ano"
          type="number"
          required
        ></v-text-field>
        <v-select
          v-model="car.category"
          :items="categories"
          item-text="text"
          item-value="value"
          :rules="[rules.required]"
          label="Categoria"
          required
        ></v-select>
        <v-btn :disabled="!valid" color="primary" @click="registerCar">Cadastrar Carro</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  
  interface Car {
    manufacturer: string;
    model: string;
    modelYear: number | null;
    category: number | null;
  }
  
  interface Category {
    value: number;
    text: string;
  }
  
  export default defineComponent({
    name: 'CarRegister',
    data() {
      return {
        car: {
          manufacturer: '',
          model: '',
          modelYear: null,
          category: null,
        } as Car,
        categories: [
          { value: 1, text: 'Compact Hatch' },
          { value: 2, text: 'Medium Hatch' },
          { value: 3, text: 'Sedan' },
          { value: 4, text: 'Van' },
          { value: 5, text: 'Pickup' },
        ] as Category[],
        valid: false,
        rules: {
          required: (value: any) => !!value || 'Campo obrigatório',
          year: (value: number) =>
            (value && value > 1900 && value <= new Date().getFullYear()) ||
            'Ano inválido',
        },
      };
    },
    methods: {
      registerCar() {
        if ((this.$refs.form as any).validate()) {
          axios.post('/api/cars', this.car).then(() => {
            this.$router.push('/');
          });
        }
      },
    },
  });
  </script>
  