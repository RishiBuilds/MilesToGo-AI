"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Discover Your Next Adventure
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

// Destination-specific content components
const ParisContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Paris, the City of Lights, awaits you.
        </span>{" "}
        Wander along the Seine, marvel at the Eiffel Tower at sunset, and lose yourself in the artistic treasures of the Louvre. Indulge in croissants at charming sidewalk cafés and explore the bohemian streets of Montmartre.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🗼 Must Visit</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Eiffel Tower, Louvre Museum, Notre-Dame, Champs-Élysées</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🌸 Best Time</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">April to June & September to November</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2620&auto=format&fit=crop"
        alt="Eiffel Tower in Paris"
        className="md:w-2/3 h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};

const NewYorkContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          The city that never sleeps is calling.
        </span>{" "}
        From the dazzling lights of Times Square to the serenity of Central Park, NYC offers endless adventures. Catch a Broadway show, explore world-class museums, and taste cuisines from every corner of the globe.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🗽 Must Visit</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Statue of Liberty, Central Park, Empire State Building, Brooklyn Bridge</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🍂 Best Time</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">April to June & September to November</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2670&auto=format&fit=crop"
        alt="New York City skyline"
        className="md:w-2/3 h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};

const TokyoContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Where ancient traditions meet cutting-edge innovation.
        </span>{" "}
        Experience the electric energy of Shibuya Crossing, find peace at ancient temples, and savor authentic ramen in hidden alleyways. Tokyo is a sensory adventure like no other.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">⛩️ Must Visit</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Senso-ji Temple, Shibuya, Akihabara, Meiji Shrine</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🌸 Best Time</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">March to May (Cherry Blossom) & October to November</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop"
        alt="Tokyo cityscape with Mount Fuji"
        className="md:w-2/3 h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};

const LondonContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          A city steeped in history and royal grandeur.
        </span>{" "}
        Watch the Changing of the Guard at Buckingham Palace, explore centuries of art at the British Museum, and enjoy afternoon tea in elegant settings. London blends tradition with modern vibrancy.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🎡 Must Visit</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Big Ben, Tower Bridge, British Museum, Buckingham Palace</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">☀️ Best Time</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">May to September for warm weather</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=2665&auto=format&fit=crop"
        alt="Big Ben and London Eye"
        className="md:w-2/3 h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};

const DubaiContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          A futuristic oasis rising from the desert sands.
        </span>{" "}
        Stand atop the world's tallest building, shop in extravagant malls, and experience the magic of desert safaris. Dubai seamlessly blends luxury, adventure, and Arabian heritage.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🏙️ Must Visit</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Burj Khalifa, Palm Jumeirah, Dubai Mall, Gold Souk</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🌅 Best Time</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">November to March for pleasant weather</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2574&auto=format&fit=crop"
        alt="Dubai Marina skyline"
        className="md:w-2/3 h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};

const BarcelonaContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Where Gaudí's dreams come to life.
        </span>{" "}
        Marvel at the surreal Sagrada Familia, stroll through the whimsical Park Güell, and soak up the Mediterranean sun on golden beaches. Barcelona pulses with art, culture, and vibrant nightlife.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🎨 Must Visit</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Sagrada Familia, Park Güell, La Rambla, Gothic Quarter</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🌞 Best Time</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">May to June & September to October</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2670&auto=format&fit=crop"
        alt="Sagrada Familia in Barcelona"
        className="md:w-2/3 h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};

const RomeContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Walk through millennia of history in the Eternal City.
        </span>{" "}
        Stand in awe of the Colosseum, toss a coin in the Trevi Fountain, and savor authentic Italian pasta in centuries-old trattorias. Rome is a living museum of art, architecture, and la dolce vita.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🏛️ Must Visit</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Colosseum, Vatican City, Trevi Fountain, Pantheon</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🍝 Best Time</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">April to June & September to October</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2596&auto=format&fit=crop"
        alt="Colosseum in Rome"
        className="md:w-2/3 h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};

const SydneyContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Where stunning harbor views meet laid-back beach vibes.
        </span>{" "}
        Marvel at the iconic Opera House, surf the waves at Bondi Beach, and explore the natural wonders of the Blue Mountains. Sydney offers the perfect blend of urban excitement and outdoor adventure.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🦘 Must Visit</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Sydney Opera House, Harbour Bridge, Bondi Beach, Taronga Zoo</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🏖️ Best Time</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">September to November & March to May</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2670&auto=format&fit=crop"
        alt="Sydney Opera House and Harbour Bridge"
        className="md:w-2/3 h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};

const SingaporeContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          A garden city where innovation blooms.
        </span>{" "}
        Wander through the magical Gardens by the Bay, indulge in world-famous hawker food, and experience the dazzling Marina Bay Sands. Singapore is a melting pot of cultures, cuisines, and cutting-edge design.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🌳 Must Visit</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Gardens by the Bay, Marina Bay Sands, Sentosa Island, Chinatown</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🌴 Best Time</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">February to April (least rainfall)</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2652&auto=format&fit=crop"
        alt="Gardens by the Bay Singapore"
        className="md:w-2/3 h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};

const BaliContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          The Island of the Gods beckons with spiritual serenity.
        </span>{" "}
        Find your zen in Ubud's rice terraces, surf legendary waves, and witness ancient temple ceremonies. Bali offers a transformative escape where nature, spirituality, and adventure intertwine.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🌺 Must Visit</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Ubud Rice Terraces, Tanah Lot Temple, Seminyak Beach, Uluwatu</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🌊 Best Time</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">April to October (dry season)</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2638&auto=format&fit=crop"
        alt="Bali rice terraces"
        className="md:w-2/3 h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};

const SantoriniContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Where whitewashed beauty meets the Aegean blue.
        </span>{" "}
        Watch legendary sunsets from Oia, swim in volcanic hot springs, and wander through picturesque villages perched on cliffs. Santorini is the ultimate romantic escape.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🏝️ Must Visit</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Oia Village, Red Beach, Akrotiri Ruins, Fira</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🌅 Best Time</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">April to May & September to October</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2574&auto=format&fit=crop"
        alt="Santorini blue domes"
        className="md:w-2/3 h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};

const SwitzerlandContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Nature's masterpiece of alpine grandeur.
        </span>{" "}
        Ride scenic trains through snow-capped peaks, explore pristine lakes, and indulge in chocolate and cheese in charming villages. Switzerland is a dream destination for nature lovers and adventurers alike.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">🏔️ Must Visit</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Matterhorn, Lake Geneva, Interlaken, Lucerne, Jungfrau</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-100">⛷️ Best Time</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">December to March (skiing) & June to September (hiking)</p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2670&auto=format&fit=crop"
        alt="Swiss Alps and Matterhorn"
        className="md:w-2/3 h-auto mx-auto object-cover rounded-2xl mt-6"
      />
    </div>
  );
};

const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights — Eiffel Tower, Louvre & more",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
    content: <ParisContent />,
  },
  {
    category: "New York, USA",
    title: "Experience NYC — Times Square, Central Park, Broadway",
    src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2670&auto=format&fit=crop",
    content: <NewYorkContent />,
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo — Shibuya, Senso-ji Temple, Mount Fuji views",
    src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2594&auto=format&fit=crop",
    content: <TokyoContent />,
  },
  {
    category: "London, UK",
    title: "Visit London — Big Ben, Tower Bridge, British Museum",
    src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop",
    content: <LondonContent />,
  },
  {
    category: "Dubai, UAE",
    title: "Marvel at Dubai — Burj Khalifa, Palm Jumeirah, Gold Souk",
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2670&auto=format&fit=crop",
    content: <DubaiContent />,
  },
  {
    category: "Barcelona, Spain",
    title: "Experience Barcelona — Sagrada Familia, Park Güell, Gothic Quarter",
    src: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2670&auto=format&fit=crop",
    content: <BarcelonaContent />,
  },
  {
    category: "Rome, Italy",
    title: "Step into History — Colosseum, Vatican, Trevi Fountain",
    src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2596&auto=format&fit=crop",
    content: <RomeContent />,
  },
  {
    category: "Sydney, Australia",
    title: "Embrace the Harbour City — Opera House, Bondi, Blue Mountains",
    src: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2670&auto=format&fit=crop",
    content: <SydneyContent />,
  },
  {
    category: "Singapore",
    title: "Explore the Garden City — Marina Bay, Sentosa, Hawker Culture",
    src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2652&auto=format&fit=crop",
    content: <SingaporeContent />,
  },
  {
    category: "Bali, Indonesia",
    title: "Find Paradise — Ubud Rice Terraces, Temples, Pristine Beaches",
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2638&auto=format&fit=crop",
    content: <BaliContent />,
  },
  {
    category: "Santorini, Greece",
    title: "Chase Sunsets — Oia Views, Blue Domes, Volcanic Beauty",
    src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2574&auto=format&fit=crop",
    content: <SantoriniContent />,
  },
  {
    category: "Switzerland",
    title: "Alpine Wonders — Matterhorn, Lake Geneva, Scenic Train Rides",
    src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2670&auto=format&fit=crop",
    content: <SwitzerlandContent />,
  },
];
