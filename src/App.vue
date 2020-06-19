<template>
  <v-app id="app">
    <v-navigation-drawer app mini-variant v-model="isVisibleMenu">
      <v-list dense class="pt-0">
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'newArticle' }" v-if="$can('create', 'Article')">
          <v-list-item-action>
            <v-icon>add_circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add article</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-if="isLoggedIn">
          <v-list-item @click="logout" title="Log out">
            <v-list-item-action>
              <v-icon>rowing</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item @click="$router.push('/login')" title="Log in">
            <v-list-item-action>
              <v-icon>input</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-toolbar>
        <v-btn icon @click="isVisibleMenu = !isVisibleMenu">
          <v-icon>menu</v-icon>
        </v-btn>
        <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
        <v-spacer />
        <div v-if="email">{{ email }}</div>
      </v-toolbar>
      <v-container fluid fill-height>
        <router-view />
      </v-container>
    </v-main>
    <v-snackbar
      v-for="notification in notifications"
      :key="notification.id"
      :timeout="notification.timeout"
      :color="notification.type"
      top
      center
      @input="removeNotification(notification)"
      :value="true"
    >
      {{ notification.message }}
      <v-btn @click.native="removeNotification(notification)">&times;</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  data: () => ({
    isVisibleMenu: false
  }),
  computed: {
    ...mapState(["pageTitle", "email"]),
    ...mapState("notifications", {
      notifications: "stack"
    }),
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    ...mapActions("notifications", { removeNotification: "remove" }),

    logout() {
      return this.$store.dispatch("logout").then(() => {
        this.isVisibleMenu = false;
        this.$router.replace("/login");
      });
    }
  }
};
</script>
