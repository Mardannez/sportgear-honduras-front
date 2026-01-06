'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function OrderLookup() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    setError('');
    setSearchResult(null);

    if (!orderNumber?.trim() || !email?.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      setSearchResult({
        orderNumber: orderNumber,
        status: 'En Tránsito',
        statusColor: 'warning',
        date: '15/12/2024',
        estimatedDelivery: '18/12/2024',
        items: 2,
        total: 'L 1,850.00',
      });
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    if (name === 'orderNumber') {
      setOrderNumber(value);
    } else {
      setEmail(value);
    }
    setError('');
  };

  return (
    <section className="bg-card border border-border rounded-xl p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
          <Icon name="MagnifyingGlassIcon" size={24} variant="outline" className="text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Rastrear Pedido
          </h2>
          <p className="text-sm text-muted-foreground">
            Consulta el estado de tu pedido sin iniciar sesión
          </p>
        </div>
      </div>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="orderNumber" className="block text-sm font-medium text-foreground mb-2">
            Número de Pedido
          </label>
          <input
            type="text"
            id="orderNumber"
            name="orderNumber"
            value={orderNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-fast"
            placeholder="Ej: ORD-2024-001234"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-fast"
            placeholder="tu@correo.com"
          />
        </div>

        {error && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg flex items-center space-x-2">
            <Icon name="ExclamationCircleIcon" size={20} variant="solid" className="text-error" />
            <p className="text-sm text-error">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSearching}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-fast font-heading font-semibold flex items-center justify-center space-x-2"
        >
          {isSearching ? (
            <>
              <Icon name="ArrowPathIcon" size={20} variant="outline" className="animate-spin" />
              <span>Buscando...</span>
            </>
          ) : (
            <>
              <Icon name="MagnifyingGlassIcon" size={20} variant="outline" />
              <span>Buscar Pedido</span>
            </>
          )}
        </button>
      </form>
      {searchResult && (
        <div className="mt-6 p-5 bg-background border border-border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-foreground">
              Pedido #{searchResult?.orderNumber}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${searchResult?.statusColor}/10 text-${searchResult?.statusColor}`}>
              {searchResult?.status}
            </span>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fecha de Pedido:</span>
              <span className="font-medium text-foreground">{searchResult?.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Entrega Estimada:</span>
              <span className="font-medium text-foreground">{searchResult?.estimatedDelivery}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Artículos:</span>
              <span className="font-medium text-foreground">{searchResult?.items}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-border">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-bold text-foreground text-base">{searchResult?.total}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}