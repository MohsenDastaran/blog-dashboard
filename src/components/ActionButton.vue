<template>
  <div class="card flex justify-center">
    <Button @click="toggle" iconPos="right"
      >...
      <div>
        <svg
          fill="#000000"
          height="200px"
          width="200px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 386.257 386.257"
          xml:space="preserve"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <polygon
              points="0,96.879 193.129,289.379 386.257,96.879 "
            ></polygon>
          </g>
        </svg>
      </div>
    </Button>
    <Popover ref="PopoverRef">
      <div class="flex flex-col gap-4">
        <div class="options">
          <Button @click="emit('edit')" variant="text"
            ><span>Edit</span></Button
          >
          <div class="seperator"></div>
          <Button @click="emit('delete')" variant="text"
            ><span>Delete</span></Button
          >
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup>
import { useTemplateRef } from "vue";

const emit = defineEmits(["edit", "delete"]);
const PopoverRef = useTemplateRef("PopoverRef");
const toggle = (event) => PopoverRef.value.toggle(event);
</script>
<style scoped>
svg {
  width: 10px;
  height: 10px;
  fill: #fff;
}
div.options {
  display: flex;
  flex-direction: column;
}
.options > Button {
  color: rgb(51, 65, 85);
  justify-content: flex-start;
  margin-right: 20px;
  margin: 5px 0;
}
.seperator {
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
}
.options > Button > span {
  margin-right: 7rem;
}
</style>
