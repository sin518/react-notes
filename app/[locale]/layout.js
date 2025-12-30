import "./style.css";
import Sidebar from "@/components/Sidebar";
import { getMessages } from "next-intl/server";
import IntlProviderClient from "@/components/IntlProviderClient";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return (
    <>
      <div className="container">
        <div className="main">
          <IntlProviderClient locale={locale} messages={messages}>
            <Sidebar locale={locale} />
            <section className="col note-viewer">{children}</section>
          </IntlProviderClient>
        </div>
      </div>
    </>
  );
}
