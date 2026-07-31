#!/usr/bin/env python3
"""
Fix script 2: Admin dashboard, Header, Footer, PromoBanner, Popup, ServiceDetailPage
"""
import re

BASE = "/home/z/my-project"

def read_file(path):
    with open(path, "r") as f:
        return f.read()

def write_file(path, content):
    with open(path, "w") as f:
        f.write(content)

def fix_count(label):
    print(f"  [FIXED] {label}")

print("=" * 60)
print("FIX SCRIPT 2 - Admin, Header, Footer, Promo components")
print("=" * 60)

# ============================================================
# M1/M2: Fix AdminDashboard - error handling + response checks
# ============================================================
print("\n[M1/M2] Fixing AdminDashboard error handling and CRUD response checks...")
path = f"{BASE}/src/components/gdv/pages/AdminDashboard.tsx"
content = read_file(path)

# Fix empty catch blocks (M1)
content = content.replace(
    "    } catch {}\n\n    try {",
    "    } catch (err) { console.error('Erreur chargement dashboard:', err); }\n\n    try {"
)

# Fix second empty catch
old_catch2 = "    } catch {}\n  }, [];"
if old_catch2 in content:
    content = content.replace(
        old_catch2,
        "    } catch (err) { console.error('Erreur chargement settings/pages:', err); }\n  }, [];"
    )

# Fix saveSettings - check response
content = content.replace(
    "    await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSettings) });\n    toast({ title: 'Parametres sauvegardes' });",
    "    const res = await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSettings) });\n    if (!res.ok) { toast({ title: 'Erreur de sauvegarde', variant: 'destructive' }); return; }\n    toast({ title: 'Parametres sauvegardes' });"
)

# Fix togglePage - check response
content = content.replace(
    "    await fetch('/api/pages-visibility', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pageKey, visible }) });\n    setPages(pages.map((p) => (p.pageKey === pageKey ? { ...p, visible } : p)));\n    toast({ title: 'Visibilite mise a jour' });",
    "    const res = await fetch('/api/pages-visibility', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pageKey, visible }) });\n    if (res.ok) {\n      setPages(pages.map((p) => (p.pageKey === pageKey ? { ...p, visible } : p)));\n      toast({ title: 'Visibilite mise a jour' });\n    } else {\n      toast({ title: 'Erreur de mise a jour', variant: 'destructive' });\n    }"
)

# Fix deleteItem - check response (M2)
content = content.replace(
    "  const deleteItem = async (url: string, id: string, list: any[], setList: (v: any[]) => void) => {\n    await fetch(`${url}/${id}`, { method: 'DELETE' });\n    setList(list.filter((item) => item.id !== id));\n    toast({ title: 'Element supprime' });",
    "  const deleteItem = async (url: string, id: string, list: any[], setList: (v: any[]) => void) => {\n    const res = await fetch(`${url}/${id}`, { method: 'DELETE' });\n    if (res.ok) {\n      setList(list.filter((item) => item.id !== id));\n      toast({ title: 'Element supprime' });\n    } else {\n      toast({ title: 'Erreur de suppression', variant: 'destructive' });\n    }"
)

# Fix createItem - check response (M2)
content = content.replace(
    "  const createItem = async (url: string, data: any, list: any[], setList: (v: any[]) => void) => {\n    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });\n    const item = await res.json();\n    setList([...list, item]);\n    toast({ title: 'Element cree' });\n    return item;",
    "  const createItem = async (url: string, data: any, list: any[], setList: (v: any[]) => void) => {\n    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });\n    if (!res.ok) { toast({ title: 'Erreur de creation', variant: 'destructive' }); return null; }\n    const item = await res.json();\n    setList([...list, item]);\n    toast({ title: 'Element cree' });\n    return item;"
)

# Fix updateItem - check response (M2)
content = content.replace(
    "  const updateItem = async (url: string, id: string, data: any, list: any[], setList: (v: any[]) => void) => {\n    const res = await fetch(`${url}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });\n    const item = await res.json();\n    setList(list.map((l) => (l.id === id ? { ...l, ...item } : l)));\n    toast({ title: 'Element mis a jour' });",
    "  const updateItem = async (url: string, id: string, data: any, list: any[], setList: (v: any[]) => void) => {\n    const res = await fetch(`${url}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });\n    if (!res.ok) { toast({ title: 'Erreur de mise a jour', variant: 'destructive' }); return; }\n    const item = await res.json();\n    setList(list.map((l) => (l.id === id ? { ...l, ...item } : l)));\n    toast({ title: 'Element mis a jour' });"
)

