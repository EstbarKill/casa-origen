'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Waves,
  User,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Send,
  Phone,
  MessageSquare,
  X,
  Landmark,
  Compass,
  Gift,
  Utensils,
  Star,
  Trophy,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DISCOVERIES = [
  {
    id: 'legend-caiman',
    title: 'El Secreto del Caimán',
    text: 'Has descubierto el origen de nuestra danza. Tomasita no solo es una leyenda, es el corazón de nuestra resiliencia.',
    reward: '15% de Descuento en tu próxima cena',
    code: 'CAIMAN15',
    icon: Landmark,
    color: 'bg-primary',
  },
  {
    id: 'coconut-tradition',
    title: 'Sabor de Origen',
    text: 'Nuestra leche de coco se extrae artesanalmente. Los pescadores dicen que el secreto está en el ritmo de la marea.',
    reward: 'Cóctel de Bienvenida Gratis',
    code: 'COCO-FREE',
    icon: Compass,
    color: 'bg-accent',
  },
  {
    id: 'chef-secret',
    title: 'Toque del Chef',
    text: 'El ají dulce que usamos viene directamente de la Sierra Nevada de Santa Marta.',
    reward: "Postre 'Tomasita' de Cortesía",
    code: 'CHEF-GIFT',
    icon: Utensils,
    color: 'bg-orange-400',
  },
];

export function DiscoverySystem() {
  const [activeDiscovery, setActiveDiscovery] = useState<
    (typeof DISCOVERIES)[0] | null
  >(null);

  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [showInventory, setShowInventory] = useState(false);

  const { toast } = useToast();

  /*
   * Recuperar descubrimientos guardados
   */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('casa-origen-discoveries');

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setFoundIds(parsed);
        }
      }
    } catch (error) {
      console.error(
        'No se pudieron recuperar los descubrimientos:',
        error
      );
    }
  }, []);

  /*
   * Manejar descubrimiento
   */
  const handleDiscovery = (id: string) => {
    const discovery = DISCOVERIES.find((item) => item.id === id);

    if (!discovery) return;

    /*
     * Si ya fue descubierto,
     * simplemente mostramos nuevamente la recompensa.
     */
    if (foundIds.includes(id)) {
      setActiveDiscovery(discovery);
      return;
    }

    const newFound = [...foundIds, id];

    setFoundIds(newFound);

    try {
      localStorage.setItem(
        'casa-origen-discoveries',
        JSON.stringify(newFound)
      );
    } catch (error) {
      console.error(
        'No se pudo guardar el descubrimiento:',
        error
      );
    }

    setActiveDiscovery(discovery);

    toast({
      title: '¡TESORO ENCONTRADO! 🏆',
      description: `Has revelado: ${discovery.title}. Revisa tu inventario.`,
    });
  };

  /*
   * Cerrar modal de descubrimiento
   */
  const closeDiscovery = () => {
    setActiveDiscovery(null);
  };

  /*
   * Cerrar inventario
   */
  const closeInventory = () => {
    setShowInventory(false);
  };

  /*
   * Icono dinámico del descubrimiento activo
   */
  const ActiveDiscoveryIcon = activeDiscovery?.icon;

  return (
    <>
      {/* =========================================================
          FLOATING INVENTORY BUTTON
      ========================================================= */}

      {/* Floating Trophy Button */}
      <motion.button
        whileHover={{ scale: 1, rotate: -2 }}
        whileTap={{ scale: 0.9}}
        onClick={() => setShowInventory(true)}
        className="fixed bottom-32 left-8 z-[60] bg-foreground backdrop-blur px-4 py-4 rounded-full border-2 border-primary text-primary shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-3 group overflow-hidden"
      >
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative">
            <Trophy size={28} className={foundIds.length > 0 ? "text-sun fill-orange-400 animate-bounce" : "text-foreground/20"} />
            {foundIds.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-sun text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white">
                {foundIds.length}
              </span>
            )}
          </div>
          <span className="text-[15px] font-black uppercase tracking-[0.2em] hidden group-hover:block transition-all pr-2">Inventario Cultural</span>
        </div>
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
      </motion.button>

      {/* =========================================================
          DISCOVERY REWARD MODAL
      ========================================================= */}

