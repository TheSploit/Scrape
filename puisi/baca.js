const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

// Buat interface untuk menerima input dari pengguna
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Masukkan URL yang ingin Anda tampilkan: ", (url) => {
axios.get(url) 
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        // Array untuk menyimpan hasil scraping
        let stories = [];

        // Mengambil semua elemen
        $('div.td-post-content.td-pb-padding-side').each((index, element) => {
            // Mendapatkan isi
            const title = $(element).find('p').text().trim();

            // Mendapatkan link
            const link = $(element).find('a').attr('href');


            // Memasukkan hasil scraping ke array
            stories.push({ title, link });
        });
        console.log(stories)
      });
      })
