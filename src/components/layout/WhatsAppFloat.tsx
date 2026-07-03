import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5491100000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Soporte por WhatsApp"
      className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 border border-graphite bg-warm-white px-4 py-2.5 text-[11px] tracking-ui text-graphite shadow-[0_10px_30px_-15px_rgba(20,20,20,0.35)] transition-colors hover:bg-graphite hover:text-warm-white"
    >
      <MessageCircle className="h-4 w-4" strokeWidth={1.25} />
      Soporte
    </a>
  );
}