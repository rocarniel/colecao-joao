# Guia de Configuração — Coleção do João

Siga esta ordem. Cada etapa gera uma informação que a próxima precisa.

---

## ETAPA 1 — Google Sheets (banco de dados)

1. Acesse **sheets.google.com** e crie uma planilha nova
2. Na **primeira linha**, escreva exatamente estes cabeçalhos (um por coluna):

   | A | B | C | D | E | F | G |
   |---|---|---|---|---|---|---|
   | data_adicao | marca_comercial | marca_carro | modelo | cor | foto_carroceria | foto_fundo |

3. Vá em **Arquivo → Compartilhar → Publicar na web**
4. Escolha: **Planilha inteira** + formato **CSV**
5. Clique em **Publicar** e copie a URL gerada
6. Guarde essa URL — é o `SHEET_CSV_URL`

---

## ETAPA 2 — Google Apps Script (mini servidor)

1. Na planilha, vá em **Extensões → Apps Script**
2. Apague o código existente e cole todo o conteúdo do arquivo `apps-script.js`
3. Clique em **Salvar** (ícone de disquete)
4. Clique em **Implantar → Nova implantação**
5. Tipo: **App da Web**
6. Execute como: **Eu mesmo**
7. Quem tem acesso: **Qualquer pessoa**
8. Clique em **Implantar** e autorize quando pedido
9. Copie a **URL do app da web** gerada
10. Guarde essa URL — é o `APPS_SCRIPT_URL`

---

## ETAPA 3 — Cloudinary (armazenamento de fotos)

1. Crie conta gratuita em **cloudinary.com** (25 GB grátis)
2. No painel, copie o **Cloud Name** (canto superior esquerdo)
3. Vá em **Settings → Upload → Upload presets**
4. Clique em **Add upload preset**
5. Mude o modo para **Unsigned**
6. Salve e copie o nome do preset
7. Guarde os dois — são `CLOUDINARY_CLOUD` e `CLOUDINARY_PRESET`

---

## ETAPA 4 — GitHub Pages (o site)

1. Crie conta em **github.com**
2. Clique em **New repository**
   - Nome: `colecao-joao` (ou qualquer nome)
   - Marque: **Public**
3. Faça upload dos arquivos `index.html` e `admin.html`
4. Vá em **Settings → Pages**
5. Source: **Deploy from a branch → main → / (root)**
6. Aguarde ~1 minuto e copie a URL gerada (ex: `seuusuario.github.io/colecao-joao`)

---

## ETAPA 5 — Conectar tudo

Abra `index.html` e substitua:
```
COLE_AQUI_A_URL_DO_GOOGLE_SHEETS_PUBLICADO  →  URL da Etapa 1
```

Abra `admin.html` e substitua:
```
DEFINA_SUA_SENHA_AQUI          →  a senha que quiser (ex: joao2024)
SEU_CLOUD_NAME_AQUI            →  Cloud Name da Etapa 3
SEU_UPLOAD_PRESET_AQUI         →  Upload Preset da Etapa 3
URL_DO_SEU_APPS_SCRIPT_AQUI    →  URL da Etapa 2
URL_DO_GOOGLE_SHEETS_PUBLICADO →  URL da Etapa 1
```

Faça upload novamente dos dois arquivos no GitHub (substitua os anteriores).

---

## Pronto!

| URL | Para quem |
|-----|-----------|
| `seuusuario.github.io/colecao-joao` | Família (sem login) |
| `seuusuario.github.io/colecao-joao/admin.html` | Você e a mãe |

---

## Como adicionar um carrinho

1. Abra `/admin.html` no celular
2. Digite a senha
3. Preencha os campos (o autocomplete sugere o que já existe)
4. Tire as fotos diretamente pela câmera
5. Toque em **Salvar** — o catálogo atualiza em segundos
