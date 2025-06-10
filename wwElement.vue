<template>
  <div class="stack-cards-wrapper">
    <!-- Filtros (se habilitados) -->
    <div v-if="showFilters" class="filters-container">
      <div class="filters">
        <!-- Filtro por Status -->
        <div v-if="enableStatusFilter" class="filter-group">
          <label>{{ statusFilterLabel }}:</label>
          <select v-model="internalFilters.status">
            <option value="">{{ allStatusText }}</option>
            <option 
              v-for="status in availableStatuses" 
              :key="status"
              :value="status"
            >
              {{ formatStatusText(status) }}
            </option>
          </select>
        </div>

        <!-- Filtro de Busca -->
        <div v-if="enableSearchFilter" class="filter-group">
          <label>{{ searchFilterLabel }}:</label>
          <input 
            v-model="internalFilters.search" 
            type="text" 
            :placeholder="searchPlaceholder"
          />
        </div>

        <!-- Limite de itens -->
        <div v-if="enableLimitFilter" class="filter-group">
          <label>{{ limitFilterLabel }}:</label>
          <select v-model="internalFilters.maxItems">
            <option value="3">3 {{ itemsText }}</option>
            <option value="5">5 {{ itemsText }}</option>
            <option value="10">10 {{ itemsText }}</option>
            <option value="0">{{ allItemsText }}</option>
          </select>
        </div>

        <!-- Ordenação -->
        <div v-if="enableSortFilter" class="filter-group">
          <label>{{ sortFilterLabel }}:</label>
          <select v-model="internalFilters.sortBy">
            <option value="recent">{{ sortRecentText }}</option>
            <option value="oldest">{{ sortOldestText }}</option>
            <option value="title">{{ sortTitleText }}</option>
            <option value="status">{{ sortStatusText }}</option>
          </select>
        </div>

        <!-- Botão Limpar -->
        <button v-if="enableClearButton" @click="clearFilters" class="clear-btn">
          {{ clearButtonText }}
        </button>
      </div>

      <!-- Contador de resultados -->
      <div v-if="showResultsCount" class="results-info">
        {{ resultsCountText.replace('{filtered}', filteredList.length).replace('{total}', list.length) }}
      </div>
    </div>

    <!-- Stack Cards -->
    <div class="stack">
      <label
        class="stack-card"
        v-for="(item, index) in filteredList"
        :key="item.id || index"
        :class="{ selected: selected === index }"
        :style="cardStyle(index)"
        @click="selectCard(index)"
      >
        <input
          type="radio"
          name="card"
          hidden
          :checked="selected === index"
        />
        <div class="content">
          <!-- Header -->
          <div class="header">
            <div class="avatars">
              <span
                v-for="(avatar, aIndex) in item.avatars"
                :key="aIndex"
                class="avatar"
                :style="avatarStyle(avatar)"
              />
            </div>
            <span class="badge" :class="statusClass(item.status)">
              {{ item.status ? item.status.toUpperCase() : '' }}
            </span>
          </div>

          <!-- Body -->
          <h3 class="title">{{ item.title }}</h3>
          <p class="desc">{{ item.description }}</p>

          <!-- CTA -->
          <button class="btn" @click.stop="openProject(item.id)">
            {{ buttonText }} <span class="arrow">&gt;</span>
          </button>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Dados principais
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    gap: {
      type: Number,
      default: 72,
    },
    
    // Configurações de filtros
    showFilters: {
      type: Boolean,
      default: false,
    },
    enableStatusFilter: {
      type: Boolean,
      default: true,
    },
    enableSearchFilter: {
      type: Boolean,
      default: true,
    },
    enableLimitFilter: {
      type: Boolean,
      default: true,
    },
    enableSortFilter: {
      type: Boolean,
      default: true,
    },
    enableClearButton: {
      type: Boolean,
      default: true,
    },
    showResultsCount: {
      type: Boolean,
      default: true,
    },

    // Textos personalizáveis
    statusFilterLabel: {
      type: String,
      default: 'Status',
    },
    searchFilterLabel: {
      type: String,
      default: 'Buscar',
    },
    limitFilterLabel: {
      type: String,
      default: 'Máximo de itens',
    },
    sortFilterLabel: {
      type: String,
      default: 'Ordenar por',
    },
    searchPlaceholder: {
      type: String,
      default: 'Digite o título ou descrição...',
    },
    buttonText: {
      type: String,
      default: 'View project',
    },
    clearButtonText: {
      type: String,
      default: 'Limpar Filtros',
    },
    allStatusText: {
      type: String,
      default: 'Todos',
    },
    allItemsText: {
      type: String,
      default: 'Todos',
    },
    itemsText: {
      type: String,
      default: 'itens',
    },
    sortRecentText: {
      type: String,
      default: 'Mais recentes',
    },
    sortOldestText: {
      type: String,
      default: 'Mais antigos',
    },
    sortTitleText: {
      type: String,
      default: 'Título A-Z',
    },
    sortStatusText: {
      type: String,
      default: 'Status',
    },
    resultsCountText: {
      type: String,
      default: 'Exibindo {filtered} de {total} projetos',
    },

    // Configurações de navegação
    navigationPage: {
      type: String,
      default: 'Project Details',
    },
    useQueryParams: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selected: 0,
      internalFilters: {
        status: '',
        search: '',
        maxItems: 3,
        sortBy: 'recent'
      }
    };
  },
  computed: {
    availableStatuses() {
      const statuses = [...new Set(this.list.map(item => item.status).filter(Boolean))];
      return statuses.sort();
    },
    filteredList() {
      if (!this.showFilters) {
        return this.list;
      }

      let filtered = [...this.list];

      // Filtro por Status
      if (this.internalFilters.status && this.enableStatusFilter) {
        filtered = filtered.filter(project => 
          project.status === this.internalFilters.status
        );
      }

      // Filtro por Busca
      if (this.internalFilters.search && this.enableSearchFilter) {
        const searchTerm = this.internalFilters.search.toLowerCase();
        filtered = filtered.filter(project =>
          (project.title && project.title.toLowerCase().includes(searchTerm)) ||
          (project.description && project.description.toLowerCase().includes(searchTerm))
        );
      }

      // Ordenação
      if (this.enableSortFilter) {
        filtered = this.sortProjects(filtered);
      }

      // Limitar quantidade de itens
      if (this.enableLimitFilter && this.internalFilters.maxItems > 0) {
        filtered = filtered.slice(0, parseInt(this.internalFilters.maxItems));
      }

      return filtered;
    }
  },
  methods: {
    selectCard(i) {
      this.selected = i;
    },
    openProject(id) {
      // WeWeb navigation
      if (this.$weweb && this.$weweb.actions && this.$weweb.actions.navigate) {
        const navConfig = {
          page: this.navigationPage,
        };
        
        if (this.useQueryParams) {
          navConfig.queryParams = { id };
        }
        
        this.$weweb.actions.navigate(navConfig);
      } else {
        // Fallback para desenvolvimento
        window.location.href = `/project-details?id=${id}`;
      }
    },
    cardStyle(index) {
      return {
        top: `${index * this.gap}px`,
        zIndex: 100 - index,
      };
    },
    statusClass(status) {
      if (!status) return 'draft';
      
      const map = {
        "IN PROGRESS": "inprogress",
        "PROGRESS": "inprogress",
        "DRAFT": "draft",
        "PROPOSAL": "proposal",
        "COMPLETED": "completed",
      };
      return map[status.toUpperCase()] || "draft";
    },
    avatarStyle(url) {
      return {
        backgroundImage: `url(${url})`,
      };
    },
    sortProjects(projects) {
      const sorted = [...projects];
      
      switch (this.internalFilters.sortBy) {
        case 'recent':
          return sorted.sort((a, b) => {
            const dateA = new Date(a.createdAt || a.date || 0);
            const dateB = new Date(b.createdAt || b.date || 0);
            return dateB - dateA;
          });
        
        case 'oldest':
          return sorted.sort((a, b) => {
            const dateA = new Date(a.createdAt || a.date || 0);
            const dateB = new Date(b.createdAt || b.date || 0);
            return dateA - dateB;
          });
        
        case 'title':
          return sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        
        case 'status':
          return sorted.sort((a, b) => (a.status || '').localeCompare(b.status || ''));
        
        default:
          return sorted;
      }
    },
    clearFilters() {
      this.internalFilters = {
        status: '',
        search: '',
        maxItems: 3,
        sortBy: 'recent'
      };
    },
    formatStatusText(status) {
      // Formatar texto do status para exibição
      return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  },
  watch: {
    filteredList() {
      // Reset selected card when filters change
      this.selected = 0;
    }
  }
};
</script>

