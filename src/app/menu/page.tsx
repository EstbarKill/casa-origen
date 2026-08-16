"use client";

import { useState, useMemo } from "react";
import * as React from "react";
import Image from "next/image";
import { hover, motion } from "framer-motion";
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

  /*
   * Si el producto tiene un array "images", utilizamos
   * todas las imágenes.
   *
   * Si solamente tiene "image", utilizamos esa como fallback.
   */
  const images =
    "images" in selectedItem &&
    Array.isArray((selectedItem as any).images) &&
    (selectedItem as any).images.length > 0
      ? (selectedItem as any).images
      : [selectedItem.image];

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
    <div
  className="
    grid
    h-full
    min-h-0
    grid-cols-1
    lg:grid-cols-3
    overflow-hidden
  "
>

      {/* =====================================================
          COLUMN 1
          VISUAL EXPERIENCE / CAROUSEL
          ===================================================== */}

      <section
  className="
    relative
    min-h-[280px]
    h-[32vh]
    sm:h-[380px]
    lg:h-full
    lg:min-h-0
    overflow-hidden
    bg-secondary/20
  "
>

        {/* Main image */}

<Image
  src={images[currentImage]}
  alt={selectedItem.name}
  fill
  priority
  sizes="(max-width: 1024px) 100vw, 33vw"
  className="
    object-cover
    transition-all
    duration-700
  "
