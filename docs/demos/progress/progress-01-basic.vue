<template>
  <div>
    <c-progress :percent="30" />
    <c-progress :percent="50" status="active" />
    <c-progress :percent="70" status="exception" />
    <c-progress :percent="100" />
    <c-progress :percent="50" :show-info="false" />
  </div>
</template> 