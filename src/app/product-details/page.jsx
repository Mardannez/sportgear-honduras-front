import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductDetailsInteractive from './components/ProductDetailsInteractive';

export const metadata = {
  title: 'Detalles del Producto - SportGear Honduras',
  description: 'Información detallada del producto, especificaciones técnicas, reseñas de clientes y opciones de compra en SportGear Honduras.'
};

export default function ProductDetailsPage() {
  const productData = {
    id: 1,
    name: "Smartwatch Deportivo Pro X5",
    price: 3500.00,
    originalPrice: 4200.00,
    rating: 4.7,
    reviewCount: 128,
    description: "El Smartwatch Deportivo Pro X5 es el compañero perfecto para tu estilo de vida activo. Con monitoreo avanzado de salud, GPS integrado y resistencia al agua IP68, este reloj inteligente te acompaña en cada entrenamiento. Su pantalla AMOLED de 1.4 pulgadas ofrece una visualización clara incluso bajo la luz solar directa. Compatible con iOS y Android, sincroniza automáticamente tus datos de actividad física con tu smartphone.",
    inStock: true,
    stock: 15,
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1d26f8cdb-1765113715116.png",
      alt: "Smartwatch deportivo negro con pantalla AMOLED mostrando estadísticas de ejercicio sobre fondo blanco"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1dfc0563d-1765486867632.png",
      alt: "Vista lateral del smartwatch deportivo mostrando correa de silicona negra y botones laterales"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1a014ed0c-1765743340149.png",
      alt: "Smartwatch en muñeca de atleta durante entrenamiento al aire libre"
    },
    {
      url: "https://images.unsplash.com/photo-1714968022878-60b1e87676ac",
      alt: "Detalle de la pantalla del smartwatch mostrando monitor de frecuencia cardíaca"
    }],

    sizes: null,
    colors: [
    { name: "Negro" },
    { name: "Azul Marino" },
    { name: "Gris Espacial" }],

    features: [
    "Pantalla AMOLED de 1.4 pulgadas con resolución 454x454",
    "Monitoreo continuo de frecuencia cardíaca y SpO2",
    "GPS integrado para seguimiento preciso de rutas",
    "Resistencia al agua IP68 hasta 50 metros",
    "Batería de larga duración hasta 14 días",
    "Más de 100 modos deportivos predefinidos",
    "Notificaciones inteligentes de llamadas y mensajes",
    "Compatible con iOS 10.0+ y Android 5.0+",
    "Correa intercambiable de silicona premium",
    "Análisis avanzado del sueño con IA"],

    specifications: [
    { label: "Marca", value: "SportGear Pro" },
    { label: "Modelo", value: "X5-2024" },
    { label: "Pantalla", value: "1.4\" AMOLED 454x454" },
    { label: "Procesador", value: "Dual-core 1.2GHz" },
    { label: "Memoria RAM", value: "512MB" },
    { label: "Almacenamiento", value: "4GB" },
    { label: "Batería", value: "420mAh Li-Po" },
    { label: "Conectividad", value: "Bluetooth 5.2, GPS, GLONASS" },
    { label: "Sensores", value: "Acelerómetro, Giroscopio, Brújula, SpO2, FC" },
    { label: "Resistencia", value: "IP68 (50m)" },
    { label: "Peso", value: "45g (con correa)" },
    { label: "Dimensiones", value: "46 x 46 x 11.5 mm" },
    { label: "Material Carcasa", value: "Aleación de aluminio" },
    { label: "Material Correa", value: "Silicona hipoalergénica" },
    { label: "Compatibilidad", value: "iOS 10.0+, Android 5.0+" },
    { label: "Garantía", value: "12 meses" }],

    reviews: [
    {
      id: 1,
      userName: "Carlos Martínez",
      userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_12bfc6eeb-1763301150860.png",
      userImageAlt: "Hombre hispano de 30 años con cabello corto negro y sonrisa amigable",
      rating: 5,
      title: "Excelente reloj para deportistas",
      comment: "Llevo 3 meses usando este smartwatch y estoy muy satisfecho. La batería dura realmente lo que prometen, el GPS es preciso y las notificaciones funcionan perfectamente. Lo uso para correr y nadar sin problemas. Totalmente recomendado para atletas.",
      date: "2024-12-10",
      verified: true
    },
    {
      id: 2,
      userName: "María Rodríguez",
      userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_120cdcb01-1763300250909.png",
      userImageAlt: "Mujer hispana de 25 años con cabello largo castaño y expresión alegre",
      rating: 5,
      title: "Mejor compra del año",
      comment: "Me encanta este reloj. La pantalla se ve increíble y es muy fácil de usar. El monitoreo del sueño me ha ayudado a mejorar mis hábitos. La entrega fue rápida y el servicio al cliente excelente. Vale cada lempira.",
      date: "2024-12-08",
      verified: true
    },
    {
      id: 3,
      userName: "Jorge Hernández",
      userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_16ecdb34c-1763295132322.png",
      userImageAlt: "Hombre hispano de 35 años con barba corta y gafas deportivas",
      rating: 4,
      title: "Muy bueno, con pequeños detalles",
      comment: "En general es un excelente producto. La única razón por la que no le doy 5 estrellas es porque la app podría ser más intuitiva. Pero el hardware es de primera calidad y cumple con todo lo prometido.",
      date: "2024-12-05",
      verified: true
    },
    {
      id: 4,
      userName: "Ana López",
      userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f24e9240-1763301267917.png",
      userImageAlt: "Mujer hispana de 28 años con cabello ondulado y sonrisa radiante",
      rating: 5,
      title: "Perfecto para mi rutina diaria",
      comment: "Lo uso todos los días para el gimnasio y para monitorear mi actividad. Me encanta que pueda cambiar las correas fácilmente. La resistencia al agua es real, lo he usado en la piscina sin problemas.",
      date: "2024-12-01",
      verified: true
    }]

  };

  const relatedProductsData = [
  {
    id: 2,
    name: "Correa Deportiva Premium",
    image: "https://images.unsplash.com/photo-1649030615030-f8c9f089807b",
    imageAlt: "Correa deportiva de silicona en colores variados sobre superficie blanca",
    price: 450.00,
    originalPrice: 600.00,
    rating: 4.5,
    reviewCount: 89,
    discount: 25
  },
  {
    id: 3,
    name: "Protector de Pantalla Templado",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_173f8d57a-1764658995234.png",
    imageAlt: "Protector de pantalla de vidrio templado para smartwatch en empaque premium",
    price: 250.00,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 156,
    discount: null
  },
  {
    id: 4,
    name: "Cargador Inalámbrico Rápido",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_194127c40-1764872627513.png",
    imageAlt: "Base de carga inalámbrica negra con smartwatch cargando sobre escritorio moderno",
    price: 550.00,
    originalPrice: 700.00,
    rating: 4.6,
    reviewCount: 72,
    discount: 21
  },
  {
    id: 5,
    name: "Audífonos Bluetooth Deportivos",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1750bb79e-1765000701410.png",
    imageAlt: "Audífonos inalámbricos deportivos negros con estuche de carga sobre fondo azul",
    price: 1200.00,
    originalPrice: 1500.00,
    rating: 4.7,
    reviewCount: 203,
    discount: 20
  },
  {
    id: 6,
    name: "Banda de Frecuencia Cardíaca",
    image: "https://images.unsplash.com/photo-1632414967409-af50cf753029",
    imageAlt: "Banda pectoral de monitoreo cardíaco negra con sensor sobre fondo deportivo",
    price: 850.00,
    originalPrice: null,
    rating: 4.4,
    reviewCount: 45,
    discount: null
  },
  {
    id: 7,
    name: "Estuche Protector de Viaje",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1eec33556-1764719509794.png",
    imageAlt: "Estuche rígido negro para smartwatch con compartimentos internos acolchados",
    price: 380.00,
    originalPrice: null,
    rating: 4.3,
    reviewCount: 67,
    discount: null
  },
  {
    id: 8,
    name: "Smartwatch Fitness Lite",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d26f8cdb-1765113715116.png",
    imageAlt: "Smartwatch deportivo compacto con pantalla colorida mostrando métricas de ejercicio",
    price: 2200.00,
    originalPrice: 2800.00,
    rating: 4.5,
    reviewCount: 134,
    discount: 21
  }];


  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <Breadcrumb />
          <ProductDetailsInteractive
            productData={productData}
            relatedProductsData={relatedProductsData} />

        </div>
      </main>
    </>);

}