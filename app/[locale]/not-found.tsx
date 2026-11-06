import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-24">
      <p className="label">404</p>
      <h1 className="mt-4 text-[clamp(2.5rem,8vw,6rem)] font-semibold">{t("title")}</h1>
      <p className="text-muted mt-5 max-w-md text-lg">{t("body")}</p>
      <div className="mt-10">
        <ButtonLink href="/">{t("cta")}</ButtonLink>
      </div>
    </div>
  );
}