<AnimatePresence>
  {activeDiscovery && (
    <div
      className="
        fixed inset-0
        z-[110]
        flex items-start justify-center
        bg-black/75
        backdrop-blur-md
        px-4
        pt-[4.5rem]
        pb-4
      "
    >
      <motion.div
        initial={{
          scale: 0.92,
          opacity: 0,
          y: 20,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        exit={{
          scale: 0.95,
          opacity: 0,
          y: 20,
        }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 180,
        }}
        className="
          relative
          w-full
          max-w-[760px]
          max-h-[calc(100dvh-5.5rem)]
          overflow-hidden
          rounded-[2.5rem]
          sm:rounded-[3.5rem]
          bg-[#f8f1e8]
          border
          border-primary/20
          border-t-[6px]
          border-t-primary
          shadow-[0_30px_80px_rgba(0,0,0,0.35)]
        "
      >
        {/* Decorative Aura */}
        <div
          className="
            pointer-events-none
            absolute
            -top-24
            -right-24
            w-56
            h-56
            rounded-full
            bg-primary/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-24
            -left-24
            w-56
            h-56
            rounded-full
            bg-accent/20
            blur-3xl
          "
        />

        {/* Close */}
        <button
          type="button"
          onClick={() => setActiveDiscovery(null)}
          aria-label="Cerrar"
          className="
            absolute
            top-4
            right-4
            z-30
            w-10
            h-10
            rounded-full
            flex
            items-center
            justify-center
            bg-white/70
            text-foreground/70
            border
            border-primary/10
            shadow-sm
            transition-all
            hover:bg-primary
            hover:text-white
            hover:scale-105
          "
        >
          <X size={21} />
        </button>

        {/* Content */}
        <div
          className="
            relative
            z-10
            px-5
            py-6
            sm:px-10
            sm:py-7
            text-center
          "
        >
          {/* Icon */}
          <motion.div
            animate={{
              rotate: [0, 4, -4, 0],
              y: [0, -3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="
              mx-auto
              mb-4
              w-16
              h-16
              sm:w-20
              sm:h-20
              rounded-[1.5rem]
              sm:rounded-[2rem]
              flex
              items-center
              justify-center
              bg-primary
              text-white
              shadow-xl
              border-4
              border-white/70
            "
          >
            <activeDiscovery.icon
              size={34}
              strokeWidth={1.8}
            />
          </motion.div>

          {/* Category */}
          <div
            className="
              inline-flex
              items-center
              px-4
              py-1.5
              rounded-full
              border
              border-primary/25
              bg-primary/5
              text-primary
              text-[9px]
              sm:text-[10px]
              font-black
              uppercase
              tracking-[0.28em]
            "
          >
            Tesoro cultural descubierto
          </div>

          {/* Title */}
          <h3
            className="
              mt-3
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-headline
              font-bold
              leading-tight
              text-foreground
            "
          >
            {activeDiscovery.title}
          </h3>

          {/* Description */}
          <p
            className="
              mt-3
              mx-auto
              max-w-[620px]
              text-base
              sm:text-lg
              text-foreground/55
              italic
              leading-relaxed
              font-light
            "
          >
            "{activeDiscovery.text}"
          </p>

          {/* Reward */}
          <motion.div
            initial={{
              y: 15,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
              duration: 0.4,
            }}
            className="
              relative
              mt-5
              rounded-[2rem]
              border
              border-primary/20
              bg-white/55
              px-5
              py-5
              sm:px-7
              shadow-lg
            "
          >
            {/* VIP label */}
            <div
              className="
                absolute
                -top-3
                left-1/2
                -translate-x-1/2
                whitespace-nowrap
                bg-[#f8f1e8]
                px-4
                py-1
                rounded-full
                border
                border-primary/30
                text-[9px]
                font-black
                uppercase
                tracking-[0.25em]
                text-primary
              "
            >
              Beneficio VIP
            </div>

            {/* Reward header */}
            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                text-primary
              "
            >
              <Gift
                size={22}
                className="animate-pulse"
              />

              <span
                className="
                  text-lg
                  sm:text-xl
                  font-bold
                  uppercase
                  tracking-tight
                "
              >
                Recompensa
              </span>
            </div>

            {/* Reward */}
            <p
              className="
                mt-2
                text-xl
                sm:text-2xl
                font-headline
                font-bold
                text-foreground
                leading-tight
              "
            >
              {activeDiscovery.reward}
            </p>

            {/* Code */}
            <div
              className="
                mt-4
                pt-4
                border-t
                border-primary/10
                flex
                flex-col
                items-center
                gap-2
              "
            >
              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-foreground/40
                "
              >
                Tu código único
              </span>

              <code
                className="
                  inline-flex
                  items-center
                  justify-center
                  min-w-[180px]
                  sm:min-w-[230px]
                  px-5
                  py-2.5
                  rounded-xl
                  border-2
                  border-dashed
                  border-primary/35
                  bg-white
                  font-mono
                  font-black
                  text-xl
                  sm:text-2xl
                  text-primary
                  tracking-[0.18em]
                  shadow-inner
                  select-all
                "
              >
                {activeDiscovery.code}
              </code>
            </div>
          </motion.div>

          {/* Footer */}
          <p
            className="
              mt-4
              text-[8px]
              sm:text-[9px]
              uppercase
              tracking-[0.25em]
              font-black
              text-foreground/40
            "
          >
            Válido al presentar este código en Casa Origen
          </p>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

      {/* =========================================================
          CULTURAL INVENTORY
      ========================================================= */}

<AnimatePresence>
  {showInventory && (
    <div
      className="
        fixed
        inset-0
        z-[105]
        flex
        place-items-center
        justify-center
        bg-black/70
        backdrop-blur-md
        px-3
        sm:px-5
        pt-[4.5rem]
        pb-3
      "
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowInventory(false)}
        className="absolute inset-0"
      />

      {/* Panel */}
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.97,
        }}
        transition={{
          type: "spring",
          damping: 24,
          stiffness: 180,
        }}
        className="
          relative
          z-10
          w-full
          max-w-[1050px]
          max-h-[calc(100dvh-5.5rem)]
          overflow-hidden
          rounded-[2rem]
          sm:rounded-[3rem]
          bg-[#f8f1e8]
          border
          border-primary/15
          shadow-[0_30px_80px_rgba(0,0,0,0.35)]
        "
      >
        {/* Header */}
        <div
          className="
            relative
            px-5
            pt-5
            pb-4
            sm:px-8
            sm:pt-6
            sm:pb-5
            border-b
            border-primary/10
          "
        >
          <button
            type="button"
            onClick={() => setShowInventory(false)}
            aria-label="Cerrar"
            className="
              absolute
              top-4
              right-4
              sm:top-5
              sm:right-5
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              bg-white/70
              text-foreground/60
              border
              border-primary/10
              transition-all
              hover:bg-primary
              hover:text-white
              hover:scale-105
            "
          >
            <X size={19} />
          </button>

          <div className="pr-12">
            <div className="flex items-center gap-3">
              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-primary
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-md
                "
              >
                <Trophy size={19} />
              </div>

              <h3
                className="
                  text-2xl
                  sm:text-3xl
                  font-headline
                  font-bold
                  text-foreground
                "
              >
                Diario de Tesoros
              </h3>
            </div>

            <p
              className="
                mt-1
                ml-12
                text-sm
                sm:text-base
                text-foreground/50
                italic
              "
            >
              Explora la cultura de Ciénaga para desbloquear privilegios.
            </p>
          </div>
        </div>

        {/* Discoveries */}
        <div
          className="
            px-5
            py-5
            sm:px-8
            sm:py-6
          "
        >
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-3
              sm:gap-4
            "
          >
            {DISCOVERIES.map((disc) => {
              const isFound = foundIds.includes(disc.id);

              return (
                <motion.button
                  type="button"
                  key={disc.id}
                  whileHover={
                    isFound
                      ? {
                          y: -3,
                          scale: 1.01,
                        }
                      : {}
                  }
                  whileTap={
                    isFound
                      ? {
                          scale: 0.98,
                        }
                      : {}
                  }
                  onClick={() =>
                    isFound && handleDiscovery(disc.id)
                  }
                  disabled={!isFound}
                  className={`
                    relative
                    w-full
                    min-h-[88px]
                    p-3
                    sm:p-4
                    rounded-[1.5rem]
                    border
                    text-left
                    transition-all
                    flex
                    items-center
                    gap-3
                    sm:gap-4
                    overflow-hidden
                    ${
                      isFound
                        ? `
                          border-primary/20
                          bg-white/60
                          hover:bg-primary/5
                          hover:border-primary/40
                          shadow-sm
                          cursor-pointer
                        `
                        : `
                          border-dashed
                          border-foreground/10
                          bg-foreground/[0.03]
                          opacity-50
                          grayscale
                          cursor-default
                        `
                    }
                  `}
                >
                  {/* Accent */}
                  {isFound && (
                    <div
                      className="
                        absolute
                        left-0
                        top-0
                        bottom-0
                        w-1
                        bg-primary
                      "
                    />
                  )}

                  {/* Icon */}
                  <div
                    className={`
                      shrink-0
                      w-12
                      h-12
                      sm:w-14
                      sm:h-14
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      ${
                        isFound
                          ? `
                            bg-primary
                            text-white
                            shadow-md
                          `
                          : `
                            bg-foreground/10
                            text-foreground/30
                          `
                      }
                    `}
                  >
                    {isFound ? (
                      <disc.icon size={24} />
                    ) : (
                      <Star size={24} />
                    )}
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <h4
                      className={`
                        text-base
                        sm:text-lg
                        font-bold
                        font-headline
                        leading-tight
                        truncate
                        ${
                          isFound
                            ? "text-primary"
                            : "text-foreground/40"
                        }
                      `}
                    >
                      {isFound
                        ? disc.title
                        : "Secreto Bloqueado"}
                    </h4>

                    <p
                      className={`
                        mt-1
                        text-[8px]
                        sm:text-[9px]
                        uppercase
                        font-black
                        tracking-[0.18em]
                        ${
                          isFound
                            ? "text-foreground/40"
                            : "text-foreground/25"
                        }
                      `}
                    >
                      {isFound
                        ? "Ver recompensa"
                        : "Sigue explorando Ciénaga"}
                    </p>
                  </div>

                  {/* Status */}
                  <div
                    className={`
                      shrink-0
                      text-[9px]
                      font-black
                      ${
                        isFound
                          ? "text-primary"
                          : "text-foreground/20"
                      }
                    `}
                  >
                    {isFound ? "✓" : "???"}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Master Achievement */}
          {foundIds.length === DISCOVERIES.length && (
            <motion.div
              initial={{
                scale: 0.97,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              className="
                relative
                mt-4
                p-4
                sm:p-5
                rounded-[1.75rem]
                bg-foreground
                text-white
                text-center
                shadow-xl
                overflow-hidden
                border
                border-primary/20
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  bg-primary/10
                  animate-pulse
                "
              />

              <div className="relative z-10">
                <Star
                  className="
                    mx-auto
                    mb-1
                    text-primary
                    fill-primary
                  "
                  size={25}
                />

                <h4
                  className="
                    text-xl
                    sm:text-2xl
                    font-headline
                    font-bold
                  "
                >
                  ¡Maestro del Caimán! 🐊
                </h4>

                <p
                  className="
                    mt-1
                    text-sm
                    sm:text-base
                    text-white/60
                    italic
                    leading-relaxed
                    max-w-2xl
                    mx-auto
                  "
                >
                  Has revelado todos los secretos. Tienes un
                  regalo VIP esperándote en tu próxima reserva.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

      {/* =========================================================
          HIDDEN DISCOVERY TRIGGERS
      ========================================================= */}

      <div className="hidden" aria-hidden="true">
        <button
          type="button"
          id="trigger-legend"
          onClick={() => handleDiscovery('legend-caiman')}
        />

        <button
          type="button"
          id="trigger-coconut"
          onClick={() =>
            handleDiscovery('coconut-tradition')
          }
        />

        <button
          type="button"
          id="trigger-chef"
          onClick={() => handleDiscovery('chef-secret')}
        />
      </div>
    </>
  );
}