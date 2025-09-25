<template>
  <Layout :crumbs="[{ label: 'Help' }]">
    <div class="mb-4 text-xl font-semibold leading-loose text-stone-900 lg:hidden">
      Help
    </div>
    <div class="mx-auto max-w-3xl">
      <div class="text-right">
        <!-- <Btn to="/help/support" size="sm" color="white">
          Contact Support
        </Btn> -->
      </div>
      <h2 class="mb-6 mt-4 text-center text-3xl font-medium">
        Frequently Asked Questions (F.A.Q.)
      </h2>

      <div class="mx-32 space-y-4">
        <img class="object-contain" src="~/assets/images/faq.svg">
      </div>

      <InputGroup v-model="query" placeholder="Type your question here..." class="w-full" />

      <SpinnerIcon v-if="loading" class="mx-auto my-10 size-6" />
      <div class="mt-8 space-y-4">
        <Panel v-for="item in items" :key="item.sys.id">
          <NuxtLink :to="`/help/${item.sys.id}`" class="text-xl">
            {{ item.fields.title }}
          </NuxtLink>
          <div>
            <span v-html="$f.truncate(documentToHtmlString(item.fields.body).replace(/(<([^>]+)>)/gi, ''), 160)" />
            <NuxtLink :to="`/help/${item.sys.id}`" class="ml-2 text-red-500">
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
import Btn from '~/components/UI/Btn.vue'
import InputGroup from '~/components/UI/InputGroup.vue'
import Panel from '~/components/UI/Panel.vue'
import SpinnerIcon from '~/components/Icons/SpinnerIcon.vue'
import { useHead, useRuntimeConfig } from '#imports'

export default {
  components: { SpinnerIcon, Panel, InputGroup, Btn, Layout },

  setup () {
    useHead({
      title: `Help | ${useRuntimeConfig().public.appName}`,
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
        content_type: 'faq',
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
