<template>
  <v-app>
    <div v-if="$auth.loggedIn">
      <v-navigation-drawer
        v-model="drawer.open"
        :mini-variant="drawer.mini"
        :clipped="drawer.clipped"
        expand-on-hover
        app
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ $auth.user.data.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $auth.user.data.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        color="#ECEFF1"
        app
        :fixed="toolbar.fixed"
        :clipped-left="toolbar.clippedleft"
      >
        <v-app-bar-nav-icon @click="drawer.open = !drawer.open">
          <v-icon>mdi-menu</v-icon>
        </v-app-bar-nav-icon>
        <v-spacer />

        <v-toolbar-title class="headline"
          ><a href="/article" class="test"
            >LE COMPTOIR DU VILLAGE</a
          ></v-toolbar-title
        >
        <v-spacer />
        <div v-if="$auth.loggedIn">
          <v-btn text @click="$auth.logout()">Se déconnecter</v-btn>
        </div>
        <!-- <v-btn @click="getUserInfo()">user info</v-btn> -->
      </v-app-bar>
    </div>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!drawer.fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: {
        // sets the open status of the drawer
        open: null,
        // sets if the drawer is shown above (false) or below (true) the toolbar
        clipped: true,
        // sets if the drawer is CSS positioned as 'fixed'
        fixed: false,
        // sets if the drawer remains visible all the time (true) or not (false)
        permanent: true,
        // sets the drawer to the mini variant, showing only icons, of itself (true)
        // or showing the full drawer (false)
        mini: true,
      },

      toolbar: {
        fixed: false,
        // sets if the toolbar contents is leaving space for drawer (false) or not (true)
        clippedleft: true,
      },
      fixed: false,

      items: [
        {
          icon: "mdi-warehouse ",
          title: "Gestion de stock",
          to: "/stock",
        },

        {
          icon: "mdi-basket ",
          title: "Articles",
          to: "/article",
        },
      ],
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods: {
    getUserInfo() {
      console.log("user info:");
      this.$axios.get("/user-info/1").then((res) => console.log(res));
    },
  },
};
</script>
<style scoped>
.test {
  text-decoration: none;
  color: #690a68;
}
</style>
