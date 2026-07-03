import fs from 'fs';

const data = [];

const disc45Files = fs.readdirSync('public/assets/treatments/disc45').filter(f => f.endsWith('.pdf'));
disc45Files.forEach(f => {
  data.push({
    filename: `disc45/${f}`,
    name: f.replace('.pdf', '').replace(/\./g, '').trim(),
    discount: 45
  });
});

const disc50Files = fs.readdirSync('public/assets/treatments/disc50').filter(f => f.endsWith('.pdf'));
disc50Files.forEach(f => {
  data.push({
    filename: `disc50/${f}`,
    name: f.replace('.pdf', '').replace(/\./g, '').trim(),
    discount: 50
  });
});

fs.writeFileSync('src/data.json', JSON.stringify(data, null, 2));
console.log('Successfully generated src/data.json');
