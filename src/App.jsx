import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  BuildingOffice,
  CalendarCheck,
  CaretDown,
  ChartBar,
  CheckCircle,
  ClipboardText,
  Clock,
  FileText,
  Folders,
  List,
  LockKey,
  MapPin,
  PaperPlaneTilt,
  Phone,
  ShieldCheck,
  Storefront,
  UserCircle,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import heroDigital from "./assets/hero-digital-desk.png";
import heroLocal from "./assets/hero-local-ledger.png";

const services = [
  {
    title: "Бухгалтерское сопровождение",
    text: "Ведение учета, формирование документов, контроль операций и закрытие периодов.",
    icon: Folders,
    ip: "По задаче",
    ooo: "Да",
  },
  {
    title: "Налоговая отчетность",
    text: "Подготовка и сдача деклараций, расчетов и ответов на требования.",
    icon: FileText,
    ip: "Да",
    ooo: "Да",
  },
  {
    title: "Зарплата и кадры",
    text: "Расчет зарплаты, отчеты по сотрудникам, кадровые документы.",
    icon: UsersThree,
    ip: "По задаче",
    ooo: "Да",
  },
  {
    title: "Восстановление учета",
    text: "Разбор документов, восстановление операций и корректной отчетности.",
    icon: Clock,
    ip: "Да",
    ooo: "Да",
  },
  {
    title: "Консультации",
    text: "Ответы по налогам, учету, требованиям и выбору системы налогообложения.",
    icon: UserCircle,
    ip: "Да",
    ooo: "Да",
  },
  {
    title: "Разовые задачи",
    text: "Подготовка отдельных документов, расчетов, сверок и ответов.",
    icon: ClipboardText,
    ip: "По запросу",
    ooo: "По запросу",
  },
];

const audiences = [
  {
    title: "ИП",
    text: "Помогаем вести учет, сдавать отчетность и держать налоги под контролем.",
    icon: UserCircle,
  },
  {
    title: "ООО",
    text: "Поддерживаем учет, первичку, зарплату, кадры и регулярную отчетность.",
    icon: Briefcase,
  },
  {
    title: "Торговля",
    text: "Учитываем товары, остатки, поставщиков и ежедневные операции.",
    icon: Storefront,
  },
  {
    title: "Услуги",
    text: "Настраиваем понятный учет доходов, расходов и закрывающих документов.",
    icon: UsersThree,
  },
  {
    title: "Небольшое производство",
    text: "Помогаем учитывать затраты, себестоимость и финансовые показатели.",
    icon: BuildingOffice,
  },
];

const process = [
  {
    title: "Заявка",
    text: "Вы оставляете короткую заявку и описываете текущую задачу.",
    icon: PaperPlaneTilt,
  },
  {
    title: "Консультация",
    text: "Уточняем формат бизнеса, систему налогообложения и сроки.",
    icon: UsersThree,
  },
  {
    title: "Аудит документов",
    text: "Смотрим первичку, отчетность и риски в текущем учете.",
    icon: Folders,
  },
  {
    title: "Запуск сопровождения",
    text: "Настраиваем обмен документами и регулярный рабочий ритм.",
    icon: CalendarCheck,
  },
  {
    title: "Регулярная отчетность",
    text: "Держим сроки под контролем и заранее напоминаем о важных действиях.",
    icon: ChartBar,
  },
];

const faq = [
  {
    question: "Как быстро можно начать работу?",
    answer:
      "Обычно старт начинается с короткой консультации и просмотра текущих документов. После этого можно определить объем и формат сопровождения.",
  },
  {
    question: "Какие документы нужны для начала?",
    answer:
      "Понадобятся регистрационные данные, сведения о системе налогообложения, первичные документы, предыдущая отчетность и доступный список текущих задач.",
  },
  {
    question: "Можно ли передать учет в середине года?",
    answer:
      "Да. Сначала проводится разбор текущего состояния учета, после чего формируется план перехода и восстановления недостающих данных.",
  },
  {
    question: "Как проходит обмен документами?",
    answer:
      "Формат согласуется отдельно: электронные документы, облачная папка, мессенджер или другой удобный канал. В лендинге не указываются неподтвержденные контакты.",
  },
  {
    question: "Как обеспечивается конфиденциальность?",
    answer:
      "Финансовые и кадровые данные обрабатываются аккуратно, с разделением доступа и без публикации реквизитов или персональных данных на сайте.",
  },
];

const SITE_BASE_PATH = "/bc-panorama-landing";
const SITE_PUBLIC_URL = "https://taptrans13-commits.github.io/bc-panorama-landing";

