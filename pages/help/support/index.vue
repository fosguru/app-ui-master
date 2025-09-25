<template>
  <Layout :crumbs="[{ label: 'Help', to: '/help' }, { label: 'Contact Support' }]">
    <div class="mb-4 text-xl font-semibold leading-loose text-stone-900 lg:hidden">
      Help
    </div>
    <Panel class="mx-auto max-w-4xl">
      <h2 class="mb-6 mt-2 text-4xl">
        Contact Support
      </h2>
      <p class="pb-8">
        Please let us know how we can help, with as much detail as possible. Attach a screenshot if that may help. Thanks!
      </p>
      <VeeForm
        v-slot="{ meta: { valid } }"
        method="POST"
        action="https://webhook.frontapp.com/forms/b9c7d8ae153bb9e5c847/riad0sPDpBGZ5MdPj_AH3VJIIsa4PupWM-9WvNxyL3asgZpwbAEYYyt0nrKVVqp1adYGEL5KSvyzjqaWNHP9ZqnZFYIDy2PGVx0qcFuqY8zyQKUD3uzfuWIZorXTKQ"
        enctype="multipart/form-data"
        accept-charset="utf-8"
      >
        <input type="hidden" name="email" :value="user.email">
        <Field v-slot="{ errors, field }" v-model="input" name="Message" rules="required">
          <InputGroup
            v-bind="field"
            v-model="input"
            type="textarea"
            name="body"
            placeholder="Tell us how we can help..."
            class="mb-6 w-full"
            :errors="errors"
          />
        </Field>
        <FileDragNDrop v-model="file" name="attachment" />

        <div class="pt-10 text-center">
          <Btn :loading="loading" type="submit" :disabled="!valid" @click="loading = true">
            Submit Request
          </Btn>
        </div>
      </VeeForm>
    </Panel>
  </Layout>
</template>

<script>
import { mapState } from 'pinia'
import { Field, Form } from 'vee-validate'
import Layout from '~/components/Layout/Layout.vue'
import Panel from '~/components/UI/Panel.vue'
import Btn from '~/components/UI/Btn.vue'
import InputGroup from '~/components/UI/InputGroup.vue'
import FileDragNDrop from '~/components/UI/FileDragNDrop.vue'
import { useHead, useRuntimeConfig } from '#imports'
import { useAuthStore } from '~/stores/auth'

export default {
  // eslint-disable-next-line vue/match-component-import-name
  components: { VeeForm: Form, Field, Panel, Layout, InputGroup, FileDragNDrop, Btn },

  setup () {
    useHead({
      title: `Help | ${useRuntimeConfig().public.appName}`,
    })
  },

  data: () => ({
    loading: false,
    input: '',
    file: null,
  }),

  computed: {
    ...mapState(useAuthStore, ['user']),
  },
}
</script>
