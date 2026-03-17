'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Clock, Phone, MapPin, Clock4, Wrench, Sparkles, Shield, 
  ChevronRight, ChevronDown, Menu, X, Languages, 
  Instagram, Award, Zap, Settings, Heart, Briefcase
} from 'lucide-react'

// Language types
type Language = 'ru' | 'uz'

// All translations from brandbook
const translations: Record<string, Record<Language, string>> = {
  // Navigation
  navHome: { ru: 'Главная', uz: 'Bosh sahifa' },
  navAbout: { ru: 'О нас', uz: 'Biz haqimizda' },
  navServices: { ru: 'Услуги', uz: 'Xizmatlar' },
  navContacts: { ru: 'Контакты', uz: 'Aloqa' },
  
  // Hero
  heroTitle: { ru: 'CHASOVSHIK.UZ', uz: 'CHASOVSHIK.UZ' },
  heroSubtitle: { ru: 'СЕРВИС ЧАСОВ', uz: 'SOAT SERVICE' },
  heroDesc: { ru: 'Ремонт и сервис швейцарских часов', uz: 'Shveytsariya soatlarini ta\'mirlash va xizmat' },
  heroYears: { ru: '10+ лет опыта', uz: '10+ yillik tajriba' },
  heroFounded: { ru: 'Основан в 2013 году', uz: '2013 yilda tashkil etilgan' },
  heroBtn: { ru: 'Наши услуги', uz: 'Xizmatlarimiz' },
  heroContact: { ru: 'Связаться', uz: 'Bog\'lanish' },
  
  // About section
  aboutTitle: { ru: 'О нас', uz: 'Biz haqimizda' },
  aboutDesc: { 
    ru: 'Профессиональный сервис по ремонту и обслуживанию швейцарских часов. Более 10 лет опыта в часовом деле.', 
    uz: 'Shveytsariya soatlarini ta\'mirlash va xizmat ko\'rsatish bo\'yicha professional xizmat. Soat ishida 10 yildan ortiq tajriba.' 
  },
  
  // Advantages from brandbook
  advTitle: { ru: 'Наши преимущества', uz: 'Bizning afzalliklarimiz' },
  adv1Title: { ru: 'Удобная локация', uz: 'Qulay joylashuv' },
  adv1Desc: { ru: 'Мастерские в 2 точках центра города', uz: 'Shahar markazida 2 nuqtada ustaxonalar' },
  adv2Title: { ru: '10 лет опыта', uz: '10 yillik tajriba' },
  adv2Desc: { ru: 'Профессиональный ремонт любой сложности', uz: 'Har qanday murakkablikdagi professional ta\'mirlash' },
  adv3Title: { ru: 'Решение сложных задач', uz: 'Murakkab vazifalarni yechish' },
  adv3Desc: { ru: 'Диагностика, подбор деталей, реализация', uz: 'Diagnostika, detallarni tanlash, amalga oshirish' },
  adv4Title: { ru: 'Редкие запчасти', uz: 'Kam uchraydigan ehtiyot qismlar' },
  adv4Desc: { ru: 'Оригинальные запчасти из Швейцарии', uz: 'Shveytsariyadan original ehtiyot qismlar' },
  adv5Title: { ru: 'Бережное обращение', uz: 'Ehtiyotkorlik bilan ishlash' },
  adv5Desc: { ru: 'Регистрация и хранение в сейфе', uz: 'Ro\'yxatga olish va seyfda saqlash' },
  adv6Title: { ru: 'Экспресс ремонт', uz: 'Tezkor ta\'mirlash' },
  adv6Desc: { ru: 'Срочный ремонт: батарейки, стекло, ремешок', uz: 'Shoshilinch ta\'mirlash: batareya, oyna, tasma' },
  
  // Services from brandbook
  servicesTitle: { ru: 'Наши услуги', uz: 'Bizning xizmatlar' },
  service1Title: { ru: 'Репасаж', uz: 'Repasaj' },
  service1Desc: { ru: 'Полная разборка, чистка, смазка и сборка механизма. Рекомендуется каждые 3-5 лет.', uz: 'Mexanizmni to\'liq ajratish, tozalash, moylash va yig\'ish. Har 3-5 yilda tavsiya etiladi.' },
  service2Title: { ru: 'Полировка металлов', uz: 'Metallarni sayqallash' },
  service2Desc: { ru: 'Бережная полировка золота, платины, серебра. Удаление царапин и потёртостей.', uz: 'Oltin, platina, kumushni ehtiyotkorlik bilan sayqallash. Shikastlarni olib tashlash.' },
  service3Title: { ru: 'Вытачивание стёкол', uz: 'Oynalarni ishlash' },
  service3Desc: { ru: 'Вытачивание стёкол любой формы для vintage и современных часов.', uz: 'Vintage va zamonaviy soatlar uchun har qanday shakldagi oynalarni ishlash.' },
  service4Title: { ru: 'Замена батарейки', uz: 'Batareya almashtirish' },
  service4Desc: { ru: 'Быстрая замена с проверкой герметичности. Экспресс-сервис.', uz: 'Germetiklikni tekshirish bilan tez almashtirish. Tezkor xizmat.' },
  service5Title: { ru: 'Пошив ремешков', uz: 'Tasma tikish' },
  service5Desc: { ru: 'Пошив кожаных ремешков под заказ. Индивидуальный подбор.', uz: 'Buyurtma asosida charm tasmalar tikish. Individual tanlov.' },
  service6Title: { ru: 'Реставрация антиквариата', uz: 'Antikvariatni tiklash' },
  service6Desc: { ru: 'Восстановление старинных и коллекционных часов.', uz: 'Qadimiy va kolleksiya soatlarini tiklash.' },
  
  // Safety
  safetyTitle: { ru: 'Безопасность', uz: 'Xavfsizlik' },
  safetyDesc: { ru: 'Сейф для хранения • Аккуратность персонала • Регистрация клиентов', uz: 'Seyfda saqlash • Xodimlarning ehtiyotkorligi • Mijozlarni ro\'yxatga olish' },
  
  // Contacts
  contactsTitle: { ru: 'Контакты', uz: 'Aloqa' },
  location1Name: { ru: 'ТЦ NEXT, 1 этаж', uz: 'NEXT SM, 1-qavat' },
  location1Address: { ru: 'Ташкент, Торговый центр NEXT', uz: 'Toshkent, NEXT savdo markazi' },
  location2Name: { ru: 'Дархан часовой сервис', uz: 'Darhan soat xizmati' },
  location2Address: { ru: 'Ташкент, Дархан', uz: 'Toshkent, Darhan' },
  workingHours: { ru: 'Пн-Сб: 10:00 - 20:00', uz: 'Du-Sha: 10:00 - 20:00' },
  
  // Gallery
  galleryTitle: { ru: 'Наши работы', uz: 'Bizning ishlar' },
  galleryInterior: { ru: 'Интерьер мастерской', uz: 'Ustaxona interyeri' },
  galleryDisplay: { ru: 'Витрина с часами', uz: 'Soatlar vitrinasi' },
  workingHoursLabel: { ru: 'Часы работы:', uz: 'Ish vaqti:' },
  
  // Footer
  footerRights: { ru: 'Все права защищены', uz: 'Barcha huquqlar himoyalangan' },
  footerInst: { ru: 'Подписывайтесь на нас в Instagram', uz: 'Instagramda bizga obuna bo\'ling' },
}