const variantMeta = {
  local: {
    slug: "variant-2",
    title: "БЦ Панорама - бухгалтерская компания в Перми",
    description:
      "Локальный вариант лендинга БЦ Панорама: бухгалтерское сопровождение, отчетность, налоги, зарплата и кадры для ИП и ООО в Перми.",
  },
  digital: {
    slug: "variant-3",
    title: "БЦ Панорама - учет, отчеты и налоги под контролем",
    description:
      "Деловой вариант лендинга БЦ Панорама: учет, первичка, сроки отчетности, консультации и бухгалтерское сопровождение бизнеса в Перми.",
  },
};

function getVariantFromLocation() {
  const pathname = window.location.pathname.replace(/\/+$/, "");

  if (pathname.endsWith(`/${variantMeta.digital.slug}`)) {
    return "digital";
  }

  if (pathname.endsWith(`/${variantMeta.local.slug}`)) {
    return "local";
  }

  const params = new URLSearchParams(window.location.search);
  return params.get("variant") === "3" ? "digital" : "local";
}

function getAppBasePath() {
  return window.location.pathname.includes(`${SITE_BASE_PATH}/`) ? SITE_BASE_PATH : "";
}

function getVariantPath(variant) {
  return `${getAppBasePath()}/${variantMeta[variant].slug}/`;
}

function setMetaContent(selector, content) {
  const element = document.head.querySelector(selector);

  if (element) {
    element.setAttribute("content", content);
  }
}

function setLinkHref(selector, href) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function updateDocumentMeta(variant) {
  const meta = variantMeta[variant];
  const url = `${SITE_PUBLIC_URL}/${meta.slug}/`;

  document.title = meta.title;
  setMetaContent('meta[name="description"]', meta.description);
  setMetaContent('meta[property="og:title"]', meta.title);
  setMetaContent('meta[property="og:description"]', meta.description);
  setMetaContent('meta[property="og:url"]', url);
  setMetaContent('meta[name="twitter:title"]', meta.title);
  setMetaContent('meta[name="twitter:description"]', meta.description);
  setLinkHref('link[rel="canonical"]', url);
}

