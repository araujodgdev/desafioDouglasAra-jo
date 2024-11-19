<template>
  <v-container>
    <h1>Cadastrar Carro</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
        v-model="car.manufacturer"
        :items="manufacturers"
        item-title="name"
        item-value="code"
        :rules="[rules.required]"
        label="Fabricante"
        required
      ></v-select>
      <v-select
        v-model="car.model"
        :items="models"
        item-title="name"
        item-value="name"
        :rules="[rules.required]"
        label="Modelo"
        required
        :disabled="models.length === 0"
      ></v-select>
      <v-text-field
        v-model.number="car.modelYear"
        :rules="[rules.required, rules.year]"
        label="Ano"
        type="number"
        required
      ></v-text-field>
      <v-text-field
        v-model.number="car.rentWeekdayPrice"
        :rules="[rules.required, rules.price]"
        label="Preço Dia de Semana"
        type="number"
        required
      ></v-text-field>

      <v-text-field
        v-model.number="car.rentWeekendPrice"
        :rules="[rules.required, rules.price]"
        label="Preço Fim de Semana"
        type="number"
        required
      ></v-text-field>

      <v-text-field
        v-model.number="car.rentWeekdayPriceLoyalty"
        :rules="[rules.required, rules.price]"
        label="Preço Dia de Semana (Fidelidade)"
        type="number"
        required
      ></v-text-field>

      <v-text-field
        v-model.number="car.rentWeekendPriceLoyalty"
        :rules="[rules.required, rules.price]"
        label="Preço Fim de Semana (Fidelidade)"
        type="number"
        required
      ></v-text-field>

      <v-select
        v-model="car.category"
        :items="categories"
        item-title="text"
        item-value="value"
        :rules="[rules.required]"
        label="Categoria"
        required
      ></v-select>
      <v-btn :disabled="!valid" color="primary" @click="registerCar"
        >Cadastrar Carro</v-btn
      >
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '../axios';

interface Car {
  manufacturer: string;
  model: string;
  modelYear: number | null;
  category: number | null;
  rentWeekdayPrice: number | null;
  rentWeekendPrice: number | null;
  rentWeekdayPriceLoyalty: number | null;
  rentWeekendPriceLoyalty: number | null;
}

interface Category {
  value: number;
  text: string;
}

interface Manufacturer {
  code: string;
  name: string;
}

interface CarModel {
  code: string;
  name: string;
}

export default defineComponent({
  name: 'CarRegister',
  data() {
    return {
      models: [] as CarModel[],
      manufacturers: [] as Manufacturer[],
      car: {
        manufacturer: '',
        model: '',
        modelYear: null,
        category: null,
        rentWeekdayPrice: null,
        rentWeekendPrice: null,
        rentWeekdayPriceLoyalty: null,
        rentWeekendPriceLoyalty: null,
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
    fetchManufacturers() {
      axios
        .get('https://fipe.parallelum.com.br/api/v2/cars/brands')
        .then((response) => {
          this.manufacturers = response.data;
        });
    },
    registerCar() {
      if ((this.$refs.form as any).validate()) {
        const manufacturer = this.manufacturers.find(man => man.code === this.car.manufacturer);
        this.car.manufacturer = manufacturer?.name as string;
        axios.post('/api/cars', this.car).then(() => {
          this.$router.push('/');
        });
      }
    },
    fetchModels(manufacturerCode: string) {
      axios
        .get(
          `https://fipe.parallelum.com.br/api/v2/cars/brands/${manufacturerCode}/models`
        )
        .then((response) => {
          this.models = response.data;
        })
        .catch((error) => {
          console.error('Erro ao obter os modelos:', error);
        });
    },
  },
  watch: {
    'car.manufacturer': {
      immediate: false,
      handler(newVal) {
        if (newVal) {
          this.fetchModels(newVal);
        } else {
          this.models = [];
          this.car.model = '';
        }
      },
    },
  },
  mounted() {
    this.fetchManufacturers();
  },
});
</script>