// Services data
const services = [
  { icon: Settings, titleKey: 'service1Title', descKey: 'service1Desc' },
  { icon: Sparkles, titleKey: 'service2Title', descKey: 'service2Desc' },
  { icon: Shield, titleKey: 'service3Title', descKey: 'service3Desc' },
  { icon: Zap, titleKey: 'service4Title', descKey: 'service4Desc' },
  { icon: Heart, titleKey: 'service5Title', descKey: 'service5Desc' },
  { icon: Briefcase, titleKey: 'service6Title', descKey: 'service6Desc' },
]

// Advantages data
const advantages = [
  { icon: MapPin, titleKey: 'adv1Title', descKey: 'adv1Desc' },
  { icon: Award, titleKey: 'adv2Title', descKey: 'adv2Desc' },
  { icon: Wrench, titleKey: 'adv3Title', descKey: 'adv3Desc' },
  { icon: Shield, titleKey: 'adv4Title', descKey: 'adv4Desc' },
  { icon: Clock, titleKey: 'adv5Title', descKey: 'adv5Desc' },
  { icon: Zap, titleKey: 'adv6Title', descKey: 'adv6Desc' },
]

export default function Home() {
  const [lang, setLang] = useState<Language>('ru')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Translation function
  const t = (key: string): string => {
    return translations[key]?.[lang] || key
  }

  // Scroll to section
  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'contacts']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-[#D4AF37] rounded flex items-center justify-center">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold tracking-wider">CHASOVSHIK</h1>
                <p className="text-xs text-[#D4AF37] tracking-widest">.UZ</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'home', label: t('navHome') },
                { id: 'about', label: t('navAbout') },
                { id: 'services', label: t('navServices') },
                { id: 'contacts', label: t('navContacts') },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm uppercase tracking-wider transition-colors pb-1 ${
                    activeSection === item.id
                      ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                      : 'text-white/70 hover:text-[#D4AF37]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Language & Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLang(lang === 'ru' ? 'uz' : 'ru')}
                className="flex items-center gap-2 px-3 py-2 border border-[#D4AF37]/30 rounded hover:border-[#D4AF37] transition-colors"
              >
                <Languages className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm">{lang === 'ru' ? 'UZ' : 'RU'}</span>
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/10 animate-slide-in">
            <div className="px-4 py-4 space-y-3">
              {[
                { id: 'home', label: t('navHome') },
                { id: 'about', label: t('navAbout') },
                { id: 'services', label: t('navServices') },
                { id: 'contacts', label: t('navContacts') },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-3 px-4 rounded transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                      : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/storefront.png" 
            alt="CHASOVSHIK Storefront"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#D4AF37]/30 m-4" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#D4AF37]/30 m-4" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-[#D4AF37] text-sm md:text-base tracking-[0.3em] uppercase mb-4">
              {t('heroSubtitle')}
            </p>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-6 animate-slide-up text-[#D4AF37]" style={{ animationDelay: '0.4s' }}>
            {t('heroTitle')}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            {t('heroDesc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <Button
              onClick={() => scrollToSection('services')}
              className="btn-gold px-8 py-4 text-lg rounded-none"
            >
              {t('heroBtn')}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => scrollToSection('contacts')}
              variant="outline"
              className="px-8 py-4 text-lg rounded-none border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            >
              {t('heroContact')}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-white/60 animate-slide-up" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D4AF37]" />
              <span>{t('heroYears')}</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
              <span>{t('heroFounded')}</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#D4AF37]" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('aboutTitle')}</h2>
            <div className="section-divider" />
          </div>

          {/* About Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                {t('aboutDesc')}
              </p>
              
              {/* Safety Info */}
              <div className="p-6 border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="text-xl font-semibold text-[#D4AF37]">{t('safetyTitle')}</h3>
                </div>
                <p className="text-white/60">{t('safetyDesc')}</p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/interior-main.jpg" 
                alt="CHASOVSHIK Interior"
                className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 border-2 border-[#D4AF37] -translate-x-4 -translate-y-4 -z-10" />
            </div>
          </div>

          {/* Advantages Grid */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">{t('advTitle')}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, index) => {
              const Icon = adv.icon
              return (
                <div 
                  key={index}
                  className="service-card p-6 bg-[#0A0A0A] border border-white/10 hover:border-[#D4AF37]/50"
                >
                  <div className="feature-icon mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{t(adv.titleKey)}</h4>
                  <p className="text-white/60 text-sm">{t(adv.descKey)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('servicesTitle')}</h2>
            <div className="section-divider" />
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card 
                  key={index}
                  className="service-card p-6 bg-black border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                      <Icon className="w-7 h-7 text-[#D4AF37]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">
                        {t(service.titleKey)}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {t(service.descKey)}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button
              onClick={() => scrollToSection('contacts')}
              className="btn-gold px-10 py-5 text-lg rounded-none"
            >
              {t('heroContact')}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('galleryTitle')}</h2>
            <div className="section-divider" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden">
              <img 
                src="/interior2.png" 
                alt="Watch Service Interior"
                className="w-full h-[300px] md:h-[400px] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white">{t('galleryInterior')}</p>
              </div>
            </div>
            <div className="relative group overflow-hidden">
              <img 
                src="/interior-main.jpg" 
                alt="Watch Display"
                className="w-full h-[300px] md:h-[400px] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white">{t('galleryDisplay')}</p>
              </div>
            </div>
          </div>

          {/* Instagram CTA */}
          <div className="text-center mt-12">
            <a 
              href="https://instagram.com/chasovshik.uz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[#D4AF37] hover:text-[#F5D76E] transition-colors"
            >
              <Instagram className="w-6 h-6" />
              <span>{t('footerInst')}</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 md:py-32 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contactsTitle')}</h2>
            <div className="section-divider" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Location 1 */}
            <div className="location-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#D4AF37] mb-2">{t('location1Name')}</h3>
                  <p className="text-white/70 mb-4">{t('location1Address')}</p>
                  <a 
                    href="tel:+998998049004" 
                    className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-lg">+998 99 804 90 04</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Location 2 */}
            <div className="location-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#D4AF37] mb-2">{t('location2Name')}</h3>
                  <p className="text-white/70 mb-4">{t('location2Address')}</p>
                  <a 
                    href="tel:+998958389999" 
                    className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-lg">+998 95 838 99 99</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex items-center justify-center gap-4 p-6 bg-black border border-white/10 max-w-md mx-auto">
            <Clock4 className="w-6 h-6 text-[#D4AF37]" />
            <div>
              <p className="text-white/60 text-sm">{t('workingHoursLabel')}</p>
              <p className="text-white font-semibold">{t('workingHours')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-[#D4AF37] rounded flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-sm text-white/60">© 2013-2025 CHASOVSHIK.UZ</p>
                <p className="text-xs text-white/40">{t('footerRights')}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a 
                href="https://instagram.com/chasovshik.uz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#D4AF37] transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="tel:+998998049004"
                className="text-white/60 hover:text-[#D4AF37] transition-colors"
              >
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
