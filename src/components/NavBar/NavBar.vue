<script setup lang="ts">
import Button from 'primevue/button'
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, watch } from 'vue'
import { getDbUserId, isNotEmpty } from '@/utils/helpers'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0()
const { getUser } = useAuth()
const popover = ref()
const visible = ref(false)
const router = useRouter()

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

const navigateToAbout = () => {
  visible.value = false
  router.push('/about')
}

const login = async () => {
  visible.value = false
  await loginWithRedirect()
}

const signup = async () => {
  visible.value = false
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
  <div class="gradient-bg h-14 flex justify-between items-center px-4">
    <div>
      <a href="/">
        <img src="../../assets/images/imagen_logo.png" alt="Imagen Logo" class="h-6" />
      </a>
    </div>

    <!-- Desktop view -->
    <div class="hidden md:flex items-center ">
      <Button label="About" variant="link" class="text-white" @click="navigateToAbout" />
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
              class="popover-button text-red-500"
              @click="signout"><i class="pi pi-sign-out pr-1"></i>Log out</Button>
          </div>
        </Popover>
      </div>
    </div>

    <!-- Mobile view -->
    <div class="flex md:hidden" v-if="!isAuthenticated">
      <Drawer v-model:visible="visible" position="right" class="w-[200px]" :pt="{
        header: 'h-14 p-1',
        content: 'p-1'
      }">
        <div class="flex flex-col items-start">
          <Button variant="link" class="popover-button text-color-secondary" @click="navigateToAbout"><i
              class="pi pi-info-circle px-1"></i>About</Button>
          <Divider class="m-1" />
          <Button label="Log in" @click="login" class="popover-button text-color-secondary"><i class="pi pi-sign-out px-1"></i>Log
            in</Button>
          <Divider class="m-1" />
          <Button label="Sign up" @click="signup" class="popover-button text-color-secondary"><i class="pi pi-user-plus px-1"></i>Sign
            up</Button>
        </div>
      </Drawer>
      <Button class="rounded-md" @click="visible = true" icon="pi pi-bars" size="large" variant="outlined" />
    </div>
    <div class="flex md:hidden" v-if="isAuthenticated">
      <Button label="About" variant="link" class="text-white" @click="navigateToAbout" />
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
              class="popover-button text-red-500"
              @click="signout"><i class="pi pi-sign-out pr-1"></i>Log out</Button>
          </div>
        </Popover>
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

.popover-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: none;
  border-radius: 5px;
  width: 100%;
  padding: 0.75rem 0.5rem;
  background-color: transparent;
  &:hover {
    background-color: var(--surface-100);
  }
}
</style>
