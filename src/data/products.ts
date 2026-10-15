/**
 * Centralized Product and Brand Data for Raj's By AZ
 * "Little luxuries. Beautifully boxed."
 */

export interface GiftBoxProduct {
  id: string
  name: string
  title: string
  handle: string
  price: string
  priceValue: number
  itemCount: number
  label?: string
  tagline: string
  shortDescription: string
  fullDescription: string
  buttonText: string
  cta: string
  items: string[]
  thumbnail: string
  featured: boolean
  collection: {
    title: string
  }
  categoryTags: string[]
  accentColor?: string
}

export const GIFT_BOX_PRODUCTS: GiftBoxProduct[] = [
  {
    id: "prod_mini",
    name: "Mini Beauty Box",
    title: "Mini Beauty Box",
    handle: "mini-beauty-box",
    price: "Rs. 1,499",
    priceValue: 1499,
    itemCount: 14,
    tagline: "Little treats. Lovely surprises.",
    shortDescription:
      "A little box of happiness, filled with beauty and everyday accessories she'll love.",
    fullDescription:
      "The Mini Beauty Box is made for those sweet little moments when you want to make someone smile. Featuring a charming mix of makeup, jewellery and everyday accessories, it's a lovely way to celebrate a birthday, surprise a friend or treat yourself.",
    buttonText: "Explore Mini Box",
    cta: "Add Mini Box to Cart",
    items: [
      "Lipstick",
      "Lip gloss",
      "Eyeliner",
      "Earrings",
      "Bracelet",
      "Ring",
      "Scrunchie",
      "Claw clip",
      "Hair clips",
      "Hairband",
      "Makeup sponge",
      "Mini mirror",
      "Press-on nails",
      "Cosmetic pouch"
    ],
    thumbnail:
      "https://res.cloudinary.com/dvyhnxnpq/image/upload/v1792085888/adc96011-4afc-4614-8752-c7dba986dc98_juwzbq.webp?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    collection: {
      title: "14-Item Collection"
    },
    categoryTags: ["14 Items", "Makeup Essentials", "Cute Accessories", "Budget Friendly"],
    accentColor: "#F4EAE6"
  },
  {
    id: "prod_signature",
    name: "Signature Beauty Box",
    title: "Signature Beauty Box",
    handle: "signature-beauty-box",
    label: "Featured Collection",
    price: "Rs. 2,499",
    priceValue: 2499,
    itemCount: 20,
    tagline: "Twenty little luxuries. One beautiful surprise.",
    shortDescription:
      "Twenty lovely beauty, jewellery and fashion favourites brought together in one thoughtfully packed gift.",
    fullDescription:
      "Our Signature Beauty Box brings together 20 beauty and fashion favourites in one lovely gift. From makeup essentials and pretty jewellery to hair accessories and everyday little luxuries, this box is designed to make gifting simple, thoughtful and exciting.",
    buttonText: "Explore Signature Box",
    cta: "Add Signature Box to Cart",
    items: [
      "Lipstick",
      "Lip gloss",
      "Eyeliner",
      "Mascara",
      "Compact powder",
      "Necklace",
      "Earrings",
      "Bracelet",
      "Ring",
      "Scarf / Stole",
      "Scrunchie",
      "Claw clip",
      "Hair clips",
      "Hairband",
      "Makeup sponge",
      "Mini makeup brush set",
      "Mini mirror",
      "Press-on nails",
      "Cosmetic pouch",
      "Jewellery pouch"
    ],
    thumbnail:
      "https://res.cloudinary.com/dvyhnxnpq/image/upload/v1792085888/56cffae3-5cc4-45af-b8fa-44a4cb5a5e92_e4qct2.webp?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    collection: {
      title: "Featured 20-Item Box"
    },
    categoryTags: ["20 Items", "Most Popular", "Jewellery & Makeup", "Perfect Gift"],
    accentColor: "#EAE0D5"
  },
  {
    id: "prod_premium",
    name: "Premium Beauty Box",
    title: "Premium Beauty Box",
    handle: "premium-beauty-box",
    price: "Rs. 3,499",
    priceValue: 3499,
    itemCount: 25,
    tagline: "More beauty. More sparkle. More smiles.",
    shortDescription:
      "A fuller collection of beautiful little treats for those extra-special gifting moments.",
    fullDescription:
      "For a celebration that calls for something extra special, the Premium Beauty Box brings together a bigger collection of makeup, jewellery, fashion accessories and little luxuries. A thoughtful choice for birthdays, romantic surprises and memorable gifting moments.",
    buttonText: "Explore Premium Box",
    cta: "Add Premium Box to Cart",
    items: [
      "Lipstick",
      "Lip gloss",
      "Eyeliner",
      "Mascara",
      "Compact powder",
      "Necklace",
      "Earrings",
      "Bracelet",
      "Ring",
      "Scarf / Stole",
      "Scrunchie",
      "Claw clip",
      "Hair clips",
      "Hairband",
      "Makeup sponge",
      "Mini makeup brush set",
      "Mini mirror",
      "Press-on nails",
      "Cosmetic pouch",
      "Jewellery pouch",
      "Blush",
      "Mini eyeshadow palette",
      "Mini hand cream",
      "30ml body mist",
      "Satin hair bow"
    ],
    thumbnail:
      "https://res.cloudinary.com/dvyhnxnpq/image/upload/v1792085888/a6630539-e053-471b-84cb-6f0229ec1bcc_jk0or5.webp?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    collection: {
      title: "Deluxe 25-Item Box"
    },
    categoryTags: ["25 Items", "Full Collection", "Body Mist & Palette", "Luxury Unboxing"],
    accentColor: "#DFD2C7"
  }
]

