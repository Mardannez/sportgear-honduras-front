import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function BusinessInfo({ contactInfo }) {
  return (
    <section className="bg-card border border-border rounded-xl p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg">
          <Icon name="BuildingOfficeIcon" size={24} variant="outline" className="text-secondary" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Información de Contacto
          </h2>
          <p className="text-sm text-muted-foreground">
            Visítanos o comunícate directamente
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="MapPinIcon" size={20} variant="solid" className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground mb-1">Dirección</h3>
            <p className="text-muted-foreground">{contactInfo?.address}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="PhoneIcon" size={20} variant="solid" className="text-success" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground mb-1">Teléfonos</h3>
            <div className="space-y-1">
              {contactInfo?.phones?.map((phone, index) => (
                <a
                  key={index}
                  href={`tel:${phone?.number}`}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-fast"
                >
                  {phone?.label}: {phone?.display}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="EnvelopeIcon" size={20} variant="solid" className="text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground mb-1">Correos Electrónicos</h3>
            <div className="space-y-1">
              {contactInfo?.emails?.map((email, index) => (
                <a
                  key={index}
                  href={`mailto:${email?.address}`}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-fast"
                >
                  {email?.label}: {email?.address}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
            <Icon name="ClockIcon" size={20} variant="solid" className="text-warning" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground mb-2">Horario de Atención</h3>
            <div className="space-y-2">
              {contactInfo?.schedule?.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{item?.days}</span>
                  <span className="font-medium text-foreground">{item?.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

BusinessInfo.propTypes = {
  contactInfo: PropTypes?.shape({
    address: PropTypes?.string?.isRequired,
    phones: PropTypes?.arrayOf(
      PropTypes?.shape({
        label: PropTypes?.string?.isRequired,
        number: PropTypes?.string?.isRequired,
        display: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    emails: PropTypes?.arrayOf(
      PropTypes?.shape({
        label: PropTypes?.string?.isRequired,
        address: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    schedule: PropTypes?.arrayOf(
      PropTypes?.shape({
        days: PropTypes?.string?.isRequired,
        hours: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
  })?.isRequired,
};