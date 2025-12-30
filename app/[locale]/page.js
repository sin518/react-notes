import { getTranslations } from "next-intl/server";

export default async function Page({ params }) {
  const { locale } = await params;
  let t;
  try {
    t = await getTranslations({ locale, namespace: "Basic" });
  } catch (err) {
    t = (k) => k;
    console.error("Page: failed to load translations:", err);
  }

  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t("initText")}</span>
    </div>
  );
}
