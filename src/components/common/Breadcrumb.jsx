'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

export default function Breadcrumb() {
  const pathname = usePathname();

  const pathSegments = pathname?.split('/')?.filter(segment => segment);

  const breadcrumbMap = {
    'product-catalog': 'Catálogo de Productos',
    'product-details': 'Detalles del Producto',
    'shopping-cart': 'Carrito de Compras',
    'checkout-process': 'Proceso de Pago',
    'user-authentication': 'Mi Cuenta',
    'contact-support': 'Soporte',
  };

  if (pathSegments?.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-fast"
          >
            <Icon name="HomeIcon" size={16} variant="outline" />
            <span className="ml-2">Inicio</span>
          </Link>
        </li>

        {pathSegments?.map((segment, index) => {
          const path = `/${pathSegments?.slice(0, index + 1)?.join('/')}`;
          const isLast = index === pathSegments?.length - 1;
          const label = breadcrumbMap?.[segment] || segment;

          return (
            <li key={path} className="flex items-center space-x-2">
              <Icon name="ChevronRightIcon" size={16} variant="solid" className="text-muted-foreground" />
              {isLast ? (
                <span className="font-medium text-foreground font-heading" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  href={path}
                  className="text-muted-foreground hover:text-primary transition-colors duration-fast"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}