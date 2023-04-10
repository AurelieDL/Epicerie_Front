<template>
  <v-container fluid>
    <Breadcrumbs :items="breadcrumbs" />
    <TitleWithCount :title="title" :total="total" />

    <v-row>
      <v-col class="text-right">
        <v-btn depressed color="primary"  @click="addProductDialog = true">
          <v-icon left>
            mdi-plus
          </v-icon>
          Ajouter un article
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="textSearch"
          append-icon="mdi-magnify"
          label="Rechercher"
          clearable
          hide-details
          outlined
          dense
          class="rounded-0"
          @input="v => assignQuery(v)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card flat>
          <v-data-table
            :headers="headers"
            :items="products"
            :options.sync="options"
            :server-items-length="total"
            >
            <template #[`item.quantity`]="{ item }">
              {{ item.quantity | formatNumber }}
            </template>
            <template #[`item.price_ht`]="{ item }">
              {{ item.price_ht | formatNumber }} €
            </template>
            <template #[`item.status.name`]="{ item }">
              <v-chip v-if="item.status.id === 1" color="green" label class="text-uppercase">
              {{ item.status.name }}</v-chip>

              <v-chip v-if="item.status.id === 2" color="orange" label class="text-uppercase">
              {{ item.status.name }}
              </v-chip>
              <v-chip v-if="item.status.id === 3" color="red" label class="text-uppercase">
              {{ item.status.name }}
            </v-chip>
            </template>
            <template #[`item.action`]="{ item }">
              <v-menu v-model="item.action" left offset-y>
                <template #activator="{ on }">
                  <div class="d-flex justify-center">
                    <v-btn fab x-small depressed color="primary" v-on="on">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </template>
                <v-list class="py-0">
                  <v-list-item v-if="item.status_id === 1">
                    <v-list-item-avatar>
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title> Modifier l'article </v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="item.status_id === 1" @click="archive(item)">
                    <v-list-item-avatar>
                      <v-icon>mdi-archive-arrow-down-outline</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title> Archiver l'article </v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="item.status_id === 2" @click="restore(item)">
                    <v-list-item-avatar>
                      <v-icon>mdi-restore</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title> Restorer l'article </v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="$auth.user.data.role_id === 1 && item.deleted_at !== null" @click="permanentDelete(item)">
                    <v-list-item-avatar>
                      <v-icon color="error">mdi-delete</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title class="error--text"> Supprimer l'article </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <article-form v-model="addProductDialog" @refresh="getProducts"></article-form>
  </v-container>
</template>

<script>
import Breadcrumbs from '~/components/utils/breadcrumbs'
import TitleWithCount from '~/components/utils/title-with-count'
import ArticleForm from "~/components/articleForm.vue";
export default {
  components: {
    Breadcrumbs,
    TitleWithCount,
    ArticleForm
  },
  data() {
    return {
      addProductDialog: false,
      search: "",
      options: {
        sortBy: ['id'],
        sortDesc: ['true'],
        page: 1,
        itemsPerPage: 5
      },
      headers: [
        {
          text: "Nom",
          align: "start",
          filterable: false,
          value: "name"
        },
        { text: "Quantité", value: "quantity", align: "start" },
        { text: "Emballage", value: "packaging", cellClass: 'text-truncate', class: 'paddington', },
        {
          text: "Prix HT",
          value: "price_ht",
          cellClass: 'text-truncate',
          align: "center",
        },
        { text: "TVA", value: "tva" },
        { text: "Marge", value: "margin_rate" },
        { text: "Status", value: "status.name" },
        { text: "Crée par", value: "creator.name" },
        { text: "Fournisseur", value: "supplier.name" },
        { text: "", value: "action" },
      ],
      products: [],
      breadcrumbs: [
        {
          text: 'Tableau de bord',
          disabled: true
        },
        {
          text: 'Articles',
          disabled: true
        }
      ],
      title: 'Articles',
      total: null,
      textSearch: null
    };
  },
  computed: {
    params () {
      return {
        search: this.$route.query.search,
        itemsPerPage: this.$route.query.itemsPerPage,
        page: this.$route.query.page,
        order: this.$route.query.sortDesc,
        sort_by: this.$route.query.sortBy
      }
    }
  },
  mounted() {
    if (this.$route.query.page) {
      this.options.page = +this.$route.query.page
    }
    if (this.$route.query.rowsPerPage) {
      this.options.itemsPerPage = parseInt(this.$route.query.rowsPerPage)
    }
    if (this.$route.query.search != null) {
      this.textSearch = this.$route.query.search
    }
    this.getProducts();
  },
  watch: {
    options: {
      handler () {
        const query = Object.assign({}, this.$route.query)
        query.page = this.options.page
        query.rowsPerPage = this.options.itemsPerPage

        this.$router
          .replace({
            params: this.$route.params,
            name: this.$route.name,
            query
          })
          .catch(() => {})
      }
    },
    '$route.query.rowsPerPage' () {
      this.options.itemsPerPage = this.$route.query.rowsPerPage
    },
    '$route.query.page' () {
      this.options.page = this.$route.query.page
    },
    '$route.query' () {
      this.getProducts()
    }
  },

  methods: {
    getProducts() {
      this.$axios.get("/products", {
        params: {
          search: this.$route.query.search,
          itemsPerPage: this.$route.query.rowsPerPage,
          page: this.$route.query.page
        }
      }).then((res) => {
        this.products = res.data.data
        this.total = res.data.total
        if (res.data.current_page > res.data.last_page) {
          this.options.page = res.data.last_page
        }
      });
    },
    assignQuery (value) {
      const query = { ...this.$route.query }
      query.search = value || undefined
      this.$router.replace({
        params: this.$route.params,
        name: this.$route.name,
        query
      })
    },
    restore(item) {
      this.$axios.get("/product/restore/" + item.id).then( res => this.getProducts() )
    },
    archive(item) {
      this.$axios.delete("/products/" + item.id).then( res => this.getProducts() )
    },
    permanentDelete(item) {
      this.$axios.delete("/product/permanent-delete/" + item.id).then( res => this.getProducts() )
    }
  },
};
</script>
