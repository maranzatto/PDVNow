<template>
    <div class="portfolio">
        <!-- Hero Section -->

        <!-- About Section -->
        <section id="about" class="section about">
            <div class="container">
                <h2 class="section__title">Sobre Mim</h2>
                <div class="about__content">
                    <p>
                        Sou <strong>Desenvolvedor Front-End</strong> com <strong>3 anos de experiência</strong> criando
                        interfaces
                        modernas,
                        performáticas e focadas em usabilidade. Trabalho com foco em entregar soluções limpas,
                        escaláveis e simples de manter.
                    </p>

                    <p>
                        Minha principal stack inclui <strong>Vue 3</strong>, <strong>TypeScript</strong>,
                        <strong>JavaScript</strong>,
                        <strong>HTML</strong>, <strong>CSS</strong> e <strong>Tailwind</strong>, além de experiência
                        sólida em
                        <strong>integração com APIs REST</strong>, criação de componentes reutilizáveis e estruturação
                        de
                        aplicações.
                    </p>

                    <p>
                        Prezo por código organizado, boas práticas, atenção aos detalhes e performance. Meu objetivo é
                        transformar ideias em interfaces funcionais, eficientes e com excelente experiência para o
                        usuário.
                    </p>
                </div>
            </div>
        </section>


        <!-- Skills Section -->
        <section id="skills" class="section skills">
            <div class="container">
                <h2 class="section__title">Habilidades Front-end</h2>

                <div class="skills-grid">
                    <!-- Vue Spotlight -->
                    <article class="vue-card">
                        <div class="vue-card__logo" aria-hidden="true">

                        </div>
                        <h3 class="vue-card__title">Vue.js</h3>
                        <p class="vue-card__desc">Construção de UIs reativas com componentes modulares, Composition API,
                            SFCs,
                            roteamento e gerenciamento de estado com Pinia.</p>

                        <div class="skill__bar skill--large" data-value="92">
                            <div class="skill__progress" style="width:92%"></div>
                        </div>
                        <div class="vue-card__meta">
                            <span class="meta-pill"><i class="pi pi-check"></i>Composition API</span>
                            <span class="meta-pill"><i class="pi pi-check"></i>Pinia</span>
                            <span class="meta-pill"><i class="pi pi-check"></i>Vite</span>
                        </div>
                    </article>

                    <!-- Core Techs -->
                    <div class="tech-cards">
                        <div class="tech-card">
                            <div class="tech-card__head">

                                <div class="tech-card__info">
                                    <div class="tech-card__name">HTML</div>
                                    <div class="tech-card__sub">Semântica & Acessibilidade</div>
                                </div>
                            </div>
                            <div class="skill__bar skill--small">
                                <div class="skill__progress" style="width:95%"></div>
                            </div>
                        </div>

                        <div class="tech-card">
                            <div class="tech-card__head">

                                <div class="tech-card__info">
                                    <div class="tech-card__name">CSS</div>
                                    <div class="tech-card__sub">Layout responsivo, Grid & Flex</div>
                                </div>
                            </div>
                            <div class="skill__bar skill--small">
                                <div class="skill__progress" style="width:93%"></div>
                            </div>
                        </div>

                        <div class="tech-card">
                            <div class="tech-card__head">

                                <div class="tech-card__info">
                                    <div class="tech-card__name">TypeScript</div>
                                    <div class="tech-card__sub">Tipos & Integração com Vue</div>
                                </div>
                            </div>
                            <div class="skill__bar skill--small">
                                <div class="skill__progress" style="width:88%"></div>
                            </div>
                        </div>
                    </div>

                    <div class="skills-tools">
                        <span class="tool">

                        </span>
                        <span class="tool">

                        </span>
                        <span class="tool">

                        </span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="section projects">
            <div class="container">
                <h2 class="section__title">Projetos</h2>
                <div class="projects__grid">
                    <article class="project__card">
                        <div class="project__header">Projeto 1</div>
                        <p class="project__description">
                            Descrição do projeto 1. Um projeto incrível que demonstra minhas habilidades.
                        </p>
                        <a href="#" class="project__link">Ver Mais →</a>
                    </article>
                    <article class="project__card">
                        <div class="project__header">Projeto 2</div>
                        <p class="project__description">
                            Descrição do projeto 2. Outro projeto fascinante que realizei.
                        </p>
                        <a href="#" class="project__link">Ver Mais →</a>
                    </article>
                    <article class="project__card">
                        <div class="project__header">Projeto 3</div>
                        <p class="project__description">
                            Descrição do projeto 3. Um mais um dos meus trabalhos em destaque.
                        </p>
                        <a href="#" class="project__link">Ver Mais →</a>
                    </article>
                </div>
                <div class="projects__more">
                    <router-link to="/projects" class="project__more-btn">Ver Mais Projetos</router-link>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="section contact">
            <div class="container">
                <h2 class="section__title">Entre em Contato</h2>
                <p class="contact__subtitle">Vamos trabalhar juntos em algo incrível!</p>

                <div class="contact__content">
                    <div class="contact__email">
                        <p class="contact__email-label">Envie-me um email:</p>
                        <a href="mailto:amitael.jau@gmail.com" class="contact__email-link">amitael.jau@gmail.com</a>
                    </div>

                    <div class="contact__divider">ou</div>

                    <div class="contact__social">
                        <p class="contact__social-label">Conecte-se em redes sociais:</p>
                        <div class="social__links">
                            <a href="https://github.com/maranzatto" target="_blank" rel="noopener noreferrer"
                                class="social__link github">
                                <i class="pi pi-github"></i>
                                <span>GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/amitaelmaranzatto/" target="_blank"
                                rel="noopener noreferrer" class="social__link linkedin">
                                <i class="pi pi-linkedin"></i>
                                <span>LinkedIn</span>
                            </a>
                            <a href="./AmitaelMaranzattoDev.pdf" download="AmitaelMaranzattoDev.pdf"
                                class="social__link curriculum">
                                <i class="pi pi-download"></i>
                                <span>Currículo</span>
                            </a>
                        </div>
                    </div>
                </div>

                <p class="contact__footer">Obrigado por visitar! Espero ouvir de você em breve.</p>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
