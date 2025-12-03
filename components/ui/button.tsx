import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'white' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer',
          {
            // Variants
            'bg-[#8A33FD] text-white hover:bg-[#7229d6]': variant === 'primary',
            'bg-white text-[#3C4242] hover:bg-[#F6F6F6]': variant === 'white',
            'bg-transparent border border-white text-white hover:bg-white/10': variant === 'outline',
            'bg-transparent text-[#3C4242] hover:bg-[#F6F6F6]': variant === 'ghost',
            // Sizes
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Link-styled button for navigation
interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'white' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer',
          {
            // Variants
            'bg-[#8A33FD] text-white hover:bg-[#7229d6]': variant === 'primary',
            'bg-white text-[#3C4242] hover:bg-[#F6F6F6]': variant === 'white',
            'bg-transparent border border-white text-white hover:bg-white/10': variant === 'outline',
            'bg-transparent text-[#3C4242] hover:bg-[#F6F6F6]': variant === 'ghost',
            // Sizes
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

LinkButton.displayName = 'LinkButton';