/>

        {/* Image overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/60
            via-black/10
            to-transparent
          "
        />


        {/* =================================================
            CATEGORY
            ================================================= */}

        <div className="absolute left-6 top-6 z-10">

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
                text-[9px]
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


        {/* =================================================
            CAROUSEL ARROWS
            ================================================= */}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Imagen anterior"
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
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Siguiente imagen"
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
              <ChevronRight size={20} />
            </button>
          </>
        )}


        {/* =================================================
            IMAGE INDICATORS
            ================================================= */}

        {images.length > 1 && (
          <div
            className="
              absolute
              bottom-7
              left-1/2
              z-20
              flex
              -translate-x-1/2
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

            {images.map((_: string, index: number) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImage(index)}
                aria-label={`Ver imagen ${index + 1}`}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    index === currentImage
                      ? "w-8 bg-primary"
                      : "w-1.5 bg-white/60 hover:bg-white"
                  }
                `}
              />
            ))}

          </div>
        )}


        {/* =================================================
            IMAGE COUNTER
            ================================================= */}

        <div
          className="
            absolute
            bottom-7
            right-6
            z-20
            rounded-full
            border
            border-white/20
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


      {/* =====================================================
          COLUMN 2
          STORY / CULTURAL EXPERIENCE
          ===================================================== */}

<section
  className="
    flex
    min-h-0
    h-full
    flex-col
    overflow-hidden

    border-b
    border-primary/10

    bg-card

    lg:border-b-0
    lg:border-r
    lg:border-primary/10
  "
>

       <div
  className="
    min-h-0
    flex-1
    overflow-y-auto

    px-6
    py-7

    sm:px-7
    sm:py-8

    lg:px-8
    lg:py-9

    xl:px-9
    xl:py-10
  "
>

          {/* Tags */}

          <div className="mb-6 flex flex-wrap gap-2">

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
                  text-[9px]
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


          {/* Small label */}

          <div className="mb-4 flex items-center gap-3">

            <span className="h-px w-8 bg-primary/40" />

            <span
              className="
                text-[9px]
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
  max-w-xl
  font-headline
  text-3xl
  font-bold
  leading-[0.95]
  tracking-[-0.04em]
  text-foreground

  sm:text-4xl
  md:text-5xl
  lg:text-[3.5rem]
  xl:text-[3.7rem]
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
              rounded-[1.8rem]
              border
              border-primary/10
              bg-secondary/20
              p-6
              shadow-inner
            "
          >

            <div className="mb-4 flex items-center gap-3">

              <div
                className="
                  flex
                  h-9
                  w-9
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
                    text-[9px]
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
    leading-relaxed
    text-foreground/75

    sm:text-lg
              "
            >
              "{selectedItem.culturalStory}"
            </p>

          </div>


          {/* Cultural footer */}

          <div
            className="
              mt-8
              flex
              items-start
              gap-3
              text-sm
              leading-relaxed
              text-foreground/45
            "
          >

            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />

            <p>
              Cada plato cuenta una historia de nuestra costa,
              nuestra gente y la tradición que vive junto al
              Caribe.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          COLUMN 3
          INGREDIENTS / DETAILS / PURCHASE
          ===================================================== */}

<section
  className="
    flex
    h-full
    min-h-0
    flex-col
    overflow-hidden
    bg-background/40
  "
>

        <div
  className="
    min-h-0
    flex-1
    overflow-y-auto

    px-6
    py-7

    sm:px-7
    sm:py-8

    lg:px-8
    lg:py-9

    xl:py-10
  "
>


          {/* =================================================
              INGREDIENTS
              ================================================= */}

          <div className="mb-9">

            <div className="mb-5 flex items-center justify-between">

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

              <span
                className="
                  h-px
                  flex-1
                  ml-4
                  bg-primary/10
                "
              />

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

              {/* Preparation */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-primary/10
                  bg-card
                  px-4
                  py-3
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
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

                  <span
                    className="
                      text-sm
                      text-foreground/70
                    "
                  >
                    {selectedItem.preparation}
                  </span>

                </div>

              </div>


              {/* Time */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-primary/10
                  bg-card
                  px-4
                  py-3
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
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

                  <span
                    className="
                      text-sm
                      text-foreground/70
                    "
                  >
                    {selectedItem.prepTime}
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              PURCHASE CARD
              ================================================= */}

<div
  className="
    rounded-[1.5rem]
    sm:rounded-[1.8rem]

    border
    border-primary/10

    bg-card

    p-4
    sm:p-5

    shadow-sm
  "
>

            <div
              className="
                mb-5
                flex
                items-end
                justify-between
              "
            >

              <div>

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
                  Precio
                </span>

                <span
                  className="
                    mt-1
                    block
                    font-headline
                    text-3xl
                    font-bold
                    text-primary
                  "
                >
                  ${selectedItem.price.toLocaleString()}
                </span>

              </div>

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


            {/* Add button */}

            <Button
              onClick={() => {
                addToCart(selectedItem);
                onClose();
              }}
              className="
                group
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
                size={19}
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

        </div>

      </section>

    </div>
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

        {/* Modern Carousel Menu */}
        <div className="mt-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-6">
              {filteredItems.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -15 }}
                    onClick={() => setSelectedItem(item)}
                    className="group cursor-pointer h-full py-10"
                  >
                    <div className="bg-card text-card-foreground rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-primary/10 h-full flex flex-col">
                      <div className="relative aspect-[2/2] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex items-end justify-center pb-10 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] bg-primary/60 backdrop-blur-md px-8 py-3 rounded-full border border-white/20 shadow-2xl">
                            Descubrir Relato
                          </span>
                        </div>
                        <Badge className="absolute top-8 right-8 bg-card/95 text-primary border-none shadow-2xl px-6 py-3 font-black text-xl rounded-[1.5rem]">
                          ${item.price.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="p-10 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          <h3 className="text-3xl font-bold font-headline leading-tight text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-base text-foreground/50 line-clamp-2 italic">
                            "{item.description}"
                          </p>
                        </div>
                        <div className="pt-8 border-t border-primary/10">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item);
                            }}
                            className="w-full bg-secondary/50 hover:bg-primary hover:text-white text-primary rounded-[2rem] transition-all h-14 font-black text-[10px] uppercase tracking-widest shadow-inner border border-primary/10"
                          >
                            <Plus size={18} className="mr-3" /> Añadir a la Mesa
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-center gap-6 mt-5">
              <CarouselPrevious className="relative h-16 w-16 bg-card border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-xl rounded-full" />
              <CarouselNext className="relative h-16 w-16 bg-card border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-xl rounded-full" />
            </div>
          </Carousel>
        </div>
      </div>

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