.portfolio {
    width: 100%;
}

.section {
    scroll-margin-top: 80px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
}

.hero__content {
    max-width: 720px;
    color: var(--color-text-inverse);
}

.hero__title {
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: var(--color-text-inverse);
}

.hero__subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    color: var(--color-text-inverse);
}

.hero__cta {
    display: inline-block;
    padding: 1rem 2rem;
    background: var(--color-text-inverse);
    color: var(--color-primary);
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.hero__cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Section Styles */
.section {
    padding: 6rem 0;
    /* border-bottom: 1px solid var(--color-gray-200); */
}

.section__title {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 3rem;
    text-align: center;
}

/* About Section */
.about {
    background: var(--color-bg-primary);
}

.about__content p {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

/* Skills Section - clean, focused on front-end (Vue spotlight) */
.skills {
    background: var(--color-bg-secondary);
    padding: 3.5rem 0 4rem;
}

.skills__subtitle {
    text-align: center;
    font-size: 1rem;
    color: var(--color-text-secondary);
    margin-top: 0.25rem;
}

.skills-card {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 2.5rem;
    align-items: start;
    margin-top: 2rem;
}

.vue-spotlight {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
    padding: 1.6rem;
    border-radius: 12px;
    border: 1px solid rgba(15, 15, 15, 0.03);
}

.vue-header {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 0.75rem;
}

.vue-logo svg {
    border-radius: 6px;
}

.vue-meta h3 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--color-gray-900);
}

.vue-sub {
    margin: 0;
    font-size: 0.9rem;
    color: var(--color-text-secondary);
}

