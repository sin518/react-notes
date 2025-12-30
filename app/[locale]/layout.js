import "./style.css";
import Sidebar from "@/components/Sidebar";
import { getRequestConfig } from "next-intl/server";
import IntlProviderClient from "@/components/IntlProviderClient";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const cfg = await getRequestConfig({ locale });
  const { messages, timeZone } = cfg ?? { messages: {}, timeZone: "UTC" };
  return (
    <>
      <div className="container">
        <div className="main">
          <IntlProviderClient
            locale={locale}
            messages={messages}
            timeZone={timeZone}
          >
            <Sidebar locale={locale} />
            <section className="col note-viewer">{children}</section>
          </IntlProviderClient>
        </div>
      </div>
    </>
  );
}
