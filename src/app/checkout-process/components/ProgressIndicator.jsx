import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ProgressIndicator({ currentStep, steps }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={step?.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-fast ${
                    isCompleted
                      ? 'bg-success border-success text-success-foreground'
                      : isCurrent
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-background border-border text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Icon name="CheckIcon" size={20} variant="solid" />
                  ) : (
                    <span className="text-sm font-heading font-bold">{stepNumber}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium text-center hidden sm:block ${
                    isCurrent ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {step?.label}
                </span>
              </div>
              {index < steps?.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-all duration-fast ${
                    isCompleted ? 'bg-success' : 'bg-border'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Mobile Step Label */}
      <div className="sm:hidden mt-4 text-center">
        <p className="text-sm font-medium text-primary">
          {steps?.[currentStep - 1]?.label}
        </p>
      </div>
    </div>
  );
}

ProgressIndicator.propTypes = {
  currentStep: PropTypes?.number?.isRequired,
  steps: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      label: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};