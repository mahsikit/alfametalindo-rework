"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Printer, Mail, MapPin, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    product: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setFormData({ name: "", email: "", company: "", industry: "", product: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const industries = t.raw("industries") as string[];

  return (
    <>
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">{t("officeTitle")}</h2>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex gap-3">
                    <MapPin className="h-5 w-5 text-[#F97316] mt-0.5 shrink-0" />
                    <span className="text-sm">{t("address")}</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <Phone className="h-5 w-5 text-[#F97316] shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{t("phoneLabel")}</p>
                      <a href="tel:+62216470022" className="text-sm hover:text-[#0B3D91]">
                        021-64700022
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3 items-center">
                    <Printer className="h-5 w-5 text-[#F97316] shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{t("faxLabel")}</p>
                      <span className="text-sm">021-64700033</span>
                    </div>
                  </li>
                  <li className="flex gap-3 items-center">
                    <Mail className="h-5 w-5 text-[#F97316] shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{t("emailLabel")}</p>
                      <a
                        href="mailto:marketing@alfametalindo.com"
                        className="text-sm hover:text-[#0B3D91] break-all"
                      >
                        marketing@alfametalindo.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/6221647000220"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
              >
                <MessageCircle className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800 text-sm">{t("whatsappLabel")}</p>
                  <p className="text-xs text-green-600">Chat with us</p>
                </div>
              </a>

              {/* Map embed */}
              <div className="rounded-xl overflow-hidden border h-52">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6580580888!2d106.83851!3d-6.117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDcnMDEuMiJTIDEwNsKwNTAnMTkuMiJF!5e0!3m2!1sen!2sid!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PT Alfa Metalindo Indonesia Location"
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-slate-900 mb-6">{t("formTitle")}</h2>

              {status === "success" && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <p className="text-sm text-green-800">{t("formSuccess")}</p>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                  <p className="text-sm text-red-800">{t("formError")}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">{t("formName")} *</Label>
                    <Input
                      id="name"
                      placeholder={t("formNamePlaceholder")}
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">{t("formEmail")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("formEmailPlaceholder")}
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="company">{t("formCompany")}</Label>
                    <Input
                      id="company"
                      placeholder={t("formCompanyPlaceholder")}
                      value={formData.company}
                      onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("formIndustry")}</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(v) => setFormData((p) => ({ ...p, industry: v ?? "" }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("formIndustryPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind: string) => (
                          <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="product">{t("formProduct")}</Label>
                  <Input
                    id="product"
                    placeholder={t("formProductPlaceholder")}
                    value={formData.product}
                    onChange={(e) => setFormData((p) => ({ ...p, product: e.target.value }))}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message">{t("formMessage")} *</Label>
                  <Textarea
                    id="message"
                    placeholder={t("formMessagePlaceholder")}
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "loading"}
                  className="w-full bg-[#0B3D91] hover:bg-blue-900 text-white"
                >
                  {status === "loading" ? "Sending…" : t("formSubmit")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
