const hiCommon = {
  appName: 'इन्वेंटरी हब',
  nav: {
    products: 'उत्पाद',
    inventory: 'इन्वेंटरी',
  },
  header: {
    title: 'इन्वेंटरी प्रबंधन डैशबोर्ड',
    subtitle: 'उत्पाद और स्टॉक को रियल टाइम में मॉनिटर करें।',
  },
  language: {
    label: 'भाषा',
    english: 'अंग्रेज़ी',
    hindi: 'हिंदी',
    german: 'जर्मन',
    french: 'फ़्रेंच',
  },
  common: {
    search: 'खोजें...',
    save: 'सेव करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    cancel: 'रद्द करें',
    actions: 'क्रियाएं',
    loading: 'लोड हो रहा है...',
    previous: 'पिछला',
    next: 'अगला',
    errorPrefix: 'त्रुटि',
    noRecords: 'कोई रिकॉर्ड नहीं मिला।',
  },
  errorBoundary: {
    title: 'कुछ गलत हो गया।',
    message: 'कृपया पेज रिफ्रेश करें या बाद में पुनः प्रयास करें।',
  },
  products: {
    searchPlaceholder: 'नाम, SKU या श्रेणी से उत्पाद खोजें...',
    addProduct: 'उत्पाद जोड़ें',
    updateProduct: 'उत्पाद अपडेट करें',
    fields: {
      id: 'उत्पाद आईडी',
      name: 'उत्पाद नाम',
      sku: 'SKU',
      description: 'विवरण',
      category: 'श्रेणी',
      price: 'कीमत',
      status: 'स्थिति',
      createdDate: 'निर्माण तिथि',
    },
    status: {
      active: 'सक्रिय',
      inactive: 'निष्क्रिय',
    },
    emptyState: 'फिल्टर के अनुसार कोई उत्पाद नहीं मिला।',
    pageStatus: 'पेज {{page}} / {{total}}',
  },
  inventory: {
    searchPlaceholder: 'उत्पाद या लोकेशन से इन्वेंटरी खोजें...',
    note: 'किसी पंक्ति का मान बदलें और मात्रा समायोजित करने के लिए सेव करें।',
    fields: {
      id: 'इन्वेंटरी आईडी',
      productName: 'उत्पाद नाम',
      availableQuantity: 'उपलब्ध मात्रा',
      reservedQuantity: 'आरक्षित मात्रा',
      warehouseLocation: 'वेयरहाउस लोकेशन',
      lastUpdated: 'अंतिम अपडेट',
    },
    emptyState: 'फिल्टर के अनुसार कोई इन्वेंटरी रिकॉर्ड नहीं मिला।',
  },
};

export default hiCommon;
