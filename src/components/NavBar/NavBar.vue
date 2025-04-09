<script setup lang="ts">
  import Button from 'primevue/button'
  import { useAuth0 } from '@auth0/auth0-vue'
  import { ref, watch } from 'vue'
  import { getDbUserId, isNotEmpty } from '@/utils/helpers'
  import { useAuth } from '@/composables/useAuth'

  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0()
  const { getUser } = useAuth()
  const popover = ref()

  watch([isAuthenticated, user], async ([isAuthenticated, user]) => {
    if (isAuthenticated && isNotEmpty(user)) {
      try {
        await getUser({
          id: getDbUserId(user?.sub),
          username: user?.nickname ?? '',
          email: user?.email ?? '',
        })
      } catch (err) {
        console.error('Failed to load backend user:', err)
      }
    }
  })

  const login = async () => {
    await loginWithRedirect()
  }

  const signup = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    })
  }

  const signout = async () => {
    await logout({ logoutParams: { returnTo: window.location.origin } })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggle = (event: any) => {
    popover.value.toggle(event)
  }
</script>

<template>
  <div class="bg-color-primary h-14 flex justify-between items-center px-4">
    <div>ImaGen Logo</div>
    <div v-if="!isAuthenticated" class="flex gap-2">
      <Button label="Log in" @click="login" class="login-button" />
      <Button label="Sign up" @click="signup" class="login-button" />
    </div>
    <div v-if="isAuthenticated" class="flex gap-2">
      <Button unstyled @click="toggle" class="flex items-center">
        <Avatar :image="user?.picture" class="mr-2" size="medium" shape="circle" />
      </Button>

      <Popover ref="popover">
        <div class="flex flex-col gap-4">
          <div>
            <b>{{ user?.nickname }}</b>
          </div>
          <Button outlined label="Log out" @click="signout" />
        </div>
      </Popover>
    </div>
  </div>
</template>

<style scoped>
  .login-button {
    background-color: black;
    &:hover {
      background-color: var(--primary);
      color: black;
    }
  }
</style>
