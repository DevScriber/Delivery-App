import './js/modal';

import { setupSearchClient } from './js/search-client.js';
import { setupAddClient } from './js/add-client.js';
import { setupEditForm } from './js/clientEditor.js';
import { setupClientsList } from './js/clientsList.js';

document.addEventListener('DOMContentLoaded', () => {
  setupAddClient();
  setupSearchClient();
  setupEditForm();
  setupClientsList();
});
