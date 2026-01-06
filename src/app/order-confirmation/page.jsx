'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';


function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams?.get('orderNumber') || 'SPG00000000';

  // Mock order data - in production, this would come from database
  const orderData = {
    orderNumber,
    orderDate: new Date()?.toLocaleDateString('es-HN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)?.toLocaleDateString('es-HN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
    paymentMethod: 'Contra entrega',
    customerInfo: {
      name: 'Juan Pérez',
      email: 'juan.perez@ejemplo.com',
      phone: '+504 9999-9999',
      address: 'Tegucigalpa, Francisco Morazán, Colonia Kennedy, Casa #123'
    },
    items: [
    {
      id: 1,
      name: 'Balón de Fútbol Adidas',
      quantity: 2,
      price: 450,
      image: "https://images.unsplash.com/photo-1493108288550-f154195d63a7",
      alt: 'Balón de fútbol profesional Adidas con diseño hexagonal blanco y negro'
    },
    {
      id: 2,
      name: 'Zapatillas Nike Running',
      quantity: 1,
      price: 1200,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_13cea4cec-1764662734824.png",
      alt: 'Zapatillas deportivas Nike para running color blanco con detalles rojos'
    }],

    subtotal: 2100,
    shipping: 150,
    total: 2250
  };

  const relatedProducts = [
  {
    id: 101,
    name: 'Mancuernas Ajustables',
    price: 850,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_184dcbf68-1766045763503.png",
    alt: 'Par de mancuernas ajustables negras con peso variable para entrenamiento'
  },
  {
    id: 102,
    name: 'Banda Elástica Fitness',
    price: 250,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1becaba33-1764762624730.png",
    alt: 'Banda elástica de resistencia color verde para ejercicios de fitness'
  },
  {
    id: 103,
    name: 'Colchoneta Yoga',
    price: 450,
    image: "https://images.unsplash.com/photo-1673967524270-d0085e8e3cca",
    alt: 'Colchoneta de yoga color azul enrollada con correa de transporte'
  },
  {
    id: 104,
    name: 'Botella Deportiva',
    price: 180,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15ab4a985-1764701408952.png",
    alt: 'Botella deportiva transparente con tapa hermética y marcador de onzas'
  }];


  const handleDownloadReceipt = () => {
    // In production, this would generate a PDF
    alert('Generando recibo PDF...');
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hola, tengo una consulta sobre mi pedido #${orderNumber}`
    );
    window.open(`https://wa.me/50499999999?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Icon name="CheckCircleIcon" size={48} variant="solid" className="text-green-600" />
          </div>
          <h1 className="font-heading font-bold text-foreground text-4xl mb-4">
            ¡Pedido Realizado con Éxito!
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Gracias por tu compra. Hemos recibido tu pedido y comenzaremos a procesarlo pronto.
          </p>
        </div>

        {/* Order Number and Actions */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Número de Pedido</p>
              <p className="font-heading font-bold text-foreground text-2xl">
                {orderData?.orderNumber}
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Fecha: {orderData?.orderDate}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadReceipt}
                className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-all duration-fast flex items-center justify-center space-x-2">

                <Icon name="ArrowDownTrayIcon" size={20} variant="outline" />
                <span>Descargar Recibo</span>
              </button>
              <button
                onClick={handleWhatsAppContact}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-heading font-semibold hover:bg-green-700 transition-all duration-fast flex items-center justify-center space-x-2">

                <Icon name="ChatBubbleLeftRightIcon" size={20} variant="solid" />
                <span>Contactar por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Information */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h2 className="font-heading font-bold text-foreground text-xl mb-4 flex items-center space-x-2">
                <Icon name="TruckIcon" size={24} variant="outline" />
                <span>Información de Entrega</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Entrega Estimada</p>
                  <p className="text-foreground font-semibold">{orderData?.estimatedDelivery}</p>
                  <p className="text-muted-foreground text-sm">
                    (Entrega nacional en motocicleta)
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-muted-foreground text-sm mb-1">Dirección de Entrega</p>
                  <p className="text-foreground">{orderData?.customerInfo?.address}</p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-muted-foreground text-sm mb-1">Contacto</p>
                  <p className="text-foreground">{orderData?.customerInfo?.name}</p>
                  <p className="text-foreground">{orderData?.customerInfo?.email}</p>
                  <p className="text-foreground">{orderData?.customerInfo?.phone}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h2 className="font-heading font-bold text-foreground text-xl mb-4 flex items-center space-x-2">
                <Icon name="ShoppingBagIcon" size={24} variant="outline" />
                <span>Productos Ordenados</span>
              </h2>
              <div className="space-y-4">
                {orderData?.items?.map((item) =>
                <div key={item?.id} className="flex items-center space-x-4 pb-4 border-b border-border last:border-0">
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      <AppImage
                      src={item?.image}
                      alt={item?.alt}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover" />

                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground">
                        {item?.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Cantidad: {item?.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading font-bold text-foreground">
                        L {(item?.price * item?.quantity)?.toLocaleString('es-HN', {
                        minimumFractionDigits: 2
                      })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="font-heading font-bold text-foreground text-xl mb-4 flex items-center space-x-2">
                <Icon name="InformationCircleIcon" size={24} variant="solid" className="text-blue-600" />
                <span>Próximos Pasos</span>
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">
                    Recibirás un correo de confirmación con los detalles de tu pedido
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">
                    Prepararemos tu pedido y lo enviaremos en 1-2 días hábiles
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">
                    Si elegiste pago contra entrega, prepara el monto exacto (L {orderData?.total?.toLocaleString('es-HN')})
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">
                    Puedes contactarnos por WhatsApp en cualquier momento para seguimiento
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="font-heading font-bold text-foreground text-lg mb-4">
                Resumen de Pago
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>L {orderData?.subtotal?.toLocaleString('es-HN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Envío</span>
                  <span>L {orderData?.shipping?.toLocaleString('es-HN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between font-heading font-bold text-foreground text-xl">
                    <span>Total</span>
                    <span>L {orderData?.total?.toLocaleString('es-HN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-muted-foreground text-sm">Método de Pago</p>
                  <p className="text-foreground font-semibold">{orderData?.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="font-heading font-bold text-foreground text-lg mb-4">
                ¿Necesitas Ayuda?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon name="ChatBubbleLeftRightIcon" size={20} variant="outline" className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-semibold">WhatsApp</p>
                    <p className="text-muted-foreground text-sm">+504 9999-9999</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="EnvelopeIcon" size={20} variant="outline" className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-semibold">Email</p>
                    <p className="text-muted-foreground text-sm">
                      soporte@sportgear.hn
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Policy */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-heading font-bold text-foreground text-lg mb-3 flex items-center space-x-2">
                <Icon name="ShieldCheckIcon" size={20} variant="solid" className="text-amber-600" />
                <span>Política de Devolución</span>
              </h3>
              <p className="text-foreground text-sm">
                Tienes 15 días para devolver productos no usados. Contáctanos para iniciar el proceso.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="font-heading font-bold text-foreground text-2xl mb-6">
            Productos Relacionados
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts?.map((product) =>
            <Link
              key={product?.id}
              href={`/product-details?id=${product?.id}`}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation transition-all duration-fast">

                <div className="aspect-square bg-muted overflow-hidden">
                  <AppImage
                  src={product?.image}
                  alt={product?.alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow" />

                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2">
                    {product?.name}
                  </h3>
                  <p className="font-heading font-bold text-primary">
                    L {product?.price?.toLocaleString('es-HN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/product-catalog"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-heading font-semibold hover:bg-primary/90 transition-all duration-fast text-center">

            Seguir Comprando
          </Link>
          <Link
            href="/user-authentication"
            className="px-8 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-all duration-fast text-center">

            Ver Mis Pedidos
          </Link>
        </div>
      </div>
    </div>);

}

OrderConfirmationContent.propTypes = {};

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
      <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando confirmación...</p>
          </div>
        </div>
      }>

      <OrderConfirmationContent />
    </Suspense>);

}