<style scoped>
/**** Wrapper ****/
.stack-cards-wrapper {
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/**** Filtros ****/
.filters-container {
  margin-bottom: 24px;
}

.filters {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 140px;
}

.filter-group label {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.filter-group select,
.filter-group input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
}

.filter-group input {
  min-width: 180px;
}

.clear-btn {
  background: #ff4757;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  height: fit-content;
  transition: background 0.2s ease;
}

.clear-btn:hover {
  background: #ff3838;
}

.results-info {
  background: #e3f2fd;
  color: #1976d2;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  font-size: 14px;
}

/**** Stack Cards ****/
.stack {
  position: relative;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding-bottom: 200px;
}

.stack-card,
.stack-card * {
  box-sizing: border-box;
}

.stack-card {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  cursor: pointer;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  border-radius: 16px;
  padding: 24px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04), inset 0 -4px 8px rgba(0, 0, 0, 0.02);
}

.stack-card.selected {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12);
  z-index: 200 !important;
}

/**** Header ****/
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.avatars {
  display: flex;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 2px solid #ffffff;
  margin-right: -6px;
}

.avatar:last-child {
  margin-right: 0;
}

.badge {
  padding: 4px 12px;
  border-radius: 14px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}

.draft {
  background: #e3f2fd;
  color: #1976d2;
}

.inprogress {
  background: #fff3e0;
  color: #f57c00;
}

.proposal {
  background: #fce4ec;
  color: #c2185b;
}

.completed {
  background: #e8f5e8;
  color: #2e7d2e;
}

/**** Body ****/
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

/**** Button ****/
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #000000;
  color: #ffffff;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  transition: background 0.2s ease;
  cursor: pointer;
}

.btn:hover {
  background: #333333;
}

.arrow {
  transition: transform 0.2s ease;
}

.btn:hover .arrow {
  transform: translateX(4px);
}

/**** Responsive ****/
@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    min-width: auto;
  }
  
  .filter-group input {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .stack-card {
    padding: 20px;
  }
  
  .filters {
    padding: 16px;
  }
}
</style>