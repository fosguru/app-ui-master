<template>
  <Layout :crumbs="[{ label: 'Settings', to: '/settings' }, { label: 'Personal Settings' }]">
    <div class="mb-4 flex items-center justify-between">
      <div class="mb-4 text-xl font-semibold leading-loose text-stone-900 dark:text-stone-300">
        Personal Settings
      </div>
    </div>
    <Panel>
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="flex items-center">
          <img class="mx-auto mb-4 size-24 rounded-full" src="~/assets/images/user.svg">
        </div>
        <div>
          <InputGroup v-model="form.first_name" label="First Name" class="mb-4" :errors="errors.first_name" @blur="submit" />
          <InputGroup v-model="form.last_name" label="Last Name" class="mb-4" :errors="errors.first_name" @blur="submit" />
          <InputGroup :model-value="user.email" label="Email" disabled class="mb-4" />
          <InputGroup label="Permission" :model-value="organization.user_role" disabled class="mb-4" />
          <InputGroup
            :model-value="form.appearance"
            label="Appearance"
            type="select"
            :options="{ SYSTEM: 'Automatic (system)', DARK: 'Dark', LIGHT: 'Light' }"
            :errors="errors.appearance"
            class="mb-4"
            @update:model-value="v => (form.appearance = v, submit())"
          />
        </div>
      </div>
    </Panel>
  </Layout>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import Layout from '~/components/Layout/Layout.vue'
import Panel from '~/components/UI/Panel.vue'
import InputGroup from '~/components/UI/InputGroup.vue'
import { useAuthStore } from '~/stores/auth'
import { useHead, useRuntimeConfig } from '#imports'
import { useOrganizationsStore } from '~/stores/organization'

export default {
  components: { InputGroup, Panel, Layout },

  setup () {
    useHead({
      title: `Personal Info | ${useRuntimeConfig().public.appName}`,
    })
  },

  data: () => ({
    form: {
      first_name: '',
      last_name: '',
      appearance: 'SYSTEM',
    },

    errors: {},
  }),

  computed: {
    ...mapState(useAuthStore, ['user', 'updating']),
    ...mapState(useOrganizationsStore, ['organization']),

    baseForm () {
      return pick(this.user, Object.keys(this.form))
    },

    formChanged () {
      return ! isEqual(this.baseForm, this.form)
    },
  },

  mounted () {
    this.resetForm()
  },

  methods: {
    ...mapActions(useAuthStore, ['updateUser']),

    resetForm () {
      this.form = this.baseForm
    },

    async submit () {
      if (! this.formChanged) { return }
      this.errors = {}

      try {
        await this.updateUser(this.form)
        this.$notify({
          title: 'Success',
          text: 'Data was saved successfully.',
          type: 'info',
        })
      } catch (e) {
        if (e?.response?.status === 400) {
          this.errors = e?.response?._data
        } else { throw e }
      }
    },
  },
}
</script>
