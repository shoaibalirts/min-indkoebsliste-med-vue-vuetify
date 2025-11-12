<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn
          icon="mdi-plus"
          size="large"
          @click="handleClickBtn"
          class="text-center bg-primary rounded-b-circle"
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    handleClickBtn() {
      this.$emit("toggle-open");
    },
  },
};
</script>
