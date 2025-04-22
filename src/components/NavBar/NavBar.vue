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

    <div class="flex gap-2 items-center">
      <div>
        <Button label="About" variant="link" class="text-white" disabled />
      </div>
      <div class="nav-user">
        <div v-if="!isAuthenticated" class="flex gap-2">
          <Button label="Log in" @click="login" class="login-button" />
          <Button label="Sign up" @click="signup" class="login-button" />
        </div>
        <div v-if="isAuthenticated" class="flex gap-2">
          <Button unstyled @click="toggle" class="flex items-center">
            <Avatar :image="user?.picture" size="medium" shape="circle" />
          </Button>

          <Popover ref="popover">
            <div class="flex flex-col items-start">
              <div class="px-2">
                <b>{{ user?.nickname }}</b>
              </div>
              <Divider class="m-1" />
              <Button
                class="w-full px-2 text-red-500 bg-transparent hover:bg-surface-100 flex items-center justify-start border-none rounded-md"
                @click="signout"
                ><i class="pi pi-sign-out pr-1"></i>Log out</Button
              >
            </div>
          </Popover>
        </div>
      </div>
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

  .p-popover.p-popover-arrow-flipped::before {
    left: auto;
    right: 1.25rem;
  }

  .p-popover.p-popover-arrow-flipped::after {
    left: auto;
    right: 1.25rem;
  }
</style>
