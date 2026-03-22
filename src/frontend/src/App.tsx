import { Input } from "@/components/ui/input";
import { Download, Gamepad2, Search, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

type Genre = "All" | "Rummy" | "Slots" | "Spin" | "Other";

interface Game {
  id: number;
  title: string;
  image: string;
  bonus: string;
  minWithdrawal: string;
  url: string;
  genre: Exclude<Genre, "All">;
}

const TELEGRAM_URL = "https://t.me/allyonolink";

const GAMES: Game[] = [
  {
    id: 1,
    title: "New Yono Games",
    image: "https://i.ibb.co/WpxMpjNs/x.jpg",
    bonus: "₹108",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/all-yono-games/",
    genre: "Rummy",
  },
  {
    id: 2,
    title: "Diwa 777",
    image: "https://i.ibb.co/cXTL1gK8/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/diwa-777/",
    genre: "Slots",
  },
  {
    id: 3,
    title: "Rani Slots",
    image: "https://i.ibb.co/N2Tfm5My/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/rani-slots/",
    genre: "Slots",
  },
  {
    id: 4,
    title: "Goa Spin",
    image: "https://i.ibb.co/mCH1sx4w/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/goa-spin/",
    genre: "Spin",
  },
  {
    id: 5,
    title: "Rumble Rummy",
    image: "https://i.ibb.co/LXrFTcDw/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/rumble-rummy/",
    genre: "Rummy",
  },
  {
    id: 6,
    title: "Joy Rummy",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2026/01/Joy-Rummy-Apk.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/joy-rummy/",
    genre: "Rummy",
  },
  {
    id: 7,
    title: "INR Rummy",
    image: "https://i.ibb.co/whd6kyvw/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/inr-rummy/",
    genre: "Rummy",
  },
  {
    id: 8,
    title: "Rummy Sweety",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2026/02/Rummy-Sweety.png",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/rummy-sweety/",
    genre: "Rummy",
  },
  {
    id: 9,
    title: "Boss Rummy",
    image:
      "https://www.newallgamesyono.com/wp-content/uploads/2025/12/Boss-Rummy-Apk.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/boss-rummy/",
    genre: "Rummy",
  },
  {
    id: 10,
    title: "Rummy 888",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/11/photo_2025-11-21_13-58-34.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/rummy-888/",
    genre: "Rummy",
  },
  {
    id: 11,
    title: "Rummy 77",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/11/IMG_20251111_124347_168.png",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/rummy-77/",
    genre: "Rummy",
  },
  {
    id: 12,
    title: "Tara 777",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2026/03/Tara-777.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/tara-777/",
    genre: "Slots",
  },
  {
    id: 13,
    title: "777 Game",
    image: "https://i.ibb.co/mVfjyJYc/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/777-game/",
    genre: "Slots",
  },
  {
    id: 14,
    title: "Hindi 777",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/10/photo_2025-10-01_10-08-46.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/hindi-777/",
    genre: "Slots",
  },
  {
    id: 15,
    title: "Club Inr",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/10/68d2327774537-1000142071.png",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/club-inr/",
    genre: "Other",
  },
  {
    id: 16,
    title: "Ok Rummy",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/10/Ok-Rummy-Logo.webp",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/ok-rummy/",
    genre: "Rummy",
  },
  {
    id: 17,
    title: "Game Rummy",
    image: "https://i.ibb.co/fYsjQSG5/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/game-rummy/",
    genre: "Rummy",
  },
  {
    id: 18,
    title: "Yes Spin",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/10/68bb0f5b4a472-1000138647.png",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/yes-spin/",
    genre: "Spin",
  },
  {
    id: 19,
    title: "Maha Games",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/10/MAHA-GAMES.png",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/maha-games/",
    genre: "Other",
  },
  {
    id: 20,
    title: "Love Rummy",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/11/68a098df50687-1000135262.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/love-rummy/",
    genre: "Rummy",
  },
  {
    id: 21,
    title: "Share Slots",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2026/03/photo_6172514075267501977_x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/share-slots/",
    genre: "Slots",
  },
  {
    id: 22,
    title: "Hi Rummy",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/10/Hi-Rummy.webp",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/hi-rummy/",
    genre: "Rummy",
  },
  {
    id: 23,
    title: "Jaiho Win",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2026/03/photo_6170262275453816406_m.jpg",
    bonus: "₹55",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/jaiho-win/",
    genre: "Other",
  },
  {
    id: 24,
    title: "Slots Spin",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/10/Slots-Spin.webp",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/slots-spin/",
    genre: "Spin",
  },
  {
    id: 25,
    title: "ABC Rummy",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/10/ABC-RUMMY-APK.png",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/abc-rummy/",
    genre: "Rummy",
  },
  {
    id: 26,
    title: "Neta Vip",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/10/Neta-Vip.webp",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/neta-vip/",
    genre: "Other",
  },
  {
    id: 27,
    title: "Saga Slots",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/10/Saga-Slots.webp",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/saga-slots/",
    genre: "Slots",
  },
  {
    id: 28,
    title: "Jaiho 777",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/10/Jaiho-777.png",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/jaiho-777/",
    genre: "Slots",
  },
  {
    id: 29,
    title: "Top Rummy",
    image:
      "https://www.allyonogamess.com/wp-content/uploads/2025/10/685245994c9515.78081991.png",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/top-rummy/",
    genre: "Rummy",
  },
  {
    id: 30,
    title: "Yono Play",
    image: "https://i.ibb.co/Kc8qxXSn/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/yono-play/",
    genre: "Other",
  },
  {
    id: 31,
    title: "Yono Agent",
    image: "https://i.ibb.co/4RyW74d5/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/yono-agent/",
    genre: "Other",
  },
  {
    id: 32,
    title: "UU Rummy",
    image: "https://i.ibb.co/zWBW1zfT/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/uu-rummy/",
    genre: "Rummy",
  },
  {
    id: 33,
    title: "Spin Yes",
    image: "https://i.ibb.co/pjy3M9n4/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/spin-yes/",
    genre: "Spin",
  },
  {
    id: 34,
    title: "Jaiho 91",
    image: "https://i.ibb.co/jPb8rCkz/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/jaiho-91/",
    genre: "Other",
  },
  {
    id: 35,
    title: "Jaiho Bet",
    image: "https://i.ibb.co/PZ5Pn3Zz/x.jpg",
    bonus: "₹550",
    minWithdrawal: "₹100",
    url: "https://www.allyonogamess.com/jaiho-bet/",
    genre: "Other",
  },
];

const GENRES: Genre[] = ["All", "Rummy", "Slots", "Spin", "Other"];

const GENRE_COLORS: Record<Genre, string> = {
  All: "bg-gaming-surface text-muted-foreground border-gaming-border",
  Rummy: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Slots: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Spin: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Other: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

// ── Game Card ────────────────────────────────────────────────────────────────

function GameCard({ game, index }: { game: Game; index: number }) {
  return (
    <motion.article
      data-ocid={`game.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.6) }}
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "oklch(0.18 0.028 240)",
        border: "1px solid oklch(0.28 0.04 240)",
        boxShadow: "0 4px 20px oklch(0 0 0 / 35%)",
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-gaming-surface">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span
          className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
            GENRE_COLORS[game.genre]
          }`}
        >
          {game.genre}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <h3 className="font-heading font-bold text-sm text-foreground leading-tight line-clamp-1">
          {game.title}
        </h3>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              Sign-up Bonus
            </span>
            <span
              className="text-[12px] font-bold"
              style={{ color: "oklch(0.75 0.18 150)" }}
            >
              {game.bonus}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              Min. Withdrawal
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">
              {game.minWithdrawal}
            </span>
          </div>
        </div>

        <a
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`game.primary_button.${index + 1}`}
          className="mt-auto flex items-center justify-center gap-1.5 w-full text-center text-xs font-bold uppercase tracking-wider py-2 rounded-full text-white transition-opacity hover:opacity-90 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.2 150), oklch(0.55 0.18 160))",
            boxShadow: "0 2px 12px oklch(0.65 0.2 150 / 35%)",
          }}
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </a>
      </div>
    </motion.article>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────────

export default function App() {
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState<Genre>("All");

  const filteredGames = useMemo(() => {
    return GAMES.filter((g) => {
      const matchesSearch = g.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesGenre = activeGenre === "All" || g.genre === activeGenre;
      return matchesSearch && matchesGenre;
    });
  }, [search, activeGenre]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.13 0.03 240) 0%, oklch(0.16 0.04 250) 100%)",
      }}
    >
      {/* Header */}
      <header
        data-ocid="nav.panel"
        className="sticky top-0 z-50 border-b border-gaming-border"
        style={{
          background: "oklch(0.15 0.03 242 / 95%)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Logo + title */}
          <div className="flex items-center gap-2 shrink-0">
            <Gamepad2 className="w-6 h-6 text-gaming-cyan" />
            <span className="font-heading font-extrabold text-lg text-gradient-neon">
              GAME HUB
            </span>
            <span className="ml-1 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border border-gaming-border text-muted-foreground hidden sm:inline">
              {GAMES.length} Games
            </span>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="game.search_input"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-full bg-gaming-surface border-gaming-border focus:border-gaming-cyan text-sm h-9"
            />
          </div>

          {/* Genre filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {GENRES.map((g) => (
              <button
                type="button"
                key={g}
                data-ocid="genre.tab"
                onClick={() => setActiveGenre(g)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide border transition-all duration-200 ${
                  activeGenre === g
                    ? "genre-pill-active border-transparent"
                    : "bg-gaming-surface border-gaming-border text-muted-foreground hover:text-foreground hover:border-gaming-cyan/40"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Telegram Subscribe button */}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-sky-400/60 text-white bg-sky-500 hover:bg-sky-400 transition-colors shrink-0 shadow-md"
            style={{ boxShadow: "0 2px 12px oklch(0.6 0.18 220 / 40%)" }}
          >
            <Send className="w-3.5 h-3.5" />
            Subscribe
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6">
        {/* Section heading */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-extrabold text-lg uppercase tracking-widest flex items-center gap-3 text-foreground">
            <span
              className="w-1 h-6 rounded-full inline-block"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(0.80 0.18 200), oklch(0.58 0.22 290))",
              }}
            />
            {activeGenre === "All" ? "All Games" : `${activeGenre} Games`}
            <span className="text-sm font-normal text-muted-foreground normal-case tracking-normal">
              ({filteredGames.length})
            </span>
          </h2>
        </div>

        {/* Responsive grid */}
        <AnimatePresence mode="wait">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredGames.map((game, i) => (
                <GameCard key={game.id} game={game} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              data-ocid="game.empty_state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <Gamepad2 className="w-14 h-14 text-muted-foreground mb-4 opacity-40" />
              <p className="text-muted-foreground text-lg font-medium">
                No games found.
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Try a different search or genre filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveGenre("All");
                }}
                className="mt-4 text-gaming-cyan text-sm hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Count */}
        {filteredGames.length > 0 && (
          <p className="text-xs text-muted-foreground mt-3">
            Showing {filteredGames.length} of {GAMES.length} games
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gaming-border mt-auto">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-heading font-bold text-base">
            <Gamepad2 className="w-4 h-4 text-gaming-cyan" />
            <span className="text-gradient-neon">GAME HUB</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gaming-cyan hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <p className="text-xs text-muted-foreground">
              All games sourced from{" "}
              <a
                href="https://www.allyonogamess.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gaming-cyan hover:underline"
              >
                allyonogamess.com
              </a>
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 px-3 py-1 rounded-full transition-colors"
            >
              <Send className="w-3 h-3" />
              Subscribe on Telegram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
