import { Suspense, type ReactNode } from "react";

type LocaleParams = PageProps<"/[locale]">["params"];

export default function LocalePage({
  params,
  children,
}: {
  params: LocaleParams;
  children: (locale: string) => ReactNode;
}) {
  return (
    <Suspense fallback={<LocalePageFallback />}>
      <LocalePageContent params={params}>{children}</LocalePageContent>
    </Suspense>
  );
}

async function LocalePageContent({
  params,
  children,
}: {
  params: LocaleParams;
  children: (locale: string) => ReactNode;
}) {
  const { locale } = await params;
  return children(locale);
}

function LocalePageFallback() {
  return (
    <div aria-busy="true" className="min-h-[50vh] animate-pulse bg-background">
      <div className="h-64 bg-petrol/5" />
      <div className="mx-auto max-w-6xl space-y-3 px-6 py-12">
        <div className="h-3 w-24 rounded bg-petrol/10" />
        <div className="h-8 w-2/3 max-w-lg rounded bg-petrol/10" />
        <div className="h-4 w-full max-w-2xl rounded bg-petrol/5" />
      </div>
    </div>
  );
}
