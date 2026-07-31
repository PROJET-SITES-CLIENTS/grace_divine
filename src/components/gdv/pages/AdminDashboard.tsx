'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  LayoutDashboard,
  Settings,
  Eye,
  EyeOff,
  Plane,
  Users,
  MessageSquare,
  HelpCircle,
  ImageIcon,
  Video,
  Briefcase,
  Building,
  FileText,
  Trash2,
  Pencil,
  Plus,
  Save,
  X,
  Upload,
  Mail,
  Check,
  Megaphone,
  Home,
  Info,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

type AdminTab = 'dashboard' | 'settings' | 'pages' | 'services' | 'team' | 'testimonials' | 'partners' | 'faq' | 'gallery' | 'ads' | 'contact' | 'jobs' | 'home' | 'about';

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  // Data states
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [pages, setPages] = useState<{ id: string; pageKey: string; title: string; visible: boolean }[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [homeSections, setHomeSections] = useState<any[]>([]);
  const [aboutData, setAboutData] = useState<any>({});
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [galleryVideos, setGalleryVideos] = useState<any[]>([]);

  // Loading states
  const [counts, setCounts] = useState({ contacts: 0, services: 0, testimonials: 0, team: 0, partners: 0, faqs: 0, jobs: 0, ads: 0, images: 0, videos: 0 });

  const sidebarItems: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard className="w-5 h-5" /> },
    { key: 'settings', label: 'Contenu du Site', icon: <Settings className="w-5 h-5" /> },
    { key: 'pages', label: 'Pages', icon: <Eye className="w-5 h-5" /> },
    { key: 'services', label: 'Services', icon: <Plane className="w-5 h-5" /> },
    { key: 'team', label: 'Équipe', icon: <Users className="w-5 h-5" /> },
    { key: 'testimonials', label: 'Témoignages', icon: <MessageSquare className="w-5 h-5" /> },
    { key: 'partners', label: 'Partenaires', icon: <Building className="w-5 h-5" /> },
    { key: 'faq', label: 'FAQ', icon: <HelpCircle className="w-5 h-5" /> },
    { key: 'gallery', label: 'Galerie', icon: <ImageIcon className="w-5 h-5" /> },
    { key: 'ads', label: 'Publicités', icon: <Megaphone className="w-5 h-5" /> },
    { key: 'contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
    { key: 'jobs', label: 'Recrutement', icon: <Briefcase className="w-5 h-5" /> },
    { key: 'home', label: 'Accueil', icon: <Home className="w-5 h-5" /> },
    { key: 'about', label: 'À propos', icon: <Info className="w-5 h-5" /> },
  ];

  const fetchDashboard = useCallback(async () => {
    try {
      const [c, s, t, tm, p, f, j, a, gi, gv] = await Promise.all([
        fetch('/api/contact').then((r) => r.json()),
        fetch('/api/services').then((r) => r.json()),
        fetch('/api/testimonials').then((r) => r.json()),
        fetch('/api/team').then((r) => r.json()),
        fetch('/api/partners').then((r) => r.json()),
        fetch('/api/faq').then((r) => r.json()),
        fetch('/api/jobs').then((r) => r.json()),
        fetch('/api/ads/admin').then((r) => r.json()),
        fetch('/api/gallery/images').then((r) => r.json()),
        fetch('/api/gallery/videos').then((r) => r.json()),
      ]);
      setContacts(c || []);
      setServices(s || []);
      setTestimonials(t || []);
      setTeam(tm || []);
      setPartners(p || []);
      setFaqs(f || []);
      setJobs(j || []);
      setAds(a || []);
      setGalleryImages(gi || []);
      setGalleryVideos(gv || []);
      setCounts({
        contacts: c?.length || 0,
        services: s?.length || 0,
        testimonials: t?.length || 0,
        team: tm?.length || 0,
        partners: p?.length || 0,
        faqs: f?.length || 0,
        jobs: j?.length || 0,
        ads: a?.length || 0,
        images: gi?.length || 0,
        videos: gv?.length || 0,
      });
    } catch (err) { console.error('Erreur chargement dashboard:', err); }

    try {
      const [set, pg, hs, ab] = await Promise.all([
        fetch('/api/settings').then((r) => r.json()),
        fetch('/api/pages-visibility').then((r) => r.json()),
        fetch('/api/home-sections').then((r) => r.json()),
        fetch('/api/about').then((r) => r.json()),
      ]);
      setSettings(set || {});
      setPages(pg || []);
      setHomeSections(hs || []);
      setAboutData(ab || {});
    } catch (err) { console.error('Erreur chargement settings/pages:', err); }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentionally fetch data on mount
    fetchDashboard();
  }, [fetchDashboard]);

  // Settings
  const saveSettings = async (newSettings: Record<string, string>) => {
    setSettings(newSettings);
    await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSettings) });
    toast({ title: 'Paramètres sauvegardés' });
  };

  // Pages visibility
  const togglePage = async (pageKey: string, visible: boolean) => {
    await fetch('/api/pages-visibility', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pageKey, visible }) });
    setPages(pages.map((p) => (p.pageKey === pageKey ? { ...p, visible } : p)));
    toast({ title: 'Visibilité mise à jour' });
  };

  // Generic delete
  const deleteItem = async (url: string, id: string, list: any[], setList: (v: any[]) => void) => {
    await fetch(`${url}/${id}`, { method: 'DELETE' });
    setList(list.filter((item) => item.id !== id));
    toast({ title: 'Élément supprimé' });
  };

  // Generic create
  const createItem = async (url: string, data: any, list: any[], setList: (v: any[]) => void) => {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const item = await res.json();
    setList([...list, item]);
    toast({ title: 'Élément créé' });
    return item;
  };

  // Generic update
  const updateItem = async (url: string, id: string, data: any, list: any[], setList: (v: any[]) => void) => {
    const res = await fetch(`${url}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const item = await res.json();
    setList(list.map((l) => (l.id === id ? { ...l, ...item } : l)));
    toast({ title: 'Élément mis à jour' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-gdv-dark text-gdv-cream z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} overflow-y-auto`}>
        <div className="p-4 border-b border-gdv-gold/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gdv-gold/20 flex items-center justify-center">
                <Plane className="w-4 h-4 text-gdv-gold" />
              </div>
              <div>
                <span className="text-sm font-bold">Grace Divine</span>
                <span className="text-xs text-gdv-gold block">Admin</span>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gdv-cream/60 hover:text-gdv-cream">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                activeTab === item.key
                  ? 'bg-gdv-gold/20 text-gdv-gold font-medium'
                  : 'text-gdv-cream/60 hover:bg-white/5 hover:text-gdv-cream'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Administration</h1>
          </div>
          <Button onClick={() => onNavigate('accueil')} variant="outline" size="sm" className="text-sm">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Retour au site
          </Button>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <motion.div key={activeTab} initial="hidden" animate="visible" variants={fadeIn}>
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tableau de bord</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Contacts', value: counts.contacts, icon: <Mail className="w-5 h-5" />, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Services', value: counts.services, icon: <Plane className="w-5 h-5" />, color: 'text-gdv-gold bg-yellow-50' },
                    { label: 'Témoignages', value: counts.testimonials, icon: <MessageSquare className="w-5 h-5" />, color: 'text-green-600 bg-green-50' },
                    { label: 'Équipe', value: counts.team, icon: <Users className="w-5 h-5" />, color: 'text-purple-600 bg-purple-50' },
                    { label: 'Partenaires', value: counts.partners, icon: <Building className="w-5 h-5" />, color: 'text-indigo-600 bg-indigo-50' },
                    { label: 'FAQ', value: counts.faqs, icon: <HelpCircle className="w-5 h-5" />, color: 'text-orange-600 bg-orange-50' },
                    { label: 'Emplois', value: counts.jobs, icon: <Briefcase className="w-5 h-5" />, color: 'text-teal-600 bg-teal-50' },
                    { label: 'Publicités', value: counts.ads, icon: <Megaphone className="w-5 h-5" />, color: 'text-pink-600 bg-pink-50' },
                    { label: 'Images', value: counts.images, icon: <ImageIcon className="w-5 h-5" />, color: 'text-cyan-600 bg-cyan-50' },
                    { label: 'Vidéos', value: counts.videos, icon: <Video className="w-5 h-5" />, color: 'text-red-600 bg-red-50' },
                  ].map((stat) => (
                    <Card key={stat.label}>
                      <CardContent className="p-4 sm:p-6 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                          {stat.icon}
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Contacts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Derniers contacts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Sujet</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts.slice(0, 5).map((c: any) => (
                          <TableRow key={c.id}>
                            <TableCell className="font-medium">{c.name}</TableCell>
                            <TableCell className="text-sm text-gray-500">{c.email || '-'}</TableCell>
                            <TableCell className="text-sm">{c.subject || '-'}</TableCell>
                            <TableCell className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                            <TableCell>
                              <Badge variant={c.read ? 'secondary' : 'default'} className={c.read ? 'bg-gray-100' : 'bg-gdv-gold text-white'}>
                                {c.read ? 'Lu' : 'Non lu'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contenu du Site</h2>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nom du site</Label>
                        <Input value={settings.siteName || ''} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Slogan</Label>
                        <Input value={settings.slogan || ''} onChange={(e) => setSettings({ ...settings, slogan: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Téléphone 1</Label>
                        <Input value={settings.phone1 || ''} onChange={(e) => setSettings({ ...settings, phone1: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Téléphone 2</Label>
                        <Input value={settings.phone2 || ''} onChange={(e) => setSettings({ ...settings, phone2: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Email 1</Label>
                        <Input value={settings.email1 || ''} onChange={(e) => setSettings({ ...settings, email1: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Email 2</Label>
                        <Input value={settings.email2 || ''} onChange={(e) => setSettings({ ...settings, email2: e.target.value })} />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label>Adresse</Label>
                        <Input value={settings.address || ''} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Numéro WhatsApp</Label>
                        <Input value={settings.whatsappNumber || ''} onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>URL du logo</Label>
                        <Input value={settings.logoUrl || ''} onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Facebook URL</Label>
                        <Input value={settings.facebookUrl || ''} onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Instagram URL</Label>
                        <Input value={settings.instagramUrl || ''} onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Twitter URL</Label>
                        <Input value={settings.twitterUrl || ''} onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>TikTok URL</Label>
                        <Input value={settings.tiktokUrl || ''} onChange={(e) => setSettings({ ...settings, tiktokUrl: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>LinkedIn URL</Label>
                        <Input value={settings.linkedinUrl || ''} onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>YouTube URL</Label>
                        <Input value={settings.youtubeUrl || ''} onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })} />
                      </div>
                    </div>
                    <Separator />
                    <Button onClick={() => saveSettings(settings)} className="bg-gdv-gold hover:bg-gdv-gold-light text-white">
                      <Save className="w-4 h-4 mr-2" /> Sauvegarder
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Pages */}
            {activeTab === 'pages' && (
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Visibilité des Pages</h2>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {pages.map((page) => (
                        <div key={page.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            {page.visible ? <Eye className="w-5 h-5 text-green-600" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
                            <span className="font-medium">{page.title}</span>
                            <Badge variant="secondary" className="text-xs">{page.pageKey}</Badge>
                          </div>
                          <Switch checked={page.visible} onCheckedChange={(checked) => togglePage(page.pageKey, checked)} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Services CRUD */}
            {activeTab === 'services' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Services</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gdv-gold hover:bg-gdv-gold-light text-white"><Plus className="w-4 h-4 mr-2" />Ajouter</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <ServiceForm onSave={async (data) => { await createItem('/api/services', data, services, setServices); fetchDashboard(); }} />
                    </DialogContent>
                  </Dialog>
                </div>
                <Card>
                  <Table>
                    <TableHeader><TableRow><TableHead>Titre</TableHead><TableHead>Slug</TableHead><TableHead>Icône</TableHead><TableHead>Visible</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {services.map((s: any) => (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium">{s.title}</TableCell>
                          <TableCell className="text-sm text-gray-500">{s.slug}</TableCell>
                          <TableCell className="text-sm">{s.icon}</TableCell>
                          <TableCell><Badge variant={s.visible ? 'default' : 'secondary'} className={s.visible ? 'bg-green-100 text-green-700' : ''}>{s.visible ? 'Oui' : 'Non'}</Badge></TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Dialog>
                                <DialogTrigger asChild><Button variant="ghost" size="sm"><Pencil className="w-4 h-4" /></Button></DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                  <ServiceForm initial={s} onSave={async (data) => { await updateItem('/api/services', s.slug, data, services, setServices); }} />
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => deleteItem('/api/services', s.slug, services, setServices)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Team CRUD */}
            {activeTab === 'team' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Équipe</h2>
                  <Dialog>
                    <DialogTrigger asChild><Button className="bg-gdv-gold hover:bg-gdv-gold-light text-white"><Plus className="w-4 h-4 mr-2" />Ajouter</Button></DialogTrigger>
                    <DialogContent>
                      <GenericForm fields={[{ name: 'name', label: 'Nom', required: true }, { name: 'role', label: 'Rôle' }, { name: 'bio', label: 'Bio', type: 'textarea' }, { name: 'photo', label: 'URL de la photo' }]} onSave={async (data) => { await createItem('/api/team', data, team, setTeam); }} />
                    </DialogContent>
                  </Dialog>
                </div>
                <Card>
                  <Table>
                    <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead>Rôle</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {team.map((t: any) => (
                        <TableRow key={t.id}>
                          <TableCell className="font-medium">{t.name}</TableCell>
                          <TableCell className="text-sm text-gray-500">{t.role}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Dialog>
                                <DialogTrigger asChild><Button variant="ghost" size="sm"><Pencil className="w-4 h-4" /></Button></DialogTrigger>
                                <DialogContent><GenericForm initial={t} fields={[{ name: 'name', label: 'Nom', required: true }, { name: 'role', label: 'Rôle' }, { name: 'bio', label: 'Bio', type: 'textarea' }, { name: 'photo', label: 'URL de la photo' }]} onSave={async (data) => { await updateItem('/api/team', t.id, data, team, setTeam); }} /></DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => deleteItem('/api/team', t.id, team, setTeam)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Testimonials CRUD */}
            {activeTab === 'testimonials' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Témoignages</h2>
                  <Dialog>
                    <DialogTrigger asChild><Button className="bg-gdv-gold hover:bg-gdv-gold-light text-white"><Plus className="w-4 h-4 mr-2" />Ajouter</Button></DialogTrigger>
                    <DialogContent>
                      <GenericForm fields={[{ name: 'name', label: 'Nom', required: true }, { name: 'role', label: 'Rôle' }, { name: 'content', label: 'Contenu', type: 'textarea', required: true }, { name: 'rating', label: 'Note (1-5)', type: 'number' }]} onSave={async (data) => { await createItem('/api/testimonials', { ...data, rating: parseInt(data.rating) || 5 }, testimonials, setTestimonials); }} />
                    </DialogContent>
                  </Dialog>
                </div>
                <Card>
                  <Table>
                    <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead>Rôle</TableHead><TableHead>Note</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {testimonials.map((t: any) => (
                        <TableRow key={t.id}>
                          <TableCell className="font-medium">{t.name}</TableCell>
                          <TableCell className="text-sm text-gray-500">{t.role}</TableCell>
                          <TableCell><Badge variant="secondary">{t.rating}/5</Badge></TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Dialog>
                                <DialogTrigger asChild><Button variant="ghost" size="sm"><Pencil className="w-4 h-4" /></Button></DialogTrigger>
                                <DialogContent><GenericForm initial={t} fields={[{ name: 'name', label: 'Nom', required: true }, { name: 'role', label: 'Rôle' }, { name: 'content', label: 'Contenu', type: 'textarea', required: true }, { name: 'rating', label: 'Note (1-5)', type: 'number' }]} onSave={async (data) => { await updateItem('/api/testimonials', t.id, { ...data, rating: parseInt(data.rating) || 5 }, testimonials, setTestimonials); }} /></DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => deleteItem('/api/testimonials', t.id, testimonials, setTestimonials)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Partners CRUD */}
            {activeTab === 'partners' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Partenaires</h2>
                  <Dialog>
                    <DialogTrigger asChild><Button className="bg-gdv-gold hover:bg-gdv-gold-light text-white"><Plus className="w-4 h-4 mr-2" />Ajouter</Button></DialogTrigger>
                    <DialogContent><GenericForm fields={[{ name: 'name', label: 'Nom', required: true }, { name: 'logo', label: 'URL du logo' }, { name: 'website', label: 'Site web' }]} onSave={async (data) => { await createItem('/api/partners', data, partners, setPartners); }} /></DialogContent>
                  </Dialog>
                </div>
                <Card>
                  <Table>
                    <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead>Site web</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {partners.map((p: any) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium">{p.name}</TableCell>
                          <TableCell className="text-sm text-gray-500">{p.website || '-'}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Dialog>
                                <DialogTrigger asChild><Button variant="ghost" size="sm"><Pencil className="w-4 h-4" /></Button></DialogTrigger>
                                <DialogContent><GenericForm initial={p} fields={[{ name: 'name', label: 'Nom', required: true }, { name: 'logo', label: 'URL du logo' }, { name: 'website', label: 'Site web' }]} onSave={async (data) => { await updateItem('/api/partners', p.id, data, partners, setPartners); }} /></DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => deleteItem('/api/partners', p.id, partners, setPartners)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* FAQ CRUD */}
            {activeTab === 'faq' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
                  <Dialog>
                    <DialogTrigger asChild><Button className="bg-gdv-gold hover:bg-gdv-gold-light text-white"><Plus className="w-4 h-4 mr-2" />Ajouter</Button></DialogTrigger>
                    <DialogContent>
                      <GenericForm fields={[{ name: 'question', label: 'Question', required: true }, { name: 'answer', label: 'Réponse', type: 'textarea', required: true }, { name: 'category', label: 'Catégorie' }]} onSave={async (data) => { await createItem('/api/faq', data, faqs, setFaqs); }} />
                    </DialogContent>
                  </Dialog>
                </div>
                <Card>
                  <Table>
                    <TableHeader><TableRow><TableHead>Question</TableHead><TableHead>Catégorie</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {faqs.map((f: any) => (
                        <TableRow key={f.id}>
                          <TableCell className="font-medium max-w-xs truncate">{f.question}</TableCell>
                          <TableCell><Badge variant="secondary">{f.category || 'Général'}</Badge></TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Dialog>
                                <DialogTrigger asChild><Button variant="ghost" size="sm"><Pencil className="w-4 h-4" /></Button></DialogTrigger>
                                <DialogContent><GenericForm initial={f} fields={[{ name: 'question', label: 'Question', required: true }, { name: 'answer', label: 'Réponse', type: 'textarea', required: true }, { name: 'category', label: 'Catégorie' }]} onSave={async (data) => { await updateItem('/api/faq', f.id, data, faqs, setFaqs); }} /></DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => deleteItem('/api/faq', f.id, faqs, setFaqs)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Gallery */}
            {activeTab === 'gallery' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Galerie</h2>
                <Tabs defaultValue="images">
                  <TabsList>
                    <TabsTrigger value="images"><ImageIcon className="w-4 h-4 mr-2" />Images ({galleryImages.length})</TabsTrigger>
                    <TabsTrigger value="videos"><Video className="w-4 h-4 mr-2" />Vidéos ({galleryVideos.length})</TabsTrigger>
                  </TabsList>
                  <TabsContent value="images" className="mt-4">
                    <div className="flex justify-end mb-4">
                      <Dialog>
                        <DialogTrigger asChild><Button className="bg-gdv-gold hover:bg-gdv-gold-light text-white"><Upload className="w-4 h-4 mr-2" />Ajouter une image</Button></DialogTrigger>
                        <DialogContent><GenericForm fields={[{ name: 'title', label: 'Titre' }, { name: 'url', label: 'URL de l\'image', required: true }]} onSave={async (data) => { await createItem('/api/gallery/images', data, galleryImages, setGalleryImages); }} /></DialogContent>
                      </Dialog>
                    </div>
                    <Card>
                      <Table>
                        <TableHeader><TableRow><TableHead>Titre</TableHead><TableHead>Image</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                        <TableBody>
                          {galleryImages.map((img: any) => (
                            <TableRow key={img.id}>
                              <TableCell className="font-medium">{img.title || '-'}</TableCell>
                              <TableCell><img src={img.url} alt={img.title || "Image de galerie"} className="w-16 h-12 object-cover rounded" /></TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => deleteItem('/api/gallery/images', img.id, galleryImages, setGalleryImages)}><Trash2 className="w-4 h-4" /></Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  </TabsContent>
                  <TabsContent value="videos" className="mt-4">
                    <div className="flex justify-end mb-4">
                      <Dialog>
                        <DialogTrigger asChild><Button className="bg-gdv-gold hover:bg-gdv-gold-light text-white"><Upload className="w-4 h-4 mr-2" />Ajouter une vidéo</Button></DialogTrigger>
                        <DialogContent><GenericForm fields={[{ name: 'title', label: 'Titre' }, { name: 'url', label: 'URL de la vidéo', required: true }, { name: 'thumbnail', label: 'Miniature URL' }]} onSave={async (data) => { await createItem('/api/gallery/videos', data, galleryVideos, setGalleryVideos); }} /></DialogContent>
                      </Dialog>
                    </div>
                    <Card>
                      <Table>
                        <TableHeader><TableRow><TableHead>Titre</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                        <TableBody>
                          {galleryVideos.map((v: any) => (
                            <TableRow key={v.id}>
                              <TableCell className="font-medium">{v.title || '-'}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => deleteItem('/api/gallery/videos', v.id, galleryVideos, setGalleryVideos)}><Trash2 className="w-4 h-4" /></Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Ads CRUD */}
            {activeTab === 'ads' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Publicités</h2>
                  <Dialog>
                    <DialogTrigger asChild><Button className="bg-gdv-gold hover:bg-gdv-gold-light text-white"><Plus className="w-4 h-4 mr-2" />Ajouter</Button></DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <AdForm onSave={async (data) => { await createItem('/api/ads', data, ads, setAds); }} />
                    </DialogContent>
                  </Dialog>
                </div>
                <Card>
                  <Table>
                    <TableHeader><TableRow><TableHead>Titre</TableHead><TableHead>Position</TableHead><TableHead>Actif</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {ads.map((a: any) => (
                        <TableRow key={a.id}>
                          <TableCell className="font-medium">{a.title}</TableCell>
                          <TableCell><Badge variant="secondary">{a.position}</Badge></TableCell>
                          <TableCell><Badge variant={a.active ? 'default' : 'secondary'} className={a.active ? 'bg-green-100 text-green-700' : ''}>{a.active ? 'Actif' : 'Inactif'}</Badge></TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Dialog>
                                <DialogTrigger asChild><Button variant="ghost" size="sm"><Pencil className="w-4 h-4" /></Button></DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto"><AdForm initial={a} onSave={async (data) => { await updateItem('/api/ads', a.id, data, ads, setAds); }} /></DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => deleteItem('/api/ads', a.id, ads, setAds)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Contact */}
            {activeTab === 'contact' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages de contact</h2>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead>Email</TableHead><TableHead>Téléphone</TableHead><TableHead>Sujet</TableHead><TableHead>Message</TableHead><TableHead>Date</TableHead><TableHead>Statut</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                      <TableBody>
                        {contacts.map((c: any) => (
                          <TableRow key={c.id} className={c.read ? '' : 'bg-yellow-50/50'}>
                            <TableCell className="font-medium">{c.name}</TableCell>
                            <TableCell className="text-sm">{c.email || '-'}</TableCell>
                            <TableCell className="text-sm">{c.phone || '-'}</TableCell>
                            <TableCell className="text-sm">{c.subject || '-'}</TableCell>
                            <TableCell className="text-sm max-w-[200px] truncate">{c.message}</TableCell>
                            <TableCell className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                            <TableCell>
                              <Badge variant={c.read ? 'secondary' : 'default'} className={c.read ? 'bg-gray-100' : 'bg-gdv-gold text-white'}>
                                {c.read ? 'Lu' : 'Non lu'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {!c.read && (
                                  <Button variant="ghost" size="sm" onClick={async () => { await updateItem('/api/contact', c.id, { read: true }, contacts, setContacts); }} title="Marquer comme lu">
                                    <Check className="w-4 h-4 text-green-600" />
                                  </Button>
                                )}
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => deleteItem('/api/contact', c.id, contacts, setContacts)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Jobs CRUD */}
            {activeTab === 'jobs' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recrutement</h2>
                  <Dialog>
                    <DialogTrigger asChild><Button className="bg-gdv-gold hover:bg-gdv-gold-light text-white"><Plus className="w-4 h-4 mr-2" />Ajouter</Button></DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <GenericForm fields={[{ name: 'title', label: 'Titre du poste', required: true }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'requirements', label: 'Exigences', type: 'textarea' }, { name: 'location', label: 'Lieu' }, { name: 'type', label: 'Type (CDI/CDD)' }]} onSave={async (data) => { await createItem('/api/jobs', data, jobs, setJobs); }} />
                    </DialogContent>
                  </Dialog>
                </div>
                <Card>
                  <Table>
                    <TableHeader><TableRow><TableHead>Titre</TableHead><TableHead>Lieu</TableHead><TableHead>Type</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {jobs.map((j: any) => (
                        <TableRow key={j.id}>
                          <TableCell className="font-medium">{j.title}</TableCell>
                          <TableCell className="text-sm text-gray-500">{j.location || '-'}</TableCell>
                          <TableCell><Badge variant="secondary">{j.type || 'CDI'}</Badge></TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Dialog>
                                <DialogTrigger asChild><Button variant="ghost" size="sm"><Pencil className="w-4 h-4" /></Button></DialogTrigger>
                                <DialogContent className="max-w-2xl"><GenericForm initial={j} fields={[{ name: 'title', label: 'Titre du poste', required: true }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'requirements', label: 'Exigences', type: 'textarea' }, { name: 'location', label: 'Lieu' }, { name: 'type', label: 'Type (CDI/CDD)' }]} onSave={async (data) => { await updateItem('/api/jobs', j.id, data, jobs, setJobs); }} /></DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => deleteItem('/api/jobs', j.id, jobs, setJobs)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Home Sections */}
            {activeTab === 'home' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sections de la page d&apos;accueil</h2>
                <div className="space-y-4">
                  {homeSections.map((section: any) => (
                    <Card key={section.id}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Home className="w-5 h-5 text-gdv-gold" />
                          {section.sectionKey}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-gray-500">Titre</Label>
                            <Input value={section.title || ''} onChange={(e) => setHomeSections(homeSections.map((s: any) => s.id === section.id ? { ...s, title: e.target.value } : s))} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-gray-500">Sous-titre</Label>
                            <Input value={section.subtitle || ''} onChange={(e) => setHomeSections(homeSections.map((s: any) => s.id === section.id ? { ...s, subtitle: e.target.value } : s))} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-gray-500">Contenu</Label>
                          <Textarea value={section.content || ''} onChange={(e) => setHomeSections(homeSections.map((s: any) => s.id === section.id ? { ...s, content: e.target.value } : s))} rows={2} />
                        </div>
                        <Button size="sm" onClick={async () => { const res = await fetch(`/api/home-sections`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(homeSections.find((s: any) => s.id === section.id)) }); if (res.ok) toast({ title: 'Section mise à jour' }); else toast({ title: 'Erreur', variant: 'destructive' }); }} className="bg-gdv-gold hover:bg-gdv-gold-light text-white">
                          <Save className="w-3.5 h-3.5 mr-1.5" /> Sauvegarder
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* About */}
            {activeTab === 'about' && (
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Page À propos</h2>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Titre du hero</Label>
                      <Input value={aboutData.heroTitle || ''} onChange={(e) => setAboutData({ ...aboutData, heroTitle: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Sous-titre du hero</Label>
                      <Input value={aboutData.heroSubtitle || ''} onChange={(e) => setAboutData({ ...aboutData, heroSubtitle: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Mission</Label>
                      <Textarea value={aboutData.mission || ''} onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })} rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label>Vision</Label>
                      <Textarea value={aboutData.vision || ''} onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })} rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label>Valeurs (séparées par des virgules)</Label>
                      <Input value={Array.isArray(aboutData.values) ? aboutData.values.join(', ') : (aboutData.values || '')} onChange={(e) => setAboutData({ ...aboutData, values: e.target.value.split(',').map((v: string) => v.trim()).filter(Boolean) })} placeholder="Excellence, Intégrité, Innovation..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Notre Histoire</Label>
                      <Textarea value={aboutData.story || ''} onChange={(e) => setAboutData({ ...aboutData, story: e.target.value })} rows={5} />
                    </div>
                    <Separator />
                    <Button onClick={async () => {
                      const res = await fetch('/api/about', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...aboutData, values: JSON.stringify(aboutData.values || []) }) });
                      if (res.ok) toast({ title: 'Page À propos mise à jour' }); else toast({ title: 'Erreur de sauvegarde', variant: 'destructive' });
                    }} className="bg-gdv-gold hover:bg-gdv-gold-light text-white">
                      <Save className="w-4 h-4 mr-2" /> Sauvegarder
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// Reusable GenericForm
function GenericForm({ initial, fields, onSave }: { initial?: Record<string, any>; fields: { name: string; label: string; type?: string; required?: boolean }[]; onSave: (data: Record<string, any>) => Promise<void> }) {
  const [data, setData] = useState<Record<string, any>>(initial || {});
  const { toast } = useToast();

  const handleSave = async () => {
    for (const f of fields) {
      if (f.required && !data[f.name]) {
        toast({ title: `Le champ "${f.label}" est obligatoire`, variant: 'destructive' });
        return;
      }
    }
    await onSave(data);
    toast({ title: 'Sauvegardé avec succès' });
  };

  return (
    <>
      <DialogHeader><DialogTitle>{initial ? 'Modifier' : 'Ajouter'}</DialogTitle></DialogHeader>
      <div className="space-y-4 pt-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
            {field.type === 'textarea' ? (
              <Textarea value={data[field.name] || ''} onChange={(e) => setData({ ...data, [field.name]: e.target.value })} rows={3} />
            ) : (
              <Input type={field.type === 'number' ? 'number' : 'text'} value={data[field.name] || ''} onChange={(e) => setData({ ...data, [field.name]: e.target.value })} />
            )}
          </div>
        ))}
        <Button onClick={handleSave} className="bg-gdv-gold hover:bg-gdv-gold-light text-white w-full">
          <Save className="w-4 h-4 mr-2" /> Sauvegarder
        </Button>
      </div>
    </>
  );
}

// Service form
function ServiceForm({ initial, onSave }: { initial?: Record<string, any>; onSave: (data: Record<string, any>) => Promise<void> }) {
  const [data, setData] = useState<Record<string, any>>(initial || { icon: 'Plane', visible: true });
  const { toast } = useToast();

  const handleSave = async () => {
    if (!data.title || !data.slug) {
      toast({ title: 'Titre et slug sont obligatoires', variant: 'destructive' });
      return;
    }
    const features = data.featuresText ? data.featuresText.split('\n').filter(Boolean) : (data.features || []);
    await onSave({ ...data, features: JSON.stringify(features) });
    toast({ title: 'Service sauvegardé' });
  };

  return (
    <>
      <DialogHeader><DialogTitle>{initial ? 'Modifier le service' : 'Ajouter un service'}</DialogTitle></DialogHeader>
      <div className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Titre *</Label><Input value={data.title || ''} onChange={(e) => setData({ ...data, title: e.target.value })} /></div>
          <div className="space-y-2"><Label>Slug *</Label><Input value={data.slug || ''} onChange={(e) => setData({ ...data, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} /></div>
        </div>
        <div className="space-y-2"><Label>Icône</Label><Input value={data.icon || ''} onChange={(e) => setData({ ...data, icon: e.target.value })} placeholder="Plane, Ticket, Passport, Hotel, ShieldCheck, Car, Package" /></div>
        <div className="space-y-2"><Label>Courte description</Label><Input value={data.shortDesc || ''} onChange={(e) => setData({ ...data, shortDesc: e.target.value })} /></div>
        <div className="space-y-2"><Label>Description complète</Label><Textarea value={data.description || ''} onChange={(e) => setData({ ...data, description: e.target.value })} rows={4} /></div>
        <div className="space-y-2">
          <Label>Fonctionnalités (une par ligne)</Label>
          <Textarea value={data.featuresText || (Array.isArray(data.features) ? data.features.join('\n') : '')} onChange={(e) => setData({ ...data, featuresText: e.target.value })} rows={4} placeholder="Vols domestiques et internationaux&#10;Comparaison de prix&#10;Options flexibles" />
        </div>
        <Button onClick={handleSave} className="bg-gdv-gold hover:bg-gdv-gold-light text-white w-full"><Save className="w-4 h-4 mr-2" />Sauvegarder</Button>
      </div>
    </>
  );
}

// Ad form
function AdForm({ initial, onSave }: { initial?: Record<string, any>; onSave: (data: Record<string, any>) => Promise<void> }) {
  const [data, setData] = useState<Record<string, any>>(initial || { position: 'popup', active: true });
  const { toast } = useToast();

  const handleSave = async () => {
    if (!data.title) {
      toast({ title: 'Le titre est obligatoire', variant: 'destructive' });
      return;
    }
    await onSave(data);
    toast({ title: 'Publicité sauvegardée' });
  };

  return (
    <>
      <DialogHeader><DialogTitle>{initial ? 'Modifier la publicité' : 'Ajouter une publicité'}</DialogTitle></DialogHeader>
      <div className="space-y-4 pt-4">
        <div className="space-y-2"><Label>Titre *</Label><Input value={data.title || ''} onChange={(e) => setData({ ...data, title: e.target.value })} /></div>
        <div className="space-y-2"><Label>Description</Label><Textarea value={data.description || ''} onChange={(e) => setData({ ...data, description: e.target.value })} rows={2} /></div>
        <div className="space-y-2"><Label>URL de l&apos;image</Label><Input value={data.imageUrl || ''} onChange={(e) => setData({ ...data, imageUrl: e.target.value })} /></div>
        <div className="space-y-2"><Label>URL du lien</Label><Input value={data.linkUrl || ''} onChange={(e) => setData({ ...data, linkUrl: e.target.value })} /></div>
        <div className="space-y-2"><Label>Message WhatsApp</Label><Input value={data.whatsappMsg || ''} onChange={(e) => setData({ ...data, whatsappMsg: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Position</Label>
            <select value={data.position || 'popup'} onChange={(e) => setData({ ...data, position: e.target.value })} className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm">
              <option value="popup">Popup</option>
              <option value="banner">Bannière</option>
              <option value="inline">Inline</option>
            </select>
          </div>
          <div className="space-y-2 flex flex-col">
            <Label>Actif</Label>
            <Switch checked={data.active !== false} onCheckedChange={(checked) => setData({ ...data, active: checked })} />
          </div>
        </div>
        <Button onClick={handleSave} className="bg-gdv-gold hover:bg-gdv-gold-light text-white w-full"><Save className="w-4 h-4 mr-2" />Sauvegarder</Button>
      </div>
    </>
  );
}
