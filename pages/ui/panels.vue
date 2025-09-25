<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="pb-4 font-bold">
        Panels
      </div>
      <div class="flex max-w-xl flex-col items-start gap-4">
        <Panel class="w-full">
          <template #header>
            Panel header
          </template>
          Content
          <template #footer>
            Panel footer
          </template>
        </Panel>

        <Panel class="w-full">
          <template #header>
            Header only
          </template>
        </Panel>
        <Panel class="w-full">
          Content olny
        </Panel>
        <Panel class="w-full">
          <template #footer>
            Footer only
          </template>
        </Panel>
      </div>
    </div>

    <div>
      <div class="pb-4 font-bold">
        Cards
      </div>
      <div class="flex max-w-xl flex-col items-start gap-4">
        <Card class="w-full">
          <template #header>
            Panel header
          </template>
          Content
          <template #footer>
            Panel footer
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from '~/components/UI/Panel.vue'
import Card from '~/components/UI/Card.vue'

export default {
  components: { Card, Panel },

  data: () => ({

  }),
}
</script>
