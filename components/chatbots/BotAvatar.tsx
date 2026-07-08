import { cn } from '@/lib/utils';

/**
 * The chatbot's avatar: a circular crop of the moody gradient/grain image at
 * public/images/chatbotBg.webp, used wherever the chatbot needs a flat
 * avatar (chat header, message bubbles) instead of a live WebGL canvas.
 */
export default function BotAvatar({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'rounded-full bg-cover bg-center ring-1 ring-inset ring-[#00e5ff]/55',
        className
      )}
      style={{ backgroundImage: "url('/images/chatbotBg.webp')" }}
    />
  );
}
