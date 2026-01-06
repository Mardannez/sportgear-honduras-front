'use client';

import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import FeaturedProductsCarousel from './FeaturedProductsCarousel';
import BestsellersGrid from './BestsellersGrid';
import WhatsAppSupportBanner from './WhatsAppSupportBanner';

export default function HomePageInteractive() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    // Mock featured products data
    const mockFeaturedProducts = [
    {
      id: 1,
      name: 'Mancuernas Ajustables Pro',
      price: 1299.00,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_184dcbf68-1766045763503.png",
      alt: 'Par de mancuernas ajustables negras con pesas intercambiables en gimnasio',
      category: 'Pesas',
      badge: 'Nuevo',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Banda de Resistencia Set',
      price: 399.00,
      image: "https://images.unsplash.com/photo-1585942778436-2e13373303d8",
      alt: 'Set de bandas elásticas de resistencia en colores variados sobre superficie blanca',
      category: 'Accesorios',
      badge: 'Popular',
      rating: 4.6
    },
    {
      id: 3,
      name: 'Bicicleta Estática Pro X',
      price: 8999.00,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_10b05b7fb-1765201154082.png",
      alt: 'Bicicleta estática moderna negra con pantalla digital en gimnasio',
      category: 'Cardio',
      badge: 'Nuevo',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Colchoneta Yoga Premium',
      price: 599.00,
      image: "https://images.unsplash.com/photo-1567281105305-11c3e4ace86b",
      alt: 'Colchoneta de yoga morada enrollada sobre piso de madera',
      category: 'Yoga',
      badge: 'Oferta',
      rating: 4.7
    },
    {
      id: 5,
      name: 'Guantes de Entrenamiento',
      price: 249.00,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1db817a17-1764882069330.png",
      alt: 'Par de guantes deportivos negros con agarre de goma',
      category: 'Accesorios',
      badge: 'Popular',
      rating: 4.5
    }];


    // Mock bestsellers data
    const mockBestsellers = [
    {
      id: 6,
      name: 'Barra Olímpica 20kg',
      price: 2499.00,
      image: "https://images.unsplash.com/photo-1684078588079-e5d1893b79a8",
      alt: 'Barra olímpica de acero cromado en rack de gimnasio',
      category: 'Pesas',
      sales: 150,
      rating: 4.9
    },
    {
      id: 7,
      name: 'Proteína Whey Gold',
      price: 1299.00,
      image: "https://images.unsplash.com/photo-1693996045346-d0a9b9470909",
      alt: 'Contenedor de proteína en polvo sabor chocolate con cuchara medidora',
      category: 'Suplementos',
      sales: 230,
      rating: 4.8
    },
    {
      id: 8,
      name: 'Cuerda para Saltar Speed',
      price: 199.00,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f7ff4ebb-1765111134147.png",
      alt: 'Cuerda de saltar negra con mangos ergonómicos sobre superficie gris',
      category: 'Cardio',
      sales: 180,
      rating: 4.6
    },
    {
      id: 9,
      name: 'Balón Medicinal 10kg',
      price: 799.00,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9089ca6-1765721455331.png",
      alt: 'Balón medicinal negro de goma texturizada en gimnasio',
      category: 'Funcional',
      sales: 95,
      rating: 4.7
    },
    {
      id: 10,
      name: 'Cinturón de Levantamiento',
      price: 499.00,
      image: "https://images.unsplash.com/photo-1586232710888-675866d80ad2",
      alt: 'Cinturón de levantamiento de pesas de cuero negro con hebilla',
      category: 'Accesorios',
      sales: 120,
      rating: 4.8
    },
    {
      id: 11,
      name: 'Kettlebell 16kg',
      price: 699.00,
      image: "https://images.unsplash.com/photo-1584827387028-8896d471163f",
      alt: 'Pesa rusa kettlebell negra sobre piso de gimnasio',
      category: 'Pesas',
      sales: 145,
      rating: 4.9
    }];


    setFeaturedProducts(mockFeaturedProducts);
    setBestsellers(mockBestsellers);
  }, []);

  return (
    <main className="w-full">
      <HeroSection />
      <FeaturedProductsCarousel products={featuredProducts} />
      <BestsellersGrid products={bestsellers} />
      <WhatsAppSupportBanner />
    </main>);

}