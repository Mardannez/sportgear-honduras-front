import PropTypes from 'prop-types';

export default function ProductSpecifications({ specifications }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
        Especificaciones Técnicas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specifications?.map((spec, index) => (
          <div
            key={index}
            className="flex justify-between items-start py-3 border-b border-border last:border-b-0"
          >
            <span className="font-heading font-semibold text-foreground">
              {spec?.label}
            </span>
            <span className="text-muted-foreground text-right ml-4">
              {spec?.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

ProductSpecifications.propTypes = {
  specifications: PropTypes?.arrayOf(
    PropTypes?.shape({
      label: PropTypes?.string?.isRequired,
      value: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};