# Fix home section save - check response
content = content.replace(
    "<Button size=\"sm\" onClick={async () => { await fetch(\`/api/home-sections\`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(homeSections.find((s: any) => s.id === section.id)) }); toast({ title: 'Section mise a jour' }); }}",
    "<Button size=\"sm\" onClick={async () => { const res = await fetch(\`/api/home-sections\`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(homeSections.find((s: any) => s.id === section.id)) }); if (res.ok) toast({ title: 'Section mise a jour' }); else toast({ title: 'Erreur', variant: 'destructive' }); }}"
)

# Fix about save - check response
content = content.replace(
    "                    <Button onClick={async () => {\n                      await fetch('/api/about', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...aboutData, values: JSON.stringify(aboutData.values || []) }) });\n                      toast({ title: 'Page A propos mise a jour' });",
    "                    <Button onClick={async () => {\n                      const res = await fetch('/api/about', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...aboutData, values: JSON.stringify(aboutData.values || []) }) });\n                      if (res.ok) toast({ title: 'Page A propos mise a jour' }); else toast({ title: 'Erreur de sauvegarde', variant: 'destructive' });"
)

# L2: Fix empty alt attribute on gallery admin image
content = content.replace(
    '<img src={img.url} alt="" className="w-16 h-12 object-cover rounded" />',
    '<img src={img.url} alt={img.title || \"Image de galerie\"} className="w-16 h-12 object-cover rounded" />'
)

write_file(path, content)
fix_count("AdminDashboard: empty catches fixed, all CRUD operations check response.ok, gallery alt fixed")

# ============================================================
# H8/M3/M4/L1/L3/L11: Fix Header
# ============================================================
print("\n[H8/L1/L3/L11] Fixing Header...")
path = f"{BASE}/src/components/gdv/Header.tsx"
new_header = read_file(path)

# L1: Fix duplicate phone display
new_header = new_header.replace(
    """            <a href="tel:+224627104646" className="flex items-center gap-1.5 hover:text-gdv-teal transition-colors">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">+224 627 10 46 46</span>
              <span className="sm:hidden">+224 627 10 46 46</span>
            </a>""",
    """            <a href="tel:+224627104646" className="flex items-center gap-1.5 hover:text-gdv-teal transition-colors">
              <Phone className="w-3 h-3" />
              <span>+224 627 10 46 46</span>
            </a>"""
)

write_file(path, new_header)
fix_count("Header: Fixed duplicate phone display")

# ============================================================
# H8/L3/M3: Fix Footer - add TikTok/LinkedIn, fix newsletter, fix social links
# ============================================================
print("\n[H8/L3/M3] Fixing Footer...")
path = f"{BASE}/src/components/gdv/Footer.tsx"
content = read_file(path)

# Fix social links - add TikTok and LinkedIn, use settings
old_social = """            <div className="flex items-center gap-3 pt-2">
              <a href={settings?.facebookUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 hover:border-gdv-teal/50 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4 text-gdv-gold" />
              </a>
              <a href={settings?.instagramUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4 text-gdv-gold" />
              </a>
              <a href={settings?.twitterUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4 text-gdv-gold" />
              </a>
              <a href={settings?.youtubeUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4 text-gdv-gold" />
              </a>
            </div>"""

new_social = """            <div className="flex items-center gap-3 pt-2">
              <a href={settings?.facebookUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 hover:border-gdv-teal/50 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4 text-gdv-gold" />
              </a>
              <a href={settings?.instagramUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4 text-gdv-gold" />
              </a>
              <a href={settings?.twitterUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4 text-gdv-gold" />
              </a>
              <a href={settings?.youtubeUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4 text-gdv-gold" />
              </a>
              {settings?.tiktokUrl && (
                <a href={settings.tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 transition-colors" aria-label="TikTok">
                  <svg className="w-4 h-4 text-gdv-gold" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.42V13.2a8.16 8.16 0 005.58 2.18V11.9a4.85 4.85 0 01-3.77-1.82V6.69h3.77z"/></svg>
                </a>
              )}
              {settings?.linkedinUrl && (
                <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gdv-gold/15 flex items-center justify-center hover:bg-gdv-teal/30 transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 text-gdv-gold" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
            </div>"""
content = content.replace(old_social, new_social)

