const files = [
  '2018_Tesla_Model_S_75D.jpg',
  'Porsche_911_GT3_RS_(991).jpg',
  '2022_Rivian_R1S_Launch_Edition.jpg',
  'BMW_M5_Competition_(F90)_IMG_3025.jpg',
  'Audi_RS_e-tron_GT_IMG_3962.jpg',
  '2022_Lucid_Air_Dream_Edition_in_Eureka_Gold,_Front_Left,_06-18-2022.jpg',
  'Toyota_Land_Cruiser_300_3.3D_ZX.jpg',
  'Mercedes-Benz_G_63_AMG_(W_463).jpg',
  '2020_Ford_Mustang_Shelby_GT500.jpg',
  '2023_Chevrolet_Corvette_Z06_(front_left).jpg',
  'Lamborghini_Huracan_Evo.jpg',
  'Ferrari_F8_Tributo_Genf_2019_1Y7A5665.jpg'
];

async function check() {
  for (const f of files) {
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${f}?width=800`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(f, '->', res.status);
    } catch (e) {
      console.log(f, '-> Error');
    }
  }
}
check();
