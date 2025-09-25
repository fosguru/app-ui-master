<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="py-6 font-bold">
        Default inputs
      </div>
      <InputGroup model-value="No label" class="mb-6" />
      <div class="flex flex-wrap items-start gap-4">
        <InputGroup placeholder="Placeholder" label="Default" />
        <InputGroup placeholder="Placeholder" label="Optional" optional />
        <InputGroup placeholder="Placeholder" label="Tooltip" help-tooltip="Help tooltip" />
        <InputGroup placeholder="Placeholder" label="Optional" optional help-tooltip="Help tooltip" />
        <InputGroup placeholder="Placeholder" label="Disabled" disabled />
        <InputGroup placeholder="Placeholder" label="Error" error="Error message" />
        <InputGroup placeholder="Placeholder" label="Loading" type="input" loading model-value="Some long text Some long text " />
        <InputGroup placeholder="Placeholder" label="Loading disabled" type="input" loading disabled />
      </div>
    </div>

    <div>
      <div class="py-6 font-bold">
        Slots examples
      </div>
      <div class="flex flex-wrap items-start gap-4">
        <InputGroup placeholder="Placeholder" label="Prepend">
          <template #prepend>
            <CheckIcon class="size-4 text-green-900" />
          </template>
        </InputGroup>
        <InputGroup placeholder="Placeholder" label="Append">
          <template #append>
            <TruckIcon class="size-4 text-green-900" />
          </template>
        </InputGroup>
        <InputGroup placeholder="Placeholder" label="Both">
          <template #prepend>
            <TruckIcon class="size-4 text-green-900" />
          </template>
          <template #append>
            km
          </template>
        </InputGroup>
        <InputGroup placeholder="Placeholder" label="Both loading" loading>
          <template #prepend>
            <TruckIcon class="size-4 text-green-900" />
          </template>
          <template #append>
            km
          </template>
        </InputGroup>
        <div class="flex flex-wrap items-start gap-4">
          <InputGroup placeholder="Placeholder">
            <template #label>
              <CheckIcon class="size-4 text-green-900" />
              <TruckIcon class="size-4 text-green-900" />
              Custom label
            </template>
          </InputGroup>
        </div>
      </div>
    </div>

    <div>
      <div class="py-6 font-bold">
        Amount inputs
      </div>
      <div class="flex flex-wrap items-start gap-4">
        <PriceInputGroup placeholder="Placeholder" label="Price input group" />
      </div>
    </div>

    <div>
      <div class="py-6 font-bold">
        Textarea
      </div>
      <div class="flex flex-wrap items-start gap-4">
        <InputGroup placeholder="Placeholder" label="Textarea" type="textarea" />
        <InputGroup v-model="textarea" placeholder="Placeholder" label="Textarea w counter" type="textarea" show-counter />
        <InputGroup placeholder="Placeholder" label="Optional" type="textarea" optional />
        <InputGroup placeholder="Placeholder" label="Disabled" type="textarea" disabled />
        <InputGroup placeholder="Placeholder" label="Loading" type="textarea" loading />
        <InputGroup placeholder="Placeholder" label="Error" type="textarea" error="Error message" />
      </div>
    </div>

    <div>
      <div class="py-6 font-bold">
        Textarea
      </div>
      <div class="flex flex-wrap items-start gap-4">
        <InputGroup placeholder="Placeholder" label="Textarea" type="textarea" />
        <InputGroup v-model="textarea" placeholder="Placeholder" label="Textarea w counter" type="textarea" show-counter />
        <InputGroup placeholder="Placeholder" label="Optional" type="textarea" optional />
        <InputGroup placeholder="Placeholder" label="Disabled" type="textarea" disabled />
        <InputGroup placeholder="Placeholder" label="Loading" type="textarea" loading />
        <InputGroup placeholder="Placeholder" label="Error" type="textarea" error="Error message" />
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from '~/components/UI/InputGroup'
import PriceInputGroup from '~/components/UI/PriceInputGroup.vue'
import CheckIcon from '~/components/Icons/CheckIcon.vue'
import TruckIcon from '~/components/Icons/TruckIcon.vue'

export default {
  components: { TruckIcon, CheckIcon, PriceInputGroup, InputGroup },

  data: () => ({
    textarea: 'Text',
  }),
}
</script>
