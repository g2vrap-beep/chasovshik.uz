'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Clock, Phone, MapPin, Clock4, Wrench, Sparkles, Shield, ChevronRight, X, Briefcase, Heart, Instagram, Languages } from 'lucide-react'

// Language types
type Language = 'ru' | 'uz'
type Translations = Record<string, Record<Language, string>>

// All translations
const translations: Translations = {
  // Entrance
  serviceCenter: { ru: 'Сервис центр швейцарских часов', uz: 'Shveytsariya soatlari xizmat markazi' },
  enter: { ru: 'ВОЙТИ', uz: 'KIRISH' },
  clickToEnter: { ru: 'Нажмите, чтобы войти', uz: 'Kirish uchun bosing' },
  yearsExperience: { ru: '12+ лет опыта', uz: '12+ yillik tajriba' },
  branchesInTashkent: { ru: '2 филиала в Ташкенте', uz: 'Toshkentda 2 filial' },
  
  // Interior
  exit: { ru: 'Выход', uz: 'Chiqish' },
  works: { ru: 'РАБОТЫ', uz: 'ISHLAR' },
  worksExample: { ru: 'Примеры работ', uz: 'Ish namunalari' },
  contacts: { ru: 'КОНТАКТЫ', uz: 'ALOQA' },
  masterDesk: { ru: 'Стол мастера', uz: 'Usta stoli' },
  watches: { ru: 'ЧАСЫ', uz: 'SOATLAR' },
  watchesSale: { ru: 'Продажа часов', uz: 'Soatlar sotuvi' },
  welcome: { ru: 'Добро пожаловать! Выберите, что вас интересует', uz: 'Xush kelibsiz! Qiziqtirgan narsangizni tanlang' },
  
  // Works
  ourWorks: { ru: 'Примеры наших работ', uz: 'Bizning ish namunalari' },
  back: { ru: 'Назад', uz: 'Orqaga' },
  eachRepairStory: { ru: 'Каждый ремонт — это история восстановления. Посмотрите примеры наших работ.', uz: 'Har bir ta\'mirlash - bu tiklanish tarixi. Ish namunalarimizni ko\'ring.' },
  moreWorksInstagram: { ru: 'Больше работ в нашем Instagram:', uz: 'Ko\'proq ishlar bizning Instagramda:' },
  
  // Contact
  workingHours: { ru: 'Часы работы', uz: 'Ish vaqti' },
  monSat: { ru: 'Пн-Сб: 10:00 - 20:00', uz: 'Du-Sha: 10:00 - 20:00' },
  subscribe: { ru: 'Подписывайтесь на нас!', uz: 'Bizga obuna bo\'ling!' },
  reviews: { ru: 'отзывов', uz: 'sharhlar' },
  
  // Sale
  watchesForSale: { ru: 'Часы на продажу', uz: 'Sotuvdagi soatlar' },
  alwaysInStock: { ru: 'У нас всегда в наличии оригинальные швейцарские часы. Приходите в мастерскую или свяжитесь с нами для уточнения наличия.', uz: 'Bizda doimo original shveytsariya soatlari mavjud. Ustaxonaga tashrif buyuring yoki mavjudlikni bilish uchun biz bilan bog\'laning.' },
  authenticityGuarantee: { ru: 'Гарантия подлинности', uz: 'Haqiqiylik kafolati' },
  originalParts: { ru: 'Оригинальные запчасти', uz: 'Original ehtiyot qismlar' },
  individualSelection: { ru: 'Индивидуальный подбор', uz: 'Individual tanlov' },
  contactUs: { ru: 'Связаться с нами', uz: 'Biz bilan bog\'laning' },
  contactMaster: { ru: 'Связаться с мастером', uz: 'Usta bilan bog\'laning' },
  ourWorkExample: { ru: 'Пример нашей работы. Для уточнения деталей обратитесь к мастеру.', uz: 'Bizning ish namunamiz. Tafsilotlar uchun ustaga murojaat qiling.' },
  
  // Branch names
  branchMustaqillik: { ru: 'Филиал на Мустакиллик', uz: 'Mustaqillik filiali' },
  branchMirabad: { ru: 'Филиал на Мирабад', uz: 'Mirabad filiali' },
  
  // Metro stations
  metroHamida: { ru: 'Хамида Алимджана', uz: 'Hamid Olimjon' },
  metroAibek: { ru: 'Айбек', uz: 'Aibek' },
  
  // Services
  serviceRepair: { ru: 'Ремонт швейцарских часов', uz: 'Shveytsariya soatlarini ta\'mirlash' },
  serviceRepairDesc: { ru: 'Профессиональный ремонт механизмов любой сложности', uz: 'Har qanday murakkablikdagi mexanizmlarni professional ta\'mirlash' },
  servicePolish: { ru: 'Полировка металлов', uz: 'Metallarni sayqallash' },
  servicePolishDesc: { ru: 'Золото, платина, серебро, сталь', uz: 'Oltin, platina, kumush, po\'lat' },
  serviceGlass: { ru: 'Замена стекла', uz: 'Oyna almashtirish' },
  serviceGlassDesc: { ru: 'Вытачивание стекол любой формы', uz: 'Har qanday shakldagi oynalarni ishlash' },
  serviceRestoration: { ru: 'Реставрация антиквариата', uz: 'Antikvariatni tiklash' },
  serviceRestorationDesc: { ru: 'Работа с коллекционными часами', uz: 'Kolleksiya soatlari bilan ishlash' },
  serviceWarranty: { ru: 'Гарантия на работы', uz: 'Ishlar bo\'yicha kafolat' },
  serviceWarrantyDesc: { ru: '1 год гарантии качества', uz: '1 yillik sifat kafolati' },
  serviceBattery: { ru: 'Замена батарейки', uz: 'Batareyka almashtirish' },
  serviceStrap: { ru: 'Замена ремешка', uz: 'Tasmachani almashtirish' },
  serviceRepasage: { ru: 'Репасаж', uz: 'Repasaj' },
  
  // Services page
  ourServices: { ru: 'Наши услуги', uz: 'Bizning xizmatlar' },
  servicesTitle: { ru: 'УСЛУГИ', uz: 'XIZMATLAR' },
  servicesDesc: { ru: 'Профессиональный ремонт часов', uz: 'Professional soat ta\'mirlash' },
  
  // Service details
  repasageTitle: { ru: 'Репасаж (Полное обслуживание)', uz: 'Repasaj (To\'liq xizmat)' },
  repasageDesc: { ru: 'Полная разборка, чистка, смазка и сборка часового механизма. Рекомендуется каждые 3-5 лет.', uz: 'Soat mexanizmini to\'liq ajratib olish, tozalash, moylash va yig\'ish. Har 3-5 yilda tavsiya etiladi.' },
  polishTitle: { ru: 'Полировка корпуса и браслета', uz: 'Korpus va bilaguzukni sayqallash' },
  polishDesc: { ru: 'Бережная полировка золотых, платиновых, серебряных и стальных часов. Удаление царапин и потёртостей.', uz: 'Oltin, platina, kumush va po\'lat soatlarni ehtiyotkorlik bilan sayqallash. Shikast va eskirgan joylarni olib tashlash.' },
  glassTitle: { ru: 'Замена и вытачивание стёкол', uz: 'Oyna almashtirish va ishlash' },
  glassDesc: { ru: 'Вытачивание стёкол любой формы для vintage и современных часов. Сапфировые и минеральные стёкла.', uz: 'Vintage va zamonaviy soatlar uchun har qanday shakldagi oynalarni ishlash. Safir va mineral oynalar.' },
  batteryTitle: { ru: 'Замена батарейки', uz: 'Batareyka almashtirish' },
  batteryDesc: { ru: 'Быстрая замена батарейки с проверкой герметичности. Экспресс-сервис за 15 минут.', uz: 'Germetiklikni tekshirish bilan batareykani tez almashtirish. 15 daqiqalik ekspress xizmat.' },
  strapTitle: { ru: 'Замена и пошив ремешков', uz: 'Tasmachani almashtirish va tikish' },
  strapDesc: { ru: 'Пошив кожаных ремешков под заказ. Замена металлических браслетов. Индивидуальный подбор.', uz: 'Buyurtma asosida charm tasmachalar tikish. Metal bilaguzuklarni almashtirish. Individual tanlov.' },
  restorationTitle: { ru: 'Реставрация антиквариата', uz: 'Antikvariatni tiklash' },
  restorationDesc: { ru: 'Восстановление старинных и коллекционных часов. Работа с редкими запчастями.', uz: 'Qadimiy va kolleksiya soatlarini tiklash. Kam uchraydigan ehtiyot qismlar bilan ishlash.' },
}

