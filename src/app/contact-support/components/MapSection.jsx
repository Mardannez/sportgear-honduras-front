export default function MapSection() {
  return (
    <section className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 md:p-8 border-b border-border">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Nuestra Ubicación
        </h2>
        <p className="text-muted-foreground">
          Visítanos en nuestra tienda física en Tegucigalpa
        </p>
      </div>
      
      <div className="w-full h-[400px] md:h-[500px]">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Ubicación de SportGear Honduras en Tegucigalpa"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=14.0723,-87.1921&z=15&output=embed"
          className="border-0"
        />
      </div>
    </section>
  );
}