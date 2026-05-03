const frCommon = {
  appName: 'Inventaire Hub',
  nav: {
    products: 'Produits',
    inventory: 'Stock',
  },
  header: {
    title: "Tableau de bord de gestion d'inventaire",
    subtitle: 'Surveillez les produits et le stock en temps reel.',
  },
  language: {
    label: 'Langue',
    english: 'Anglais',
    hindi: 'Hindi',
    german: 'Allemand',
    french: 'Francais',
  },
  common: {
    search: 'Rechercher...',
    save: 'Enregistrer',
    edit: 'Modifier',
    delete: 'Supprimer',
    cancel: 'Annuler',
    actions: 'Actions',
    loading: 'Chargement...',
    previous: 'Precedent',
    next: 'Suivant',
    errorPrefix: 'Erreur',
    noRecords: 'Aucun enregistrement trouve.',
  },
  errorBoundary: {
    title: "Une erreur s'est produite.",
    message: 'Veuillez actualiser la page ou reessayer plus tard.',
  },
  products: {
    searchPlaceholder: 'Rechercher des produits par nom, SKU ou categorie...',
    addProduct: 'Ajouter un produit',
    updateProduct: 'Mettre a jour le produit',
    fields: {
      id: 'ID produit',
      name: 'Nom du produit',
      sku: 'SKU',
      description: 'Description',
      category: 'Categorie',
      price: 'Prix',
      status: 'Statut',
      createdDate: 'Date de creation',
    },
    status: {
      active: 'Actif',
      inactive: 'Inactif',
    },
    emptyState: 'Aucun produit ne correspond aux filtres actuels.',
    pageStatus: 'Page {{page}} sur {{total}}',
  },
  inventory: {
    searchPlaceholder: 'Rechercher le stock par produit ou emplacement...',
    note: 'Mettez a jour les valeurs de ligne et cliquez sur Enregistrer pour ajuster le stock.',
    fields: {
      id: 'ID stock',
      productName: 'Nom du produit',
      availableQuantity: 'Quantite disponible',
      reservedQuantity: 'Quantite reservee',
      warehouseLocation: 'Emplacement entrepot',
      lastUpdated: 'Derniere mise a jour',
    },
    emptyState: "Aucun enregistrement de stock ne correspond aux filtres actuels.",
  },
};

export default frCommon;
