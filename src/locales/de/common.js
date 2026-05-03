const deCommon = {
  appName: 'Inventar Hub',
  nav: {
    products: 'Produkte',
    inventory: 'Bestand',
  },
  header: {
    title: 'Inventarverwaltungs-Dashboard',
    subtitle: 'Produkte und Bestand in Echtzeit ueberwachen.',
  },
  language: {
    label: 'Sprache',
    english: 'Englisch',
    hindi: 'Hindi',
    german: 'Deutsch',
    french: 'Franzoesisch',
  },
  common: {
    search: 'Suchen...',
    save: 'Speichern',
    edit: 'Bearbeiten',
    delete: 'Loeschen',
    cancel: 'Abbrechen',
    actions: 'Aktionen',
    loading: 'Wird geladen...',
    previous: 'Zurueck',
    next: 'Weiter',
    errorPrefix: 'Fehler',
    noRecords: 'Keine Eintraege gefunden.',
  },
  errorBoundary: {
    title: 'Etwas ist schiefgelaufen.',
    message: 'Bitte Seite aktualisieren oder spaeter erneut versuchen.',
  },
  products: {
    searchPlaceholder: 'Produkte nach Name, SKU oder Kategorie suchen...',
    addProduct: 'Produkt hinzufuegen',
    updateProduct: 'Produkt aktualisieren',
    fields: {
      id: 'Produkt-ID',
      name: 'Produktname',
      sku: 'SKU',
      description: 'Beschreibung',
      category: 'Kategorie',
      price: 'Preis',
      status: 'Status',
      createdDate: 'Erstellungsdatum',
    },
    status: {
      active: 'Aktiv',
      inactive: 'Inaktiv',
    },
    emptyState: 'Keine Produkte passend zu den aktuellen Filtern.',
    pageStatus: 'Seite {{page}} von {{total}}',
  },
  inventory: {
    searchPlaceholder: 'Bestand nach Produkt oder Lagerort suchen...',
    note: 'Zeilenwerte aktualisieren und auf Speichern klicken, um Bestand anzupassen.',
    fields: {
      id: 'Bestands-ID',
      productName: 'Produktname',
      availableQuantity: 'Verfuegbare Menge',
      reservedQuantity: 'Reservierte Menge',
      warehouseLocation: 'Lagerort',
      lastUpdated: 'Zuletzt aktualisiert',
    },
    emptyState: 'Keine Bestandsdaten passend zu den aktuellen Filtern.',
  },
};

export default deCommon;
