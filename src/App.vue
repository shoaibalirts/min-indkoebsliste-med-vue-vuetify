<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Dine Indkøbslister</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
  </v-app>
</template>
<script>
// const drawer = null;
export default {
  components: {},
  data() {
    return {
      drawer: null,
      products: [
        {
          id: 1,
          name: "Oksekød",
          co2_per_kg: 27.0,
          alternatives: [
            {
              id: 11,
              name: "Kyllingebryst",
              co2_per_kg: 6.0,
            },
            {
              id: 12,
              name: "Linser (tørrede)",
              co2_per_kg: 1.1,
            },
            {
              id: 13,
              name: "Svinekød",
              co2_per_kg: 7.0,
            },
          ],
        },
        {
          id: 2,
          name: "Smør",
          co2_per_kg: 12.0,
          alternatives: [
            {
              id: 14,
              name: "Margarine (plantebaseret)",
              co2_per_kg: 3.3,
            },
            {
              id: 15,
              name: "Olivenolie",
              co2_per_kg: 5.0,
            },
          ],
        },
        {
          id: 3,
          name: "Hvedebrød",
          co2_per_kg: 1.0,
        },
        {
          id: 4,
          name: "Yoghurt naturel",
          co2_per_kg: 2.0,
        },
        {
          id: 5,
          name: "Æg",
          co2_per_kg: 4.5,
        },
        {
          id: 6,
          name: "Kartofler",
          co2_per_kg: 0.3,
        },
        {
          id: 7,
          name: "Tomater",
          co2_per_kg: 1.4,
        },
        {
          id: 8,
          name: "Ris",
          co2_per_kg: 4.0,
          alternatives: [
            {
              id: 16,
              name: "Kartofler",
              co2_per_kg: 0.3,
            },
            {
              id: 17,
              name: "Pasta",
              co2_per_kg: 1.0,
            },
          ],
        },
        {
          id: 9,
          name: "Kyllingebryst",
          co2_per_kg: 6.0,
        },
        {
          id: 10,
          name: "Gulerødder",
          co2_per_kg: 0.2,
        },
      ],
    };
  },
};
</script>

<style scoped></style>
