import { db } from '@/lib/db';
import SiteRouter from '@/components/gdv/SiteRouter';

export default async function AdminPage() {
  const [
    settingsData,
    pageVisibilitiesData,
    servicesData,
    teamData,
    testimonialsData,
    partnersData,
    faqsData,
    adsData,
    jobsData,
    galleryImagesData,
    galleryVideosData,
    homeSectionsData,
    aboutDataData,
  ] = await Promise.all([
    db.siteSettings.findFirst().catch(() => null),
    db.pageVisibility.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    db.service.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    db.teamMember.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    db.testimonial.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    db.partner.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    db.fAQ.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    db.promotionalAd.findMany({ where: { active: true }, orderBy: { order: 'asc' } }).catch(() => []),
    db.jobListing.findMany({ where: { active: true } }).catch(() => []),
    db.galleryImage.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    db.galleryVideo.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    db.homePageSection.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    db.aboutPage.findFirst().catch(() => null),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gdv-cream">
      <SiteRouter
        initialPage="admin"
        pageVisibilities={pageVisibilitiesData}
        settings={settingsData}
        services={servicesData}
        team={teamData}
        testimonials={testimonialsData}
        partners={partnersData}
        faqs={faqsData}
        ads={adsData}
        jobs={jobsData}
        galleryImages={galleryImagesData}
        galleryVideos={galleryVideosData}
        homeSections={homeSectionsData}
        aboutData={aboutDataData}
      />
    </div>
  );
}
