<template>
  <div style="width: 100%; height: 100%; background-color: #F6F6F6; display: flex; justify-content: center;">
    <div style="width: 80%; background-color: white;">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ForumBorder'
  }
</script>