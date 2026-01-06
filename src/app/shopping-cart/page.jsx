import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import ShoppingCartInteractive from './components/ShoppingCartInteractive';

export const metadata = {
  title: 'Carrito de Compras - SportGear Honduras',
  description: 'Revisa tu carrito de compras, ajusta cantidades y procede al pago. Envío a domicilio en toda Honduras con pago contra entrega o transferencia bancaria.'
};

export default function ShoppingCartPage() {
  const initialCartData = [];

  const featuredProducts = [
  {
    id: 101,
    name: 'Mancuernas Ajustables 20kg',
    image: "https://images.unsplash.com/photo-1703668984128-b506579acdd2",
    imageAlt: 'Par de mancuernas ajustables negras con discos de peso intercambiables',
    price: 1899.00,
    originalPrice: 2299.00,
    discount: 17,
    rating: 4.8
  },
  {
    id: 102,
    name: 'Tapete de Yoga Premium',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17a9fcdce-1764668393041.png",
    imageAlt: 'Tapete de yoga morado enrollado con correa de transporte',
    price: 550.00,
    originalPrice: 0,
    discount: 0,
    rating: 4.6
  },
  {
    id: 103,
    name: 'Audífonos Bluetooth Deportivos',
    image: "https://images.unsplash.com/photo-1673290457306-0f659d4849c7",
    imageAlt: 'Audífonos inalámbricos deportivos negros con estuche de carga',
    price: 899.00,
    originalPrice: 1199.00,
    discount: 25,
    rating: 4.7
  }];


  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <Breadcrumb />
          
          <div className="mb-8">
            <h1 className="font-heading font-bold text-foreground text-3xl sm:text-4xl mb-2">
              Carrito de Compras
            </h1>
            <p className="text-muted-foreground">
              Revisa tus productos seleccionados y procede al pago
            </p>
          </div>

          <ShoppingCartInteractive
            initialCartData={initialCartData}
            featuredProducts={featuredProducts} />

        </div>
      </main>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-16">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">SportGear Honduras</h3>
              <p className="text-primary-foreground/80 text-sm">
                Tu tienda de confianza para accesorios deportivos y equipos de fitness en Honduras.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Comprar</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/product-catalog" className="text-primary-foreground/80 hover:text-primary-foreground">Catálogo</a></li>
                <li><a href="/product-catalog?category=smartwatches" className="text-primary-foreground/80 hover:text-primary-foreground">Smartwatches</a></li>
                <li><a href="/product-catalog?category=fitness" className="text-primary-foreground/80 hover:text-primary-foreground">Fitness</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/contact-support" className="text-primary-foreground/80 hover:text-primary-foreground">Soporte</a></li>
                <li><a href="/user-authentication" className="text-primary-foreground/80 hover:text-primary-foreground">Mi Cuenta</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>WhatsApp: +504 1234-5678</li>
                <li>Email: info@sportgear.hn</li>
                <li>Tegucigalpa, Honduras</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
            <p>&copy; {new Date()?.getFullYear()} SportGear Honduras. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>);

}