<template>
  <div class="mb-4 flex items-center justify-between">
    <div class="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
      <div class="flex items-center gap-4">
        <div class="text-xl font-semibold leading-loose text-stone-900 dark:text-stone-300">
          {{ recipe?.label }}
        </div>
        <!-- <div v-if="historyItem" class="text-sm font-bold text-red-500">
          Viewing version from {{ $f.date(historyItem.last_updated, 'M/D/YY') }} saved by {{ historyItem.changed_by }}
        </div> -->
        <div class="text-sm text-stone-500 dark:text-stone-400">
          Last updated {{ $f.date(recipe.last_updated, 'M/D/YY') }}
        </div>
      </div>
      <!-- <div class="flex items-center gap-4">
        <Btn color="white" size="xs" @click="showHistoryModal = true">
          <PhClockCounterClockwise class="size-4" />
          Version History
        </Btn>
        <Btn v-if="historyItem" size="xs" @click="$emit('clearHistory')">
          <PhArrowUUpLeft class="size-4" />
          Return to the current version
        </Btn>
      </div> -->
    </div>
    <div v-if="formChanged && !historyItem" class="flex items-center gap-2">
      <Btn color="white" :disabled="!permissions.update" @click="$emit('cancel')">
        Cancel changes
      </Btn>
      <Btn :loading="updating" :disabled="!permissions.update" :title="noPermissionMessage" @click="$emit('submit')">
        Save changes
      </Btn>
    </div>
    <RecipeHistoryModal v-model="showHistoryModal" :recipe="recipe" />
  </div>
</template>

<script>
import { PhArrowUUpLeft, PhClockCounterClockwise } from '@phosphor-icons/vue'
import Btn from '~/components/UI/Btn.vue'
import RecipeHistoryModal from '~/components/RecipeHistory/RecipeHistoryModal.vue'

export default {
  components: { PhArrowUUpLeft, RecipeHistoryModal, PhClockCounterClockwise, Btn },

  props: {
    recipe: { type: Object, required: true },
    permissions: { type: Object, required: true },
    historyItem: { type: Object, default: null },
    noPermissionMessage: { type: String, required: true },
    formChanged: Boolean,
    updating: Boolean,
  },

  emits: ['submit', 'cancel', 'clearHistory'],

  data: () => ({
    showHistoryModal: false,
  }),
}
</script>
