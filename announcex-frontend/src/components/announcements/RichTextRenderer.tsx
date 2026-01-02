export function RichTextRenderer({ content }: { content: string }) {
  const formatted = content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(/__(.*?)__/g, "<u>$1</u>");

  return (
    <div
      className="text-sm whitespace-pre-wrap break-words"
      dangerouslySetInnerHTML={{ __html: formatted }}
    />
  );
}
