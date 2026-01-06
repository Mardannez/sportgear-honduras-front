import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import CheckoutInteractive from './components/CheckoutInteractive';

export const metadata = {
  title: 'Proceso de Pago - SportGear Honduras',
  description: 'Completa tu compra de accesorios deportivos, smartwatches y equipo de fitness con entrega a domicilio en todo Honduras'
};

const getMockCartData = () => ({
  items: [
    {
      id: 1,
      name: 'Smartwatch Deportivo Pro X5',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d26f8cdb-1765113715116.png",
      alt: 'Smartwatch negro con pantalla digital mostrando estadísticas de ejercicio sobre fondo blanco',
      quantity: 1,
      price: 2500.00
    },
    {
      id: 2,
      name: 'Banda de Resistencia Set Premium',
      image: "https://images.unsplash.com/photo-1627461545338-668014e06d66",
      alt: 'Set de bandas elásticas de colores variados para ejercicio sobre superficie de madera',
      quantity: 2,
      price: 450.00
    },
    {
      id: 3,
      name: 'Botella de Agua Deportiva 1L',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_15ab4a985-1764701408952.png",
      alt: 'Botella deportiva azul transparente con tapa negra sobre fondo blanco',
      quantity: 1,
      price: 180.00
    }
  ],
  subtotal: 3580.00,
  shipping: 150.00
});

export default function CheckoutProcessPage() {
  const mockCartData = getMockCartData();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-[1200px] mx-auto px-4">
          <Breadcrumb />
          <div className="py-4">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              Proceso de Pago
            </h1>
            <p className="text-muted-foreground">
              Completa tu información para finalizar la compra
            </p>
          </div>
        </div>
        <CheckoutInteractive initialCartData={mockCartData} />
      </main>
    </>
  );
}