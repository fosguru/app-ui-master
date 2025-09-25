<template>
  <Layout :crumbs="[{ label: 'Settings', to: '/settings' }, { label: 'Security Review' }]">
    <div class="mb-4 flex items-center justify-between">
      <div class="mb-4 text-xl font-semibold leading-loose text-stone-900 dark:text-stone-300">
        Security Review
      </div>
    </div>
    <Panel>
      <div>
        <p>To make the security review process as easy as possible, please share a copy of our CAIQ-Lite security document with your security team.</p>
        <div class="mt-10">
          <Btn href="/downloads/datachef-caiq-lite.pdf">
            Download PDF
          </Btn> <Btn href="/downloads/datachef-caiq-lite.xlsx">
            Download Excel
          </Btn>
        </div>
      </div>
    </Panel>
  </Layout>
</template>

<script>
import { mapState } from 'pinia'
import Layout from '~/components/Layout/Layout.vue'
import Panel from '~/components/UI/Panel.vue'
import Btn from '~/components/UI/Btn.vue'
import { useOrganizationsStore } from '~/stores/organization'
import { useHead, useRuntimeConfig } from '#imports'

export default {
  components: { Btn, Panel, Layout },

  setup () {
    useHead({
      title: `Security Review | ${useRuntimeConfig().public.appName}`,
    })
  },

  computed: {
    ...mapState(useOrganizationsStore, ['organization']),
  },
}
</script>
