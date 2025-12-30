"use client";

import { NextIntlClientProvider } from "next-intl";

export default function IntlProviderClient({
  children,
  locale,
  messages,
  timeZone,
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
    >
      {children}
    </NextIntlClientProvider>
  );
}
