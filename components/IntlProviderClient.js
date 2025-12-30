"use client";

import { NextIntlClientProvider } from "next-intl";

export default function IntlProviderClient({ children, locale, messages }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
