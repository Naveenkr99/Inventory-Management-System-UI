const enCommon = {
  appName: 'Inventory Hub',
  nav: {
    products: 'Products',
    inventory: 'Inventory',
  },
  header: {
    title: 'Inventory Management Dashboard',
    subtitle: 'Monitor products and stock in real time.',
  },
  language: {
    label: 'Language',
    english: 'English',
    hindi: 'Hindi',
    german: 'German',
    french: 'French',
  },
  common: {
    search: 'Search...',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    actions: 'Actions',
    loading: 'Loading...',
    previous: 'Previous',
    next: 'Next',
    errorPrefix: 'Error',
    noRecords: 'No records found.',
  },
  errorBoundary: {
    title: 'Something went wrong.',
    message: 'Please refresh the page or try again later.',
  },
  products: {
    searchPlaceholder: 'Search products by name, SKU or category...',
    addProduct: 'Add Product',
    updateProduct: 'Update Product',
    fields: {
      id: 'Product ID',
      name: 'Product Name',
      sku: 'SKU',
      description: 'Description',
      category: 'Category',
      price: 'Price',
      status: 'Status',
      createdDate: 'Created Date',
    },
    status: {
      active: 'Active',
      inactive: 'Inactive',
    },
    emptyState: 'No products match current filters.',
    pageStatus: 'Page {{page}} of {{total}}',
  },
  inventory: {
    searchPlaceholder: 'Search inventory by product or location...',
    note: 'Update any row values and click Save to adjust inventory quantities.',
    fields: {
      id: 'Inventory ID',
      productName: 'Product Name',
      availableQuantity: 'Available Qty',
      reservedQuantity: 'Reserved Qty',
      warehouseLocation: 'Warehouse Location',
      lastUpdated: 'Last Updated',
    },
    emptyState: 'No inventory records match current filters.',
  },
};

export default enCommon;
