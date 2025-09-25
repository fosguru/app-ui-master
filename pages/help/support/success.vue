<template>
  <Layout :crumbs="[{ label: 'Help', to: '/help' }, { label: 'Contact Support' }]">
    <div class="mb-4 text-xl font-semibold leading-loose text-stone-900 lg:hidden">
      Help
    </div>
    <Panel class="mx-auto max-w-4xl">
      <h2 class="mb-6 mt-2 text-4xl">
        Got it!
      </h2>
      <p class="pb-8">
        We've received your request. Someone from our team will get back to you as soon as possible.
      </p>
      <p>
        <Btn size="sm" color="white" to="/help" class="mr-2">
          Return to Help
        </Btn>
        <Btn size="sm" color="white" to="/">
          Go to Dashboard
        </Btn>
      </p>
    </Panel>
  </Layout>
</template>

<script>
import Layout from '~/components/Layout/Layout.vue'
import Panel from '~/components/UI/Panel.vue'
import Btn from '~/components/UI/Btn.vue'
import { useHead, useRuntimeConfig } from '#imports'

export default {
  components: { Panel, Layout, Btn },

  setup () {
    useHead({
      title: `Success | ${useRuntimeConfig().public.appName}`,
    })
  },
}
</script>
