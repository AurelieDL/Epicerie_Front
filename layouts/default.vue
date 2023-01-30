<template>
  <v-app>
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
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
              <v-list-item-title class="text-h6">
                Sandra Adams
              </v-list-item-title>
              <v-list-item-subtitle>sandra_a88@gmail.ffcom</v-list-item-subtitle>
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
      app
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedleft"
    >
      <v-app-bar-nav-icon @click="drawer.open = !drawer.open">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <v-spacer />
      <v-toolbar-title>Adminhh</v-toolbar-title>
    </v-app-bar>
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
        mini: true
      },
      toolbar: {
        fixed: false,
        // sets if the toolbar contents is leaving space for drawer (false) or not (true)
        clippedleft: true
      },
      fixed: false,
      items: [
        {
          icon: "mdi-warehouse ",
          title: "Gestion de stock",
          to: "/stock",
        },
      ],
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