.vue-desc {
    color: var(--color-text-secondary);
    margin: 0.75rem 0 1rem;
}

.vue-skill-row {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.skill__bar--label {
    font-weight: 700;
    color: var(--color-gray-800);
    width: 110px;
}

.skill__bar.large {
    height: 12px;
    border-radius: 999px;
    background: linear-gradient(180deg, var(--color-gray-100), var(--color-gray-50));
    overflow: hidden;
    flex: 1;
}

.skill__bar.small {
    height: 10px;
    border-radius: 999px;
    background: linear-gradient(180deg, var(--color-gray-100), var(--color-gray-50));
    overflow: hidden;
}

.skill__progress {
    height: 100%;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    border-radius: 999px;
    transition: width 0.9s ease;
}

.skill__value {
    width: 48px;
    text-align: right;
    font-weight: 700;
    color: var(--color-text-secondary);
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.tech-card {
    background: var(--color-bg-primary);
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid rgba(15, 15, 15, 0.03);
}

.tech-name {
    font-weight: 700;
    color: var(--color-gray-900);
}

.tech-sub {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.tools-row {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
    margin-top: 0.9rem;
}

.tool {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
    padding: 0.5rem 0.8rem;
    border-radius: 999px;
    font-weight: 600;
    color: var(--color-text-secondary);
    border: 1px solid rgba(15, 15, 15, 0.03);
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

/* PrimeIcons tweaks */
.tech-icon {
    font-size: 1.05rem;
    color: var(--color-primary);
    margin-left: 0.6rem
}

.meta-pill i {
    margin-right: 0.4rem
}

@media (max-width: 1100px) {
    .skills-card {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 520px) {
    .skill__bar--label {
        display: none;
    }

    .skill__value {
        display: none;
    }

    .vue-skill-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}

/* Projects Section */
.projects {
    background: var(--color-bg-primary);
}

.projects__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.projects__more {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.project__more-btn {
    display: inline-block;
    padding: 0.9rem 1.4rem;
    background: var(--color-primary);
    color: var(--color-text-inverse);
    border-radius: 10px;
    font-weight: 700;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project__more-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.project__card {
    background: var(--color-bg-secondary);
    padding: 2rem;
    border-radius: 0.5rem;
    border-top: 4px solid var(--color-primary);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}

.project__card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.project__header {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 1rem;
}

.project__description {
    font-size: 0.95rem;
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;
    flex-grow: 1;
}

.project__link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.project__link:hover {
    color: var(--color-primary-dark);
}

/* Contact Section */
.contact {
    background: var(--gradient-primary);
    text-align: center;
    padding: 8rem 0;
}

.contact .section__title {
    color: var(--color-text-inverse);
    margin-bottom: 1rem;
}

.contact__subtitle {
    font-size: 1.3rem;
    color: var(--color-text-inverse);
    margin-bottom: 4rem;
    opacity: 0.95;
}

.contact__content {
    max-width: 600px;
    margin: 0 auto 3rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 3rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.contact__email {
    margin-bottom: 2.5rem;
}

.contact__email-label {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.contact__email-link {
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text-inverse);
    text-decoration: none;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
}

.contact__email-link:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
}

.contact__divider {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 2.5rem 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;
}

.contact__social {
    margin-top: 2.5rem;
}

.contact__social-label {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.social__links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.social__link {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.15);
    color: var(--color-text-inverse);
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.social__link:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.social__link svg {
    width: 20px;
    height: 20px;
}

.contact__footer {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 2rem;
    font-style: italic;
}

/* Skills styles */
.skills-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
}

.vue-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.04);
    padding: 1.6rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(2, 6, 23, 0.35);
}

.vue-card__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 96px;
    margin-bottom: 0.6rem;
}

.vue-card__logo img {
    width: 96px;
    height: 96px;
    display: block;
}

.tech-card__head img {
    width: 36px;
    height: 36px;
    display: block;
}

.tech-logo {
    font-size: 32px;
    flex-shrink: 0;
}

.icon--vue {
    color: var(--color-primary);
}

.vue-card__title {
    margin: 0.2rem 0 0.4rem;
    font-size: 1.2rem;
}

.vue-card__desc {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.8rem;
    line-height: 1.6;
}

.vue-card__meta {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.8rem;
}

.meta-pill {
    background: rgba(255, 255, 255, 0.05);
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    font-size: 0.85rem;
}

.tech-cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.tech-card {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 10px;
    padding: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.03);
}

.tech-card__head {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    margin-bottom: 0.6rem;
}

.tech-card__info {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.tech-card__name {
    font-weight: 700;
    font-size: 0.95rem;
}

.tech-card__sub {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
}

.skill__bar {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 999px;
    overflow: hidden;
    margin-top: 0.4rem;
}

.skill--large {
    height: 14px;
}

.skill--small {
    height: 10px;
}

.skill__progress {
    height: 100%;
    width: 0;
    transition: width 900ms cubic-bezier(.2, .9, .2, 1);
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    box-shadow: inset 0 -4px 10px rgba(0, 0, 0, 0.25);
}

.skills-tools {
    margin-top: 1rem;
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
}

.tool {
    font-size: 0.85rem;
    padding: 0.4rem 0.7rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.03);
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

/* Desktop skills layout */
@media (min-width: 1024px) {
    .skills-grid {
        grid-template-columns: 1fr 360px;
        gap: 2rem;
    }
}


/* Responsive */
@media (max-width: 768px) {
    .hero__title {
        font-size: 2rem;
    }

    .hero__subtitle {
        font-size: 1rem;
    }

    .section__title {
        font-size: 1.8rem;
    }

    .section {
        padding: 3rem 0;
    }

    .container {
        padding: 0 1rem;
    }

    .hero__content {
        max-width: 100%;
    }

    .about__content p {
        font-size: 0.95rem;
        margin-bottom: 1.2rem;
    }

    .skills-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .vue-card {
        padding: 1.2rem;
    }

    .vue-card__logo {
        width: 64px;
        height: 64px;
        margin-bottom: 0.4rem;
    }

    .vue-card__title {
        font-size: 1.1rem;
    }

    .vue-card__desc {
        font-size: 0.9rem;
        margin-bottom: 0.6rem;
    }

    .meta-pill {
        font-size: 0.75rem;
        padding: 0.2rem 0.4rem;
    }

    .tech-cards {
        gap: 0.8rem;
    }

    .tech-card {
        padding: 0.7rem;
    }

    .tech-logo {
        font-size: 24px;
    }

    .tech-card__name {
        font-size: 0.95rem;
    }

    .tech-card__sub {
        font-size: 0.8rem;
    }

    .skill__bar.large {
        height: 10px;
    }

    .skills-tools {
        gap: 0.5rem;
    }

    .tool {
        font-size: 0.75rem;
        padding: 0.3rem 0.5rem;
    }

    .projects__grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .project__card {
        padding: 1.5rem;
    }

    .project__header {
        font-size: 1.1rem;
        margin-bottom: 0.8rem;
    }

    .project__description {
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }

    .project__link {
        font-size: 0.95rem;
    }

    .contact__content {
        padding: 2rem 1.5rem;
        margin: 0 auto 2rem;
    }

    .contact__email-link {
        font-size: 1.2rem;
    }

    .social__links {
        gap: 0.8rem;
    }

    .social__link {
        padding: 0.6rem 1rem;
        font-size: 0.85rem;
        gap: 0.4rem;
    }

    .social__link svg {
        width: 16px;
        height: 16px;
    }

    .contact__footer {
        font-size: 0.85rem;
    }
}

@media (max-width: 480px) {
    .hero {
        min-height: 80vh;
        padding: 1rem;
    }

    .hero__title {
        font-size: 1.5rem;
        margin-bottom: 0.8rem;
    }

    .hero__subtitle {
        font-size: 0.95rem;
        margin-bottom: 1.5rem;
    }

    .hero__cta {
        padding: 0.8rem 1.5rem;
        font-size: 0.95rem;
    }

    .section {
        padding: 2rem 0;
        scroll-margin-top: 60px;
    }

    .section__title {
        font-size: 1.3rem;
        margin-bottom: 1.5rem;
    }

    .container {
        padding: 0 0.75rem;
    }

    .about__content p {
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    /* Skills section mobile */
    .skills {
        padding: 1.5rem 0;
    }

    .skills-grid {
        gap: 1rem;
    }

    .vue-card {
        padding: 1rem;
        box-shadow: 0 4px 16px rgba(2, 6, 23, 0.2);
    }

    .vue-card__logo {
        width: 48px;
        height: 48px;
        margin-bottom: 0.5rem;
    }

    .vue-card__title {
        font-size: 1rem;
        margin: 0.1rem 0 0.3rem;
    }

    .vue-card__desc {
        font-size: 0.8rem;
        line-height: 1.4;
        margin-bottom: 0.6rem;
    }

    .meta-pill {
        font-size: 0.65rem;
        padding: 0.15rem 0.25rem;
    }

    .tech-cards {
        gap: 0.6rem;
    }

    .tech-card {
        padding: 0.6rem;
    }

    .tech-card__head {
        gap: 0.5rem;
        margin-bottom: 0.4rem;
    }

    .tech-logo {
        font-size: 18px;
    }

    .tech-card__name {
        font-size: 0.85rem;
        font-weight: 600;
    }

    .tech-card__sub {
        font-size: 0.75rem;
        line-height: 1.3;
    }

    .skill__bar {
        margin-top: 0.3rem;
    }

    .skill--large {
        height: 8px;
    }

    .skill--small {
        height: 6px;
    }

    .skills-tools {
        margin-top: 0.7rem;
        gap: 0.35rem;
    }

    .tool {
        font-size: 0.7rem;
        padding: 0.25rem 0.4rem;
        gap: 0.2rem;
    }

    /* Projects section mobile */
    .projects__grid {
        gap: 1rem;
    }

    .project__card {
        padding: 1.2rem;
        border-radius: 0.4rem;
    }

    .project__card:hover {
        transform: translateY(-4px);
    }

    .project__header {
        font-size: 1rem;
        margin-bottom: 0.7rem;
    }

    .project__description {
        font-size: 0.85rem;
        line-height: 1.5;
        margin-bottom: 0.9rem;
    }

    .projects__more {
        margin-top: 1.5rem;
    }

    .project__more-btn {
        padding: 0.75rem 1.2rem;
        font-size: 0.9rem;
        border-radius: 8px;
    }

    /* Contact section mobile */
    .contact {
        padding: 3rem 0;
    }

    .contact .section__title {
        margin-bottom: 0.8rem;
    }

    .contact__subtitle {
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }

    .contact__content {
        padding: 1.5rem 1rem;
        margin: 0 auto 1.5rem;
    }

    .contact__email-label,
    .contact__social-label {
        font-size: 0.85rem;
        margin-bottom: 0.6rem;
    }

    .contact__email-link {
        font-size: 1.1rem;
        padding: 0.4rem 0.8rem;
    }

    .contact__divider {
        font-size: 0.8rem;
        margin: 1.5rem 0;
    }

    .social__links {
        gap: 0.6rem;
    }

    .social__link {
        padding: 0.5rem 0.9rem;
        font-size: 0.8rem;
    }

    .social__link span {
        display: none;
    }

    .social__link svg {
        width: 18px;
        height: 18px;
    }

    .contact__footer {
        font-size: 0.8rem;
        margin-top: 1.5rem;
    }
}
</style>
