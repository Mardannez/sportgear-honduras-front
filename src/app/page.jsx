import Header from '@/components/common/Header';
import HomePageInteractive from './components/HomePageInteractive';

export const metadata = {
  title: 'SportGear Honduras - Entrena mejor, rinde más',
  description: 'Tienda de equipamiento deportivo en Honduras. Encuentra los mejores productos para entrenar y mejorar tu rendimiento.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomePageInteractive />
    </div>
  );
}