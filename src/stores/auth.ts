// src/stores/auth.ts
import { defineStore } from 'pinia'
import { createAuth0, useAuth0, User, type Auth0VueClient } from '@auth0/auth0-vue'
import type { Ref } from 'vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth0: null as Ref<Auth0VueClient> | null,
    isAuthenticated: false as boolean,
    user: null as Ref<User> | null,
  }),

  actions: {
    async init() {
      createAuth0({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT,
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      })

      this.auth0 = useAuth0()
      this.isAuthenticated = this.auth0?.isAuthenticated.value
      this.user = this.auth0?.user
    },

    async login() {
      await this.auth0?.loginWithRedirect()
    },

    async logout() {
      this.auth0?.logout({ logoutParams: { returnTo: window.location.origin } })
    },
  },
})
