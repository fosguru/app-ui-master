<template>
  <Layout :crumbs="[{ label: 'Getting Started' }]">
    <div class="mb-4 text-xl font-semibold leading-loose text-stone-900 lg:hidden">
      Getting Started
    </div>
    <div class="mx-auto max-w-3xl">
      <div class="text-right">
        <!--
        <Btn to="/help" size="sm" color="white" class="mr-3">
          FAQ
        </Btn>
        <Btn to="/help/support" size="sm" color="white">
          Contact Support
        </Btn>
        -->
      </div>
      <h2 class="mb-6 mt-4 text-center text-3xl font-medium">
        Getting Started with Datachef
      </h2>

      <div class="mx-32 space-y-4">
        <img class="object-contain" src="~/assets/images/launch.svg">
      </div>

      <SpinnerIcon v-if="loading" class="mx-auto my-10 size-6" />
      <div class="mt-12 space-y-4">
        <div class="mx-7 my-8">
          Welcome! Before you get started with Datachef, we recommend going through the tutorials below. <b>These should take you 7-8 minutes in total.</b>
        </div>

        <Panel v-for="item in items" :key="item.sys.id">
          <NuxtLink :to="`/start/${item.sys.id}`" class="text-xl">
            <span class="text-md me-2 rounded bg-red-100 px-2.5 py-0.5 font-medium text-gray-800 dark:bg-red-500 dark:text-gray-300 ">
              {{ item.fields.order }}
            </span>
            {{ item.fields.title }}
          </NuxtLink>
          <div>
            <span v-html="$f.truncate(documentToHtmlString(item.fields.body).replace(/(<([^>]+)>)/gi, ''), 160)" />
            <NuxtLink :to="`/start/${item.sys.id}`" class="ml-2 text-red-500">
              <span class="underline">Continue Reading</span>
            </NuxtLink>
          </div>
        </Panel>

        <div v-if="query && !items.length">
          Nothing found, please try different query.
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import debounce from 'lodash/debounce'
import Layout from '~/components/Layout/Layout.vue'
import Panel from '~/components/UI/Panel.vue'
import SpinnerIcon from '~/components/Icons/SpinnerIcon.vue'
import { useHead, useRuntimeConfig } from '#imports'

export default {
  components: { SpinnerIcon, Panel, Layout },

  setup () {
    useHead({
      title: `Getting Started | ${useRuntimeConfig().public.appName}`,
    })
  },

  data: () => ({
    loading: false,
    query: '',
    items: [],
  }),

  watch: {
    query: debounce(function () {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      this.getItems()
    }, 300),
  },

  async mounted () {
    this.getItems()
  },

  methods: {
    documentToHtmlString,

    async getItems () {
      this.loading = true
      const params = {
        content_type: 'onboarding',
        order: 'fields.order',
      }
      if (this.query) {
        params['fields.title[match]'] = this.query
      }

      this.items = (await this.$contentful.getEntries(params)).items
      this.loading = false
    },
  },
}
</script>
