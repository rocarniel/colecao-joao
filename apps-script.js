// ═══════════════════════════════════════════════════════════════
//  GOOGLE APPS SCRIPT — JP Garage  (v2)
//  Cole este código em: script.google.com → mesmo projeto
//  Implante uma NOVA versão após colar
// ═══════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    ensureColumns(sheet);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    if (data.action === 'delete') {
      const uidCol = headers.indexOf('uid') + 1;
      const rows   = sheet.getDataRange().getValues();
      for (let i = 1; i < rows.length; i++) {
        if (String(rows[i][uidCol - 1]) === String(data.uid)) {
          sheet.deleteRow(i + 1);
          break;
        }
      }

    } else if (data.action === 'update') {
      const uidCol = headers.indexOf('uid') + 1;
      const rows   = sheet.getDataRange().getValues();
      for (let i = 1; i < rows.length; i++) {
        if (String(rows[i][uidCol - 1]) === String(data.uid)) {
          const r   = i + 1;
          const set = (col, val) => sheet.getRange(r, headers.indexOf(col) + 1).setValue(val || '');
          set('marca_comercial', data.marca_comercial);
          set('marca_carro',     data.marca_carro);
          set('modelo',          data.modelo);
          set('cor',             data.cor);
          set('foto_carroceria', data.foto_carroceria);
          set('foto_fundo',      data.foto_fundo);
          set('status',          data.status || 'tem');
          break;
        }
      }

    } else {
      const uid = data.uid || String(Date.now());
      const map = {
        data_adicao:     new Date().toLocaleDateString('pt-BR'),
        marca_comercial: data.marca_comercial || '',
        marca_carro:     data.marca_carro     || '',
        modelo:          data.modelo          || '',
        cor:             data.cor             || '',
        foto_carroceria: data.foto_carroceria || '',
        foto_fundo:      data.foto_fundo      || '',
        uid:             uid,
        status:          data.status          || 'tem'
      };
      sheet.appendRow(headers.map(h => map[h] !== undefined ? map[h] : ''));
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, erro: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function ensureColumns(sheet) {
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const lastRow = sheet.getLastRow();

  if (!headers.includes('uid')) {
    const col = headers.length + 1;
    sheet.getRange(1, col).setValue('uid');
    for (let i = 2; i <= lastRow; i++) {
      sheet.getRange(i, col).setValue('uid_legacy_' + i);
    }
    headers.push('uid');
  }

  if (!headers.includes('status')) {
    const col = headers.length + 1;
    sheet.getRange(1, col).setValue('status');
    for (let i = 2; i <= lastRow; i++) {
      sheet.getRange(i, col).setValue('tem');
    }
    headers.push('status');
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'online', app: 'JP Garage v2' }))
    .setMimeType(ContentService.MimeType.JSON);
}