function useVariantFromUrl() {
  const [variant, setVariant] = useState(getVariantFromLocation);

  useEffect(() => {
    const nextUrl = `${getVariantPath(variant)}${window.location.hash}`;

    updateDocumentMeta(variant);

    if (window.location.pathname !== getVariantPath(variant) || window.location.search) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [variant]);

  useEffect(() => {
    function handlePopState() {
      setVariant(getVariantFromLocation());
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return [variant, setVariant];
}

export function App() {
  const [variant, setVariant] = useVariantFromUrl();

  return (
    <main className={`app app-${variant}`}>
      <VariantSwitcher active={variant} onChange={setVariant} />
      {variant === "local" ? <LocalVariant /> : <DigitalVariant />}
    </main>
  );
}

function VariantSwitcher({ active, onChange }) {
  return (
    <div className="variant-switcher" aria-label="Переключатель вариантов">
      <span>Сравнение лендингов</span>
      <div className="variant-tabs">
        <button
          className={active === "local" ? "is-active" : ""}
          type="button"
          onClick={() => onChange("local")}
        >
          Вариант 2
        </button>
        <button
          className={active === "digital" ? "is-active" : ""}
          type="button"
          onClick={() => onChange("digital")}
        >
          Вариант 3
        </button>
      </div>
    </div>
  );
}

function LocalVariant() {
  return (
    <div className="page local-page">
      <Header variant="local" />
      <section className="local-hero" id="top">
        <img src={heroLocal} alt="" className="hero-photo" />
        <div className="hero-scrim" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Бухгалтерская компания в Перми</p>
            <h1>БЦ Панорама - ваш бухгалтерский партнер в Перми</h1>
            <span className="title-rule" />
            <p>
              Надежное бухгалтерское сопровождение, налоговая отчетность,
              зарплата и кадры для ИП и ООО. Вы развиваете бизнес, мы держим
              учет в порядке.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#lead-local">
                Оставьте заявку
              </a>
              <a className="text-link" href="#services-local">
                Наши услуги <ArrowRight size={19} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="local-trust">
        <div className="container trust-row">
          <TrustItem icon={ShieldCheck} title="Спокойствие" text="Учет без лишней нагрузки" />
          <TrustItem icon={CalendarCheck} title="Сроки" text="Отчетность под контролем" />
          <TrustItem icon={UserCircle} title="Подход" text="Личный бухгалтер на связи" />
          <TrustItem icon={LockKey} title="Данные" text="Бережная работа с информацией" />
        </div>
      </section>

      <section className="section" id="audience-local">
        <div className="container">
          <p className="eyebrow">Для кого</p>
          <h2>Работаем с бизнесом разных сфер и масштабов</h2>
          <div className="audience-grid">
            {audiences.map((item) => (
              <AudienceCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section" id="process-local">
        <div className="container">
          <p className="eyebrow">Как мы работаем</p>
          <h2>Четкий процесс - понятный результат</h2>
          <div className="process-line">
            {process.map((item, index) => (
              <ProcessStep key={item.title} index={index + 1} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section service-preview" id="services-local">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Услуги</p>
              <h2>Берем на себя учет, отчетность и регулярные задачи</h2>
            </div>
            <a className="text-link" href="#lead-local">
              Обсудить задачи <ArrowRight size={19} weight="bold" />
            </a>
          </div>
          <div className="service-grid">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <LocalCta />
      <FaqSection id="faq-local" />
      <LeadSection id="lead-local" variant="local" />
      <Footer />
    </div>
  );
}

function DigitalVariant() {
  return (
    <div className="page digital-page">
      <Header variant="digital" />
      <section className="digital-hero" id="top">
        <img src={heroDigital} alt="" className="hero-photo" />
        <div className="hero-scrim" />
        <div className="container digital-hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Бухгалтерское сопровождение</p>
            <h1>Учет, отчеты и налоги под контролем</h1>
            <p>
              Сопровождение для ИП и ООО в Перми: порядок в документах, сроки
              без просрочек и консультации по делу.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#lead-digital">
                Оставить заявку <ArrowRight size={20} weight="bold" />
              </a>
            </div>
            <div className="hero-mini-row">
              <TrustItem icon={ShieldCheck} title="Конфиденциальность" text="Сохранность данных" />
              <TrustItem icon={UserCircle} title="Персональный подход" text="Контакт по задачам" />
            </div>
          </div>
        </div>
      </section>

      <section className="digital-proof">
        <div className="container proof-grid">
          <ProofItem icon={CalendarCheck} title="Сроки" text="Отслеживаем отчетные даты и напоминаем заранее" />
          <ProofItem icon={ClipboardText} title="Первичка" text="Проверяем документы и наводим порядок в учете" />
          <ProofItem icon={ChartBar} title="Отчетность" text="Готовим и сдаем отчеты без лишней суеты" />
          <ProofItem icon={UsersThree} title="Консультации" text="Отвечаем на вопросы по налогам и учету" />
        </div>
      </section>

      <section className="section" id="services-digital">
        <div className="container">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Наши услуги</p>
              <h2>Состав сопровождения подбирается под ваш бизнес</h2>
            </div>
            <a className="text-link" href="#lead-digital">
              Обсудить задачи <ArrowRight size={19} weight="bold" />
            </a>
          </div>
          <ServiceTable />
        </div>
      </section>

      <section className="section" id="process-digital">
        <div className="container">
          <p className="eyebrow">Рабочий ритм</p>
          <h2>Понятный запуск без хаоса в документах</h2>
          <div className="digital-process-grid">
            {process.map((item, index) => (
              <ProcessStep key={item.title} index={index + 1} {...item} compact />
            ))}
          </div>
        </div>
      </section>

      <FaqSection id="faq-digital" />
      <LeadSection id="lead-digital" variant="digital" />
      <Footer />
    </div>
  );
}

function Header({ variant }) {
  const [open, setOpen] = useState(false);
  const suffix = variant === "digital" ? "digital" : "local";
  const nav = [
    ["Услуги", `#services-${suffix}`],
    [variant === "digital" ? "Как работаем" : "Для кого", variant === "digital" ? `#process-${suffix}` : `#audience-${suffix}`],
    [variant === "digital" ? "FAQ" : "Процесс", variant === "digital" ? `#faq-${suffix}` : `#process-${suffix}`],
    ["Контакты", `#lead-${suffix}`],
  ];

  return (
    <header className={`site-header ${variant}`}>
      <a className="brand" href="#top" aria-label="БЦ Панорама">
        <span className="brand-mark" aria-hidden="true">
          <BuildingOffice size={24} weight="fill" />
        </span>
        <span>
          <strong>БЦ Панорама</strong>
          <small>Бухгалтерские услуги в Перми</small>
        </span>
      </a>
      <button className="mobile-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Открыть меню">
        {open ? <X size={22} /> : <List size={22} />}
      </button>
      <nav className={open ? "is-open" : ""}>
        {nav.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-contact">
        <span>
          <MapPin size={20} weight="bold" /> Пермь
        </span>
        <small>Телефон уточняется</small>
      </div>
      <a className="button header-button" href={`#lead-${suffix}`}>
        Заявка
      </a>
    </header>
  );
}

function TrustItem({ icon: Icon, title, text }) {
  return (
    <div className="trust-item">
      <Icon size={28} weight="regular" aria-hidden="true" />
      <span>
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
    </div>
  );
}

function ProofItem({ icon: Icon, title, text }) {
  return (
    <article className="proof-item">
      <Icon size={27} weight="regular" aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

function AudienceCard({ icon: Icon, title, text }) {
  return (
    <article className="audience-card">
      <Icon size={40} weight="regular" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function ProcessStep({ icon: Icon, title, text, index, compact = false }) {
  return (
    <article className={compact ? "process-step compact" : "process-step"}>
      <div className="step-number">{index}</div>
      <Icon size={compact ? 28 : 36} weight="regular" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function ServiceCard({ icon: Icon, title, text }) {
  return (
    <article className="service-card">
      <Icon size={42} weight="regular" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
      <a href="#lead-local">
        Подробнее <ArrowRight size={17} weight="bold" />
      </a>
    </article>
  );
}

function ServiceTable() {
  return (
    <div className="service-table" role="table" aria-label="Услуги БЦ Панорама">
      <div className="table-row table-head" role="row">
        <span role="columnheader">Услуга</span>
        <span role="columnheader">Что входит</span>
        <span role="columnheader">ИП</span>
        <span role="columnheader">ООО</span>
      </div>
      {services.map((service) => (
        <div className="table-row" role="row" key={service.title}>
          <span role="cell" className="service-name">
            {service.title}
          </span>
          <span role="cell">{service.text}</span>
          <span role="cell">{renderAvailability(service.ip)}</span>
          <span role="cell">{renderAvailability(service.ooo)}</span>
        </div>
      ))}
      <div className="table-note">
        <Clock size={19} weight="fill" /> Состав услуг подбирается под задачи и
        текущий учет.
      </div>
    </div>
  );
}

function renderAvailability(value) {
  if (value === "Да") {
    return (
      <span className="available">
        <CheckCircle size={19} weight="fill" /> Да
      </span>
    );
  }
  return <span>{value}</span>;
}

function LocalCta() {
  return (
    <section className="section local-cta">
      <div className="container cta-band">
        <div>
          <p className="eyebrow">Пермь</p>
          <h2>Готовы обсудить ваш бизнес?</h2>
          <p>
            Оставьте заявку - мы свяжемся с вами и предложим оптимальный формат
            работы для вашего учета.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#lead-local">
              Оставьте заявку
            </a>
            <a className="text-link" href="#services-local">
              Узнать больше об услугах <ArrowRight size={19} weight="bold" />
            </a>
          </div>
        </div>
        <div className="city-line" aria-hidden="true">
          <MapPin size={29} weight="regular" />
          <strong>Пермь</strong>
          <small>Телефон уточняется</small>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ id }) {
  const [active, setActive] = useState(0);

  return (
    <section className="section faq-section" id={id}>
      <div className="container">
        <p className="eyebrow">FAQ</p>
        <h2>Ответы на частые вопросы</h2>
        <div className="faq-list">
          {faq.map((item, index) => (
            <div className="faq-item" key={item.question}>
              <button type="button" onClick={() => setActive(active === index ? -1 : index)}>
                <span>{item.question}</span>
                <CaretDown size={21} className={active === index ? "rotated" : ""} />
              </button>
              {active === index && <p>{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadSection({ id, variant }) {
  const [status, setStatus] = useState("");
  const fields = useMemo(
    () => [
      { name: "name", label: "Ваше имя", type: "text" },
      { name: "company", label: "Компания / ИП", type: "text" },
      { name: "contact", label: "Телефон или другой контакт", type: "text" },
    ],
    [],
  );

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const missing = fields.some((field) => !String(data.get(field.name) || "").trim());

    if (missing) {
      setStatus("Заполните имя, бизнес и контакт для связи.");
      return;
    }

    setStatus("Заявка подготовлена. Контакты и реквизиты компании нужно уточнить перед публикацией.");
    event.currentTarget.reset();
  }

  return (
    <section className={`section lead-section ${variant}`} id={id}>
      <div className="container lead-panel">
        <div className="lead-copy">
          <p className="eyebrow">Заявка</p>
          <h2>Оставьте заявку</h2>
          <p>
            Расскажите о своем бизнесе - подберем формат бухгалтерского
            сопровождения и список первичных шагов.
          </p>
          <div className="lead-meta">
            <span>
              <MapPin size={22} /> Пермь
            </span>
            <span>
              <Phone size={22} /> Телефон уточняется
            </span>
          </div>
        </div>
        <form className="lead-form" onSubmit={handleSubmit} noValidate>
          {fields.map((field) => (
            <label key={field.name}>
              <span>{field.label}</span>
              <input name={field.name} type={field.type} />
            </label>
          ))}
          <label className="full">
            <span>Расскажите о задачах</span>
            <textarea name="message" rows="4" />
          </label>
          <button className="button primary full" type="submit">
            Оставить заявку
          </button>
          <small>
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
          </small>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <span>БЦ Панорама, бухгалтерская компания, Пермь</span>
        <span>Реквизиты и контакты уточняются</span>
      </div>
    </footer>
  );
}
