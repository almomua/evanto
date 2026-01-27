import { clsx } from 'clsx';

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={clsx('flex items-start gap-5', className)}>
      <div className="w-1.5 h-[30px] bg-[#8A33FD] rounded-lg flex-shrink-0" />
      <h2 className="text-[#3C4242] text-[34px] font-bold tracking-wide leading-tight">
        {title}
      </h2>
    </div>
  );
}