export const BRAND_INFO = {
  name: "Raj's By AZ",
  tagline: "Little luxuries. Beautifully boxed.",
  announcement: "Little luxuries from Rs. 1,499 · Cash on Delivery available",
  whatsappNumber: "03149784156",
  whatsappInternational: "923149784156",
  easypaisaTitle: "Syed Khubaib Ali Shah",
  currency: "PKR",
  currencySymbol: "Rs.",
  city: "Pakistan Nationwide"
}

export const OCCASIONS = [
  {
    id: "birthday",
    title: "For Her Birthday",
    description: "Make her birthday a little brighter with a box full of lovely surprises.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    video: "/videos/occasion-birthday.mp4",
    tag: "Celebration"
  },
  {
    id: "special",
    title: "For Someone Special",
    description: "A thoughtful little gift for the person who makes your world more beautiful.",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80",
    video: "/videos/occasion-sister.mp4",
    tag: "Romance & Love"
  },
  {
    id: "just-because",
    title: "Just Because",
    description: "Because you don't need a special occasion to make someone smile.",
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80",
    video: "/videos/birthday-deal.mp4",
    tag: "Everyday Joy"
  }
]

export const WHY_CHOOSE_US = [
  {
    title: "Beautifully Put Together",
    description: "Curated combinations of makeup, jewellery and accessories, all in one gift-ready box."
  },
  {
    title: "Something for Every Budget",
    description: "Choose from three thoughtfully priced gift boxes starting at Rs. 1,499."
  },
  {
    title: "Know What's Inside",
    description: "Explore the items included in each box before making your choice."
  },
  {
    title: "Easy WhatsApp Ordering",
    description: "Select your favourites, enter your details and send your order request directly through WhatsApp."
  }
]

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose Your Box",
    description: "Explore Mini, Signature and Premium, then choose the collection you love."
  },
  {
    step: "02",
    title: "Add Your Details",
    description: "Add your box to the cart and enter your delivery or pickup information."
  },
  {
    step: "03",
    title: "Confirm on WhatsApp",
    description: "Review your order and send the prepared message through WhatsApp to request confirmation."
  }
]

export const FAQS = [
  {
    question: "What does Raj's By AZ sell?",
    answer: "We offer curated beauty and fashion gift boxes containing makeup, jewellery, accessories and other lovely little items."
  },
  {
    question: "How many gift boxes are available?",
    answer: "We have three options: Mini Beauty Box with 14 items, Signature Beauty Box with 20 items, and Premium Beauty Box with 25 items."
  },
  {
    question: "Can I see what's inside each box?",
    answer: "Yes. Each product page lists the items included in that collection."
  },
  {
    question: "Is Cash on Delivery available?",
    answer: "Yes, Cash on Delivery is available. You can select it during checkout."
  },
  {
    question: "Are delivery charges included?",
    answer: "No. Delivery charges are additional and will be confirmed before your order is finalised."
  },
  {
    question: "How do I place an order?",
    answer: "Choose your box, add it to the cart, enter your details and continue to WhatsApp. Send the prepared message to request order confirmation."
  },
  {
    question: "Can I buy a box for my girlfriend, wife, sister or friend?",
    answer: "Of course. Our boxes are designed for birthdays, celebrations, little surprises and thoughtful everyday gifts."
  },
  {
    question: "Can I include a gift note?",
    answer: "Yes. You can enter a short gift message during checkout."
  },
  {
    question: "What if something is missing or damaged?",
    answer: "Contact us on WhatsApp with your order information and clear photos of the issue so we can review it and explain the available next steps."
  }
]
