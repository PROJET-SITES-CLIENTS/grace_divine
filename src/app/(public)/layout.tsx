import { db } from '@/lib/db';
import Header from '@/components/gdv/Header';
import Footer from '@/components/gdv/Footer';
import PromotionalPopup from '@/components/gdv/PromotionalPopup';
import GlobalBanners from '@/components/gdv/GlobalBanners';
import WhatsAppButton from '@/components/gdv/WhatsAppButton';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, pageVisibilities, ads] = await Promise.all([
    db.siteSettings.findFirst().catch(() => null),
    db.pageVisibility.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    db.promotionalAd.findMany({ where: { active: true }, orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header pageVisibilities={pageVisibilities as any} settings={settings as any} />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer pageVisibilities={pageVisibilities as any} settings={settings as any} />
      
      <PromotionalPopup ads={ads} />
      <GlobalBanners ads={ads} />
      <WhatsAppButton phoneNumber={settings?.whatsappNumber || '224627104646'} />
    </div>
  );
}
