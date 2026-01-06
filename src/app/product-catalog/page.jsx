import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductCatalogInteractive from './components/ProductCatalogInteractive';

export const metadata = {
  title: 'Catálogo de Productos - SportGear Honduras',
  description: 'Explora nuestra amplia selección de accesorios deportivos, smartwatches y equipos de fitness. Envío a domicilio en todo Honduras.'
};

export default function ProductCatalogPage() {
  const mockProducts = [
  {
    id: 1,
    name: "Smartwatch Deportivo Pro X5",
    category: "Smartwatches",
    categoryId: "smartwatches",
    brandId: 1,
    price: 4500.00,
    discount: 15,
    rating: 4.8,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d26f8cdb-1765113715116.png",
    alt: "Smartwatch negro con pantalla digital mostrando estadísticas de ejercicio en fondo blanco",
    inStock: true
  },
  {
    id: 2,
    name: "Banda de Resistencia Set Premium",
    category: "Accesorios Deportivos",
    categoryId: "sports-accessories",
    brandId: 2,
    price: 850.00,
    discount: 0,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1627461545338-668014e06d66",
    alt: "Set de bandas elásticas de colores para ejercicio sobre superficie de madera",
    inStock: true
  },
  {
    id: 3,
    name: "Correa de Silicona para Smartwatch",
    category: "Accesorios para Smartwatch",
    categoryId: "smartwatch-accessories",
    brandId: 3,
    price: 350.00,
    discount: 20,
    rating: 4.5,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10eb6750f-1765437612165.png",
    alt: "Correa deportiva azul de silicona para smartwatch sobre fondo gris",
    inStock: true
  },
  {
    id: 4,
    name: "Mancuernas Ajustables 20kg",
    category: "Equipos de Fitness",
    categoryId: "fitness-equipment",
    brandId: 4,
    price: 3200.00,
    discount: 10,
    rating: 4.9,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7aa8cf9-1765201155345.png",
    alt: "Par de mancuernas negras con discos de peso ajustables sobre piso de gimnasio",
    inStock: true
  },
  {
    id: 5,
    name: "Smartwatch Fitness Tracker Z3",
    category: "Smartwatches",
    categoryId: "smartwatches",
    brandId: 1,
    price: 2800.00,
    discount: 0,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1523475585621-bc60c6d75c2a",
    alt: "Smartwatch deportivo con pantalla táctil mostrando frecuencia cardíaca en muñeca",
    inStock: true
  },
  {
    id: 6,
    name: "Guantes de Entrenamiento Pro",
    category: "Accesorios Deportivos",
    categoryId: "sports-accessories",
    brandId: 2,
    price: 650.00,
    discount: 0,
    rating: 4.3,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_163b6735a-1765285178031.png",
    alt: "Par de guantes negros de gimnasio con protección de muñeca sobre banco",
    inStock: false
  },
  {
    id: 7,
    name: "Protector de Pantalla Smartwatch",
    category: "Accesorios para Smartwatch",
    categoryId: "smartwatch-accessories",
    brandId: 3,
    price: 180.00,
    discount: 0,
    rating: 4.7,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18bcb1b2c-1765214429405.png",
    alt: "Protector de pantalla transparente para smartwatch con aplicador incluido",
    inStock: true
  },
  {
    id: 8,
    name: "Colchoneta de Yoga Premium",
    category: "Equipos de Fitness",
    categoryId: "fitness-equipment",
    brandId: 5,
    price: 1200.00,
    discount: 25,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1567281105305-11c3e4ace86b",
    alt: "Colchoneta de yoga morada enrollada con correa de transporte en piso de madera",
    inStock: true
  },
  {
    id: 9,
    name: "Smartwatch Elite Series S7",
    category: "Smartwatches",
    categoryId: "smartwatches",
    brandId: 1,
    price: 6500.00,
    discount: 0,
    rating: 4.9,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_192ec7362-1764924753368.png",
    alt: "Smartwatch premium plateado con correa de acero inoxidable mostrando interfaz elegante",
    inStock: true
  },
  {
    id: 10,
    name: "Botella de Agua Deportiva 1L",
    category: "Accesorios Deportivos",
    categoryId: "sports-accessories",
    brandId: 2,
    price: 450.00,
    discount: 0,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1645739468741-5a19e9828148",
    alt: "Botella deportiva azul de acero inoxidable con tapa hermética sobre mesa",
    inStock: true
  },
  {
    id: 11,
    name: "Cargador Inalámbrico Smartwatch",
    category: "Accesorios para Smartwatch",
    categoryId: "smartwatch-accessories",
    brandId: 3,
    price: 550.00,
    discount: 15,
    rating: 4.6,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_194127c40-1764872627513.png",
    alt: "Base de carga inalámbrica blanca para smartwatch con cable USB",
    inStock: true
  },
  {
    id: 12,
    name: "Bicicleta Estática Profesional",
    category: "Equipos de Fitness",
    categoryId: "fitness-equipment",
    brandId: 4,
    price: 12500.00,
    discount: 0,
    rating: 4.7,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10b05b7fb-1765201154082.png",
    alt: "Bicicleta estática negra con pantalla digital y asiento ajustable en gimnasio",
    inStock: false
  },
  {
    id: 13,
    name: "Smartwatch Kids Edition",
    category: "Smartwatches",
    categoryId: "smartwatches",
    brandId: 1,
    price: 1800.00,
    discount: 20,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1565733741538-91680a77e560",
    alt: "Smartwatch infantil rosa con diseño colorido y correa de silicona suave",
    inStock: true
  },
  {
    id: 14,
    name: "Toalla de Microfibra Deportiva",
    category: "Accesorios Deportivos",
    categoryId: "sports-accessories",
    brandId: 2,
    price: 380.00,
    discount: 0,
    rating: 4.3,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d99c6b83-1764835754254.png",
    alt: "Toalla deportiva gris de microfibra doblada con bolsa de transporte",
    inStock: true
  },
  {
    id: 15,
    name: "Estuche Protector Smartwatch",
    category: "Accesorios para Smartwatch",
    categoryId: "smartwatch-accessories",
    brandId: 3,
    price: 280.00,
    discount: 0,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1649925985887-492ff29e7f08",
    alt: "Estuche rígido negro para almacenar y proteger smartwatch durante viajes",
    inStock: true
  }];


  const mockCategories = [
  { id: "all", name: "Todas las Categorías", count: 15 },
  { id: "smartwatches", name: "Smartwatches", count: 4 },
  { id: "sports-accessories", name: "Accesorios Deportivos", count: 4 },
  { id: "smartwatch-accessories", name: "Accesorios para Smartwatch", count: 4 },
  { id: "fitness-equipment", name: "Equipos de Fitness", count: 3 }];


  const mockBrands = [
  { id: 1, name: "TechFit", count: 4 },
  { id: 2, name: "SportPro", count: 4 },
  { id: 3, name: "WatchGear", count: 4 },
  { id: 4, name: "FitnessMaster", count: 2 },
  { id: 5, name: "YogaLife", count: 1 }];


  return (
    <>
      <Header />
      <div className="bg-background min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4">
          <Breadcrumb />
        </div>
        <ProductCatalogInteractive
          initialProducts={mockProducts}
          categories={mockCategories}
          brands={mockBrands} />

      </div>
    </>);

}