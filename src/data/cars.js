const c = (id) => ({ cutout: `/cars/cutout/${id}.webp`, photo: `/cars/photo/${id}.webp` })

export const CATEGORIES = [
  { id: 'all', label: 'All Cars' },
  { id: 'SUV', label: 'SUV' },
  { id: 'Sports', label: 'Sports' },
  { id: 'Coupe', label: 'Coupe' },
  { id: 'Luxury', label: 'Luxury' },
  { id: 'Electric', label: 'Electric' },
]

export const CARS = [
  {
    id: 'ferrari-f8', brand: 'Ferrari', model: 'F8 Tributo', year: 2023, type: 'Sports',
    price: 1200, rating: 4.9, reviews: 214, popular: true, tint: '#ffe3e1',
    specs: { fuel: 'Petrol', seats: '2 Seats', power: '710 hp', speed: '340 km/h', gearbox: 'Automatic', torque: '770 Nm' },
    ...c('ferrari-f8'),
  },
  {
    id: 'lambo-svj', brand: 'Lamborghini', model: 'Aventador SVJ', year: 2022, type: 'Sports',
    price: 1500, rating: 5.0, reviews: 98, popular: true, tint: '#f6dfe3',
    specs: { fuel: 'Petrol', seats: '2 Seats', power: '759 hp', speed: '350 km/h', gearbox: 'Automatic', torque: '720 Nm' },
    ...c('lambo-svj'),
  },
  {
    id: 'bmw-m4', brand: 'BMW', model: 'M4 Competition', year: 2024, type: 'Coupe',
    price: 380, rating: 4.8, reviews: 176, tint: '#e8edf3',
    specs: { fuel: 'Petrol', seats: '4 Seats', power: '503 hp', speed: '290 km/h', gearbox: 'Automatic', torque: '650 Nm' },
    ...c('bmw-m4'),
  },
  {
    id: 'amg-gle', brand: 'Mercedes-AMG', model: 'GLE 63 S Coupé', year: 2024, type: 'SUV',
    price: 420, rating: 4.8, reviews: 143, popular: true, tint: '#e7e9ee',
    specs: { fuel: 'Petrol', seats: '5 Seats', power: '603 hp', speed: '280 km/h', gearbox: 'Automatic', torque: '850 Nm' },
    ...c('amg-gle'),
  },
  {
    id: 'audi-r8', brand: 'Audi', model: 'R8 V10 Performance', year: 2023, type: 'Sports',
    price: 850, rating: 4.9, reviews: 121, tint: '#e6e6e8',
    specs: { fuel: 'Petrol', seats: '2 Seats', power: '602 hp', speed: '331 km/h', gearbox: 'Automatic', torque: '560 Nm' },
    ...c('audi-r8'),
  },
  {
    id: 'land-cruiser', brand: 'Toyota', model: 'Land Cruiser 300', year: 2024, type: 'SUV',
    price: 280, rating: 4.7, reviews: 302, tint: '#eef0f2',
    specs: { fuel: 'Diesel', seats: '7 Seats', power: '304 hp', speed: '210 km/h', gearbox: 'Automatic', torque: '700 Nm' },
    ...c('land-cruiser'),
  },
  {
    id: 'amg-gt', brand: 'Mercedes-AMG', model: 'GT Black Series', year: 2025, type: 'Coupe',
    price: 990, rating: 4.9, reviews: 64, tint: '#fde9d6',
    specs: { fuel: 'Petrol', seats: '2 Seats', power: '720 hp', speed: '325 km/h', gearbox: 'Automatic', torque: '800 Nm' },
    ...c('amg-gt'),
  },
  {
    id: 'evoque-blue', brand: 'Range Rover', model: 'Evoque Dynamic', year: 2023, type: 'SUV',
    price: 220, rating: 4.6, reviews: 188, tint: '#dff0fa',
    specs: { fuel: 'Hybrid', seats: '5 Seats', power: '296 hp', speed: '230 km/h', gearbox: 'Automatic', torque: '540 Nm' },
    ...c('evoque-blue'),
  },
  {
    id: 'bmw-x6', brand: 'BMW', model: 'X6 M Sport', year: 2025, type: 'SUV',
    price: 340, rating: 4.8, reviews: 157, tint: '#e9ecf1',
    specs: { fuel: 'Petrol', seats: '5 Seats', power: '375 hp', speed: '250 km/h', gearbox: 'Automatic', torque: '520 Nm' },
    ...c('bmw-x6'),
  },
  {
    id: 'shelby-gt500', brand: 'Ford', model: 'Shelby GT500', year: 2022, type: 'Coupe',
    price: 450, rating: 4.8, reviews: 133, tint: '#ffe4e2',
    specs: { fuel: 'Petrol', seats: '4 Seats', power: '760 hp', speed: '290 km/h', gearbox: 'Automatic', torque: '847 Nm' },
    ...c('shelby-gt500'),
  },
  {
    id: 'gmc-yukon', brand: 'GMC', model: 'Yukon Denali', year: 2024, type: 'SUV',
    price: 310, rating: 4.7, reviews: 211, tint: '#e6e7ea',
    specs: { fuel: 'Petrol', seats: '8 Seats', power: '420 hp', speed: '210 km/h', gearbox: 'Automatic', torque: '624 Nm' },
    ...c('gmc-yukon'),
  },
  {
    id: 'hyundai-n', brand: 'Hyundai', model: 'IONIQ N Line', year: 2025, type: 'Electric',
    price: 180, rating: 4.7, reviews: 89, tint: '#ffe6e6',
    specs: { fuel: 'Electric', seats: '5 Seats', power: '320 hp', speed: '200 km/h', gearbox: 'Automatic', torque: '605 Nm' },
    ...c('hyundai-n'),
  },
  {
    id: 'rr-concept', brand: 'Rolls-Royce', model: 'Spectre Aurum', year: 2026, type: 'Luxury',
    price: 2400, rating: 5.0, reviews: 32, tint: '#fdeedd',
    specs: { fuel: 'Electric', seats: '4 Seats', power: '577 hp', speed: '250 km/h', gearbox: 'Automatic', torque: '900 Nm' },
    ...c('rr-concept'),
  },
  {
    id: 'phantom-x', brand: 'Vanta', model: 'Phantom X', year: 2026, type: 'Luxury',
    price: 2100, rating: 4.9, reviews: 41, tint: '#e3e4e6',
    specs: { fuel: 'Hybrid', seats: '2 Seats', power: '1,100 hp', speed: '402 km/h', gearbox: 'Automatic', torque: '1,200 Nm' },
    ...c('phantom-x'),
  },
  {
    id: 'evoque-white', brand: 'Range Rover', model: 'Evoque Coupé', year: 2021, type: 'SUV',
    price: 190, rating: 4.5, reviews: 260, tint: '#eceef1',
    specs: { fuel: 'Diesel', seats: '4 Seats', power: '240 hp', speed: '217 km/h', gearbox: 'Automatic', torque: '500 Nm' },
    ...c('evoque-white'),
  },
]

export const getCar = (id) => CARS.find((x) => x.id === id)

export const LOCATIONS = [
  'Dufferin Mall, Toronto',
  'Union Station, Toronto',
  'Pearson Airport (YYZ)',
  'Yorkdale Shopping Centre',
  'Eaton Centre, Toronto',
]
