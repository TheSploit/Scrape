const axios = require('axios');
const cheerio = require('cheerio');
const { spawn } = require('child_process');

const url = 'https://lpmqalamun.com/category/puisi/?filter_by=random_posts';

axios.get(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        // Array untuk menyimpan data
        let stories = [];

        // Mengambil semua elemen di class yang ditentukan
        $('div.td-block-span6').each((index, element) => {
            // Mendapatkan judul
            const title = $(element).find('h3.entry-title.td-module-title').text().trim();

            // Mendapatkan link
            const link = $(element).find('a').attr('href');

            // Mendapatkan nama author
            const author = $(element).find('.td-post-author-name').text().trim();

            // Mendapatkan datenya
            const dateny = $(element).find('.td-post-date').text().trim();

            // Memasukkan hasil scraping ke array
            stories.push({ title, link, author, dateny });
        });
        console.log(stories)

spawn('node', ['baca.js'], {
	    stdio: 'inherit' // menampilkan output dari baca.js di terminal yang sama
});

      })
