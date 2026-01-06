import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import ContactSupportInteractive from './components/ContactSupportInteractive';

export const metadata = {
  title: 'Contacto y Soporte - SportGear Honduras',
  description: 'Contáctanos por WhatsApp, teléfono o correo electrónico. Estamos disponibles para ayudarte con tus pedidos, productos y consultas sobre entrega en Honduras.',
};

export default function ContactSupportPage() {
  const phoneNumber = '50412345678';
  const businessHours = 'Lunes a Sábado: 8:00 AM - 6:00 PM';

  const categories = [
    { value: 'orders', label: 'Consultas sobre Pedidos' },
    { value: 'products', label: 'Información de Productos' },
    { value: 'delivery', label: 'Entregas y Envíos' },
    { value: 'payments', label: 'Métodos de Pago' },
    { value: 'returns', label: 'Devoluciones y Cambios' },
    { value: 'technical', label: 'Soporte Técnico' },
    { value: 'other', label: 'Otros' },
  ];

  const contactInfo = {
    address: 'Col. Palmira, Avenida República de Chile, Tegucigalpa, Francisco Morazán, Honduras',
    phones: [
      { label: 'Principal', number: '+50422345678', display: '+504 2234-5678' },
      { label: 'WhatsApp', number: '+50412345678', display: '+504 1234-5678' },
      { label: 'Ventas', number: '+50498765432', display: '+504 9876-5432' },
    ],
    emails: [
      { label: 'Ventas', address: 'ventas@sportgearhonduras.com' },
      { label: 'Soporte', address: 'soporte@sportgearhonduras.com' },
      { label: 'General', address: 'info@sportgearhonduras.com' },
    ],
    schedule: [
      { days: 'Lunes - Viernes', hours: '8:00 AM - 6:00 PM' },
      { days: 'Sábado', hours: '9:00 AM - 5:00 PM' },
      { days: 'Domingo', hours: 'Cerrado' },
    ],
  };

  const faqs = [
    {
      question: '¿Cuál es el tiempo de entrega en Honduras?',
      answer: 'El tiempo de entrega varía según tu ubicación. En Tegucigalpa y San Pedro Sula, las entregas se realizan en 1-2 días hábiles. Para otras ciudades, el tiempo estimado es de 3-5 días hábiles. Realizamos entregas puerta a puerta en todo el país mediante servicio de mensajería en motocicleta.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos dos métodos de pago: Pago contra entrega (efectivo al recibir tu pedido) y Transferencia bancaria (con confirmación previa). El pedido mínimo es de L 500.00 para cualquier método de pago.',
    },
    {
      question: '¿Puedo devolver o cambiar un producto?',
      answer: 'Sí, aceptamos devoluciones y cambios dentro de los 7 días posteriores a la entrega, siempre que el producto esté en su empaque original, sin uso y con todas sus etiquetas. Los gastos de envío para devoluciones corren por cuenta del cliente, excepto en casos de productos defectuosos o errores en el pedido.',
    },
    {
      question: '¿Cómo puedo rastrear mi pedido?',
      answer: 'Una vez confirmado tu pedido, recibirás un número de seguimiento por correo electrónico y WhatsApp. Puedes usar este número en nuestra sección de "Rastrear Pedido" o contactarnos directamente por WhatsApp para conocer el estado actual de tu envío.',
    },
    {
      question: '¿Los productos tienen garantía?',
      answer: 'Todos nuestros productos cuentan con garantía del fabricante. Los smartwatches y equipos electrónicos tienen garantía de 6 meses a 1 año según la marca. Los accesorios deportivos tienen garantía de 30 días contra defectos de fabricación. Conserva tu factura para hacer válida la garantía.',
    },
    {
      question: '¿Realizan entregas en todo Honduras?',
      answer: 'Sí, realizamos entregas a nivel nacional en todos los departamentos de Honduras. Contamos con servicio de mensajería en motocicleta para entregas rápidas y seguras puerta a puerta. Los costos de envío varían según la distancia y se calculan automáticamente al momento de realizar tu pedido.',
    },
    {
      question: '¿Puedo modificar o cancelar mi pedido?',
      answer: 'Puedes modificar o cancelar tu pedido dentro de las primeras 2 horas después de haberlo realizado. Contáctanos inmediatamente por WhatsApp o teléfono. Una vez que el pedido ha sido procesado y enviado, no es posible realizar modificaciones, pero puedes gestionar una devolución una vez recibido.',
    },
    {
      question: '¿Ofrecen descuentos por compras al mayor?',
      answer: 'Sí, ofrecemos descuentos especiales para compras al por mayor, equipos deportivos y pedidos corporativos. Contáctanos directamente por WhatsApp o correo electrónico para solicitar una cotización personalizada según tus necesidades y cantidad de productos.',
    },
  ];

  const socialLinks = [
    { platform: 'facebook', label: 'Facebook', url: 'https://facebook.com/sportgearhonduras' },
    { platform: 'instagram', label: 'Instagram', url: 'https://instagram.com/sportgearhonduras' },
    { platform: 'twitter', label: 'Twitter', url: 'https://twitter.com/sportgearhn' },
    { platform: 'youtube', label: 'YouTube', url: 'https://youtube.com/@sportgearhonduras' },
  ];

  return (
    <>
      <Header />
      <div className="max-w-[1200px] mx-auto px-4">
        <Breadcrumb />
      </div>
      <ContactSupportInteractive
        phoneNumber={phoneNumber}
        businessHours={businessHours}
        categories={categories}
        contactInfo={contactInfo}
        faqs={faqs}
        socialLinks={socialLinks}
      />
    </>
  );
}