<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="py-6 font-bold">
        Default dropdown
      </div>
      <div class="flex flex-wrap items-start gap-4">
        <Dropdown>
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Default
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown placement="top-start">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Top start
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown placement="top-center">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Top center
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown placement="top-end">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Top end
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown placement="right-start">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Right start
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown placement="right-center">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Right center
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown placement="right-end">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Right end
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown placement="left-start">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Left start
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown placement="left-center">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Left center
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown placement="left-end">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Left end
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown placement="bottom-start">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Bottom start
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown placement="bottom-center">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Bottom center
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown placement="bottom-end">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Bottom end
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown :hide-on-click-outside="false">
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Don't hide on click outside
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
        <Dropdown fit-btn-width>
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Fit larger button width if needed
            </Btn>
          </template>
          <div class="p-4">
            Something
          </div>
        </Dropdown>
      </div>
    </div>

    <div>
      <div class="py-6 font-bold">
        Dropdown menu
      </div>
      <div class="flex flex-wrap items-start gap-4">
        <Dropdown>
          <template #button="{ toggle }">
            <Btn @click="toggle">
              Dropdown menu
            </Btn>
          </template>
          <DropdownMenuItem>
            Item 1
          </DropdownMenuItem>
          <DropdownMenuItem>
            Item 2
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            Disabled
          </DropdownMenuItem>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '~/components/UI/Dropdown.vue'
import Btn from '~/components/UI/Btn.vue'
import DropdownMenuItem from '~/components/UI/DropdownMenuItem.vue'

export default {
  components: { DropdownMenuItem, Btn, Dropdown },
}
</script>
