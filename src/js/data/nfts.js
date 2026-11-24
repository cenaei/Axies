/**
 * Axies NFT Marketplace - Data Catalog
 */

export const NFT_CATALOG = [
  {
    id: "nft-1",
    title: "Hamlet Contemplates Yorick's Skull",
    category: "art",
    image: "./assets/img/post/Rectangle 62.png",
    creator: {
      name: "Andy Hurlbutt",
      avatar: "./assets/img/profile/Andy Hurlbutt.jpg",
      verified: true,
      chain: "BSC"
    },
    currentBidEth: 4.89,
    currentBidUsd: 12246,
    likes: 104,
    countdownHours: 8,
    isLive: true
  },
  {
    id: "nft-2",
    title: "Cybernetic Astronaut Odyssey",
    category: "virtual",
    image: "./assets/img/post/Rectangle 63.png",
    creator: {
      name: "Dan Salahi",
      avatar: "./assets/img/profile/Dan Salahi.jpg",
      verified: true,
      chain: "ETH"
    },
    currentBidEth: 3.45,
    currentBidUsd: 8625,
    likes: 182,
    countdownHours: 14,
    isLive: true
  },
  {
    id: "nft-3",
    title: "Synthesizer Echoes #08",
    category: "music",
    image: "./assets/img/post/Rectangle 64.png",
    creator: {
      name: "Harper Wilcher",
      avatar: "./assets/img/profile/Harper Wilcher.jpg",
      verified: true,
      chain: "BSC"
    },
    currentBidEth: 2.15,
    currentBidUsd: 5375,
    likes: 95,
    countdownHours: 5,
    isLive: true
  },
  {
    id: "nft-4",
    title: "Decentralized Dominion.eth",
    category: "domain",
    image: "./assets/img/post/Rectangle 65.png",
    creator: {
      name: "Blake Banks",
      avatar: "./assets/img/profile/Blake Banks.jpg",
      verified: false,
      chain: "ETH"
    },
    currentBidEth: 6.20,
    currentBidUsd: 15500,
    likes: 210,
    countdownHours: 19,
    isLive: true
  },
  {
    id: "nft-5",
    title: "Ethereal Monster Genesis",
    category: "collectibles",
    image: "./assets/img/post/Rectangle 66.png",
    creator: {
      name: "Sina Sangiji",
      avatar: "./assets/img/profile/Sina Sangiji.jpg",
      verified: true,
      chain: "BSC"
    },
    currentBidEth: 5.75,
    currentBidUsd: 14375,
    likes: 340,
    countdownHours: 11,
    isLive: true
  },
  {
    id: "nft-6",
    title: "Cyberpunk Metropolis #104",
    category: "virtual",
    image: "./assets/img/post/Rectangle 67.png",
    creator: {
      name: "Matt Ramos",
      avatar: "./assets/img/profile/Matt Ramos.jpg",
      verified: true,
      chain: "ETH"
    },
    currentBidEth: 1.85,
    currentBidUsd: 4625,
    likes: 88,
    countdownHours: 6,
    isLive: true
  },
  {
    id: "nft-7",
    title: "Neon Skull Dimension #7",
    category: "art",
    image: "./assets/img/post/Rectangle 68.png",
    creator: {
      name: "Monica Lucas",
      avatar: "./assets/img/profile/Monica Lucas.jpg",
      verified: true,
      chain: "BSC"
    },
    currentBidEth: 3.90,
    currentBidUsd: 9750,
    likes: 156,
    countdownHours: 9,
    isLive: true
  },
  {
    id: "nft-8",
    title: "Cosmic Melodies Audio Wave",
    category: "music",
    image: "./assets/img/post/Rectangle 61.png",
    creator: {
      name: "Tommy Alvarez",
      avatar: "./assets/img/profile/Tommy Alvarez.jpg",
      verified: false,
      chain: "ETH"
    },
    currentBidEth: 2.80,
    currentBidUsd: 7000,
    likes: 118,
    countdownHours: 22,
    isLive: true
  }
];

export const TOP_SELLERS = [
  { id: 1, name: "Andy Hurlbutt", avatar: "./assets/img/profile/Andy Hurlbutt.jpg", volume: "214.2 ETH", verified: true },
  { id: 2, name: "Blake Banks", avatar: "./assets/img/profile/Blake Banks.jpg", volume: "189.5 ETH", verified: true },
  { id: 3, name: "Crispin Berry", avatar: "./assets/img/profile/Crispin Berry.jpg", volume: "165.8 ETH", verified: true },
  { id: 4, name: "Dan Salahi", avatar: "./assets/img/profile/Dan Salahi.jpg", volume: "152.0 ETH", verified: true },
  { id: 5, name: "Harper Wilcher", avatar: "./assets/img/profile/Harper Wilcher.jpg", volume: "144.3 ETH", verified: true },
  { id: 6, name: "Matt Ramos", avatar: "./assets/img/profile/Matt Ramos.jpg", volume: "138.9 ETH", verified: true },
  { id: 7, name: "Monica Lucas", avatar: "./assets/img/profile/Monica Lucas.jpg", volume: "125.4 ETH", verified: true },
  { id: 8, name: "Sina Sangiji", avatar: "./assets/img/profile/Sina Sangiji.jpg", volume: "119.8 ETH", verified: true },
  { id: 9, name: "Tommy Alvarez", avatar: "./assets/img/profile/Tommy Alvarez.jpg", volume: "108.2 ETH", verified: true },
  { id: 10, name: "Windsor Lane", avatar: "./assets/img/profile/Windsor Lane.jpg", volume: "97.5 ETH", verified: true }
];

export const POPULAR_COLLECTIONS = [
  {
    id: "col-1",
    title: "Creative Art Collection",
    creator: { name: "Ralph Garraway", avatar: "./assets/img/avatar/13.png" },
    likes: 124,
    itemsCount: 12,
    images: {
      main: "./assets/img/nfts/1.png",
      sub1: "./assets/img/nfts/2.png",
      sub2: "./assets/img/nfts/12.png"
    }
  },
  {
    id: "col-2",
    title: "Colorful Abstract Worlds",
    creator: { name: "Mason Woodward", avatar: "./assets/img/profile/Blake Banks.jpg" },
    likes: 98,
    itemsCount: 8,
    images: {
      main: "./assets/img/nfts/14.png",
      sub1: "./assets/img/nfts/15.png",
      sub2: "./assets/img/nfts/1.png"
    }
  },
  {
    id: "col-3",
    title: "Modern Fantasy Creatures",
    creator: { name: "Freddie Carpenter", avatar: "./assets/img/profile/Crispin Berry.jpg" },
    likes: 145,
    itemsCount: 16,
    images: {
      main: "./assets/img/nfts/2.png",
      sub1: "./assets/img/nfts/12.png",
      sub2: "./assets/img/nfts/14.png"
    }
  }
];
