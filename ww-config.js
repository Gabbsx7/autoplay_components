module.exports = {
  tagName: "stack-cards",
  category: "Cards",
  description: "Stacked project cards with avatars, status badge, CTA button and dynamic filters (Figma‑like)",
  
  props: {
    /**
     * Array de objetos no formato:
     * {
     *   id: String|Number,
     *   title: String,
     *   description: String,
     *   status: "IN PROGRESS" | "DRAFT" | "PROPOSAL" | "COMPLETED" | String,
     *   avatars: [String], // URLs de avatar
     *   createdAt: String, // Data para ordenação (formato ISO ou compatível)
     *   date: String // Campo alternativo para data
     * }
     */
    list: {
      type: "Array",
      required: true,
      defaultValue: [],
      section: "Data",
    },

    /**
     * Espaçamento vertical entre os cards
     */
    gap: {
      type: "Number",
      defaultValue: 72,
      section: "Layout",
      options: {
        min: 30,
        max: 150,
        step: 10,
      },
    },

    // === CONFIGURAÇÕES DE FILTROS ===
    showFilters: {
      type: "OnOff",
      label: "Mostrar filtros",
      defaultValue: false,
      section: "Filters",
    },

    enableStatusFilter: {
      type: "OnOff",
      label: "Filtro por status",
      defaultValue: true,
      section: "Filters",
      bindable: false,
      hidden: (content) => !content.showFilters,
    },

    enableSearchFilter: {
      type: "OnOff",
      label: "Filtro de busca",
      defaultValue: true,
      section: "Filters",
      bindable: false,
      hidden: (content) => !content.showFilters,
    },

    enableLimitFilter: {
      type: "OnOff",
      label: "Limite de itens",
      defaultValue: true,
      section: "Filters",
      bindable: false,
      hidden: (content) => !content.showFilters,
    },

    enableSortFilter: {
      type: "OnOff",
      label: "Ordenação",
      defaultValue: true,
      section: "Filters",
      bindable: false,
      hidden: (content) => !content.showFilters,
    },

    enableClearButton: {
      type: "OnOff",
      label: "Botão limpar",
      defaultValue: true,
      section: "Filters",
      bindable: false,
      hidden: (content) => !content.showFilters,
    },

    showResultsCount: {
      type: "OnOff",
      label: "Contador de resultados",
      defaultValue: true,
      section: "Filters",
      bindable: false,
      hidden: (content) => !content.showFilters,
    },

    // === TEXTOS PERSONALIZÁVEIS ===
    statusFilterLabel: {
      type: "Text",
      label: "Label do filtro de status",
      defaultValue: "Status",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableStatusFilter,
    },

    searchFilterLabel: {
      type: "Text",
      label: "Label do filtro de busca",
      defaultValue: "Buscar",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableSearchFilter,
    },

    limitFilterLabel: {
      type: "Text",
      label: "Label do limite de itens",
      defaultValue: "Máximo de itens",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableLimitFilter,
    },

    sortFilterLabel: {
      type: "Text",
      label: "Label da ordenação",
      defaultValue: "Ordenar por",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableSortFilter,
    },

    searchPlaceholder: {
      type: "Text",
      label: "Placeholder da busca",
      defaultValue: "Digite o título ou descrição...",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableSearchFilter,
    },

    buttonText: {
      type: "Text",
      label: "Texto do botão",
      defaultValue: "View project",
      section: "Texts",
    },

    clearButtonText: {
      type: "Text",
      label: "Texto do botão limpar",
      defaultValue: "Limpar Filtros",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableClearButton,
    },

    allStatusText: {
      type: "Text",
      label: "Texto 'Todos' (status)",
      defaultValue: "Todos",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableStatusFilter,
    },

    allItemsText: {
      type: "Text",
      label: "Texto 'Todos' (itens)",
      defaultValue: "Todos",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableLimitFilter,
    },

    itemsText: {
      type: "Text",
      label: "Texto 'itens'",
      defaultValue: "itens",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableLimitFilter,
    },

    sortRecentText: {
      type: "Text",
      label: "Texto ordenação recente",
      defaultValue: "Mais recentes",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableSortFilter,
    },

    sortOldestText: {
      type: "Text",
      label: "Texto ordenação antiga",
      defaultValue: "Mais antigos",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableSortFilter,
    },

    sortTitleText: {
      type: "Text",
      label: "Texto ordenação título",
      defaultValue: "Título A-Z",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableSortFilter,
    },

    sortStatusText: {
      type: "Text",
      label: "Texto ordenação status",
      defaultValue: "Status",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.enableSortFilter,
    },

    resultsCountText: {
      type: "Text",
      label: "Texto contador (use {filtered} e {total})",
      defaultValue: "Exibindo {filtered} de {total} projetos",
      section: "Texts",
      hidden: (content) => !content.showFilters || !content.showResultsCount,
    },

    // === NAVEGAÇÃO ===
    navigationPage: {
      type: "Text",
      label: "Página de destino",
      defaultValue: "Project Details",
      section: "Navigation",
    },

    useQueryParams: {
      type: "OnOff",
      label: "Usar query params",
      defaultValue: true,
      section: "Navigation",
      bindable: false,
    },
  },

  // Seções do painel de propriedades
  sections: {
    Data: {
      label: "Dados",
      expanded: true,
    },
    Layout: {
      label: "Layout",
      expanded: true,
    },
    Filters: {
      label: "Filtros",
      expanded: false,
    },
    Texts: {
      label: "Textos",
      expanded: false,
    },
    Navigation: {
      label: "Navegação",
      expanded: false,
    },
  },
};