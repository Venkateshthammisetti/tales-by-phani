/** Simple line-drawn chat bubble with a handset, drawn to match the site's thin type (not the WhatsApp logo). */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M3.6 20.4l1.2-4.1A8.5 8.5 0 1 1 8 19.4z" strokeLinejoin="round" />
      <path
        d="M9.2 8.3c.2-.4.5-.5.8-.5h.5c.2 0 .3.1.4.3l.7 1.6c.1.2 0 .4-.1.5l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.1.4-.2.5-.1l1.6.7c.2.1.3.2.3.4v.5c0 .3-.2.6-.5.8-.6.4-1.5.5-2.6 0a8.4 8.4 0 0 1-4.3-4.3c-.4-1-.4-1.9 0-2.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
