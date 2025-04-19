<script setup lang="ts">
  import { useImageApi } from '@/composables/useImageApi'
  import type { OAImage } from '@/models/Image'
  import { getDbUserId, isNotEmpty } from '@/utils/helpers'
  import { useAuth0 } from '@auth0/auth0-vue'
  import { onMounted, ref, watch } from 'vue'

  const { isAuthenticated, user } = useAuth0()
  const { getImages } = useImageApi()
  const imageData = ref<OAImage[]>([])

  watch([isAuthenticated, user], async ([isAuthenticated, user]) => {
    if (isAuthenticated && isNotEmpty(user)) {
      try {
        const response = await getImages({ userId: getDbUserId(user?.sub) })
        imageData.value = [...response, ...response, ...response, ...response]
        // imageData.value = response
      } catch (err) {
        console.error('Failed to load backend user:', err)
      }
    }
  })

  onMounted(async () => {
    try {
      if (isAuthenticated.value) {
        const response = await getImages({ userId: getDbUserId(user.value?.sub) })
        imageData.value = [...response, ...response, ...response, ...response]
        // imageData.value = response
      }
    } catch (error) {
      console.error('API call failed:', error)
    }
  })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const formattedDate = new Intl.DateTimeFormat('en-GB').format(date)
    return formattedDate
  }

  const onDownload = async (event: MouseEvent, url: string) => {
    try {
      const response = await fetch(url, {
        mode: 'cors',
      })

      if (!response.ok) throw new Error('Failed to fetch image')

      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = getFileNameFromUrl(url)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(blobUrl) // Cleanup
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  function getFileNameFromUrl(url: string) {
    return url.split('/').pop()?.split('?')[0] || 'download.png'
  }
</script>

<template>
  <div class="w-full max-w-[1080px]">
    <p class="text-xl">Gallery</p>
    <Divider />
    <div class="masonry">
      <div v-for="i in imageData" :key="i.id" class="relative image-container">
        <div class="absolute text-sm text-primary-200 inset-0 z-10 pointer-events-none hover-data">
          <p class="absolute bottom-2 left-2">Created on {{ formatDate(i.createdAt) }}</p>
          <div class="absolute top-0 right-1 pointer-events-auto">
            <Button
              icon="pi pi-download"
              rounded
              outlined
              class="border-none text-primary-200"
              @click="(e) => onDownload(e, i.url)"
            />
          </div>
        </div>
        <Image class="image-slot rounded-2xl" :src="i.url" preview>
          <template #previewicon>
            <i class="pi pi-eye text-primary-200 text-2xl"></i>
          </template>
        </Image>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .masonry {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .image-slot {
    box-sizing: border-box;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  @media (min-width: 1024px) {
    .masonry {
      grid-template-columns: repeat(4, 1fr);
    }

    .image-container .hover-data {
      display: none;
    }

    .image-container:hover .hover-data {
      display: block;
    }
  }
  /* .masonry {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: 10px;
  }

  .item {
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  } */
</style>