// Language context
const LanguageContext = createContext<{
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}>({
  lang: 'ru',
  setLang: () => {},
  t: () => '',
})

// Translation hook
const useTranslation = () => useContext(LanguageContext)

// Watch data for display cases
const watches = [
  { id: 1, name: 'Rolex Submariner', descriptionRu: 'Швейцарский класс', descriptionUz: 'Shveytsariya klassikasi' },
  { id: 2, name: 'Omega Speedmaster', descriptionRu: 'Легенда космоса', descriptionUz: 'Kosmos afsonasi' },
  { id: 3, name: 'Patek Philippe', descriptionRu: 'Высшее мастерство', descriptionUz: 'Yuqori mahorat' },
  { id: 4, name: 'TAG Heuer', descriptionRu: 'Точность и стиль', descriptionUz: 'Aniqlik va uslub' },
  { id: 5, name: 'IWC Portugieser', descriptionRu: 'Инженерное искусство', descriptionUz: 'Muhandislik san\'ati' },
  { id: 6, name: 'Breitling Navitimer', descriptionRu: 'Авиационный стиль', descriptionUz: 'Aviatsiya uslubi' },
]

// Branches data
const branchesData = [
  {
    id: 1,
    nameKey: 'branchMustaqillik',
    addressRu: 'просп. Мустакиллик, 88D',
    addressUz: 'Mustaqillik prospekti, 88D',
    metroKey: 'metroHamida',
    phone: '+998 99 804 90 04',
  },
  {
    id: 2,
    nameKey: 'branchMirabad',
    addressRu: 'ул. Мирабад, 66',
    addressUz: 'Mirabad ko\'chasi, 66',
    metroKey: 'metroAibek',
    phone: '+998 95 838 99 99',
  },
]

