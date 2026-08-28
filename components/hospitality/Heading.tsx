import SplitText from '@/components/ui/SplitText';

/** Thin, tracking-normal General Sans heading — the one recurring type
 *  treatment the hospitality page is built around. */
export default function Heading({
  children,
  className = '',
  as = 'h2',
  delay = 0,
}: {
  children: string;
  className?: string;
  as?: 'h1' | 'h2';
  delay?: number;
}) {
  return (
    <SplitText
      as={as}
      type="words"
      animate
      effect="blur"
      delay={delay}
      className={`font-[family-name:var(--font-general-sans)] font-normal leading-[1.05] tracking-[-0.035em] ${className}`}
    >
      {children}
    </SplitText>
  );
}
