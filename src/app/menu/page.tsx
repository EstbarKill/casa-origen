"use client";

import { useState, useMemo } from "react";
import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Plus,
  Minus,
  Send,
  Clock,
  ChefHat,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Images,
  Fish,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { MENU_ITEMS, type MenuItem } from "@/lib/menu-data";

const CATEGORIES = [
  "All",
  "Seafood",
  "Grill",
  "Cocktails",
  "Drinks",
  "Desserts",
];
function DishModalContent({
  selectedItem,
  onClose,
  addToCart,
}: {
  selectedItem: MenuItem;
  onClose: () => void;
  addToCart: (item: MenuItem, qty?: number) => void;
}) {
  const [currentImage, setCurrentImage] = React.useState(0);

  const images =
    "images" in selectedItem &&
    Array.isArray((selectedItem as any).images) &&
    (selectedItem as any).images.length > 0
      ? (selectedItem as any).images
      : [selectedItem.image];

  React.useEffect(() => {
    setCurrentImage(0);
  }, [selectedItem.id]);

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative h-full min-h-0 overflow-hidden bg-[#f4eee5]">

      {/* =====================================================
          BOOK BACKGROUND
          ===================================================== */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute inset-0 bg-gradient-to-br from-[#f8f3eb] via-[#f1e9de] to-[#e9dfd1]" />

        {/* Textura decorativa */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)]
            [background-size:18px_18px]
          "
        />

      </div>


      {/* =====================================================
          CLOSE BUTTON
          ===================================================== */}

      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="
          absolute
          right-5
          top-5
          z-[80]

          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-full

          border
          border-primary/10

          bg-card/80
          backdrop-blur-md

          text-foreground/50

          shadow-sm

          transition-all
          duration-300

          hover:scale-105
          hover:bg-primary
          hover:text-white
        "
      >
        ×
      </button>


      {/* =====================================================
          BOOK
          ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          min-h-0
          w-full
          flex-col
          lg:flex-row

          [perspective:1800px]
        "
      >

        <AnimatePresence mode="wait">

          <motion.div
            key={selectedItem.id}
            initial={{
              opacity: 0,
              rotateY: -12,
              x: 35,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              rotateY: 0,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotateY: 12,
              x: -35,
              scale: 0.985,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex
              min-h-0
              h-full
              w-full
              flex-col
              lg:flex-row
              [transform-style:preserve-3d]
            "
          >

            {/* =================================================
                PAGE 1 — IMAGE
                ================================================= */}

            <section
              className="
                relative
                h-[280px]
                shrink-0

                sm:h-[350px]

                lg:h-full
                lg:w-[34%]

                overflow-hidden

                bg-[#ded4c7]

                lg:rounded-l-[1.5rem]
              "
            >

              <Image
                src={images[currentImage]}
                alt={selectedItem.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="
                  object-cover
                  transition-transform
                  ease-out
                "
              />

              {/* Image overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/65
                  via-black/10
                  to-transparent
                "
              />


              {/* Experience label */}

              <div className="absolute left-6 top-6 z-20">

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/20
                    bg-black/30
                    px-4
                    py-2
                    backdrop-blur-md
                  "
                >

                  <Images
                    size={13}
                    className="text-white"
                  />

                  <span
                    className="
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.25em]
                      text-white
                    "
                  >
                    Experiencia Casa Origen
                  </span>

                </div>

              </div>


              {/* Image arrows */}

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previousImage}
                    className="
                      absolute
                      left-5
                      top-1/2
                      z-20

                      flex
                      h-11
                      w-11
                      -translate-y-1/2
                      items-center
                      justify-center

                      rounded-full
                      border
                      border-white/20

                      bg-black/30
                      text-white

                      backdrop-blur-md

                      transition-all
                      duration-300

                      hover:scale-110
                      hover:bg-primary
                    "
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    className="
                      absolute
                      right-5
                      top-1/2
                      z-20

                      flex
                      h-11
                      w-11
                      -translate-y-1/2
                      items-center
                      justify-center

                      rounded-full
                      border
                      border-white/20

                      bg-black/30
                      text-white

                      backdrop-blur-md

                      transition-all
                      duration-300

                      hover:scale-110
                      hover:bg-primary
                    "
                  >
                    <ChevronRight size={19} />
                  </button>
                </>
              )}


              {/* Image indicators */}

              {images.length > 1 && (
                <div
                  className="
                    absolute
                    bottom-6
                    left-1/2
                    z-20
                    flex
                    -translate-x-1/2
                    items-center
                    gap-2
                  "
                >

                  {images.map((_: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        index === currentImage
                          ? "w-8 bg-white"
                          : "w-1.5 bg-white/50"
                      )}
                    />
                  ))}

                </div>
              )}


              {/* Image counter */}

              <div
                className="
                  absolute
                  bottom-6
                  right-6
                  z-20

                  rounded-full
                  bg-black/30

                  px-3
                  py-1.5

                  text-[9px]
                  font-black
                  tracking-[0.2em]
                  text-white

                  backdrop-blur-md
                "
              >
                {String(currentImage + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </div>

            </section>


            {/* =================================================
                BOOK SPINE
                ================================================= */}

            <div
              className="
                hidden
                lg:block
                w-[1px]
                shrink-0
                bg-primary/15
                shadow-[1px_0_0_rgba(255,255,255,0.6)]
              "
            />


            {/* =================================================
                PAGE 2 — STORY
                ================================================= */}

            <section
              className="
                flex
                min-h-0
                flex-1
                flex-col

                overflow-y-auto

                border-b
                border-primary/10

                bg-[#f8f4ee]

                px-6
                py-8

                sm:px-8

                lg:w-[33%]
                lg:border-b-0
                lg:border-r
                lg:px-10
                lg:py-12

                xl:px-12
              "
            >

              {/* Page number */}

              <div
                className="
                  mb-8
                  flex
                  items-center
                  justify-between
                "
              >

                <span
                  className="
                    font-headline
                    text-xs
                    italic
                    text-foreground/30
                  "
                >
                  Casa Origen
                </span>

                <span
                  className="
                    text-[9px]
                    font-black
                    tracking-[0.3em]
                    text-primary/50
                  "
                >
                  01
                </span>

              </div>


              {/* Tags */}

              <div className="mb-5 flex flex-wrap gap-2">

                {selectedItem.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="
                      rounded-full
                      border
                      border-primary/10
                      bg-primary/10
                      px-4
                      py-1.5

                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.2em]
                      text-primary

                      hover:bg-primary/10
                    "
                  >
                    {tag}
                  </Badge>
                ))}

              </div>


              {/* Small title */}

              <div className="mb-5 flex items-center gap-3">

                <span className="h-px w-8 bg-primary/40" />

                <span
                  className="
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.35em]
                    text-primary
                  "
                >
                  Sabor de Ciénaga
                </span>

              </div>


              {/* Dish name */}

              <DialogHeader>

                <DialogTitle
                  className="
                    font-headline
                    text-4xl
                    font-bold
                    leading-[0.94]
                    tracking-[-0.045em]
                    text-foreground

                    sm:text-5xl
                    lg:text-[3.5rem]
                    xl:text-[3.8rem]
                  "
                >
                  {selectedItem.name}
                </DialogTitle>

              </DialogHeader>


              {/* Decorative line */}

              <div
                className="
                  my-8
                  h-px
                  w-full
                  bg-gradient-to-r
                  from-primary/30
                  via-primary/10
                  to-transparent
                "
              />


              {/* Cultural story */}

              <div
                className="
                  rounded-[1.7rem]
                  border
                  border-primary/10
                  bg-white/50
                  p-6
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]
                "
              >

                <div className="mb-5 flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary/10
                      text-primary
                    "
                  >
                    <BookOpen size={17} />
                  </div>

                  <div>

                    <span
                      className="
                        block
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.3em]
                        text-primary
                      "
                    >
                      Relato Cultural
                    </span>

                    <span
                      className="
                        text-xs
                        text-foreground/40
                      "
                    >
                      Una historia detrás del plato
                    </span>

                  </div>

                </div>


                <p
                  className="
                    font-headline
                    text-base
                    italic
                    leading-[1.9]
                    text-foreground/70

                    sm:text-lg
                  "
                >
                  "{selectedItem.culturalStory}"
                </p>

              </div>


              {/* Footer */}

              <div
                className="
                  mt-auto
                  pt-8
                "
              >

                <p
                  className="
                    font-headline
                    text-xl
                    italic
                    leading-relaxed
                    text-foreground
                  "
                >
                 "{selectedItem.description}"
                </p>

              </div>

            </section>


            {/* =================================================
                PAGE 3 — DETAILS
                ================================================= */}

            <section
              className="
                flex
                min-h-0
                flex-1
                flex-col

                overflow-y-auto

                bg-[#f1e9df]

                px-6
                py-8

                sm:px-8

                lg:w-[33%]
                lg:px-9
                lg:py-12

                xl:px-10
              "
            >

              {/* Page number */}

              <div
                className="
                  mb-8
                  flex
                  items-center
                  justify-between
                "
              >

                <span
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-primary/50
                  "
                >
                  El plato
                </span>

                <span
                  className="
                    text-[9px]
                    font-black
                    tracking-[0.3em]
                    text-primary/50
                  "
                >
                  02
                </span>

              </div>


              {/* =================================================
                  INGREDIENTS
                  ================================================= */}

              <div className="mb-9">

                <div className="mb-5 flex items-center gap-4">

                  <h4
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.35em]
                      text-primary
                    "
                  >
                    Ingredientes
                  </h4>

                  <span className="h-px flex-1 bg-primary/10" />

                </div>


                <ul className="space-y-3">

                  {selectedItem.ingredients.map((ing) => (
                    <li
                      key={ing}
                      className="
                        flex
                        items-center
                        gap-3

                        text-sm
                        leading-relaxed
                        text-foreground/65
                      "
                    >

                      <span
                        className="
                          h-1.5
                          w-1.5
                          shrink-0
                          rounded-full
                          bg-primary/50
                        "
                      />

                      {ing}

                    </li>
                  ))}

                </ul>

              </div>


              {/* =================================================
                  DETAILS
                  ================================================= */}

              <div className="mb-9">

                <div className="mb-5 flex items-center gap-4">

                  <h4
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.35em]
                      text-primary
                    "
                  >
                    Detalles
                  </h4>

                  <span className="h-px flex-1 bg-primary/10" />

                </div>


                <div className="space-y-3">

                  <div
                    className="
                      flex
                      items-center
                      gap-4

                      rounded-2xl
                      border
                      border-primary/10
                      bg-white/40

                      px-4
                      py-4
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center

                        rounded-xl
                        bg-primary/10
                        text-primary
                      "
                    >
                      <ChefHat size={17} />
                    </div>

                    <div>

                      <span
                        className="
                          block
                          text-[8px]
                          font-black
                          uppercase
                          tracking-[0.2em]
                          text-foreground/35
                        "
                      >
                        Preparación
                      </span>

                      <span className="text-sm text-foreground/70">
                        {selectedItem.preparation}
                      </span>

                    </div>

                  </div>


                  <div
                    className="
                      flex
                      items-center
                      gap-4

                      rounded-2xl
                      border
                      border-primary/10
                      bg-white/40

                      px-4
                      py-4
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center

                        rounded-xl
                        bg-primary/10
                        text-primary
                      "
                    >
                      <Clock size={17} />
                    </div>

                    <div>

                      <span
                        className="
                          block
                          text-[8px]
                          font-black
                          uppercase
                          tracking-[0.2em]
                          text-foreground/35
                        "
                      >
                        Tiempo
                      </span>

                      <span className="text-sm text-foreground/70">
                        {selectedItem.prepTime}
                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* =================================================
                  PURCHASE
                  ================================================= */}

              <div
                className="
                  mt-auto

                  rounded-[1.7rem]
                  border
                  border-primary/10

                  bg-white/60

                  p-5

                  shadow-sm
                "
              >

                <span
                  className="
                    block
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-foreground/35
                  "
                >
                  Precio por plato
                </span>


                <div className="mt-1 flex items-end justify-between gap-3">

                  <span
                    className="
                      font-headline
                      text-3xl
                      font-bold
                      text-primary
                    "
                  >
                    ${selectedItem.price.toLocaleString()}
                  </span>

                  <span
                    className="
                      rounded-full
                      bg-primary/10
                      px-3
                      py-1

                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.15em]
                      text-primary
                    "
                  >
                    Por plato
                  </span>

                </div>


                <Button
                  onClick={() => {
                    addToCart(selectedItem);
                    onClose();
                  }}
                  className="
                    group
                    mt-5

                    h-[60px]
                    w-full

                    rounded-[1.25rem]

                    bg-primary
                    text-base
                    font-black
                    uppercase
                    tracking-[0.12em]
                    text-white

                    shadow-[0_15px_35px_rgba(0,0,0,0.16)]

                    transition-all
                    duration-300

                    hover:scale-[1.02]
                    hover:bg-primary/90
                  "
                >

                  Añadir al banquete

                  <ChevronRight
                    size={18}
                    className="
                      ml-3
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </Button>

                <p
                  className="
                    mt-3
                    text-center
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-foreground/30
                  "
                >
                  Se agregará a tu pedido
                </p>

              </div>

            </section>

          </motion.div>

        </AnimatePresence>

      </div>

    </div>
  );
}
function FishPond({
  onSelectDish,
}: {
  onSelectDish: (item: MenuItem) => void;
}) {
  const seafoodItems = MENU_ITEMS.filter(
    (item) => item.category === "Seafood"
  ).slice(0, 6);

  if (seafoodItems.length === 0) {
    return null;
  }

  const fishPositions = [
    "left-[8%] top-[25%]",
    "left-[35%] top-[18%]",
    "right-[12%] top-[30%]",
    "left-[20%] bottom-[25%]",
    "right-[32%] bottom-[18%]",
    "right-[7%] bottom-[25%]",
  ];

  return (
    <section className="mt-16 mb-24">

      {/* =====================================================
          SECTION HEADER
          ===================================================== */}

      <div className="mb-12 text-center">

        <span
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-primary/20
            bg-primary/5
            px-5
            py-2

            text-[9px]
            font-black
            uppercase
            tracking-[0.3em]
            text-primary
          "
        >
          <Fish size={13} />
          Experiencia interactiva
        </span>

        <h2
          className="
            mt-5
            font-headline
            text-5xl
            font-bold
            tracking-tight
            text-foreground

            md:text-7xl
          "
        >
          Del mar a la mesa
        </h2>

        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            font-headline
            text-lg
            italic
            text-foreground/50
          "
        >
          Explora nuestro estanque y descubre los platos que nacen
          de los sabores del Caribe.
        </p>

      </div>


      {/* =====================================================
          POND
          ===================================================== */}

      <div
        className="
          relative
          mx-auto

          h-[520px]
          w-full
          max-w-6xl

          overflow-hidden

          rounded-[4rem]

          border
          border-primary/20

          bg-[#164f5a]

          shadow-[0_30px_80px_rgba(0,0,0,0.18)]
        "
      >

        {/* Water layers */}

        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_20%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.10),transparent_25%),linear-gradient(135deg,#164f5a,#0d3945)]
          "
        />

        {/* Water waves */}

        <div className="absolute inset-0 opacity-20">

          <div
            className="
              absolute
              left-[-10%]
              top-[20%]
              h-[1px]
              w-[120%]
              rotate-[-4deg]
              bg-white
            "
          />

          <div
            className="
              absolute
              left-[-10%]
              top-[55%]
              h-[1px]
              w-[120%]
              rotate-[3deg]
              bg-white
            "
          />

          <div
            className="
              absolute
              left-[-10%]
              top-[78%]
              h-[1px]
              w-[120%]
              rotate-[-2deg]
              bg-white
            "
          />

        </div>


        {/* Decorative bubbles */}

        {[1, 2, 3, 4, 5, 6, 7].map((bubble) => (
          <motion.span
            key={bubble}
            className="
              absolute
              h-2
              w-2
              rounded-full
              border
              border-white/30
              bg-white/10
            "
            style={{
              left: `${10 + bubble * 11}%`,
              bottom: `${8 + (bubble % 4) * 10}%`,
            }}
            animate={{
              y: [-10, -60],
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + bubble * 0.4,
              repeat: Infinity,
              delay: bubble * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}


        {/* =================================================
            FISHES
            ================================================= */}

        {seafoodItems.map((item, index) => {

          const position =
            fishPositions[index % fishPositions.length];

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onSelectDish(item)}
              className={cn(
                `
                  absolute
                  z-20

                  flex
                  items-center
                  justify-center


                  cursor-pointer

                  group
                `,
                position
              )}
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                scale: 1.15,
              }}
              animate={{
                x: [0, 15, -10, 0],
                y: [0, -8, 6, 0],
              }}
              transition={{
                duration: 6 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >                        <Image
                          src={item.capture}
                          alt={item.name}
                          fill
                          className="
  object-contain
  transition-transform
  ease-out
  group-hover:scale-[1.06]
"
                        />

              {/* Fish icon */}

              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center

                  rounded-full

                  text-white

                  shadow-[0_10px_30px_rgba(0,0,0,0.25)]

                  transition-all
                  duration-300

                  group-hover:bg-white
                  group-hover:text-primary
                "
              >
                <Fish
                  size={34}
                  strokeWidth={1.5}
                />
              </div>


              {/* Hover information */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-full
                  left-1/2
                  mb-4
                  w-48
                  -translate-x-1/2

                  rounded-2xl

                  border
                  border-white/20

                  bg-black/50
                  p-4

                  text-center
                  text-white

                  opacity-0
                  backdrop-blur-xl

                  transition-all
                  duration-300

                  group-hover:opacity-100
                  group-hover:-translate-y-1
                "
              >

                <span
                  className="
                    block
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.25em]
                    text-white/50
                  "
                >
                  Descubrir
                </span>

                <span
                  className="
                    mt-1
                    block
                    font-headline
                    text-base
                    font-bold
                  "
                >
                  {item.name}
                </span>

                <span
                  className="
                    mt-2
                    block
                    text-[10px]
                    text-white/60
                  "
                >
                  Toca para conocer el plato
                </span>

              </div>

            </motion.button>
          );
        })}


        {/* Center message */}

        <div
          className="
            absolute
            left-1/2
            top-1/2

            -translate-x-1/2
            -translate-y-1/2

            pointer-events-none

            text-center
          "
        >

          <Fish
            size={32}
            className="mx-auto mb-3 text-white/30"
          />

          <span
            className="
              block
              text-[9px]
              font-black
              uppercase
              tracking-[0.35em]
              text-white/40
            "
          >
            Explora
          </span>

          <p
            className="
              mt-2
              whitespace-nowrap
              font-headline
              text-lg
              italic
              text-white/30
            "
          >
            El mar guarda nuestros sabores
          </p>

        </div>

      </div>

    </section>
  );
}
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { toast } = useToast();

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? MENU_ITEMS
        : MENU_ITEMS.filter((i) => i.category === activeCategory),
    [activeCategory],
  );

  const addToCart = (item: MenuItem, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id
            ? {
                ...i,
                quantity: i.quantity + qty,
              }
            : i,
        );
      }

      return [
        ...prev,
        {
          item,
          quantity: qty,
        },
      ];
    });

    toast({
      title: "✨ Añadido a tu pedido",
      description: `${item.name} × ${qty}`,
    });
  };

  const updateQuantity = (itemId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.item.id === itemId) {
            const newQty = Math.max(0, i.quantity + delta);
            return { ...i, quantity: newQty };
          }
          return i;
        })
        .filter((i) => i.quantity > 0),
    );
  };

  const total = cart.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0,
  );

  const sendWhatsAppOrder = () => {
    const message =
      `¡Hola Casa Origen! 🦎\nQuisiera realizar el siguiente pedido:\n\n` +
      cart.map((i) => `• ${i.item.name} (x${i.quantity})`).join("\n") +
      `\n\n💰 Total: $${total.toLocaleString()}\n\n¡Muchas gracias! 🌊`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/573000000000?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 pb-5 bg-secondary/10 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <Badge className="bg-primary/20 text-primary border-none px-4 py-2 text-2xl uppercase tracking-widest font-black">
              Gastronomía de Autor
            </Badge>
            <h1 className="text-6xl md:text-9xl font-bold font-headline tracking-tighter text-foreground">
              Sabores del Magdalena
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto italic font-light">
              "Una travesía culinaria donde cada ingrediente rinde tributo a
              nuestra tierra y nuestro mar."
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 relative z-20">
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-10 pt-10 gap-2 no-scrollbar justify-center">
          <div className="flex bg-card/90 backdrop-blur-2xl p-2 rounded-full border border-primary/30 hover:border-primary shadow-xl">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-7 py-2 rounded-full text-[13px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-primary text-white shadow-xl scale-110"
                    : "text-foreground/40 hover:text-primary hover:bg-primary/5",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

{/* Modern Responsive Carousel Menu */}
<div className="mt-6 sm:mt-10 w-full">
  <Carousel
    opts={{
      align: "start",
      loop: filteredItems.length > 1,
    }}
    className="w-full max-w-7xl mx-auto"
  >
    <CarouselContent className="-ml-3 sm:-ml-4 md:-ml-6">
      {filteredItems.map((item, index) => (
        <CarouselItem
          key={item.id}
          className="
            pl-3 sm:pl-4 md:pl-6
            basis-[88%]
            xs:basis-[85%]
            sm:basis-[75%]
            md:basis-1/2
            lg:basis-1/3
            xl:basis-1/4
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            whileHover={{
              y: -6,
              scale: 1.01,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer h-full py-3 sm:py-6"
          >
            <div
              className="
                bg-card
                text-card-foreground
                rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem]
                overflow-hidden
                shadow-sm
                hover:shadow-2xl
                transition-all duration-300
                border border-primary/10
                h-full
                flex flex-col
              "
            >
              {/* Product Image */}
              
              <div className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="
                    (max-width: 640px) 88vw,
                    (max-width: 1024px) 50vw,
                    (max-width: 1280px) 33vw,
                    25vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-[1200ms]
                    ease-out
                    group-hover:scale-[1.06]
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-black/80 via-transparent
                    flex items-end justify-center
                    pb-4 sm:pb-5
                    opacity-0
                    group-hover:opacity-100
                    transition-all duration-500
                  "
                >
                  <span
                    className="
                      text-white
                      text-[9px] sm:text-[10px]
                      font-black
                      uppercase
                      tracking-[0.2em] sm:tracking-[0.3em]
                      bg-primary/60
                      backdrop-blur-md
                      px-3 py-2
                      rounded-full
                      border border-white/20
                      shadow-2xl
                    "
                  >
                    Descubrir Relato
                  </span>
                </div>

                {/* Price */}
                <Badge
                  className="
                    absolute
                    top-3 right-3
                    sm:top-4 sm:right-4
                    bg-accent/95
                    text-primary
                    border-none
                    shadow-2xl
                    px-3 py-1
                    font-black
                    text-base sm:text-lg lg:text-xl
                    rounded-full
                  "
                >
                  ${item.price.toLocaleString()}
                </Badge>
              </div>

              {/* Product Information */}
              <div
                className="
                  p-4 sm:p-5
                  space-y-3 sm:space-y-4
                  flex-1
                  flex flex-col
                  justify-between
                "
              >
                <div className="space-y-2">
                  <h3
                    className="
                      text-xl
                      sm:text-2xl
                      lg:text-3xl
                      font-bold
                      font-headline
                      leading-tight
                      text-foreground
                      group-hover:text-primary
                      transition-colors
                    "
                  >
                    {item.name}
                  </h3>

                  <p
                    className="
                      text-sm
                      sm:text-base
                      text-foreground/50
                      line-clamp-3
                      sm:line-clamp-4
                      italic
                    "
                  >
                    "{item.description}"
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-primary/10">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="
                      w-full
                      sm:w-fit
                      bg-secondary/50
                      hover:bg-primary
                      hover:text-white
                      text-primary
                      rounded-2xl sm:rounded-[2rem]
                      transition-all
                      h-11 sm:h-10
                      font-black
                      text-xs sm:text-[13px]
                      lg:text-[15px]
                      uppercase
                      tracking-wider
                      sm:tracking-widest
                      shadow-inner
                      border border-primary/10
                    "
                  >
                    <Plus size={17} className="mr-2" />
                    Añadir a la Mesa
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </CarouselItem>
      ))}
    </CarouselContent>
    {/* Navigation */}
    <div className="hidden md:flex">
      <CarouselPrevious
        className="
          absolute
          z-50
          left-2
          lg:-left-5
          h-10 w-10
          bg-card
          border-primary/70
          text-primary
          hover:bg-primary
          hover:text-white
          transition-all
          shadow-xl
          rounded-full
        "
      />

      <CarouselNext
        className="
        z-50
          absolute
          right-2
          lg:-right-5
          h-10 w-10
          bg-card
          border-primary/70
          text-primary
          hover:bg-primary
          hover:text-white
          transition-all
          shadow-xl
          rounded-full
        "
      />
    </div>
  </Carousel>
</div>
      </div>
      {/* =========================================================
          INTERACTIVE FISH POND
          TEMPORARY EXPERIMENT
          ========================================================= */}

      <FishPond
        onSelectDish={(item) => setSelectedItem(item)}
      />

{/* =========================================================
    DISH EXPERIENCE MODAL
    CASA ORIGEN
    ========================================================= */}

<Dialog
  open={!!selectedItem}
  onOpenChange={() => setSelectedItem(null)}
>
<DialogContent
  className="
    w-[calc(100vw-1rem)]
    sm:w-[calc(100vw-2rem)]
    max-w-[1400px]

    h-[min(90dvh,820px)]
    max-h-[calc(100dvh-1rem)]

    p-0
    overflow-hidden

    border
    border-primary/20
    rounded-[1.5rem]
    sm:rounded-[2rem]

    bg-card
    text-card-foreground

    shadow-[0_30px_100px_rgba(0,0,0,0.35)]

    z-[105]
  "
>

    {selectedItem && (
      <DishModalContent
        selectedItem={selectedItem}
        onClose={() => setSelectedItem(null)}
        addToCart={addToCart}
      />
    )}

  </DialogContent>
</Dialog>

{/* =========================================================
    FLOATING CART — CASA ORIGEN
    ========================================================= */}

<Sheet>
  {/* =======================================================
      FLOATING CART BUTTON
      ======================================================= */}

  <SheetTrigger asChild>
    {cart.length > 0 && (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 18,
        }}
        className="fixed bottom-10 right-8 z-50"
      >
        <Button
          className="
            relative
            h-14
            w-14
            rounded-full
            bg-card-foreground
            text-card
            border-4
            border-card
            shadow-[0_15px_50px_rgba(0,0,0,0.30)]
            transition-all
            duration-300
            hover:scale-110
            group
          "
        >
          <ShoppingCart
            size={20}
            className="
              transition-all
              duration-300
              group-hover:rotate-[-8deg]
              group-hover:scale-110
            "
          />

          {/* Quantity badge */}
          <motion.span
            key={cart.reduce((s, e) => s + e.quantity, 0)}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="
              absolute
              -top-3
              -right-1
              flex
              h-6
              min-w-6
              items-center
              justify-center
              rounded-full
              bg-primary
              px-1.5
              text-[11px]
              font-black
              text-white
              shadow-lg
              ring-2
              ring-card
            "
          >
            {cart.reduce((s, e) => s + e.quantity, 0)}
          </motion.span>
        </Button>
      </motion.div>
    )}
  </SheetTrigger>


  {/* =======================================================
      CART PANEL
      ======================================================= */}

  <SheetContent
    side="right"
    className="
      w-full
      h-auto
      sm:max-w-[400px]
      bg-card
      text-card-foreground
      border-l
      p-0
      border-primary/10
      shadow-[-20px_0_70px_rgba(0,0,0,0.18)]
      rounded-l-[2.5rem]
      overflow-hidden
    "
  >

    <div className="flex h-full flex-col">


      {/* ===================================================
          CART HEADER
          =================================================== */}

      <SheetHeader
        className="
          shrink-0
          px-5
          pt-16
          border-b
          border-primary/10
          bg-background/80
          backdrop-blur-xl
        "
      >

        <div className="flex items-start justify-between gap-3">

          {/* Title */}

          <div className="space-y-1">

            <div className="flex items-center gap-2">

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-label
                "
              >
                <ShoppingCart size={15} />
              </div>

              <span
                className="
                  text-[12px]
                  font-black
                  uppercase
                  tracking-[0.3em]
                  text-primary
                "
              >
                Tu pedido
              </span>

            </div>


            <SheetTitle
              className="
                font-headline
                text-3xl
                font-bold
                tracking-tight
                text-foreground
              "
            >
              Tu Banquete
            </SheetTitle>


            <p
              className="
                max-w-[280px]
                text-sm
                italic
                leading-relaxed
                text-foreground/50
              "
            >
              Selección para degustada bajo la brisa.
            </p>

          </div>


          {/* Items counter */}

          <div
            className="
              flex
              min-w-[50px]
              flex-col
              items-center
              rounded-3xl
              bg-primary/10
              px-2
              py-2
            "
          >

            <span
              className="
                text-xl
                font-black
                leading-none
                text-label
              "
            >
              {cart.reduce((s, e) => s + e.quantity, 0)}
            </span>

            <span
              className="
                mt-1
                text-[10px]
                font-black
                uppercase
                tracking-[0.15em]
                text-foreground
              "
            >
              Items
            </span>

          </div>

        </div>

      </SheetHeader>


      {/* ===================================================
          PRODUCTS
          =================================================== */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-3
          py-3
          space-y-2
        "
      >

        {cart.map((entry, index) => (

          <motion.div
            key={entry.item.id}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.04,
            }}
            className="
              group
              relative
              flex
              gap-4
              rounded-[1.5rem]
              border
              border-primary/10
              bg-background/50
              p-3
              transition-all
              duration-300
              hover:border-primary/20
              hover:bg-primary/[0.03]
              hover:shadow-sm
            "
          >

            {/* =================================================
                PRODUCT IMAGE
                ================================================= */}

            <div
              className="
                relative
                h-[92px]
                w-[92px]
                shrink-0
                overflow-hidden
                rounded-[1.2rem]
                bg-secondary/20
              "
            >

              <Image
                src={entry.item.image}
                alt={entry.item.name}
                fill
                sizes="92px"
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/20
                  to-transparent
                "
              />

            </div>


            {/* =================================================
                PRODUCT INFORMATION
                ================================================= */}

            <div className="flex min-w-0 flex-1 flex-col justify-between py-1">

              {/* Name */}

              <div>

                <h4
                  className="
                    line-clamp-2
                    font-headline
                    text-[17px]
                    font-bold
                    leading-tight
                    text-foreground
                  "
                >
                  {entry.item.name}
                </h4>

                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    text-foreground/40
                  "
                >
                  ${entry.item.price.toLocaleString()} / unidad
                </p>

              </div>


              {/* Bottom row */}

              <div className="mt-3 flex items-center justify-between gap-3">


                {/* Quantity */}

                <div
                  className="
                    flex
                    h-9
                    items-center
                    rounded-xl
                    border
                    border-primary/10
                    bg-card
                    shadow-sm
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(entry.item.id, -1)
                    }
                    aria-label={`Disminuir ${entry.item.name}`}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-l-xl
                      text-foreground/40
                      transition-colors
                      hover:bg-primary/10
                      hover:text-primary
                    "
                  >
                    <Minus size={14} />
                  </button>


                  <span
                    className="
                      w-7
                      text-center
                      text-sm
                      font-black
                      text-foreground
                    "
                  >
                    {entry.quantity}
                  </span>


                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(entry.item.id, 1)
                    }
                    aria-label={`Aumentar ${entry.item.name}`}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-r-xl
                      text-foreground/40
                      transition-colors
                      hover:bg-primary/10
                      hover:text-primary
                    "
                  >
                    <Plus size={14} />
                  </button>

                </div>


                {/* Subtotal */}

                <span
                  className="
                    text-base
                    font-black
                    text-primary
                  "
                >
                  $
                  {(
                    entry.item.price * entry.quantity
                  ).toLocaleString()}
                </span>

              </div>

            </div>

          </motion.div>

        ))}

      </div>


      {/* ===================================================
          CHECKOUT FOOTER
          =================================================== */}

      <div
        className="
          shrink-0
          border-t
          border-primary/10
          bg-background/95
          px-6
          pb-6
          pt-5
          backdrop-blur-2xl
          shadow-[0_-15px_40px_rgba(0,0,0,0.06)]
        "
      >

        {/* Total */}

        <div
          className="
            mb-5
            flex
            items-end
            justify-between
          "
        >

          <div className="space-y-1">

            <span
              className="
                block
                text-[9px]
                font-black
                uppercase
                tracking-[0.3em]
                text-foreground/35
              "
            >
              Total a pagar
            </span>

            <span
              className="
                block
                text-xs
                text-foreground/40
              "
            >
              Pedido para tu mesa
            </span>

          </div>


          <span
            className="
              font-headline
              text-3xl
              font-bold
              text-primary
            "
          >
            ${total.toLocaleString()}
          </span>

        </div>


        {/* WhatsApp */}

        <Button
          onClick={sendWhatsAppOrder}
          className="
            group
            h-[64px]
            w-full
            rounded-[1.35rem]
            border-none
            bg-[#25D366]
            text-base
            font-black
            uppercase
            tracking-[0.1em]
            text-white
            shadow-[0_12px_30px_rgba(37,211,102,0.22)]
            transition-all
            duration-300
            hover:scale-[1.015]
            hover:bg-[#20bd5a]
            hover:shadow-[0_16px_35px_rgba(37,211,102,0.30)]
          "
        >

          <Send
            size={19}
            className="
              mr-3
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />

          Enviar pedido a WhatsApp

        </Button>


        {/* Confirmation */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-center
            gap-2
          "
        >

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[#25D366]
            "
          />

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-foreground/35
            "
          >
            Confirmaremos tu pedido por WhatsApp
          </p>

        </div>

      </div>

    </div>

  </SheetContent>
</Sheet>
    </div>
  );
}
