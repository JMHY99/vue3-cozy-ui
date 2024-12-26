<template>
  <div>
    <c-progress :percent="50" status="active" />
    <c-progress :percent="70" status="exception" />
    <c-progress :percent="100" status="success" />
    <c-progress :percent="50" :stroke-color="'#f60'" />
  </div>
</template> 