type ViewType = 'entrance' | 'interior' | 'watches' | 'contacts' | 'sale' | 'services'

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('entrance')
  const [isEntering, setIsEntering] = useState(false)
  const [selectedWatch, setSelectedWatch] = useState<typeof watches[0] | null>(null)
  const [lang, setLang] = useState<Language>('ru')

  // Translation function
  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][lang]
    }
    return key
  }

  const handleEnter = () => {
    setIsEntering(true)
    setTimeout(() => {
      setCurrentView('interior')
    }, 1200)
  }

  const handleBack = () => {
    if (currentView === 'interior') {
      setCurrentView('entrance')
      setIsEntering(false)
    } else {
      setCurrentView('interior')
      setSelectedWatch(null)
    }
  }

  // Prevent scroll
  useEffect(() => {
    document.body.style.overflow = currentView === 'interior' ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [currentView])

  // Language Switcher Component
  const LanguageSwitcher = ({ className = '' }: { className?: string }) => (
    <button
      onClick={() => setLang(lang === 'ru' ? 'uz' : 'ru')}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg glass hover:border-gold/50 transition-all ${className}`}
    >
      <Languages className="w-4 h-4 text-gold" />
      <span className="text-cream text-sm font-medium">{lang === 'ru' ? 'UZ' : 'RU'}</span>
    </button>
  )

  // Entrance Screen
  if (currentView === 'entrance') {
    return (
      <main className="min-h-screen bg-background relative overflow-hidden">
        <div 
          className={`fixed inset-0 z-50 transition-all duration-1000 ${
            isEntering ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/entrance.png" 
              alt="Вход в магазин CHASOVSHIK"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>

          {/* Logo */}
          <div className={`absolute top-8 left-1/2 -translate-x-1/2 text-center transition-all duration-700 ${
            isEntering ? 'opacity-0 -translate-y-10' : 'opacity-100'
          }`}>
            <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-gold-gradient tracking-wider">
              CHASOVSHIK.UZ
            </h1>
            <p className="text-cream/80 text-sm md:text-base mt-2 tracking-widest uppercase">
              {t('serviceCenter')}
            </p>
          </div>

          {/* Language Switcher */}
          <div className={`absolute top-8 right-8 transition-all duration-700 ${
            isEntering ? 'opacity-0' : 'opacity-100'
          }`}>
            <LanguageSwitcher />
          </div>

          {/* Enter Button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            isEntering ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
          }`}>
            <div className="relative">
              <div className="absolute -inset-20 bg-gold/10 blur-3xl rounded-full animate-glow" />
              <Button
                onClick={handleEnter}
                className="relative bg-gradient-to-b from-gold to-gold-dark hover:from-gold-dark hover:to-gold 
                  text-chocolate font-bold text-xl md:text-2xl px-12 md:px-16 py-6 md:py-8 rounded-xl shadow-2xl
                  transform hover:scale-105 transition-all duration-300
                  border-2 border-gold/50"
                style={{
                  boxShadow: '0 0 40px rgba(193, 154, 107, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)'
                }}
              >
                <span className="flex items-center gap-3">
                  {t('enter')}
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </span>
              </Button>
              <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-cream/50 text-sm whitespace-nowrap">
                {t('clickToEnter')}
              </p>
            </div>
          </div>

          {/* Bottom Info */}
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-center transition-all duration-700 ${
            isEntering ? 'opacity-0 translate-y-10' : 'opacity-100'
          }`}>
            <div className="flex flex-wrap items-center justify-center gap-4 text-cream/70 text-sm md:text-base">
              <span className="flex items-center gap-2">
                <Clock4 className="w-4 h-4 text-gold" />
                {t('yearsExperience')}
              </span>
              <span className="text-gold">•</span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                {t('branchesInTashkent')}
              </span>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Interior Screen - Main Hub
  if (currentView === 'interior') {
    return (
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Interior Background */}
        <div className="fixed inset-0">
          <img 
            src="/interior.png" 
            alt="Интерьер магазина CHASOVSHIK"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        {/* Header */}
        <header className="relative z-20 p-4 md:p-6 flex items-center justify-between glass">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gold hover:text-cream transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            <span className="text-sm">{t('exit')}</span>
          </button>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gold-gradient">CHASOVSHIK.UZ</h1>
          <LanguageSwitcher />
        </header>

        {/* Interactive Zones */}
        <div className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24">
            
            {/* LEFT - Услуги */}
            <div className="flex flex-col items-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-8 bg-gold/0 group-hover:bg-gold/20 blur-2xl rounded-full transition-all duration-500" />
                
                <Button
                  onClick={() => setCurrentView('services')}
                  className="relative bg-gradient-to-b from-gold/90 to-gold-dark/90 
                    hover:from-gold hover:to-gold-dark
                    text-chocolate font-bold text-base md:text-lg lg:text-xl 
                    px-6 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6 rounded-xl shadow-2xl
                    transform hover:scale-110 transition-all duration-300
                    border-2 border-gold/50 group-hover:border-gold
                    group-hover:shadow-[0_0_60px_rgba(193,154,107,0.5)]"
                  style={{
                    boxShadow: '0 0 20px rgba(193, 154, 107, 0.2)'
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Wrench className="w-7 h-7 md:w-8 md:h-8" />
                    <span>{t('servicesTitle')}</span>
                  </div>
                </Button>
              </div>
              <p className="text-cream/60 text-xs md:text-sm">{t('servicesDesc')}</p>
            </div>

            {/* CENTER - Contacts / Стол */}
            <div className="flex flex-col items-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-10 bg-gold/0 group-hover:bg-gold/20 blur-3xl rounded-full transition-all duration-500" />
                
                {/* Table representation */}
                <div className="relative bg-gradient-to-b from-chocolate/80 to-chocolate/90 rounded-2xl p-4 md:p-6 
                  border-2 border-gold/30 group-hover:border-gold/60
                  group-hover:shadow-[0_0_80px_rgba(193,154,107,0.3)]
                  transition-all duration-300">
                
                  <Button
                    onClick={() => setCurrentView('contacts')}
                    className="bg-gradient-to-b from-gold to-gold-dark 
                      hover:from-gold-dark hover:to-gold
                      text-chocolate font-bold text-base md:text-lg lg:text-xl
                      px-8 md:px-10 lg:px-12 py-4 md:py-5 lg:py-6 rounded-xl shadow-2xl
                      transform hover:scale-105 transition-all duration-300
                      border-2 border-gold/50"
                    style={{
                      boxShadow: '0 0 30px rgba(193, 154, 107, 0.3), inset 0 2px 4px rgba(255,255,255,0.3)'
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Phone className="w-7 h-7 md:w-8 md:h-8" />
                      <span>{t('contacts')}</span>
                    </div>
                  </Button>
                </div>
              </div>
              <p className="text-cream/60 text-xs md:text-sm">{t('masterDesk')}</p>
            </div>

            {/* RIGHT - Продажа часов */}
            <div className="flex flex-col items-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-8 bg-gold/0 group-hover:bg-gold/20 blur-2xl rounded-full transition-all duration-500" />
                
                <Button
                  onClick={() => setCurrentView('sale')}
                  className="relative bg-gradient-to-b from-gold/90 to-gold-dark/90 
                    hover:from-gold hover:to-gold-dark
                    text-chocolate font-bold text-base md:text-lg lg:text-xl
                    px-6 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6 rounded-xl shadow-2xl
                    transform hover:scale-110 transition-all duration-300
                    border-2 border-gold/50 group-hover:border-gold
                    group-hover:shadow-[0_0_60px_rgba(193,154,107,0.5)]"
                  style={{
                    boxShadow: '0 0 20px rgba(193, 154, 107, 0.2)'
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Clock className="w-7 h-7 md:w-8 md:h-8" />
                    <span>{t('watches')}</span>
                  </div>
                </Button>
              </div>
              <p className="text-cream/60 text-xs md:text-sm">{t('watchesSale')}</p>
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10">
          <p className="text-cream/70 text-sm md:text-base">
            {t('welcome')}
          </p>
        </div>
      </main>
    )
  }

  // Watches / Works Screen
  if (currentView === 'watches') {
    return (
      <main className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0">
          <img 
            src="/interior.png" 
            alt="Интерьер магазина CHASOVSHIK"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <header className="p-4 md:p-6 flex items-center justify-between glass">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-gold hover:text-cream transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span className="text-sm">{t('back')}</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gold-gradient">{t('ourWorks')}</h1>
            <LanguageSwitcher />
          </header>

          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
            <p className="text-cream/70 text-center mb-6 max-w-2xl">
              {t('eachRepairStory')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full">
              {watches.map((watch, index) => (
                <Card 
                  key={watch.id}
                  className="group glass cursor-pointer hover:border-gold/50 transition-all duration-300 
                    hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-1 animate-slide-up"
                  onClick={() => setSelectedWatch(watch)}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="p-4 md:p-6">
                    <div className="aspect-square bg-gradient-to-br from-chocolate to-secondary rounded-lg 
                      flex items-center justify-center mb-4 group-hover:from-gold/20 group-hover:to-gold/10 
                      transition-all duration-300">
                      <Clock className="w-12 h-12 md:w-16 md:h-16 text-gold/60 group-hover:text-gold 
                        group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <h3 className="text-cream font-semibold text-sm md:text-base truncate">{watch.name}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      {lang === 'ru' ? watch.descriptionRu : watch.descriptionUz}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            
            <p className="text-cream/50 text-sm mt-6 text-center">
              {t('moreWorksInstagram')} @chasovshik.uz
            </p>
          </div>
        </div>

        {/* Watch Detail Modal */}
        {selectedWatch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fade-in">
            <Card className="w-full max-w-md glass p-6 animate-slide-up">
              <button 
                onClick={() => setSelectedWatch(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-cream"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-square bg-gradient-to-br from-chocolate to-secondary rounded-lg 
                flex items-center justify-center mb-4">
                <Clock className="w-20 h-20 md:w-24 md:h-24 text-gold/60" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-cream mb-2">{selectedWatch.name}</h2>
              <p className="text-muted-foreground mb-4">
                {lang === 'ru' ? selectedWatch.descriptionRu : selectedWatch.descriptionUz}
              </p>
              <p className="text-gold text-sm mb-4">
                {t('ourWorkExample')}
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold 
                  text-chocolate font-bold"
                onClick={() => {
                  setSelectedWatch(null)
                  setCurrentView('contacts')
                }}
              >
                {t('contactMaster')}
              </Button>
            </Card>
          </div>
        )}
      </main>
    )
  }

  // Contacts Screen
  if (currentView === 'contacts') {
    return (
      <main className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0">
          <img 
            src="/interior.png" 
            alt="Интерьер магазина CHASOVSHIK"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <header className="p-4 md:p-6 flex items-center justify-between glass">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-gold hover:text-cream transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span className="text-sm">{t('back')}</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gold-gradient">{t('contacts')}</h1>
            <LanguageSwitcher />
          </header>

          <div className="flex-1 flex items-center justify-center p-4 md:p-8">
            <div className="max-w-2xl w-full space-y-4 md:space-y-6 animate-slide-up">
              {/* Branches */}
              {branchesData.map((branch, index) => (
                <Card key={branch.id} className="glass p-5 md:p-6" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                  <h3 className="text-gold font-bold text-lg mb-4">{t(branch.nameKey)}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gold/20 rounded-lg">
                        <MapPin className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-cream">{lang === 'ru' ? branch.addressRu : branch.addressUz}</p>
                        <p className="text-muted-foreground text-sm">м. {t(branch.metroKey)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gold/20 rounded-lg">
                        <Phone className="w-5 h-5 text-gold" />
                      </div>
                      <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="text-cream hover:text-gold transition-colors text-lg">
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Working hours */}
              <Card className="glass p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gold/20 rounded-lg">
                    <Clock4 className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-cream font-semibold">{t('workingHours')}</p>
                    <p className="text-muted-foreground">{t('monSat')}</p>
                  </div>
                </div>
              </Card>

              {/* Instagram */}
              <Card className="glass p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold/20 rounded-lg">
                      <Instagram className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-cream font-semibold">@chasovshik.uz</p>
                      <p className="text-muted-foreground text-sm">{t('subscribe')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-cream/70 text-sm">
                    <span>⭐ 5.0</span>
                    <span>•</span>
                    <span>12+ {t('reviews')}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Sale Screen - Продажа часов
  if (currentView === 'sale') {
    return (
      <main className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0">
          <img 
            src="/interior.png" 
            alt="Интерьер магазина CHASOVSHIK"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <header className="p-4 md:p-6 flex items-center justify-between glass">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-gold hover:text-cream transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span className="text-sm">{t('back')}</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gold-gradient">{t('watchesForSale')}</h1>
            <LanguageSwitcher />
          </header>

          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
            <Card className="glass p-6 md:p-8 max-w-lg w-full text-center animate-slide-up">
              <Clock className="w-16 h-16 md:w-20 md:h-20 text-gold mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gold-gradient mb-4">
                {t('watchesForSale')}
              </h2>
              <p className="text-cream/70 mb-6">
                {t('alwaysInStock')}
              </p>
              
              <div className="space-y-3 text-left mb-6">
                <div className="flex items-center gap-3 p-3 bg-gold/10 rounded-lg">
                  <Shield className="w-5 h-5 text-gold" />
                  <span className="text-cream">{t('authenticityGuarantee')}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gold/10 rounded-lg">
                  <Briefcase className="w-5 h-5 text-gold" />
                  <span className="text-cream">{t('originalParts')}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gold/10 rounded-lg">
                  <Heart className="w-5 h-5 text-gold" />
                  <span className="text-cream">{t('individualSelection')}</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold 
                  text-chocolate font-bold text-lg py-4"
                onClick={() => setCurrentView('contacts')}
              >
                {t('contactUs')}
              </Button>
            </Card>
          </div>
        </div>
      </main>
    )
  }

  // Services Screen - Услуги
  if (currentView === 'services') {
    const servicesList = [
      { 
        key: 'repasage', 
        icon: Wrench, 
        titleKey: 'repasageTitle', 
        descKey: 'repasageDesc' 
      },
      { 
        key: 'polish', 
        icon: Sparkles, 
        titleKey: 'polishTitle', 
        descKey: 'polishDesc' 
      },
      { 
        key: 'glass', 
        icon: Shield, 
        titleKey: 'glassTitle', 
        descKey: 'glassDesc' 
      },
      { 
        key: 'battery', 
        icon: Clock4, 
        titleKey: 'batteryTitle', 
        descKey: 'batteryDesc' 
      },
      { 
        key: 'strap', 
        icon: Heart, 
        titleKey: 'strapTitle', 
        descKey: 'strapDesc' 
      },
      { 
        key: 'restoration', 
        icon: Briefcase, 
        titleKey: 'restorationTitle', 
        descKey: 'restorationDesc' 
      },
    ]

    return (
      <main className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0">
          <img 
            src="/interior.png" 
            alt="Интерьер магазина CHASOVSHIK"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <header className="p-4 md:p-6 flex items-center justify-between glass">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-gold hover:text-cream transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span className="text-sm">{t('back')}</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gold-gradient">{t('ourServices')}</h1>
            <LanguageSwitcher />
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-4">
              {servicesList.map((service, index) => {
                const Icon = service.icon
                return (
                  <Card 
                    key={service.key}
                    className="glass p-5 md:p-6 animate-slide-up cursor-pointer hover:border-gold/50 transition-all duration-300"
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gold/20 rounded-xl shrink-0">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-gold" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gold font-bold text-lg md:text-xl mb-2">
                          {t(service.titleKey)}
                        </h3>
                        <p className="text-cream/70 text-sm md:text-base leading-relaxed">
                          {t(service.descKey)}
                        </p>
                      </div>
                    </div>
                  </Card>
                )
              })}

              {/* CTA */}
              <Card className="glass p-6 text-center mt-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <p className="text-cream/70 mb-4">
                  {lang === 'ru' 
                    ? 'Нужна консультация? Свяжитесь с нами!' 
                    : 'Maslahat kerakmi? Biz bilan bog\'laning!'}
                </p>
                <Button 
                  className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold 
                    text-chocolate font-bold text-lg px-8 py-4"
                  onClick={() => setCurrentView('contacts')}
                >
                  {t('contactUs')}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return null
}
