'use client';

export function Slot({
  name,
  children,
}: {
  name: string;
  children?: React.ReactNode;
}) {
  return <>{children}</>;
}
