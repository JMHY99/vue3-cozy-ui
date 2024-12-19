<template>
  <div class="demo-badge">
    <div class="badge-status-list">
      <c-badge status="success" />
      <span>Success</span>
    </div>
    <div class="badge-status-list">
      <c-badge status="error" />
      <span>Error</span>
    </div>
    <div class="badge-status-list">
      <c-badge status="default" />
      <span>Default</span>
    </div>
    <div class="badge-status-list">
      <c-badge status="processing" />
      <span>Processing</span>
    </div>
    <div class="badge-status-list">
      <c-badge status="warning" />
      <span>Warning</span>
    </div>
    <br />
    <div class="badge-status-list">
      <c-badge status="success" text="Success" />
    </div>
    <div class="badge-status-list">
      <c-badge status="error" text="Error" />
    </div>
    <div class="badge-status-list">
      <c-badge status="default" text="Default" />
    </div>
    <div class="badge-status-list">
      <c-badge status="processing" text="Processing" />
    </div>
    <div class="badge-status-list">
      <c-badge status="warning" text="Warning" />
    </div>
  </div>
</template>

<style scoped>
.demo-badge {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.badge-status-list {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 24px;
}
</style>
