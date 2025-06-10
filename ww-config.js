export default {
  // Configuração de como o componente aparece no editor WeWeb
  editor: {
    label: { en: 'Stack Cards' },
    icon: 'layers'
  },

  // Tag usada no HTML após importar o componente
  tagName: 'stack-cards',
  category: 'Cards',
  description: 'Stacked project cards with avatars, status badge, CTA button and dynamic filters (Figma‑like)',

  /* --------------------------------------------------
   * PROPRIEDADES EXPONÍVEIS NO EDITOR
   * -------------------------------------------------- */
  props: {
    /**
     * Lista de projetos
     */
    list: {
      type: 'Array',
      required: true,
      defaultValue: [],
      section: 'Data',
      /* wwEditor:start */
      bindingValidation: {
        type: 'array',
        tooltip: 'Array de objetos de projeto (id, title, description, status, avatars, createdAt)'
      }
      /* wwEditor:end */
    },

    /** Espaçamento vertical entre os cards */
    gap: {
      type: 'Number',
      defaultValue: 72,
      section: 'Layout',
      options: { min: 30, max: 150, step: 2 }
    },

    /* --- Navegação --- */
    navigationPage: {
      type: 'Text',
      label: { en: 'Destination page' },
      defaultValue: 'Project Details',
      section: 'Navigation'
    },
    useQueryParams: {
      type: 'OnOff',
      label: { en: 'Use query params' },
      defaultValue: true,
      section: 'Navigation'
    },

    /* --- Textos --- */
    buttonText: {
      type: 'Text',
      defaultValue: 'View project',
      section: 'Texts'
    }
  },

  /* --------------------------------------------------
   * Seções do painel
   * -------------------------------------------------- */
  sections: {
    Data: { label: 'Data', expanded: true },
    Layout: { label: 'Layout', expanded: true },
    Navigation: { label: 'Navigation', expanded: false },
    Texts: { label: 'Texts', expanded: false }
  }
};
