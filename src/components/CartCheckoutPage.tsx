import React, { useState } from "react"
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Copy,
  Check,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Banknote,
  Smartphone,
  X,
  Sparkles,
  MessageCircle,
  Gift,
  Home,
  Store,
} from "lucide-react"
import { BRAND_INFO } from "@/src/data/products"
import { AddToCartButton } from "@/src/components/ui/add-to-cart-button"
import { BrandLogoIcon } from "@/src/components/BrandLogo"

export interface CartItem {
  id: string
  productId: string
  title: string
  handle: string
  thumbnail: string
  price: string
  priceValue: number
  collection: string
  itemCount?: number
  itemsIncluded?: string[]
  giftNote?: string
  quantity: number
}

interface CartCheckoutPageProps {
  cart: CartItem[]
  onUpdateQuantity: (id: string, delta: number) => void
  onRemoveItem: (id: string) => void
  onAddSampleItem: () => void
  onBackToStore: () => void
  onClearCart: () => void
  onOpenPrivacy?: () => void
}

export default function CartCheckoutPage({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onAddSampleItem,
  onBackToStore,
  onClearCart,
  onOpenPrivacy,
}: CartCheckoutPageProps) {
  // Form state
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [altPhoneNumber, setAltPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("Karachi")
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery")
  const [giftMessage, setGiftMessage] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [consentGiven, setConsentGiven] = useState(true)

  // Payment state - for self pickup, payment is pay-at-pickup; for home delivery, COD or online transfer
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online" | "pickup">("cod")
  const [transactionId, setTransactionId] = useState("")
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [receiptPreviewUrl, setReceiptPreviewUrl] = useState<string | null>(null)
  const [copiedNumber, setCopiedNumber] = useState(false)

  // Handle delivery method toggle
  const handleSelectDeliveryMethod = (method: "delivery" | "pickup") => {
    setDeliveryMethod(method)
    if (method === "pickup") {
      setCity("Karachi")
      setPaymentMethod("pickup")
    } else {
      if (paymentMethod === "pickup") {
        setPaymentMethod("cod")
      }
    }
  }

  // Checkout flow state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [completedOrderDetails, setCompletedOrderDetails] = useState<any>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const subtotal = cart.reduce((sum, item) => sum + item.priceValue * item.quantity, 0)

  // Copy easypaisa number handler
  const handleCopyEasypaisa = () => {
    navigator.clipboard.writeText(BRAND_INFO.whatsappNumber)
    setCopiedNumber(true)
    setTimeout(() => setCopiedNumber(false), 2200)
  }

  // Handle receipt upload
  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setReceiptFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setReceiptPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
      if (formErrors.receipt) {
        setFormErrors((prev) => {
          const next = { ...prev }
          delete next.receipt
          return next
        })
      }
    }
  }

  const handleRemoveReceipt = () => {
    setReceiptFile(null)
    setReceiptPreviewUrl(null)
  }

  // Generate formatted WhatsApp message
  const generateWhatsAppUrl = () => {
    let text = `📦 *NEW ORDER REQUEST — RAJ'S BY AZ* 📦\n`
    text += `_Little luxuries. Beautifully boxed._\n\n`
    text += `*Customer Information:*\n`
    text += `• Name: ${fullName.trim()}\n`
    text += `• Mobile/WhatsApp: ${phoneNumber.trim()}\n`
    if (altPhoneNumber.trim()) text += `• Alt Number: ${altPhoneNumber.trim()}\n`
    if (deliveryMethod === "delivery") {
      text += `• City: ${city}\n`
      text += `• Address: ${address.trim()}\n`
      text += `• Method: Home Delivery\n\n`
    } else {
      text += `• Method: Self Pickup (Karachi Central Hub)\n\n`
    }

    text += `*Gift Boxes Ordered:*\n`
    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.title}* (${item.quantity}x) — Rs. ${(item.priceValue * item.quantity).toLocaleString()}\n`
    })

    text += `\n*Subtotal:* Rs. ${subtotal.toLocaleString()}\n`

    if (deliveryMethod === "pickup") {
      text += `*Delivery Charges:* Free (Self Pickup)\n`
      text += `*Payment Method:* Pay at Pickup / In-Person Collection\n`
    } else {
      text += `*Delivery Charges:* Delivery charges to be confirmed.\n`
      text += `*Payment Method:* ${paymentMethod === "online" ? "Online Transfer (Easypaisa to Syed Khubaib Ali Shah)" : "Cash on Delivery (COD)"}\n`
    }

    if (deliveryMethod === "delivery" && paymentMethod === "online") {
      if (transactionId.trim()) {
        text += `*Prepaid TID:* ${transactionId.trim()}\n`
      }
      if (receiptFile) {
        text += `*Payment Receipt:* Attached screenshot shared\n`
      }
    }
    if (giftMessage.trim()) {
      text += `\n💌 *Gift Card Message:*\n"${giftMessage.trim()}"\n`
    }
    if (specialInstructions.trim()) {
      text += `\n📝 *Notes:* ${specialInstructions.trim()}\n`
    }

    text += `\n_Please confirm my order availability. Thank you!_`

    return `https://wa.me/${BRAND_INFO.whatsappInternational}?text=${encodeURIComponent(text)}`
  }

  // Validation & Checkout Action
  const handleProceedToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}

    if (!fullName.trim()) errors.fullName = "Full name is required"
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Mobile / WhatsApp number is required"
    } else if (phoneNumber.trim().length < 10) {
      errors.phoneNumber = "Please enter a valid 11-digit mobile number"
    }
    if (!address.trim() && deliveryMethod === "delivery") {
      errors.address = "Complete delivery address is required"
    }
    if (!city.trim() && deliveryMethod === "delivery") {
      errors.city = "City is required"
    }
    if (!consentGiven) {
      errors.consent = "Please agree to send order details via WhatsApp"
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      window.scrollTo({ top: 300, behavior: "smooth" })
      return
    }

    setIsSubmitting(true)

    const whatsappUrl = generateWhatsAppUrl()

    setTimeout(() => {
      setIsSubmitting(false)
      const orderRef = `RBAZ-${Math.floor(100000 + Math.random() * 900000)}`
      setCompletedOrderDetails({
        orderRef,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        fullName,
        phoneNumber,
        altPhoneNumber,
        address,
        city,
        deliveryMethod,
        paymentMethod,
        transactionId,
        giftMessage,
        items: [...cart],
        subtotal,
        whatsappUrl,
      })
      setOrderCompleted(true)
      window.scrollTo({ top: 0, behavior: "smooth" })

      // Open WhatsApp in new tab/window
      window.open(whatsappUrl, "_blank")
    }, 800)
  }

  // ==================== ORDER CONFIRMATION VIEW ====================
  if (orderCompleted && completedOrderDetails) {
    return (
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-3xl mx-auto border border-border bg-card p-6 sm:p-12 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="flex flex-col items-center text-center pb-8 border-b border-border">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-1">
              Order Prepared &bull; Reference #{completedOrderDetails.orderRef}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase">
              Almost Ready To Make Someone's Day
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mt-2 font-light leading-relaxed">
              Your order details have been prepared for WhatsApp confirmation. Please make sure to press <strong>Send</strong> in WhatsApp so our team can verify your order.
            </p>

            <a
              href={completedOrderDetails.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open Order in WhatsApp Again</span>
            </a>
          </div>

          {/* Details Summary */}
          <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-border">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground block">
                Recipient &amp; Delivery
              </span>
              <div className="text-xs sm:text-sm space-y-1">
                <p className="font-semibold text-foreground">{completedOrderDetails.fullName}</p>
                {completedOrderDetails.deliveryMethod === "pickup" ? (
                  <p className="text-muted-foreground">
                    Karachi Pickup Point (Exact location shared on WhatsApp)
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    {completedOrderDetails.address}, {completedOrderDetails.city}
                  </p>
                )}
                <p className="font-mono text-xs pt-1 text-foreground">
                  Mobile: {completedOrderDetails.phoneNumber}
                  {completedOrderDetails.altPhoneNumber && (
                    <span className="text-muted-foreground"> | Alt: {completedOrderDetails.altPhoneNumber}</span>
                  )}
                </p>
                <p className="text-[11px] text-muted-foreground pt-1">
                  Method: <span className="font-medium text-foreground">{completedOrderDetails.deliveryMethod === "pickup" ? "Self Pickup (Karachi)" : "Home Delivery"}</span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground block">
                Payment Selection
              </span>
              <div className="p-4 rounded-xl border border-border bg-muted/40 text-xs sm:text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Mode:</span>
                  <span className="font-medium uppercase tracking-wide">
                    {completedOrderDetails.deliveryMethod === "pickup"
                      ? "Pay at Pickup (In-Person)"
                      : completedOrderDetails.paymentMethod === "online"
                      ? "Easypaisa Bank Transfer"
                      : "Cash on Delivery (COD)"}
                  </span>
                </div>
                {completedOrderDetails.deliveryMethod === "pickup" ? (
                  <div className="text-xs space-y-1 text-muted-foreground pt-1 border-t border-border/50">
                    <p>Collection Hub: <strong className="text-foreground">{completedOrderDetails.city}</strong></p>
                    <p>Payment: <strong className="text-emerald-600 dark:text-emerald-400">Pay on Hand / Collection</strong></p>
                  </div>
                ) : (
                  completedOrderDetails.paymentMethod === "online" && (
                    <div className="text-xs space-y-1 text-muted-foreground pt-1 border-t border-border/50">
                      <p>Easypaisa: <strong className="text-foreground font-mono">{BRAND_INFO.whatsappNumber}</strong></p>
                      <p>Title: <strong className="text-foreground">{BRAND_INFO.easypaisaTitle}</strong></p>
                      {completedOrderDetails.transactionId && (
                        <p>TID: <strong className="text-foreground font-mono">{completedOrderDetails.transactionId}</strong></p>
                      )}
                    </div>
                  )
                )}
                {completedOrderDetails.giftMessage && (
                  <div className="pt-2 border-t border-border/60">
                    <span className="text-[10px] text-muted-foreground uppercase block font-bold">
                      Gift Note:
                    </span>
                    <p className="text-xs italic text-foreground mt-0.5">
                      "{completedOrderDetails.giftMessage}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Purchased Items */}
          <div className="py-6 border-b border-border">
            <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground block mb-4">
              Curated Gift Boxes
            </span>
            <div className="space-y-4">
              {completedOrderDetails.items.map((item: CartItem) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-14 h-18 object-cover rounded-md bg-muted border border-border"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold uppercase tracking-wider">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      Quantity: <span className="font-mono font-medium text-foreground">{item.quantity}</span>
                    </p>
                  </div>
                  <div className="text-sm font-mono font-semibold">
                    Rs. {(item.priceValue * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subtotal & Return */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-xs text-muted-foreground uppercase tracking-widest block">
                Subtotal (Excluding Delivery)
              </span>
              <span className="text-2xl font-bold font-mono">
                Rs. {completedOrderDetails.subtotal.toLocaleString()}
              </span>
              <span className="block text-[10px] text-muted-foreground">
                Delivery charges to be confirmed via WhatsApp.
              </span>
            </div>
            <button
              onClick={() => {
                onClearCart()
                onBackToStore()
              }}
              className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-semibold rounded-full hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Gift Collection</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ==================== MAIN CART & CHECKOUT VIEW ====================
  return (
    <div className="min-h-screen bg-background text-foreground pb-24 animate-fade-in">
      {/* Header Bar */}
      <div className="border-b border-border/60 bg-background/90 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-1.5 sm:gap-2 text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Return to Gift Boxes</span>
            <span className="sm:hidden text-xs">Back</span>
          </button>
          
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase font-mono tracking-wider text-muted-foreground shrink-0">
            <BrandLogoIcon size={18} />
            <span className="text-foreground font-semibold hidden sm:inline">Raj's By AZ Checkout</span>
            <span className="text-foreground font-semibold sm:hidden">Checkout</span>
            <span className="text-border">/</span>
            <span className="px-2 py-0.5 rounded-full bg-muted/80 text-[10px] font-mono">{cart.length} {cart.length === 1 ? "Box" : "Boxes"}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="hidden sm:block text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-1">
              Raj's By AZ &bull; Little luxuries. Beautifully boxed.
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase">
              Your Gift Bag
            </h1>
          </div>
          {cart.length > 0 && (
            <button
              onClick={onBackToStore}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border hover:border-foreground/50 bg-card text-[11px] sm:text-xs uppercase font-mono tracking-wider font-medium text-foreground hover:bg-muted/40 transition-all cursor-pointer shrink-0 shadow-sm"
              title="Add another gift box from our collection"
            >
              <Plus className="w-3.5 h-3.5 text-primary" />
              <span>Add Another Bag</span>
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="border border-dashed border-border/80 rounded-2xl p-12 text-center max-w-2xl mx-auto my-12 bg-card/40">
            <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center mx-auto mb-4 text-muted-foreground p-3 border border-border/60">
              <BrandLogoIcon size={46} />
            </div>
            <h3 className="text-lg font-semibold uppercase tracking-wider mb-2">
              Your gift bag is waiting.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-6 font-light leading-relaxed">
              Let's fill it with something lovely. Discover our Mini (14 items), Signature (20 items), and Premium (25 items) curated beauty gift boxes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onBackToStore}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold rounded-full hover:opacity-90 transition-opacity cursor-pointer shadow-md"
              >
                Explore Gift Boxes
              </button>
              <button
                onClick={onAddSampleItem}
                className="w-full sm:w-auto px-6 py-3.5 border border-border text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-muted transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Add Signature Box (Rs. 2,499)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Cart & Checkout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Cart Items & Summary (5 cols) - Sticky with smooth contained scrolling */}
            <div
              data-lenis-prevent="true"
              className="lg:col-span-5 space-y-6 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto overscroll-contain pr-1 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="border border-border bg-card rounded-2xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                  <div className="flex items-center gap-2">
                    <BrandLogoIcon size={20} />
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider">
                        Boxes in Gift Bag ({cart.length})
                      </h2>
                      {cart.length > 2 && (
                        <span className="text-[10px] text-muted-foreground font-mono">
                          Scroll to see all ({cart.length}) boxes
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onAddSampleItem}
                    className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"
                    title="Add another bag to your gift order"
                  >
                    <Plus className="w-3 h-3 text-primary" />
                    <span>Add Another Bag</span>
                  </button>
                </div>

                {/* Items List - fully scrollable without visible scrollbars */}
                <div
                  data-lenis-prevent="true"
                  tabIndex={0}
                  className="space-y-6 max-h-[380px] sm:max-h-[440px] overflow-y-auto overscroll-contain pr-1 focus:outline-none no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="w-20 sm:w-24 aspect-[3/4] bg-muted rounded-lg overflow-hidden border border-border flex-shrink-0 relative">
                        <img
                          src={item.thumbnail}
                          alt={`${item.title} - ${item.collection}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground block">
                                {item.collection}
                              </span>
                              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider line-clamp-1">
                                {item.title}
                              </h3>
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors p-1 cursor-pointer"
                              title="Remove box"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="mt-1 text-[11px] text-muted-foreground font-mono">
                            {item.price}
                          </div>
                        </div>

                        {/* Quantity Stepper & Price */}
                        <div className="flex items-center justify-between pt-2 mt-2">
                          <div className="flex items-center border border-border rounded-full bg-background">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-mono text-xs font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                              title="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="font-mono text-sm font-bold">
                              Rs. {(item.priceValue * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Another Bag Action */}
                <div className="pt-4 border-t border-border/40">
                  <button
                    onClick={onBackToStore}
                    className="w-full py-2.5 px-4 rounded-xl border border-dashed border-border hover:border-primary/50 text-xs uppercase font-mono tracking-wider text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 cursor-pointer bg-muted/20"
                    title="Browse our collection to add another gift bag"
                  >
                    <Plus className="w-3.5 h-3.5 text-primary" />
                    <span>Add Another Bag</span>
                  </button>
                </div>

                {/* Pricing Summary */}
                <div className="mt-8 pt-6 border-t border-border space-y-3">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-mono font-medium text-foreground">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      {deliveryMethod === "pickup" ? <Store className="w-3.5 h-3.5 text-primary" /> : <Truck className="w-3.5 h-3.5" />}
                      {deliveryMethod === "pickup" ? "Delivery / Collection" : "Delivery Charges"}
                    </span>
                    <span className="font-mono text-[11px]">
                      {deliveryMethod === "pickup" ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                          Free (Self Pickup)
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Delivery charges to be confirmed.</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-3 border-t border-border">
                    <span className="uppercase tracking-wider">Total</span>
                    <span className="font-mono text-lg">
                      Rs. {subtotal.toLocaleString()}{deliveryMethod === "delivery" ? "*" : ""}
                    </span>
                  </div>
                  {deliveryMethod === "delivery" ? (
                    <p className="text-[10px] text-muted-foreground font-light leading-relaxed">
                      *Excluding nationwide courier delivery charges, which will be confirmed via WhatsApp before dispatch.
                    </p>
                  ) : (
                    <p className="text-[10px] text-muted-foreground font-light leading-relaxed">
                      Self pickup has zero delivery charges. Collect your parcel directly in {city}.
                    </p>
                  )}
                </div>
              </div>

              {/* Quality Guarantee Card */}
              <div className="border border-border/70 rounded-2xl p-5 bg-muted/20 flex items-start gap-4 text-xs text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                    Raj's By AZ Guarantee
                  </p>
                  <p className="font-light leading-relaxed">
                    Every gift box is packed with care, tied with delicate ribbon, and checked before dispatch across Pakistan.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Checkout Form (7 cols) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleProceedToWhatsApp} className="border border-border bg-card rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm space-y-6 sm:space-y-8">
                
                {/* Heading */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight mb-1">
                    Almost ready to gift.
                  </h2>
                  <p className="text-xs text-muted-foreground font-light">
                    Just a few details and your lovely gift will be on its way to confirmation.
                  </p>
                </div>

                {/* 1. Customer Information */}
                <div>
                  <div className="flex items-center gap-2 pb-3 border-b border-border mb-4 sm:mb-6">
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-mono font-bold flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wider">
                      Customer Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ayesha Khan"
                        className={`w-full px-3.5 sm:px-4 py-2.5 rounded-lg border bg-background text-sm font-light focus:outline-none focus:ring-1 focus:ring-primary transition-colors ${
                          formErrors.fullName ? "border-destructive" : "border-border"
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] text-destructive mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Mobile / WhatsApp Number */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Mobile / WhatsApp Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="0300 1234567"
                        className={`w-full px-3.5 sm:px-4 py-2.5 rounded-lg border bg-background text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary transition-colors ${
                          formErrors.phoneNumber ? "border-destructive" : "border-border"
                        }`}
                      />
                      {formErrors.phoneNumber && (
                        <p className="text-[11px] text-destructive mt-1">{formErrors.phoneNumber}</p>
                      )}
                    </div>

                    {/* Alternative Number */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Alternative Number <span className="text-muted-foreground/60 text-[9px]">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={altPhoneNumber}
                        onChange={(e) => setAltPhoneNumber(e.target.value)}
                        placeholder="0312 9876543"
                        className="w-full px-3.5 sm:px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>

                    {/* City (Only shown for Home Delivery since self pickup is only in Karachi) */}
                    {deliveryMethod === "delivery" && (
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                          City <span className="text-destructive">*</span>
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3.5 sm:px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
                        >
                          <option value="Karachi">Karachi</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Multan">Multan</option>
                          <option value="Quetta">Quetta</option>
                          <option value="Sialkot">Sialkot</option>
                          <option value="Gujranwala">Gujranwala</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Other">Other Location in Pakistan</option>
                        </select>
                      </div>
                    )}

                    {/* Delivery Selection */}
                    <div className={deliveryMethod === "pickup" ? "sm:col-span-2" : ""}>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Delivery Option
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectDeliveryMethod("delivery")}
                          className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            deliveryMethod === "delivery"
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background text-muted-foreground"
                          }`}
                        >
                          <Home className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">Home Delivery</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectDeliveryMethod("pickup")}
                          className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            deliveryMethod === "pickup"
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background text-muted-foreground"
                          }`}
                        >
                          <Store className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">Self Pickup</span>
                        </button>
                      </div>
                    </div>

                    {/* Complete Address */}
                    {deliveryMethod === "delivery" && (
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Complete Address <span className="text-destructive">*</span>
                        </label>
                        <textarea
                          rows={2}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House / Apartment #, Street, Block, Phase or Area"
                          className={`w-full px-3.5 sm:px-4 py-2.5 rounded-lg border bg-background text-sm font-light focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none ${
                            formErrors.address ? "border-destructive" : "border-border"
                          }`}
                        />
                        {formErrors.address && (
                          <p className="text-[11px] text-destructive mt-1">{formErrors.address}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Payment Selection */}
                <div>
                  <div className="flex items-center gap-2 pb-3 border-b border-border mb-4 sm:mb-6">
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-mono font-bold flex items-center justify-center">
                      2
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wider">
                      {deliveryMethod === "pickup" ? "Pickup & Payment" : "Payment Selection"}
                    </h3>
                  </div>

                  {deliveryMethod === "pickup" ? (
                    /* Self Pickup Payment View - No COD or Bank Transfer shown */
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 space-y-4 animate-fade-in">
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Store className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                            Pay at Self Pickup (In-Person Collection)
                          </h4>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed mt-1">
                            You can pick up your beautifully packaged gift box directly from our Karachi pickup point. Timings will be shared on WhatsApp. You can pay directly in cash or instant transfer when collecting your gift box.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 text-xs">
                        <div className="p-3.5 rounded-lg bg-background border border-border">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
                            Pickup Point
                          </span>
                          <span className="font-semibold text-foreground">Karachi Central Hub</span>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Exact collection address and timings coordinated on WhatsApp.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Home Delivery Payment Methods: COD & Bank Transfer / Easypaisa */
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                        {/* COD */}
                        <div
                          onClick={() => setPaymentMethod("cod")}
                          className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                            paymentMethod === "cod"
                              ? "border-primary bg-primary/5 ring-1 ring-primary"
                              : "border-border hover:border-primary/50 bg-background"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2 gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <Banknote className="w-4 h-4 text-primary shrink-0" />
                              <span className="text-xs font-bold uppercase tracking-wider truncate">Cash on Delivery</span>
                            </div>
                            <span
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                paymentMethod === "cod" ? "border-primary bg-primary" : "border-border"
                              }`}
                            >
                              {paymentMethod === "cod" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground font-light leading-relaxed">
                            Pay cash directly when rider delivers your gift box.
                          </p>
                        </div>

                        {/* Online Transfer */}
                        <div
                          onClick={() => setPaymentMethod("online")}
                          className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                            paymentMethod === "online"
                              ? "border-primary bg-primary/5 ring-1 ring-primary"
                              : "border-border hover:border-primary/50 bg-background"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2 gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <Smartphone className="w-4 h-4 text-primary shrink-0" />
                              <span className="text-xs font-bold uppercase tracking-wider leading-snug">Bank Transfer / Easypaisa</span>
                            </div>
                            <span
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                paymentMethod === "online" ? "border-primary bg-primary" : "border-border"
                              }`}
                            >
                              {paymentMethod === "online" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground font-light leading-relaxed">
                            Direct transfer via Easypaisa mobile wallet or bank.
                          </p>
                        </div>
                      </div>

                      {/* Easypaisa details if online transfer selected */}
                      {paymentMethod === "online" && (
                        <div className="rounded-xl border border-primary/30 bg-muted/30 p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 animate-fade-in">
                          <div className="p-3.5 sm:p-4 rounded-xl bg-background border border-border space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-2">
                              <div className="min-w-0">
                                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground block mb-0.5">
                                  Easypaisa Mobile Account Number
                                </span>
                                <span className="text-base sm:text-lg font-mono font-bold tracking-wider text-foreground break-all">
                                  {BRAND_INFO.whatsappNumber}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={handleCopyEasypaisa}
                                className="self-start sm:self-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-mono transition-colors cursor-pointer active:scale-95"
                              >
                                {copiedNumber ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-emerald-600 font-bold">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <div className="pt-2.5 border-t border-border/50 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                              <div className="min-w-0">
                                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground block mb-0.5">
                                  Account Title
                                </span>
                                <span className="text-sm font-bold text-foreground break-words">
                                  {BRAND_INFO.easypaisaTitle}
                                </span>
                              </div>
                              <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20 shrink-0">
                                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                <span>Verified Title</span>
                              </span>
                            </div>
                          </div>

                          {/* Receipt upload or TID */}
                          <div className="space-y-3">
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                              Payment Screenshot <span className="text-muted-foreground/60 text-[9px] font-normal">(Optional / For prepaid orders)</span>
                            </label>

                            {!receiptPreviewUrl ? (
                              <label className="border-2 border-dashed border-border rounded-xl p-3.5 sm:p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-background hover:bg-muted/40 text-center">
                                <UploadCloud className="w-6 h-6 text-muted-foreground mb-1 shrink-0" />
                                <span className="text-xs font-semibold text-foreground px-2">
                                  Attach receipt screenshot <span className="text-muted-foreground font-normal">(or share in WhatsApp)</span>
                                </span>
                                <span className="text-[10px] text-muted-foreground mt-0.5">
                                  PNG, JPG or screenshot up to 5MB
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleReceiptUpload}
                                  className="hidden"
                                />
                              </label>
                            ) : (
                              <div className="border border-border rounded-xl p-3 bg-background flex items-center gap-3">
                                <img
                                  src={receiptPreviewUrl}
                                  alt="Receipt"
                                  className="w-12 h-12 object-cover rounded-md border shrink-0"
                                />
                                <div className="flex-1 min-w-0 text-xs">
                                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                                    <FileCheck className="w-3.5 h-3.5 shrink-0" /> Screenshot Attached
                                  </span>
                                  <p className="text-[10px] text-muted-foreground truncate">{receiptFile?.name}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={handleRemoveReceipt}
                                  className="p-1 text-muted-foreground hover:text-destructive shrink-0"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}

                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                                Transaction ID / TID <span className="text-muted-foreground/60 text-[9px] font-normal">(Optional)</span>
                              </label>
                              <input
                                type="text"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                placeholder="e.g. 39281920391"
                                className="w-full px-3.5 sm:px-4 py-2 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* 3. Gift Note & Instructions */}
                <div>
                  <div className="flex items-center gap-2 pb-3 border-b border-border mb-6">
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-mono font-bold flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wider">
                      Gift Note &amp; Instructions
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 text-primary" />
                        <span>Gift Card Note (Optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="e.g. Happy Birthday Sara! With lots of love from Ayesha 💕"
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-xs font-light focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                      />
                      <span className="text-[10px] text-muted-foreground">
                        We will write this note inside a lovely little card included with your box.
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Special Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="e.g. Call before arrival / Deliver after 4pm"
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-xs font-light focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Consent Checkbox with Custom Animated SVG */}
                <div className="pt-2">
                  <div className="flex items-start gap-2.5 sm:gap-3 text-xs text-muted-foreground">
                    <div className="custom-checkbox-wrapper mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        id="cbx-consent"
                        checked={consentGiven}
                        onChange={(e) => setConsentGiven(e.target.checked)}
                      />
                      <label htmlFor="cbx-consent" className="check">
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
                          <polyline points="1 9 7 14 15 4" />
                        </svg>
                      </label>
                    </div>
                    <label htmlFor="cbx-consent" className="cursor-pointer select-none text-[11px] sm:text-xs text-muted-foreground leading-normal">
                      I agree to the{" "}
                      {onOpenPrivacy ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            onOpenPrivacy()
                          }}
                          className="underline underline-offset-2 hover:text-foreground font-medium transition-colors cursor-pointer"
                        >
                          Privacy Charter
                        </button>
                      ) : (
                        <a
                          href="/privacy"
                          className="underline underline-offset-2 hover:text-foreground font-medium"
                        >
                          Privacy Charter
                        </a>
                      )}{" "}
                      to confirm this order.
                    </label>
                  </div>
                  {formErrors.consent && (
                    <p className="text-[11px] text-destructive mt-1.5">{formErrors.consent}</p>
                  )}
                </div>

                {/* Primary CTA: Place Order via WhatsApp */}
                <div className="pt-4 border-t border-border space-y-3">
                  <AddToCartButton
                    type="submit"
                    variant="whatsapp"
                    controlledPhase={isSubmitting ? "loading" : "idle"}
                    label={`Confirm Order · Rs. ${subtotal.toLocaleString()}`}
                    loadingLabel="Preparing Order..."
                    addedLabel="Order Prepared!"
                    icon={<MessageCircle className="w-4 h-4 shrink-0" />}
                    className="w-full h-12 sm:h-14 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-lg px-4"
                  />

                  <p className="text-center text-[10px] sm:text-[11px] text-muted-foreground font-light leading-relaxed">
                    Your order details will open securely in WhatsApp. Tap <strong>Send</strong> to confirm with our concierge.
                  </p>
                </div>

              </form>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
