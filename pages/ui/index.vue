<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="pb-4 font-bold">
        Buttons default
      </div>
      <div class="flex items-center gap-4">
        <Btn size="xs">
          Size xs
        </Btn>
        <Btn size="sm">
          Size sm
        </Btn>
        <Btn size="md">
          Size md
        </Btn>
        <Btn size="lg">
          Size lg
        </Btn>
        <Btn size="xl">
          Size xl
        </Btn>
        <Btn loading>
          Loading
        </Btn>
        <Btn disabled>
          Disabled
        </Btn>
        <Btn size="icon-md">
          <DotsVerticalIcon class="-mx-1 h-6 w-4" />
        </Btn>
      </div>
    </div>

    <div>
      <div class="pb-4 font-bold">
        Buttons white
      </div>
      <div class="flex items-center gap-4">
        <Btn color="white" size="xs">
          Size xs
        </Btn>
        <Btn color="white" size="sm">
          Size sm
        </Btn>
        <Btn color="white" size="md">
          Size md
        </Btn>
        <Btn color="white" size="lg">
          Size lg
        </Btn>
        <Btn color="white" size="xl">
          Size xl
        </Btn>
        <Btn color="white" loading>
          Loading
        </Btn>
        <Btn color="white" disabled>
          Disabled
        </Btn>
        <Btn color="white" size="icon-md">
          <DotsVerticalIcon class="-mx-1 h-6 w-4" />
        </Btn>
      </div>
    </div>

    <div>
      <div class="pb-4 font-bold">
        Buttons gray
      </div>
      <div class="flex items-center gap-4">
        <Btn color="gray" size="xs">
          Size xs
        </Btn>
        <Btn color="gray" size="sm">
          Size sm
        </Btn>
        <Btn color="gray" size="md">
          Size md
        </Btn>
        <Btn color="gray" size="lg">
          Size lg
        </Btn>
        <Btn color="gray" size="xl">
          Size xl
        </Btn>
        <Btn color="gray" loading>
          Loading
        </Btn>
        <Btn color="gray" disabled>
          Disabled
        </Btn>
        <Btn color="gray" size="icon-md">
          <DotsVerticalIcon class="-mx-1 h-6 w-4" />
        </Btn>
      </div>
    </div>

    <div>
      <div class="pb-4 font-bold">
        Buttons transparent
      </div>
      <div class="flex items-center gap-4">
        <Btn color="transparent" size="xs">
          Size xs
        </Btn>
        <Btn color="transparent" size="sm">
          Size sm
        </Btn>
        <Btn color="transparent" size="md">
          Size md
        </Btn>
        <Btn color="transparent" size="lg">
          Size lg
        </Btn>
        <Btn color="transparent" size="xl">
          Size xl
        </Btn>
        <Btn color="transparent" loading>
          Loading
        </Btn>
        <Btn color="transparent" disabled>
          Disabled
        </Btn>
        <Btn color="transparent" size="icon-md">
          <DotsVerticalIcon class="-mx-1 h-6 w-4" />
        </Btn>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '~/components/UI/Btn'
import DotsVerticalIcon from '~/components/Icons/DotsVerticalIcon.vue'

export default {
  components: { DotsVerticalIcon, Btn },
}
</script>
