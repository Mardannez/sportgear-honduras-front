'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function CustomerReviews({ reviews, averageRating, totalReviews, onSubmitReview }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    name: '',
  });

  const handleSubmitReview = (e) => {
    e?.preventDefault();
    onSubmitReview(newReview);
    setNewReview({ rating: 5, title: '', comment: '', name: '' });
    setShowReviewForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-HN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-4 md:mb-0">
          Reseñas de Clientes
        </h2>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-fast font-heading font-semibold"
        >
          <Icon name="PencilSquareIcon" size={20} variant="solid" />
          <span>Escribir Reseña</span>
        </button>
      </div>
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-8 mb-8 pb-6 border-b border-border">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="text-5xl font-heading font-bold text-foreground mb-2">
            {averageRating?.toFixed(1)}
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-1 mb-1">
            {[...Array(5)]?.map((_, index) => (
              <Icon
                key={index}
                name="StarIcon"
                size={20}
                variant={index < Math.floor(averageRating) ? 'solid' : 'outline'}
                className={index < Math.floor(averageRating) ? 'text-warning' : 'text-muted'}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Basado en {totalReviews} reseñas
          </p>
        </div>

        <div className="flex-1">
          {[5, 4, 3, 2, 1]?.map((stars) => {
            const count = reviews?.filter((r) => r?.rating === stars)?.length;
            const percentage = (count / totalReviews) * 100;
            return (
              <div key={stars} className="flex items-center space-x-3 mb-2">
                <span className="text-sm text-muted-foreground w-12">
                  {stars} estrellas
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Escribe tu Reseña
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-heading font-semibold text-foreground mb-2">
              Calificación
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="focus:outline-none"
                >
                  <Icon
                    name="StarIcon"
                    size={32}
                    variant={star <= newReview?.rating ? 'solid' : 'outline'}
                    className={star <= newReview?.rating ? 'text-warning' : 'text-muted'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-heading font-semibold text-foreground mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={newReview?.name}
              onChange={(e) => setNewReview({ ...newReview, name: e?.target?.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-heading font-semibold text-foreground mb-2">
              Título de la Reseña
            </label>
            <input
              type="text"
              value={newReview?.title}
              onChange={(e) => setNewReview({ ...newReview, title: e?.target?.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-heading font-semibold text-foreground mb-2">
              Tu Opinión
            </label>
            <textarea
              value={newReview?.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e?.target?.value })}
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground resize-none"
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-fast font-heading font-semibold"
            >
              Publicar Reseña
            </button>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="px-6 py-2 border border-border bg-card text-foreground rounded-lg hover:bg-muted transition-all duration-fast font-heading font-semibold"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
      {/* Reviews List */}
      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review?.id} className="pb-6 border-b border-border last:border-b-0">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <AppImage
                  src={review?.userImage}
                  alt={review?.userImageAlt}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">
                      {review?.userName}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(review?.date)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, index) => (
                      <Icon
                        key={index}
                        name="StarIcon"
                        size={16}
                        variant={index < review?.rating ? 'solid' : 'outline'}
                        className={index < review?.rating ? 'text-warning' : 'text-muted'}
                      />
                    ))}
                  </div>
                </div>
                <h5 className="font-heading font-semibold text-foreground mb-2">
                  {review?.title}
                </h5>
                <p className="text-muted-foreground leading-relaxed">
                  {review?.comment}
                </p>
                {review?.verified && (
                  <div className="flex items-center space-x-2 mt-3">
                    <Icon name="CheckBadgeIcon" size={16} variant="solid" className="text-success" />
                    <span className="text-sm text-success font-medium">
                      Compra Verificada
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

CustomerReviews.propTypes = {
  reviews: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      userName: PropTypes?.string?.isRequired,
      userImage: PropTypes?.string?.isRequired,
      userImageAlt: PropTypes?.string?.isRequired,
      rating: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      comment: PropTypes?.string?.isRequired,
      date: PropTypes?.string?.isRequired,
      verified: PropTypes?.bool?.isRequired,
    })
  )?.isRequired,
  averageRating: PropTypes?.number?.isRequired,
  totalReviews: PropTypes?.number?.isRequired,
  onSubmitReview: PropTypes?.func?.isRequired,
};