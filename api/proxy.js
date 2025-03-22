const fetch = require('node-fetch');

// URL de tu Google Apps Script
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw5BpjSO7huY3uscaiMgBtfJliGakrIc5VIY3rHlWnfvWHhmtfZukvJaKgh_Gn82ACx/exec';

module.exports = async (req, res) => {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar solicitudes OPTIONS (necesarias para CORS)
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  try {
    // Determinar la URL y el método
    const url = req.query.action === 'getUsers'
      ? `${GOOGLE_APPS_SCRIPT_URL}?action=getUsers`
      : GOOGLE_APPS_SCRIPT_URL;

    const options = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (req.method === 'POST') {
      options.body = JSON.stringify(req.body);
    }

    // Reenviar la solicitud a Google Apps Script
    const response = await fetch(url, options);
    const data = await response.json();

    // Enviar la respuesta al cliente
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
