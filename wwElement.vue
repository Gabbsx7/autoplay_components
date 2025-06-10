<template>
  <div class="stack">
    <label
      v-for="(item, index) in list"
      :key="item.id || index"
      class="stack-card"
      :class="{ selected: selected === index }"
      :style="cardStyle(index)"
      @click="selectCard(index)"
    >
      <input type="radio" name="card" hidden :checked="selected === index" />
      <div class="content">
        <div class="header">
          <div class="avatars">
            <span
              v-for="(avatar, aIdx) in item.avatars"
              :key="aIdx"
              class="avatar"
              :style="avatarStyle(avatar)"
            />
          </div>
          <span class="badge" :class="statusClass(item.status)">
            {{ item.status.toUpperCase() }}
          </span>
        </div>

        <h3 class="title">{{ item.title }}</h3>
        <p class="desc">{{ item.description }}</p>

        <button class="btn" @click.stop="openProject(item.id)">
          {{ buttonText }} <span class="arrow">→</span>
        </button>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    list: { type: Array, required: true },
    gap: { type: Number, default: 72 },
    navigationPage: { type: String, default: 'Project Details' },
    useQueryParams: { type: Boolean, default: true },
    buttonText: { type: String, default: 'View project' }
  },
  data() {
    return { selected: 0 };
  },
  methods: {
    selectCard(i) {
      this.selected = i;
    },
    openProject(id) {
      if (this.$weweb?.actions?.navigate) {
        this.$weweb.actions.navigate({
          page: this.navigationPage,
          queryParams: this.useQueryParams ? { id } : undefined
        });
      } else {
        // fallback local
        window.location.href = `/project-details?id=${id}`;
      }
    },
    cardStyle(idx) {
      const reversed = this.list.length - 1 - idx;
      return {
        top: `${reversed * this.gap}px`,
        zIndex: idx + 1
      };
    },
    statusClass(st) {
      const map = {
        'IN PROGRESS': 'inprogress',
        DRAFT: 'draft',
        PROPOSAL: 'proposal',
        COMPLETED: 'completed'
      };
      return map[st?.toUpperCase()] || 'draft';
    },
    avatarStyle(url) {
      return { backgroundImage: `url(${url})` };
    }
  }
};
</script>

<style scoped>
/* Wrapper */
.stack {
  position: relative;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding-bottom: 200px;
}
.stack * {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
/* Card */
.stack-card {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  cursor: pointer;
  background: linear-gradient(180deg, #fff 0%, #fafafa 100%);
  border-radius: 16px;
  padding: 24px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04), inset 0 -4px 8px rgba(0, 0, 0, 0.02);
}
.stack-card.selected {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12);
  z-index: 999 !important;
}
/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.avatars { display: flex; }
.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 2px solid #fff;
  margin-right: -6px;
}
.avatar:last-child { margin-right: 0; }
.badge {
  padding: 4px 12px;
  border-radius: 14px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}
.draft { background: #e3f2fd; color: #1976d2; }
.inprogress { background: #fff3e0; color: #f57c00; }
.proposal { background: #fce4ec; color: #c2185b; }
.completed { background: #e8f5e9; color: #388e3c; }
/* Body */
.title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
  color: #222;
  line-height: 1.3;
}
.desc {
  margin: 0 0 24px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  max-height: 48px;
  overflow: hidden;
}
/* Button */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s ease;
}
.btn:hover { background: #333; }
.arrow { transition: transform 0.2s ease; }
.btn:hover .arrow { transform: translateX(4px); }
</style>
