'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isAuthenticated] = useState(false);

  // Calculate cart item count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const savedCart = localStorage.getItem('sportgear_cart');
        if (savedCart) {
          const cartItems = JSON.parse(savedCart);
          const totalCount = cartItems?.reduce((sum, item) => sum + (item?.quantity || 0), 0);
          setCartItemCount(totalCount);
        } else {
          setCartItemCount(0);
        }
      } catch (error) {
        console.error('Error reading cart:', error);
        setCartItemCount(0);
      }
    };

    // Initial load
    updateCartCount();

    // Listen for storage changes (when cart is updated in other tabs/windows)
    window.addEventListener('storage', updateCartCount);

    // Listen for custom cart update events (for same-tab updates)
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const navigationItems = [
    { label: 'Inicio', path: '/', icon: 'HomeIcon' },
    { label: 'Productos', path: '/product-catalog', icon: 'ShoppingBagIcon' },
    { label: 'Mi Cuenta', path: '/user-authentication', icon: 'UserIcon' },
    { label: 'Soporte', path: '/contact-support', icon: 'ChatBubbleLeftRightIcon' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/50412345678?text=Hola,%20necesito%20ayuda%20con%20SportGear', '_blank');
  };

  return (
    <header className="sticky top-0 z-[100] bg-card border-b border-border shadow-elevation">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-fast">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" className="text-primary-foreground"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" className="text-secondary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" className="text-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-heading font-bold text-primary hidden sm:block">SportGear</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" suppressHydrationWarning>
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                href={item?.path}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:bg-muted hover:text-primary transition-all duration-fast font-heading font-medium"
              >
                <Icon name={item?.icon} size={20} variant="outline" />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2" suppressHydrationWarning>
            {/* WhatsApp Button - Desktop */}
            <button
              onClick={handleWhatsAppClick}
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-all duration-fast font-heading font-medium"
              aria-label="Contactar por WhatsApp"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={20} variant="solid" />
              <span>WhatsApp</span>
            </button>

            {/* Account Dropdown */}
            <div className="relative hidden lg:block">
              <button
                onClick={toggleAccountDropdown}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-all duration-fast"
                aria-label="Cuenta de usuario"
                aria-expanded={isAccountDropdownOpen}
              >
                <Icon name="UserIcon" size={20} variant="outline" />
                <Icon 
                  name="ChevronDownIcon" 
                  size={16} 
                  variant="solid"
                  className={`transition-transform duration-fast ${isAccountDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isAccountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation z-[200]">
                  {isAuthenticated ? (
                    <div className="py-2">
                      <Link
                        href="/user-authentication"
                        className="flex items-center space-x-3 px-4 py-2 text-popover-foreground hover:bg-muted transition-colors duration-fast"
                      >
                        <Icon name="UserCircleIcon" size={20} variant="outline" />
                        <span>Mi Perfil</span>
                      </Link>
                      <Link
                        href="/user-authentication"
                        className="flex items-center space-x-3 px-4 py-2 text-popover-foreground hover:bg-muted transition-colors duration-fast"
                      >
                        <Icon name="ClipboardDocumentListIcon" size={20} variant="outline" />
                        <span>Mis Pedidos</span>
                      </Link>
                      <button
                        className="flex items-center space-x-3 px-4 py-2 w-full text-left text-popover-foreground hover:bg-muted transition-colors duration-fast"
                      >
                        <Icon name="ArrowRightOnRectangleIcon" size={20} variant="outline" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  ) : (
                    <div className="py-2">
                      <Link
                        href="/user-authentication"
                        className="flex items-center space-x-3 px-4 py-2 text-popover-foreground hover:bg-muted transition-colors duration-fast"
                      >
                        <Icon name="ArrowRightOnRectangleIcon" size={20} variant="outline" />
                        <span>Iniciar Sesión</span>
                      </Link>
                      <Link
                        href="/user-authentication"
                        className="flex items-center space-x-3 px-4 py-2 text-popover-foreground hover:bg-muted transition-colors duration-fast"
                      >
                        <Icon name="UserPlusIcon" size={20} variant="outline" />
                        <span>Registrarse</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart */}
            <Link
              href="/shopping-cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-muted transition-all duration-fast"
              aria-label={`Carrito de compras con ${cartItemCount} artículos`}
            >
              <Icon name="ShoppingCartIcon" size={24} variant="outline" />
              {cartItemCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold bg-secondary text-secondary-foreground rounded-full"
                  suppressHydrationWarning
                >
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-muted transition-all duration-fast"
              aria-label="Menú de navegación"
              aria-expanded={isMobileMenuOpen}
            >
              <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} variant="outline" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border z-[300]">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                href={item?.path}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted hover:text-primary transition-all duration-fast font-heading font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item?.icon} size={20} variant="outline" />
                <span>{item?.label}</span>
              </Link>
            ))}

            <div className="pt-2 border-t border-border">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/user-authentication"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all duration-fast"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name="UserCircleIcon" size={20} variant="outline" />
                    <span>Mi Perfil</span>
                  </Link>
                  <Link
                    href="/user-authentication"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all duration-fast"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name="ClipboardDocumentListIcon" size={20} variant="outline" />
                    <span>Mis Pedidos</span>
                  </Link>
                  <button
                    className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-left text-foreground hover:bg-muted transition-all duration-fast"
                  >
                    <Icon name="ArrowRightOnRectangleIcon" size={20} variant="outline" />
                    <span>Cerrar Sesión</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/user-authentication"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all duration-fast"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name="ArrowRightOnRectangleIcon" size={20} variant="outline" />
                    <span>Iniciar Sesión</span>
                  </Link>
                  <Link
                    href="/user-authentication"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all duration-fast"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name="UserPlusIcon" size={20} variant="outline" />
                    <span>Registrarse</span>
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center space-x-2 w-full px-4 py-3 mt-4 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-all duration-fast font-heading font-medium"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={20} variant="solid" />
              <span>Contactar por WhatsApp</span>
            </button>
          </nav>
        </div>
      )}
      {/* Floating WhatsApp Button - Mobile */}
      <button
        onClick={handleWhatsAppClick}
        className="md:hidden fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 bg-success text-success-foreground rounded-full shadow-elevation hover:bg-success/90 transition-all duration-fast"
        aria-label="Contactar por WhatsApp"
      >
        <Icon name="ChatBubbleLeftRightIcon" size={24} variant="solid" />
      </button>
    </header>
  );
}