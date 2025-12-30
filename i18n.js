import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "@/config.js";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`./message/${locale}.json`)).default,
    timeZone: "UTC",
  };
});
