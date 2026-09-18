"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { PlaceHolderImages } from "@/lib/placeholder-images";

import {
  Heart,
  Landmark,
  Waves,
  Anchor,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function OurStory() {
  const images = PlaceHolderImages;

  /*
   * ============================================================
   * IMÁGENES DEL CARRUSEL
   * ============================================================
   *
   * Puedes agregar más IDs de imágenes aquí.
   *
   * Ejemplo:
   * "sunset"
   * "restaurant-interior"
   * "beach"
   * "restaurant-exterior"
   *
   * Si alguna no existe, simplemente será ignorada.
   */

  const valueSlides = [
    images.find((i) => i.id === "sunset"),
     images.find((i) => i.id === "cocktail"),
    images.find((i) => i.id === "restaurant-interior"),
    images.find((i) => i.id === "beach"),
    images.find((i) => i.id === "restaurant-exterior"),
  ].filter(Boolean);

  /*
   * Si solo tienes una imagen actualmente,
   * el carrusel seguirá funcionando y quedará
   * preparado para cuando agregues más.
   */
  const slides =
    valueSlides.length > 0
      ? valueSlides
      : images.filter((i) => i.imageUrl).slice(0, 3);

  const [currentSlide, setCurrentSlide] = useState(0);

  /*
   * ============================================================
   * CARRUSEL AUTOMÁTICO
   * ============================================================
   */

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  /*
   * ============================================================
   * TIMELINE
   * ============================================================
   */

  const timeline = [
    {
      year: "2015",
      title: "La visión",
      desc: "Inspirados por la vibrante cultura de Ciénaga y las Fiestas del Caimán, nuestros fundadores soñaron con un lugar donde la tradición se fusionara con la elegancia costera.",
    },
    {
      year: "2018",
      title: "Inicio de las obras",
      desc: "La construcción comenzó en las costas de Ciénaga, utilizando materiales sostenibles y mano de obra local.",
    },
    {
      year: "2020",
      title: "Abriendo puertas",
      desc: "Casa Origen abrió sus puertas a la comunidad, convirtiéndose en un referente de la gastronomía caribeña.",
    },
    {
      year: "Presente",
      title: "Continúa",
      desc: "Hoy nos enorgullece ser parte del corazón gastronómico de Ciénaga, dando la bienvenida a comensales de todo el mundo.",
    },
  ];

  /*
   * ============================================================
   * ANIMACIÓN DE "NUESTRA HISTORIA"
   * ============================================================
   */

  const title = "Nuestra historia";

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      rotateX: -45,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: index * 0.06,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="flex flex-col overflow-hidden">

      {/* ============================================================
          HERO
      ============================================================ */}

      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">

        {/* Imagen */}
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src={
              images.find((i) => i.id === "restaurant-interior")
                ?.imageUrl || ""
            }
            alt="Interior de Casa Origen"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Gradiente inferior */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Contenido */}
        <div className="hover:text-label relative z-10 text-center text-primary px-6 max-w-6xl">

          {/* Etiqueta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="group mb-8 flex justify-center"
          >
            <span className="group-hover:text-sun inline-flex -mt-10 mb-20 items-center gap-3 px-3 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[13px] uppercase tracking-[0.35em] font-bold">
              <Sparkles size={40} />
              Casa Origen · Ciénaga
            </span>
          </motion.div>

          {/* ========================================================
              TITULO LETRA POR LETRA
              ======================================================== */}

          <motion.h1
            initial="hidden"
            animate="visible"
            className="
              text-6xl
              sm:text-5xl
              md:text-6xl
              lg:text-[7rem]
              font-bold
              font-headline
              tracking-tighter
              uppercase
              leading-[0.85]
              perspective-[1000px]
            "
          >
            {title.split("").map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                custom={index}
                variants={letterVariants}
                className="inline-block"
                style={{
                  whiteSpace: letter === " " ? "pre" : "normal",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Línea decorativa */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "120px", opacity: 1 }}
            transition={{
              delay: 1.4,
              duration: 0.8,
            }}
            className="h-px bg-primary mx-auto my-8"
          />

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{
              delay: 1.5,
              duration: 0.8,
            }}
            className="
              text-xl
              sm:text-2xl
              md:text-4xl
              font-light
              italic
              tracking-wide
            "
          >
            Nacido del mar, arraigado en la tradición.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+50px)]"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.4em] opacity-60">
                Descubre
              </span>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                }}
                className="w-px h-10 bg-white/50"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          NARRATIVE
      ============================================================ */}

      <section className="py-20 md:py-25 bg-background relative">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-primary/40" />

        <div className="container mx-auto px-6 max-w-5xl text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8 text-primary">
              <motion.div
                whileHover={{
                  rotate: -8,
                  scale: 1.1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <Anchor size={60} strokeWidth={1.3} />
              </motion.div>
            </div>

            <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">
              Nuestro origen
            </span>

            <h2 className="mt-5 text-4xl md:text-6xl font-bold font-headline leading-tight">
              Un santuario gastronómico
              <br />
              <span className="text-primary">
                a orillas del Magdalena
              </span>
            </h2>

            <div className="w-20 h-px bg-primary/30 mx-auto my-10" />

            <div className="space-y-8 text-lg md:text-xl text-foreground/70 leading-relaxed text-justify md:text-center">

              <p>
                Entre el vaivén del mar, sabores que saben a hogar,
                música que invita a quedarse y un lugar con origen.
              </p>

              <p>
                Ciénaga es más que un lugar; es una fuente de
                inspiración. La leyenda del caimán, el rítmico vaivén
                de las palmeras y las cálidas sonrisas de nuestros
                pescadores locales son los ingredientes que dan sabor
                a cada plato que servimos.
              </p>

              <p>
                Nuestra arquitectura combina la sofisticación
                mediterránea con el encanto rústico del Caribe
                colombiano, creando una atmósfera que se siente a la
                vez de primera clase e íntimamente familiar.
              </p>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          TIMELINE
      ============================================================ */}

      <section className="py-20 md:pb-28 bg-secondary/40 relative overflow-hidden">

        {/* Decoración */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="container mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-primary text-[.7rem] uppercase tracking-[0.4em] font-black">
              Desde nuestro origen
            </span>

            <h2 className="text-[6rem] md:text-[8.4rem] font-bold font-headline text-primary">
              El viaje
            </h2>

            <p className=" text-foreground/80 italic text-xl">
              Una historia construida paso a paso.
            </p>
          </div>

          <div className="relative">

            {/* Línea central */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-primary/20 -translate-x-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              {timeline.map((item, idx) => (

                <motion.div
                  key={idx}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  whileHover={{
                    y: -12,
                  }}
                  className="
                    group
                    relative
                    p-8
                    min-h-[300px]
                    bg-card
                    rounded-[2rem]
                    border
                    border-primary/10
                    shadow-lg
                    hover:shadow-2xl
                    hover:border-primary/80
                    transition-all
                    duration-200
                  "
                >

                  {/* Número */}
                  <span
                    className="
                      absolute
                      top-5
                      group-hover:-translate-y-2
                      right-6
                      text-4xl
                      font-bold
                      font-headline
                      text-primary/60
                      group-hover:text-label/90
                      transition-colors
                    "
                  >
                    {item.year}
                  </span>

                  <div className="relative z-10 pt-12 space-y-5">

                    <div className="w-10 h-px bg-primary group-hover:w-44 transition-all duration-500" />

                    <h3 className="text-3xl font-bold font-headline">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-foreground/70 group-hover:text-foreground transition-colors">
                      {item.desc}
                    </p>

                  </div>

                  {/* Punto timeline */}
                  <div className="
                    hidden md:block
                    absolute
                    -bottom-[37px]
                    left-1/2
                    -translate-x-1/2
                    w-3
                    h-3
                    rounded-full
                    bg-primary
                    ring-8
                    ring-secondary/30
                    group-hover:bg-label
                  " />

                </motion.div>

              ))}

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          VALUES
      ============================================================ */}

      <section className="py-24 md:py-32 bg-background">

        <div className="container mx-auto px-6">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* ======================================================
                CARRUSEL
                ====================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              className="
                relative
                aspect-[4/5]
                md:aspect-square
                rounded-[3rem]
                overflow-hidden
                border-8
                border-accent/70
                shadow-2xl
                group
              "
            >

              <AnimatePresence mode="wait">

                {slides[currentSlide] && (
                  <motion.div
                    key={slides[currentSlide]?.imageUrl}
                    initial={{
                      opacity: 0,
                      scale: 1.08,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slides[currentSlide]?.imageUrl || ""}
                      alt={
                        slides[currentSlide]?.description ||
                        "Casa Origen"
                      }
                      fill
                      className="
                        object-cover
                        transition-transform
                        duration-[5000]
                        group-hover:scale-105
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Información inferior */}

              <div className="absolute bottom-8 left-8 right-8 text-white">

                <span className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-70">
                  Casa Origen
                </span>

                <p className="mt-2 text-lg italic">
                  Una experiencia nacida junto al mar.
                </p>

              </div>

              {/* Flechas */}

              {slides.length > 1 && (
                <div className="
                  absolute
                  bottom-8
                  right-8
                  flex
                  gap-2
                ">

                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Imagen anterior"
                    className="
                      w-11
                      h-11
                      rounded-full
                      bg-white/15
                      backdrop-blur-md
                      border
                      border-white/20
                      text-white
                      flex
                      items-center
                      justify-center
                      hover:bg-primary
                      transition-all
                    "
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Siguiente imagen"
                    className="
                      w-11
                      h-11
                      rounded-full
                      bg-white/15
                      backdrop-blur-md
                      border
                      border-white/20
                      text-white
                      flex
                      items-center
                      justify-center
                      hover:bg-primary
                      transition-all
                    "
                  >
                    <ChevronRight size={18} />
                  </button>

                </div>
              )}

              {/* Indicadores */}

              {slides.length > 1 && (
                <div className="
                  absolute
                  top-8
                  left-1/2
                  -translate-x-1/2
                  flex
                  gap-2
                ">

                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Ir a imagen ${index + 1}`}
                      className={`
                        h-1
                        rounded-full
                        transition-all
                        duration-500
                        ${
                          currentSlide === index
                            ? "w-10 bg-white"
                            : "w-4 bg-white/40"
                        }
                      `}
                    />
                  ))}

                </div>
              )}

            </motion.div>

            {/* ======================================================
                VALORES
                ====================================================== */}

            <div className="space-y-5">

              <div className="mb-10">

                <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-black">
                  Lo que nos representa
                </span>

                <h2 className="mt-4 text-5xl md:text-7xl font-bold font-headline leading-none">
                  Nuestros
                  <br />
                  <span className="text-primary">
                    valores.
                  </span>
                </h2>

                <p className="mt-6 text-foreground/60 text-lg max-w-xl">
                  Más que un restaurante, somos una experiencia
                  construida alrededor de nuestra tierra, nuestra
                  gente y nuestras raíces.
                </p>

              </div>

              {/* ARTESANÍA */}

              <motion.div
                whileHover="hover"
                initial="rest"
                className="
                  group
                  flex
                  gap-6
                  p-6
                  rounded-[2rem]
                  border
                  border-transparent
                  hover:border-primary/10
                  hover:bg-card
                  hover:shadow-xl
                  transition-all
                  duration-500
                  cursor-default
                "
              >

                <div className="
                  bg-primary/10
                  p-4
                  rounded-2xl
                  text-primary
                  shrink-0
                  h-fit
                  group-hover:bg-primary
                  group-hover:text-white
                  transition-all
                ">
                  <Heart size={24} />
                </div>

                <div className="space-y-2">

                  <h3 className="text-2xl font-bold font-headline">
                    Artesanía
                  </h3>

                  <motion.p
                    variants={{
                      rest: {
                        opacity: 0,
                        height: 0,
                        y: -8,
                      },
                      hover: {
                        opacity: 1,
                        height: "auto",
                        y: 0,
                      },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="text-foreground/70 leading-relaxed overflow-hidden"
                  >
                    Creemos en la elaboración artesanal: desde
                    nuestras salsas hasta cada preparación, todo se
                    trabaja con dedicación y respeto por el producto.
                  </motion.p>

                </div>

              </motion.div>

              {/* COMUNIDAD */}

              <motion.div
                whileHover="hover"
                initial="rest"
                className="
                  group
                  flex
                  gap-6
                  p-6
                  rounded-[2rem]
                  border
                  border-transparent
                  hover:border-primary/10
                  hover:bg-card
                  hover:shadow-xl
                  transition-all
                  duration-500
                  cursor-default
                "
              >

                <div className="
                  bg-accent/10
                  p-4
                  rounded-2xl
                  text-accent
                  shrink-0
                  h-fit
                  group-hover:bg-accent
                  group-hover:text-white
                  transition-all
                ">
                  <Landmark size={24} />
                </div>

                <div className="space-y-2">

                  <h3 className="text-2xl font-bold font-headline">
                    Comunidad
                  </h3>

                  <motion.p
                    variants={{
                      rest: {
                        opacity: 0,
                        height: 0,
                        y: -8,
                      },
                      hover: {
                        opacity: 1,
                        height: "auto",
                        y: 0,
                      },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="text-foreground/70 leading-relaxed overflow-hidden"
                  >
                    El apoyo a los agricultores locales y las
                    prácticas de pesca sostenibles son fundamentales
                    para nuestra manera de hacer las cosas.
                  </motion.p>

                </div>

              </motion.div>

              {/* EXCELENCIA */}

              <motion.div
                whileHover="hover"
                initial="rest"
                className="
                  group
                  flex
                  gap-6
                  p-6
                  rounded-[2rem]
                  border
                  border-transparent
                  hover:border-primary/10
                  hover:bg-card
                  hover:shadow-xl
                  transition-all
                  duration-500
                  cursor-default
                "
              >

                <div className="
                  bg-secondary/40
                  p-4
                  rounded-2xl
                  text-foreground
                  shrink-0
                  h-fit
                  group-hover:bg-primary
                  group-hover:text-white
                  transition-all
                ">
                  <Waves size={24} />
                </div>

                <div className="space-y-2">

                  <h3 className="text-2xl font-bold font-headline">
                    Excelencia
                  </h3>

                  <motion.p
                    variants={{
                      rest: {
                        opacity: 0,
                        height: 0,
                        y: -8,
                      },
                      hover: {
                        opacity: 1,
                        height: "auto",
                        y: 0,
                      },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="text-foreground/70 leading-relaxed overflow-hidden"
                  >
                    Brindamos una experiencia gastronómica de primer
                    nivel, manteniendo siempre la autenticidad de
                    nuestras raíces caribeñas.
                  </motion.p>

                </div>

              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CIERRE
      ============================================================ */}

      <section className="py-24 bg-card border-t border-primary/10">

        <div className="container mx-auto px-6 text-center">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <BookOpen
              size={35}
              className="mx-auto text-primary mb-6"
              strokeWidth={1.5}
            />

            <p className="text-3xl md:text-5xl font-headline italic">
              "Cada plato cuenta una historia.
              <br />
              Cada visita se convierte en un recuerdo."
            </p>

            <div className="mt-8 text-[10px] uppercase tracking-[0.5em] text-primary font-black">
              Casa Origen · Ciénaga, Magdalena
            </div>

          </motion.div>

        </div>

      </section>

    </div>
  );
}