<template>
  <Layout :crumbs="[{ label: 'Getting Started', to: '/start' }, { label: entry?.fields?.title }]" :loading="loading">
    <div class="mb-4 text-xl font-semibold leading-loose text-stone-900 lg:hidden">
      Getting Started
    </div>
    <Panel v-if="entry" class="mx-auto max-w-4xl">
      <h2 class="mb-6 mt-2 text-4xl dark:text-stone-300">
        {{ entry.fields.title }}
      </h2>
      <div class="prose dark:prose-invert" v-html="documentToHtmlString(entry.fields.body)" />
      <div class="pt-5 text-right text-xs italic text-gray-600 dark:text-stone-300">
        <!-- Last updated: {{ $f.date(entry.sys.updated, 'M/D/YY') }} -->
      </div>
    </Panel>
  </Layout>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import Layout from '~/components/Layout/Layout.vue'
import Panel from '~/components/UI/Panel.vue'
import { showError, useHead, useRuntimeConfig } from '#imports'

export default {
  components: { Panel, Layout },

  setup () {
    useHead({
      title: `Help | ${useRuntimeConfig().public.appName}`,
    })
  },

  data: () => ({
    loading: false,
    entry: null,
  }),

  mounted () {
    this.getItem()
  },

  methods: {
    documentToHtmlString (field) {
      return documentToHtmlString(field, {
        renderNode: {
          'embedded-asset-block': node => this.renderMedia(node.data.target.fields.file),
        },
      })
    },

    renderMedia (file) {
      if (file.contentType.startsWith('video/')) {
        return `
          <div class="aspect-video">
            <video controls>
              <source src=${file.url} type="video/mp4"/>
              <p>Your browser doesnt support HTML5 video.</p>
            </video>
          </div>
        `
      } else if (file.contentType.startsWith('image/')) {
        return `<img src="${file.url}" />`
      } else {
        return '<p>Unknown content type</p>'
      }
    },

    async getItem () {
      this.loading = true
      try {
        this.entry = await this.$contentful.getEntry(this.$route.params.id)
        useHead({ title: `${this.entry.fields.title} | ${useRuntimeConfig().public.appName}` })
      } catch (e) {
        throw showError({ statusCode: 404, statusMessage: 'Page Not Found' })
      }
      this.loading = false
    },
  },
}
</script>
