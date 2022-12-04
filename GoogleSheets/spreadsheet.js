const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./Boutique Promo-9bd20cba422f.json');
const fs = require('fs');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1LEE6fazwJqWGFTyODYm68zttvHQARKOCrrJFlaPviso');

async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

  const rows = await sheet.getRows();

  console.log(rows.length)

  data=[];

  for(let i in rows){
    data.push({
      Discord: rows[i].Discord,
      Achat: rows[i].Achat
    })
  }

  console.log(data[0].Discord)

  fs.writeFileSync('./data.json', JSON.stringify(data))
}

accessSpreadsheet();