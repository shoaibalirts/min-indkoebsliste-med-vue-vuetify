
    <template>
        <div class="text-center">
                <v-menu
                open-on-hover
                >
                    <template v-slot:activator="{ props }">
                                <v-btn
                                color="green"
                                v-bind="props"
                                >
                                Grønne alternativer 
                                    <v-icon right>mdi-menu-down</v-icon>
                                    <v-icon icon="fa:fas fa-lock">efe</v-icon>

                                </v-btn>
                    </template>

                    <v-list>
                                <v-list-item
                                v-for="(item, index) in items"
                                :key="index"
                                :value="index"
                                >
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                    </v-list>
                    </v-menu>
        </div>
    </template>

<script>
import productService from "@/services/productService";

export default {}
</script>
<style scoped>

</style>