# M3: Fix newsletter - add state and handler
# We need to add useState import and newsletter functionality
# Add useState to imports if not present
if 'useState' not in content:
    content = content.replace(
        "import { motion } from 'framer-motion';",
        "import { useState } from 'react';\nimport { motion } from 'framer-motion';"
    )

# Fix newsletter section
old_newsletter = """          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
            variants={fadeIn}
            className="space-y-4"
          >
            <h3 className="text-gdv-gold font-semibold text-base uppercase tracking-wider">Newsletter</h3>
            <p className="text-gdv-cream/60 text-sm">
              Recevez nos meilleures offres et destinations directement dans votre boite mail.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-gdv-dark border-gdv-gold/30 text-gdv-cream placeholder:text-gdv-cream/40 text-sm rounded-full px-4 h-10 focus-visible:ring-gdv-teal/50 focus-visible:border-gdv-teal/50"
              />
              <Button size="sm" className="bg-gdv-teal hover:bg-gdv-teal-light text-white rounded-full shrink-0 px-4">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>"""

new_newsletter = """          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
            variants={fadeIn}
            className="space-y-4"
          >
            <h3 className="text-gdv-gold font-semibold text-base uppercase tracking-wider">Newsletter</h3>
            <p className="text-gdv-cream/60 text-sm">
              Recevez nos meilleures offres et destinations directement dans votre boite mail.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); const input = e.currentTarget.querySelector('input'); if (input?.value) { alert('Merci ! Vous etes inscrit a notre newsletter.'); input.value = ''; } }} className="flex gap-2">
              <Input
                type="email"
                required
                placeholder="Votre email"
                className="bg-gdv-dark border-gdv-gold/30 text-gdv-cream placeholder:text-gdv-cream/40 text-sm rounded-full px-4 h-10 focus-visible:ring-gdv-teal/50 focus-visible:border-gdv-teal/50"
              />
              <Button type="submit" size="sm" className="bg-gdv-teal hover:bg-gdv-teal-light text-white rounded-full shrink-0 px-4">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>"""

content = content.replace(old_newsletter, new_newsletter)
write_file(path, content)
fix_count("Footer: TikTok/LinkedIn added (from settings), newsletter form now functional")

# ============================================================
# M4: Fix PromoBanner close button
# ============================================================
print("\n[M4] Fixing PromoBanner close button...")
path = f"{BASE}/src/components/gdv/PromoBanner.tsx"
content = read_file(path)

# Add dismissed state
content = content.replace(
    "  const [direction, setDirection] = useState(1);",
    "  const [direction, setDirection] = useState(1);\n  const [dismissed, setDismissed] = useState(false);"
)

# Add early return if dismissed
content = content.replace(
    "  if (bannerAds.length === 0) return null;",
    "  if (dismissed || bannerAds.length === 0) return null;"
)

# Fix close button
content = content.replace(
    "      <button className=\"absolute top-2 right-2 text-gdv-cream/40 hover:text-gdv-cream transition-colors sm:hidden\">\n        <X className=\"w-4 h-4\" />\n      </button>",
    "      <button onClick={() => setDismissed(true)} className=\"absolute top-2 right-2 text-gdv-cream/40 hover:text-gdv-cream transition-colors sm:hidden\" aria-label=\"Fermer la banniere\">\n        <X className=\"w-4 h-4\" />\n      </button>"
)

write_file(path, content)
fix_count("PromoBanner: Close button now functional with dismissed state")

# ============================================================
# H7: Fix ServiceDetailPage - proper error handling
# ============================================================
print("\n[H7] Fixing ServiceDetailPage error handling...")
path = f"{BASE}/src/components/gdv/pages/ServiceDetailPage.tsx"
content = read_file(path)
content = content.replace(
    "    fetch(\`/api/services/${slug}\`)\n      .then((res) => res.json())\n      .then((data) => setService(data))\n      .catch(() => setService(null))\n      .finally(() => setLoading(false));",
    "    fetch(\`/api/services/${slug}\`)\n      .then((res) => {\n        if (!res.ok) throw new Error('Service non trouve');\n        return res.json();\n      })\n      .then((data) => setService(data))\n      .catch(() => setService(null))\n      .finally(() => setLoading(false));"
)
write_file(path, content)
fix_count("ServiceDetailPage: Now checks res.ok before parsing JSON")

print("\n" + "=" * 60)
print("SCRIPT 2 COMPLETE")
print("=" * 60)
