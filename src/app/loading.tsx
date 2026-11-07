export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-32" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-blue border-t-transparent" />
        <span className="text-sm font-medium text-[#64748B]">Loading…</span>
      </div>
    </div>
  );
}
