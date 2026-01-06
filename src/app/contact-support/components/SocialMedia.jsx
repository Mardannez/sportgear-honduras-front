import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function SocialMedia({ socialLinks }) {
  const getSocialIcon = (platform) => {
    const icons = {
      facebook: 'ShareIcon',
      instagram: 'CameraIcon',
      twitter: 'ChatBubbleLeftIcon',
      youtube: 'VideoCameraIcon',
    };
    return icons?.[platform] || 'LinkIcon';
  };

  return (
    <section className="bg-gradient-to-br from-secondary/5 to-accent/5 border border-border rounded-xl p-6 md:p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Síguenos en Redes Sociales
        </h2>
        <p className="text-muted-foreground">
          Mantente al día con nuestras últimas ofertas y novedades
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {socialLinks?.map((social, index) => (
          <a
            key={index}
            href={social?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-6 py-3 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all duration-fast group"
            aria-label={`Visitar ${social?.platform}`}
          >
            <Icon
              name={getSocialIcon(social?.platform)}
              size={24}
              variant="outline"
              className="text-muted-foreground group-hover:text-primary transition-colors duration-fast"
            />
            <span className="font-heading font-medium text-foreground group-hover:text-primary transition-colors duration-fast">
              {social?.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

SocialMedia.propTypes = {
  socialLinks: PropTypes?.arrayOf(
    PropTypes?.shape({
      platform: PropTypes?.string?.isRequired,
      label: PropTypes?.string?.isRequired,
      url: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};