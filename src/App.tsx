import { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Star, 
  Cpu, 
  Zap,
  ShieldCheck, 
  Shield, 
  CreditCard,
  Wallet,
  Mail, 
  Phone, 
  MapPin,
  Github,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Play,
  ArrowLeft,
  Search,
  MessageSquare,
  User,
  Send,
  Plus,
  Edit2,
  Trash2,
  Loader2
} from "lucide-react";
import { CartProvider, useCart } from "./CartContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Contexts ---

const SearchContext = createContext<any>(null);
const useSearch = () => useContext(SearchContext);

// --- Components ---

const LoadingState = () => (
  <div className="min-h-[400px] flex flex-col items-center justify-center p-12">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="mb-4"
    >
      <Loader2 className="w-12 h-12 text-purple-600" />
    </motion.div>
    <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs">Initializing Session</p>
  </div>
);

const ProductCard = ({ p }: { p: any }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  return (
    <motion.div 
       key={p._id}
       whileHover={{ y: -5 }}
       onClick={() => navigate(`/product/${p._id}`)}
       className="bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer h-full flex flex-col"
    >
      <div className="relative aspect-square md:aspect-[10/11] lg:aspect-[1.1/1] overflow-hidden bg-gray-50 flex-shrink-0">
        <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-[8px] md:text-[10px] font-black px-1.5 md:px-2 py-0.5 md:py-1 rounded-full shadow-lg shadow-red-500/20">
          -{p.discount || 15}% OFF
        </div>
        <img 
          src={p.image} 
          alt={p.name} 
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget;
            img.src = "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop";
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
      </div>
      <div className="p-2.5 md:p-3.5 lg:p-2.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1 md:mb-1.5">
            <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-purple-600 truncate mr-2">{p.category}</span>
            <div className="flex items-center gap-0.5 bg-yellow-400/10 px-1.5 py-0.5 rounded-lg flex-shrink-0">
              <Star className="w-2.5 md:w-3 h-2.5 md:h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-[9px] md:text-xs font-black text-yellow-700">{p.rating}</span>
            </div>
          </div>
          <h3 className="font-bold text-[10px] md:text-[15px] text-gray-900 line-clamp-2 leading-tight">{p.name}</h3>
        </div>
        <div className="flex items-center justify-between mt-2.5 md:mt-4">
          <div>
            <p className="text-[7px] md:text-[11px] text-gray-400 line-through font-medium leading-none mb-0.5">
              ${Math.round(p.price / (1 - (p.discount || 15)/100)).toLocaleString()}
            </p>
            <p className="text-[11px] md:text-lg font-black text-gray-900">${p.price.toLocaleString()}</p>
          </div>
          <button 
             onClick={(e) => { e.stopPropagation(); addToCart(p); }}
             className="px-3 h-7 md:h-12 lg:h-10 md:px-8 bg-gray-900 text-white rounded-lg md:rounded-xl flex items-center justify-center gap-2 hover:bg-purple-600 transition-all shadow-xl active:scale-95"
          >
            <ShoppingCart className="w-3 md:w-4 h-3 md:h-4 text-white" />
            <span className="hidden sm:block text-[9px] md:text-sm font-bold">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductLine = ({ lineProducts }: { lineProducts: any[] }) => {
  const [index, setIndex] = useState(0);
  const visible = 4;

  const next = () => {
    if (index + visible < lineProducts.length) {
      setIndex(prev => prev + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
    }
  };

  return (
    <div className="relative mb-4 md:mb-12">
      {/* Desktop/Tablet Slider Controls */}
      <div className="hidden md:block">
        {index > 0 && (
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 z-40 w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all border border-black group/nav"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover/nav:text-purple-400" />
          </button>
        )}

        {index + visible < lineProducts.length && (
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 z-40 w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all border border-black group/nav"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover/nav:text-purple-400" />
          </button>
        )}
      </div>

      {/* Slider for Desktop/Tablet, Grid for Mobile */}
      <div className="overflow-hidden px-4 md:px-0">
        <div className="sm:hidden grid grid-cols-2 gap-4 pb-4">
           {lineProducts.map(p => <ProductCard p={p} key={p._id} />)}
        </div>
        
        <motion.div 
          className="hidden sm:flex"
          animate={{ x: `-${(index * (100 / visible))}%` }}
          transition={{ type: "spring", damping: 30, stiffness: 120 }}
        >
          {lineProducts.map((p) => (
            <div key={p._id} className="flex-shrink-0 w-1/4 p-3 md:p-8">
              <ProductCard p={p} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([
    { id: "r1", user: "Marcus V.", rating: 5, comment: "The thermal management on this machine is engineering perfection. Never throttles even during 8-hour rendering sessions.", date: "2 days ago" },
    { id: "r2", user: "Elena K.", rating: 4, comment: "Stunning display. The colors are incredibly accurate for my studio work. Only wish the webcam was 4K.", date: "1 week ago" },
    { id: "r3", user: "Jordan P.", rating: 5, comment: "Literally the fastest laptop I've ever owned. Worth every penny for the productivity boost.", date: "3 weeks ago" }
  ]);
  const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.user || !newReview.comment) return;
    const review = {
      id: Date.now().toString(),
      ...newReview,
      date: "Just now"
    };
    setReviews([review, ...reviews]);
    setNewReview({ user: "", rating: 5, comment: "" });
  };

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Fetch product
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        // Handle synthetic IDs from padding (e.g., product-1_syn_35 -> product-1)
        const baseId = (productId || "").split("_syn_")[0];
        const p = data.find((item: any) => item._id === productId || item._id === baseId);
        
        if (p) {
          setProduct(p);
          // Get related (same category)
          setRelatedProducts(data.filter((item: any) => item.category === p.category && item._id !== p._id).slice(0, 4));
        } else if (productId === "hero-p1") {
            const hero = {
                _id: "hero-p1",
                name: "Eon-Ultra X1",
                price: 2499,
                category: "Featured",
                image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2574&auto=format&fit=crop",
                description: "The Eon-Ultra X1 represents the pinnacle of mobile computing. Featuring a stunning 4K OLED display and the raw power of the RTX 5080, it's built for those who refuse to compromise.",
                rating: "4.9"
            };
            setProduct(hero);
            setRelatedProducts(data.slice(0, 4));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId]);

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center pt-0 md:pt-24"><LoadingState /></div>;
  if (!product) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Product not found</div>;

  const images = [product.image, product.image, product.image];

  const specs = [
    { label: "Cpu", value: product.category === "Gaming" ? "Snapdragon X Elite X1E-84-100" : "Intel Core i9-14900HX" },
    { label: "Gpu", value: product.category === "Gaming" ? "Adreno X1 85" : "NVIDIA RTX 4090" },
    { label: "Ram", value: "64GB LPDDR5X" },
    { label: "Storage", value: "4TB NVMe" },
    { label: "Display", value: "14.5\" 3K OLED 120Hz" }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-0 md:pt-24">
      <div className="max-w-none w-full px-3 md:px-3 py-2 md:py-8">
        {/* Breadcrumbs & Back */}
        <div className="flex items-center justify-between mb-3 md:mb-12">
           <div className="flex items-center gap-2 text-[8px] md:text-xs font-medium text-gray-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-purple-600 transition-colors">Laptops</Link>
              <span>/</span>
              <span className="text-gray-900 font-bold">{product.name}</span>
           </div>
           <button 
             onClick={() => navigate(-1)}
             className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg md:rounded-xl text-[10px] md:text-sm font-bold text-gray-900 transition-all shadow-sm"
           >
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden xs:inline">Back</span>
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-start">
          {/* Gallery */}
          <div className="space-y-3 max-w-[280px] md:max-w-md mx-auto w-full lg:mx-0">
            <div className="aspect-[4/3] rounded-xl md:rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 group">
              <img 
                src={images[activeImg]} 
                alt={product.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105" 
              />
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "aspect-[1.5/1] rounded-md md:rounded-xl overflow-hidden border-2 transition-all",
                    activeImg === i ? "border-purple-600 scale-105" : "border-gray-200 opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 md:px-3 md:py-1 bg-purple-600 text-white rounded-full text-[7px] md:text-[10px] font-black uppercase tracking-widest mb-3 md:mb-6">
               <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" /> AI Native
            </div>
            <h1 className="text-lg md:text-6xl font-black mb-1 md:mb-4 leading-tight md:leading-[1.1] tracking-tight">{product.name}</h1>
            <p className="text-[9px] md:text-lg text-gray-500 mb-2 md:mb-8 font-medium italic">The AI-native laptop is here</p>
            
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-10">
               <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "w-2.5 h-2.5 md:w-5 md:h-5",
                        i < Math.floor(product.rating || 5) ? "fill-current" : "opacity-30"
                      )} 
                    />
                  ))}
               </div>
               <span className="text-[10px] md:text-lg font-bold">{product.rating || 5}</span>
            </div>

            <div className="flex items-baseline gap-2 md:gap-4 mb-3 md:mb-12">
               <span className="text-lg md:text-5xl font-black text-gray-900">${product.price.toLocaleString()}</span>
               <span className="text-[10px] md:text-2xl text-gray-300 line-through font-bold">
                ${Math.round(product.price / (1 - (product.discount || 15)/100)).toLocaleString()}
               </span>
            </div>

            {/* Config Table */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl md:rounded-[30px] overflow-hidden mb-4 md:mb-12">
               <div className="px-4 py-1.5 md:px-8 md:py-4 border-b border-gray-100 bg-gray-50/50">
                  <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest text-purple-600">Dynamic Configuration</span>
               </div>
               <div className="px-4 py-2.5 md:p-8 space-y-2 md:space-y-6">
                  {specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center">
                       <span className="text-gray-400 font-bold uppercase tracking-widest text-[7px] md:text-[10px]">{spec.label}</span>
                       <span className="font-bold text-gray-900 text-[8px] md:text-sm">{spec.value}</span>
                    </div>
                  ))}
               </div>
            </div>

            <button 
               onClick={() => addToCart(product)}
               className="w-full py-3 md:py-6 bg-purple-600 text-white font-black rounded-xl md:rounded-3xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-900/40 active:scale-[0.98] flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-8 text-xs md:text-base uppercase tracking-widest"
            >
               <ShoppingCart className="w-3.5 h-3.5 md:w-6 md:h-6" /> Add to Cart — ${product.price.toLocaleString()}
            </button>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:gap-x-12 md:gap-y-6">
               <div className="flex items-center gap-2 text-gray-500 text-[8px] md:text-xs font-bold uppercase tracking-widest">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 text-purple-600" /> Lifetime Warranty
               </div>
               <div className="flex items-center gap-2 text-gray-500 text-[8px] md:text-xs font-bold uppercase tracking-widest">
                  <Zap className="w-3 h-3 md:w-4 md:h-4 text-purple-600" /> Free Shipping
               </div>
               <div className="flex items-center gap-2 text-gray-500 text-[8px] md:text-xs font-bold uppercase tracking-widest">
                   <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-purple-600" /> 30-Day Returns
               </div>
               <div className="flex items-center gap-2 text-gray-500 text-[8px] md:text-xs font-bold uppercase tracking-widest">
                   <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-purple-600" /> Same-Day Dispatch
               </div>
            </div>
          </div>
        </div>

        {/* User Reviews Section */}
        <section className="mt-20 md:mt-32 pt-20 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
            <div className="lg:col-span-4">
               <div className="sticky top-32">
                 <h2 className="text-2xl md:text-4xl font-black mb-4 flex items-center gap-3">
                   <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                   Customer <br className="hidden md:block" /> Intelligence
                 </h2>
                 <p className="text-sm text-gray-500 mb-8 max-w-xs font-medium">Real feedback from power users who've integrated Laptopify into their workflows.</p>
                 
                 {/* Stats */}
                 <div className="space-y-4 bg-gray-50 p-6 rounded-[30px] border border-gray-100">
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-black uppercase text-gray-400">Average Rating</span>
                       <span className="text-2xl font-black text-gray-900">{product.rating || 5}</span>
                    </div>
                    <div className="flex text-yellow-500 gap-1">
                       {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Based on 124 Verified Purchases</div>
                 </div>
               </div>
            </div>

            <div className="lg:col-span-8 space-y-12">
               {/* Review Form */}
               <div className="bg-white border-2 border-gray-100 p-6 md:p-10 rounded-[40px] shadow-sm">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" /> Share Your Experience
                  </h3>
                  <form onSubmit={handleAddReview} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label htmlFor="reviewer-name" className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Your Name</label>
                          <input 
                            id="reviewer-name"
                            name="reviewer-name"
                            type="text" 
                            required
                            placeholder="e.g. Rohail Khan"
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            value={newReview.user}
                            onChange={(e) => setNewReview({...newReview, user: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label htmlFor="review-rating" className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Rating</label>
                          <select 
                            id="review-rating"
                            name="review-rating"
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-purple-500 transition-all font-bold"
                            value={newReview.rating}
                            onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                          >
                            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                          </select>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="review-comment" className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Your Thoughts</label>
                       <textarea 
                         id="review-comment"
                         name="review-comment"
                         required
                         rows={4}
                         placeholder="How has this machine changed your game?"
                         className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-purple-500 transition-all"
                         value={newReview.comment}
                         onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                       />
                    </div>
                    <button 
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-black rounded-2xl md:rounded-3xl hover:bg-purple-600 transition-all shadow-xl active:scale-95 group"
                    >
                      Publish Review <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
               </div>

               {/* Review List */}
               <div className="space-y-8">
                  <AnimatePresence mode="popLayout">
                    {reviews.map((rev) => (
                      <motion.div 
                        key={rev.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        layout
                        className="bg-gray-50/50 p-6 md:p-8 rounded-[32px] border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                      >
                         <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-black text-sm md:text-base">
                                  {rev.user.charAt(0)}
                               </div>
                               <div>
                                  <h4 className="font-bold text-sm md:text-base text-gray-900">{rev.user}</h4>
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{rev.date}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                               <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                               <span className="text-[10px] md:text-sm font-black text-yellow-700">{rev.rating}.0</span>
                            </div>
                         </div>
                         <p className="text-gray-600 leading-relaxed text-sm md:text-base font-medium">"{rev.comment}"</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-xl md:text-3xl font-black mb-8 md:mb-12 text-gray-900">More in <span className="text-purple-600">Ai</span></h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-12">
            {relatedProducts.map((p) => (
              <motion.div 
                 key={p._id}
                 onClick={() => navigate(`/product/${p._id}`)}
                 className="bg-gray-50 p-3 md:p-6 lg:p-4 rounded-2xl md:rounded-[32px] border border-gray-100 hover:bg-gray-100 transition-all cursor-pointer group"
              >
                <div className="relative aspect-video md:aspect-[16/10] lg:aspect-[1.8/1] rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-5 lg:mb-3">
                   <img 
                     src={p.image} 
                     referrerPolicy="no-referrer" 
                     onError={(e) => console.error(`Failed to load image: ${p.image}`)}
                     className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                   />
                   <div className="absolute top-2 left-2 bg-purple-600/90 backdrop-blur text-[6px] md:text-[8px] font-black uppercase px-1.5 py-0.5 rounded text-white">
                     AI Chip
                   </div>
                </div>
                <div className="space-y-2 md:space-y-4">
                   <div className="text-[8px] md:text-[10px] font-black uppercase text-purple-600">AI</div>
                   <h3 className="text-xs md:text-xl font-bold text-gray-900 truncate">{p.name}</h3>
                   <div className="hidden md:flex gap-2">
                      <span className="px-2 py-1 bg-gray-200/50 rounded text-[8px] font-bold text-gray-500 uppercase tracking-widest">Apple M3</span>
                      <span className="px-2 py-1 bg-gray-200/50 rounded text-[8px] font-bold text-gray-500 uppercase tracking-widest">12GB Unified</span>
                   </div>
                   <div className="flex items-center gap-1 text-yellow-500 text-[8px] md:text-xs font-bold">
                        <Star className="w-2 h-2 md:w-3 md:h-3 fill-current" /> {p.rating || 5}
                   </div>
                   <div className="pt-2 md:pt-4 flex items-center justify-between border-t border-gray-200">
                      <div>
                         <p className="text-[8px] md:text-xs text-gray-400 line-through font-medium">
                           ${Math.round(p.price / (1 - (p.discount || 15)/100)).toLocaleString()}
                         </p>
                         <span className="text-sm md:text-2xl font-black text-gray-900">${p.price.toLocaleString()}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                        className="p-2 md:px-7 md:py-4 bg-gray-900 hover:bg-purple-600 text-white rounded-xl transition-all shadow-lg active:scale-95"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 md:w-5 md:h-5" />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 bg-white border-b border-gray-100 py-2 md:py-4">
      <div className="max-w-none w-full px-1.5 md:px-3 flex items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1.5 sm:gap-10 shrink-0">
          <Link to="/" className="flex items-center gap-1.5 md:gap-3">
            <div className="w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-base md:text-xl lg:text-2xl shadow-lg shadow-purple-200">
              L
            </div>
            <span className="text-sm md:text-2xl lg:text-3xl font-black tracking-tighter text-gray-900 block">
              LAPTOP<span className="text-purple-600">IFY</span>
            </span>
          </Link>

          {/* Desktop Nav - Moved closer to logo */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] lg:text-[13px] font-black uppercase tracking-widest text-gray-500">
            <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-purple-600 transition-colors">Laptops</Link>
            <Link to="/contact" className="hover:text-purple-600 transition-colors">Support</Link>
            <Link to="/admin" className="hover:text-purple-600 transition-colors opacity-0 hover:opacity-100 transition-opacity">Admin</Link>
          </div>
        </div>

        {/* Search Bar - Integrated with responsive width */}
        <div className="flex-1 max-w-[120px] xs:max-w-[160px] sm:max-w-md relative">
          <div className="relative group">
            <label htmlFor="search-input" className="sr-only">Search laptops</label>
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
            <input 
              id="search-input"
              name="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-8 md:pl-11 pr-4 py-2 md:py-2.5 bg-gray-100/80 border border-transparent rounded-full text-xs md:text-sm font-medium focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2 md:p-3 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 md:w-6 md:h-6 bg-purple-600 text-white text-[9px] md:text-xs flex items-center justify-center rounded-full border-2 border-white font-black">
                {totalItems}
              </span>
            )}
          </button>
          <Link to="/login" className="hidden sm:flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white text-sm font-black uppercase tracking-widest rounded-full hover:bg-purple-600 transition-all shadow-xl shadow-gray-200 active:scale-95 leading-none">
            Login
          </Link>
          <button className="lg:hidden p-2 md:p-3" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
               <span className="text-xl font-black tracking-widest">LAPTOP<span className="text-purple-600">IFY</span></span>
               <button onClick={() => setMobileMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-6 text-xl font-bold">
              <Link to="/" className="hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/products" className="hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Laptops</Link>
              <Link to="/contact" className="hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Support</Link>
              <Link to="/login" className="hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/admin" className="hover:text-purple-600 transition-colors opacity-10 border-t pt-6" onClick={() => setMobileMenuOpen(false)}>Staff Entry</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                Your Cart <span className="bg-gray-100 text-gray-500 text-sm px-2 py-0.5 rounded-full font-medium">{cart.length}</span>
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 grayscale">
                  <ShoppingCart className="w-16 h-16 mb-4" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <button onClick={() => setIsCartOpen(false)} className="mt-4 text-purple-600 font-bold underline">Start Shopping</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const img = e.currentTarget;
                          img.src = "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop";
                        }}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">${item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-full px-2 py-1 gap-4">
                          <button onClick={() => updateQuantity(item._id, -1)} className="hover:text-purple-600 transition-colors">-</button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, 1)} className="hover:text-purple-600 transition-colors">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item._id)} className="text-xs text-red-500 font-medium hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-gray-50/50 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-medium text-gray-600">Total</span>
                  <span className="font-bold text-gray-900 text-2xl">${totalPrice.toLocaleString()}</span>
                </div>
                <button className="w-full py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 active:scale-95">
                  Secure Checkout
                </button>
                <p className="text-[10px] text-center text-gray-400 font-medium uppercase tracking-widest">Free Shipping & Returns</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Footer = () => (
    <footer className="bg-gray-50 pt-10 pb-6 md:pt-16 md:pb-10 border-t border-gray-100">
    <div className="max-w-none w-full px-1.5 md:px-3">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-12 mb-8 md:mb-12">
        <div className="col-span-1">
          <div className="flex items-center gap-1.5 md:gap-3 mb-3 md:mb-6">
            <div className="w-5 h-5 md:w-8 md:h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-[10px] md:text-base">L</div>
            <span className="text-[10px] md:text-xl font-bold tracking-tight">LAPTOPIFY</span>
          </div>
          <p className="text-gray-500 text-[8px] md:text-sm leading-relaxed mb-3 md:mb-6">
            <span className="md:hidden">
              Premium machines for the relentless. Our mission is to empower creators, gamers, and professionals with next-gen hardware. We bring the future of computing to your doorstep with zero compromise on power.
            </span>
            <span className="hidden md:block">
              Premium machines for the relentless.
            </span>
          </p>
          <div className="flex gap-2">
            {[Twitter, Github, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-6 h-6 md:w-10 md:h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-purple-50 hover:border-purple-200 transition-all text-gray-600 hover:text-purple-600">
                <Icon className="w-3 h-3 md:w-5 md:h-5" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="col-span-1 ml-10 md:ml-0">
          <h4 className="font-bold text-gray-900 mb-3 md:mb-6 uppercase tracking-widest text-[8px] md:text-xs">Explore</h4>
          <ul className="space-y-2 md:space-y-4 text-[9px] md:text-sm text-gray-600">
            <li><Link to="/products" className="hover:text-purple-600 transition-colors">Lineup</Link></li>
            <li><Link to="/products" className="hover:text-purple-600 transition-colors">Spec</Link></li>
            <li><Link to="/products" className="hover:text-purple-600 transition-colors">Hub</Link></li>
          </ul>
        </div>

        <div className="col-span-1 ml-10 md:ml-0">
          <h4 className="font-bold text-gray-900 mb-3 md:mb-6 uppercase tracking-widest text-[8px] md:text-xs">Support</h4>
          <ul className="space-y-2 md:space-y-4 text-[9px] md:text-sm text-gray-600">
            <li><a href="#" className="hover:text-purple-600 transition-colors">Help</a></li>
            <li><a href="#" className="hover:text-purple-600 transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-purple-600 transition-colors">Status</a></li>
          </ul>
        </div>

        <div className="col-start-2 col-span-2 md:col-start-auto md:col-span-1 mt-6 md:mt-0 ml-10 md:ml-0">
          <h4 className="font-bold text-gray-900 mb-3 md:mb-6 uppercase tracking-widest text-[8px] md:text-xs">Newsletter</h4>
          <p className="text-[9px] md:text-sm text-gray-500 mb-3 md:mb-4 max-w-[140px] md:max-w-none">Stay ahead of the curve. Join us.</p>
          <div className="relative max-w-[140px] md:max-w-none">
            <label htmlFor="footer-email" className="sr-only">Newsletter Email</label>
            <input 
              id="footer-email"
              name="email"
              type="email" 
              placeholder="Email" 
              autoComplete="email"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 md:py-3 text-[10px] md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
            <button className="absolute right-1 top-1 md:right-2 md:top-1.5 p-1 md:p-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
        <p>© M.Rohail LAPTOPIFY INC. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const BuyNowPayLater = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="relative overflow-hidden rounded-[20px] md:rounded-[40px] bg-black min-h-[125px] md:min-h-[220px] p-4 md:px-12 flex flex-row items-center justify-between gap-4 md:gap-12 group my-2 md:my-4 mx-0 md:mx-0 shadow-2xl border border-white/5"
    >
       {/* Background Glow */}
       <div className="absolute top-0 left-0 w-full h-full bg-[#00cdf9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
       
       <div className="z-10 flex-1 text-left pr-4 md:pr-16">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="space-y-1.5 md:space-y-4"
          >
             <div className="flex items-center justify-start gap-1.5 md:gap-3">
                <Zap className="w-3 h-3 md:w-6 md:h-6 text-[#00cdf9]" />
                <span className="text-[#00cdf9] font-black uppercase tracking-[0.3em] text-[7px] md:text-[10px]">Power Financing</span>
             </div>
             <h2 className="text-sm md:text-5xl font-black text-white italic tracking-tighter leading-[1.1] uppercase">
                Buy Now <span className="text-[#00cdf9]">Pay Later.</span>
             </h2>
             <p className="text-gray-400 font-medium text-[8px] md:text-sm max-w-lg hidden md:block">
                Zero processing fee. Zero hidden charges. 0% markup installments through your favorite banks.
             </p>
             <div className="flex flex-row gap-2 pt-0.5 md:pt-2 justify-start">
                <button className="px-2.5 md:px-8 py-1 md:py-3 bg-[#00cdf9] text-black font-black uppercase tracking-widest text-[6px] md:text-[10px] rounded-md md:rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#00cdf9]/20">Apply</button>
                <div className="flex items-center justify-center gap-1 px-1.5 md:px-6 py-1 md:py-3 border border-white/20 rounded-md md:rounded-xl group/btn group-hover:border-white/40 transition-colors">
                   <ShieldCheck className="w-2.5 h-2.5 md:w-4 md:h-4 text-white" />
                   <span className="text-white font-bold text-[6px] md:text-[10px]">Banks</span>
                </div>
             </div>
          </motion.div>
       </div>

       <div className="relative w-auto h-full flex items-center justify-center">
          <div className="relative group-hover:rotate-6 transition-transform duration-700">
             <motion.div 
                animate={{ rotate: [-4, 0, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 md:w-[150px] lg:w-[180px] bg-white/10 backdrop-blur-2xl rounded-xl md:rounded-[30px] border md:border-2 border-white/30 p-1 md:p-2 -rotate-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
             >
                <img src="https://picsum.photos/seed/phonepro/600/600" alt="Certified" className="rounded-lg md:rounded-[20px]" referrerPolicy="no-referrer" />
             </motion.div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#00cdf9]/15 blur-[60px] rounded-full animate-pulse" />
       </div>
    </motion.section>
  );
};

const WarrantyPromoBanner = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="relative overflow-hidden rounded-[20px] md:rounded-[60px] bg-gradient-to-br from-[#7e22ce] to-[#581c87] min-h-[125px] md:min-h-[220px] p-4 md:p-12 flex flex-row items-center justify-between gap-4 group my-2 md:my-6 mx-0 md:mx-0 shadow-2xl border border-white/5"
    >
       {/* Background Particles Decoration */}
       <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          {[...Array(5)].map((_, i) => (
             <div key={i} className="absolute w-20 h-20 bg-white blur-3xl rounded-full" style={{ top: `${i * 20}%`, left: `${i * 15}%` }} />
          ))}
       </div>

       <div className="z-10 flex-1 text-left pr-4 md:pr-16">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="mb-2 md:mb-6 flex justify-start"
          >
             <div className="w-8 h-8 md:w-20 md:h-20 bg-white/20 backdrop-blur-md border md:border-8 border-white/30 rounded-xl md:rounded-[30px] flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-4 h-4 md:w-12 md:h-12 text-white fill-white/20 animate-pulse" />
             </div>
          </motion.div>
          <h2 className="text-[12px] md:text-5xl font-black text-white italic uppercase tracking-tighter leading-tight md:leading-[1.1] mb-1 md:mb-4">
             Asli Warranty <br /> 
             <span className="text-white/40 italic">Challenge</span>
          </h2>
          <p className="text-[8px] md:text-xl font-bold text-white/80 leading-tight">
             Official Brand Warranty ya <br />
             <span className="text-[#00cdf9] font-black uppercase tracking-widest text-[10px] md:text-2xl underline decoration-1 underline-offset-2 md:decoration-2 md:underline-offset-4">Double Paisay Wapis</span>
          </p>
       </div>

       <div className="relative mt-0 flex items-center justify-center">
          <div className="relative z-10 flex -space-x-8 md:-space-x-24 transform group-hover:scale-105 transition-transform duration-700">
             <motion.div 
               initial={{ x: 100, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               className="w-20 md:w-[250px] bg-white/5 backdrop-blur-xl rounded-xl md:rounded-[40px] border md:border-4 border-white/20 p-1 md:p-4 rotate-12 shadow-xl"
             >
                <img src="https://picsum.photos/seed/techman/600/600" alt="Verified" className="rounded-lg md:rounded-[30px] opacity-80" referrerPolicy="no-referrer" />
             </motion.div>
             <motion.div 
               initial={{ x: 200, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="w-20 md:w-[250px] bg-white/10 backdrop-blur-2xl rounded-xl md:rounded-[40px] border md:border-4 border-white/30 p-1 md:p-4 -rotate-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
             >
                <img src="https://picsum.photos/seed/phonepro/600/600" alt="Certified" className="rounded-lg md:rounded-[20px]" referrerPolicy="no-referrer" />
             </motion.div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] bg-[#7e22ce]/20 blur-[100px] rounded-full animate-pulse" />
       </div>
    </motion.section>
  );
};

const LaptopifyPromoBanner = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-[20px] md:rounded-[60px] bg-gradient-to-br from-[#00cdf9] via-[#0047bb] to-[#012a6d] min-h-[125px] md:min-h-[135px] lg:min-h-[180px] p-4 md:py-6 lg:py-10 md:px-20 lg:px-24 flex flex-row items-center justify-between gap-4 group my-6 md:my-8 lg:my-10 mx-0 md:mx-0 shadow-2xl transition-shadow hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)]"
    >
       {/* Dynamic Background Light */}
       <motion.div 
         animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            opacity: [0.1, 0.3, 0.1]
         }}
         transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
         className="absolute top-0 left-0 w-full h-full bg-[#00cdf9]/30 blur-[120px] pointer-events-none"
       />

       {/* Background Abstract Elements */}
       <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2" />
       
       <div className="z-10 flex-1 text-left max-w-2xl pr-4 md:pr-16">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="flex items-center gap-1 md:gap-2 mb-0 md:mb-3 -mt-2 md:-mt-4"
          >
             <div className="bg-white/20 backdrop-blur-md p-0.5 md:p-2.5 rounded-md md:rounded-xl border border-white/10">
                <ShieldCheck className="w-3 h-3 md:w-7 md:h-7 text-white" />
             </div>
             <span className="text-white text-[6px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Secure Ecosystem</span>
          </motion.div>

          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-sm md:text-2xl lg:text-4xl font-black text-white italic tracking-tighter leading-[1.2] mb-1 md:mb-3 lg:mb-4 ml-0.5 md:ml-1"
          >
             Seamless Payments. <br />
             <span className="text-white/60">Limitless Tech.</span>
          </motion.h2>
          
          {/* Bank & Payment Logos Grid */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 opacity-90 mt-1 md:mt-3">
             {/* Logo: EasyPaisa */}
             <div className="flex items-center gap-1 bg-white/10 px-2 py-1 md:px-3 md:py-1 rounded-lg border border-white/20">
                <div className="w-2 h-2 md:w-5 md:h-5 bg-green-500 rounded-full" />
                <span className="text-[7px] md:text-[15px] font-black text-white tracking-tighter">Easypaisa</span>
             </div>
             {/* Logo: JazzCash */}
             <div className="flex items-center gap-1 bg-white/10 px-2 py-1 md:px-3 md:py-1 rounded-lg border border-white/20">
                <div className="w-2 h-2 md:w-5 md:h-5 bg-red-600 rounded-full" />
                <span className="text-[7px] md:text-[15px] font-black text-white tracking-tighter italic">JazzCash</span>
             </div>
             {/* Logo: Cards */}
             <div className="flex items-center gap-1 md:gap-2 px-1 md:px-2">
                <CreditCard className="w-4 h-4 md:w-6 md:h-6 text-white/50" />
                <div className="flex -space-x-1 md:-space-x-1.5">
                   <div className="w-3 h-3 md:w-6 md:h-6 bg-red-500/80 rounded-full border md:border-2 border-white/20" />
                   <div className="w-3 h-3 md:w-6 md:h-6 bg-yellow-500/80 rounded-full border md:border-2 border-white/20" />
                </div>
             </div>
          </div>
       </div>

       {/* Floating Visual Elements */}
       <div className="relative hidden sm:flex items-center justify-center w-1/3">
          {/* Animated Credit Card */}
          <motion.div 
            animate={{ 
               rotateY: [0, 15, 0],
               rotateX: [0, -10, 0],
               y: [0, -10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-[100px] md:w-[180px] lg:w-[216px] aspect-[1.6/1] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-2xl md:rounded-[24px] lg:rounded-[30px] border-2 border-white/30 p-2 md:p-6 lg:p-7 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden group-hover:scale-110 transition-transform duration-700"
          >
             <div className="flex justify-between items-start">
                <div className="w-8 h-6 md:w-16 md:h-12 bg-yellow-400/80 rounded-md md:rounded-xl shadow-inner border border-white/20" />
                <Zap className="w-5 h-5 md:w-10 md:h-10 text-white/40" />
             </div>
             <div className="space-y-1 md:space-y-4">
                <div className="h-1.5 md:h-4 w-full bg-white/10 rounded-full" />
                <div className="flex gap-1 md:gap-3 uppercase font-mono text-[8px] md:text-xl text-white/60 tracking-widest">
                   <span>****</span><span>****</span><span>****</span><span>8888</span>
                </div>
                <div className="flex justify-between items-end">
                   <span className="text-[6px] md:text-xs font-bold text-white/40 uppercase tracking-widest">Premium Member</span>
                   <div className="flex -space-x-4">
                      <div className="w-6 h-6 md:w-14 md:h-14 bg-red-500/80 rounded-full" />
                      <div className="w-6 h-6 md:w-14 md:h-14 bg-yellow-500/80 rounded-full" />
                   </div>
                </div>
             </div>
             {/* Card Gloss */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </motion.div>
          {/* Floating Mobile Wallet Overlay for Mobile/Smaller Screens replacement logic */}
          <div className="absolute bottom-[-10%] right-[-10%] z-30 w-1/2 h-1/2 bg-white/5 blur-3xl rounded-full" />
       </div>
       
       {/* Mobile-Only Card Icon for very small viewports */}
       <div className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
          <CreditCard className="w-20 h-20 text-white rotate-12" />
       </div>
    </motion.section>
  );
};

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 2,
      type: "warranty",
      title: "Asli Warranty Challenge",
      subtitle: "Official Brand Warranty ya Double Paisay Wapis",
      bg: "bg-[#7e22ce]",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      type: "elite",
      title: "Elevate Your Vibe.",
      subtitle: "Premium machines for the relentless.",
      bg: "bg-black",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative mx-4 md:mx-auto h-[16.2vh] md:h-[58vh] overflow-hidden rounded-[20px] md:rounded-[40px] mb-3 md:mb-10 shadow-2xl border-2 md:border-8 border-white max-w-none md:max-w-[98%] bg-gray-900">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ 
            x: { type: "tween", duration: 1.5, ease: "easeInOut" },
            opacity: { duration: 1 }
          }}
          className={cn("absolute inset-0 flex items-center shadow-inner", slides[currentSlide].bg)}
        >
          <div className="max-w-none w-full px-3 md:px-16 grid grid-cols-2 items-center gap-2 md:gap-10">
            <div className="z-10 space-y-1 md:space-y-6">
              {slides[currentSlide].type === "promo" && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/30 inline-block"
                >
                  <span className="text-white font-black italic tracking-widest text-[6px] md:text-sm uppercase">Laptopify Exclusive</span>
                </motion.div>
              )}
              
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[10px] md:text-6xl font-black text-white italic tracking-tighter leading-[0.9] drop-shadow-lg"
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[7px] md:text-xl font-bold text-white/80 max-w-xl line-clamp-2 md:line-clamp-none"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              <div className="flex gap-2">
                <Link to="/products" className="px-2.5 py-1 md:px-8 md:py-4 bg-white text-gray-900 text-[8px] md:text-sm font-black rounded-lg md:rounded-2xl shadow-xl hover:scale-105 transition-transform uppercase tracking-widest">
                  Shop
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center items-center h-full">
               <motion.div
                 initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
                 animate={{ scale: 1, opacity: 1, rotate: -5 }}
                 transition={{ duration: 1, delay: 0.4 }}
                 className="relative z-10 w-full max-w-[140px] md:max-w-[450px]"
               >
                  <img src={slides[currentSlide].image} alt="Slide Product" className="rounded-lg md:rounded-[40px] shadow-2xl border md:border-4 border-white/20 object-cover aspect-video" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-lg md:rounded-[40px]" />
               </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
         {slides.map((_, i) => (
           <button 
             key={i} 
             onClick={() => setCurrentSlide(i)}
             className={cn(
               "h-1 transition-all duration-500 rounded-full",
               currentSlide === i ? "w-8 bg-white" : "w-2 bg-white/30"
             )}
           />
         ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearch();

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        // ... distributive logic ...
        let baseData = data.map((p: any) => ({
          ...p,
          discount: p.discount || [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)]
        }));

        let distributedData = new Array(80);
        for (let i = 0; i < 80; i++) {
          const row = Math.floor(i / 10);
          const col = i % 10;
          if (col < 4 && (row * 4 + col) < baseData.length) distributedData[i] = baseData[row * 4 + col];
          else {
            const randomItem = baseData[Math.floor(Math.random() * baseData.length)];
            distributedData[i] = { ...randomItem, _id: `${randomItem._id}_syn_${i}`, discount: [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)] };
          }
        }
        setProducts(distributedData);
        setLoading(false);
      }) 
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white overflow-hidden">
      <HeroCarousel />

      {/* Main Content Section */}
      <section className="pt-0 pb-2 md:py-12 lg:py-16 px-4 md:px-6">
        <div className="max-w-none w-full px-0">
          {/* Spec-Matrix Heading */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-4 md:mb-6 gap-2 md:gap-8 px-1 md:px-3">
             <div>
                <span className="text-purple-600 font-bold uppercase tracking-[0.3em] text-[7px] md:text-xs mb-1 md:mb-4 block">Collection 2024</span>
                <h2 className="text-xl md:text-5xl font-bold text-gray-900 tracking-tight">The Spec-Matrix</h2>
             </div>
          </div>

          {loading ? (
            <LoadingState />
          ) : (
            <>
              {/* Desktop/Tablet View: Interleaved Banners ... */}
              <div className="hidden md:block">
                {[...Array(8)].map((_, i) => (
                  <div key={i}>
                      <ProductLine lineProducts={filteredProducts.slice(i * 10, (i + 1) * 10)} />
                      {i === 0 && <BuyNowPayLater />}
                      {i === 3 && <LaptopifyPromoBanner />}
                      {i === 5 && <WarrantyPromoBanner />}
                  </div>
                ))}
              </div>

              {/* Mobile View: Distributed Banners & Grid */}
              <div className="md:hidden space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {filteredProducts.slice(0, 2).map(p => <ProductCard p={p} key={p._id} />)}
                </div>
                <BuyNowPayLater />
                <div className="grid grid-cols-2 gap-4">
                    {filteredProducts.slice(2, 6).map(p => <ProductCard p={p} key={p._id} />)}
                </div>
                <LaptopifyPromoBanner />
                <div className="grid grid-cols-2 gap-4">
                    {filteredProducts.slice(6, 12).map(p => <ProductCard p={p} key={p._id} />)}
                </div>
                <WarrantyPromoBanner />
                <div className="grid grid-cols-2 gap-4 pb-10">
                    {filteredProducts.slice(12).map(p => <ProductCard p={p} key={p._id} />)}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-6 md:py-10 lg:py-12 px-2 md:px-6 bg-gray-50/50">
        <div className="max-w-none w-full px-1.5 md:px-3">
          <div className="text-center mb-6 md:mb-8">
             <span className="text-purple-600 font-bold uppercase tracking-[0.3em] text-[8px] md:text-xs mb-2 md:mb-4 block">Engineered Excellence</span>
             <h2 className="text-lg md:text-4xl font-bold text-gray-900 tracking-tight">Built Different. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">By Design.</span></h2>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-8">
            {[
              { icon: Cpu, title: "Next-Gen Hardware", desc: "Intel i9 14th Gen, M3 Max — only the finest silicon.", color: "from-purple-500 to-purple-600" },
              { icon: Zap, title: "Blazing Performance", desc: "RTX 5080, OLED 480Hz displays. Zero compromise.", color: "from-cyan-500 to-cyan-600" },
              { icon: Shield, title: "Lifetime Warranty", desc: "Backed by our signature hardware warranty.", color: "from-blue-500 to-blue-600" }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-2 md:p-10 rounded-xl md:rounded-[30px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className={cn("w-6 h-6 md:w-14 md:h-14 rounded-md md:rounded-xl flex items-center justify-center text-white mb-1.5 md:mb-6 bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform", f.color)}>
                  <f.icon className="w-3 h-3 md:w-7 md:h-7" />
                </div>
                <h3 className="text-[7px] md:text-xl font-black mb-0.5 md:mb-3 leading-tight uppercase tracking-tighter md:normal-case md:tracking-normal">{f.title}</h3>
                <p className="text-gray-500 leading-none md:leading-relaxed font-medium text-[5px] md:text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearch();

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        let baseData = data.map((p: any) => ({
          ...p,
          discount: p.discount || [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)]
        }));

        let distributedData = new Array(80);
        for (let i = 0; i < 80; i++) {
          const row = Math.floor(i / 10);
          const col = i % 10;
          if (col < 4 && (row * 4 + col) < baseData.length) distributedData[i] = baseData[row * 4 + col];
          else {
            const randomItem = baseData[Math.floor(Math.random() * baseData.length)];
            distributedData[i] = { ...randomItem, _id: `${randomItem._id}_syn_${i}`, discount: [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)] };
          }
        }
        setProducts(distributedData);
        setLoading(false);
      }) 
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-6 md:pt-12 pb-16 md:pb-24 px-4 md:px-6 bg-white min-h-screen">
      <div className="max-w-none w-full px-1 md:px-3">
        <header className="mb-8 md:mb-10 px-1 md:px-3">
          <h1 className="text-2xl sm:text-6xl font-bold mb-2 md:mb-4 tracking-tight">Machines.</h1>
          <p className="text-xs md:text-xl text-gray-500 font-medium">Explore premium laptop models engineered for peak performance.</p>
        </header>

        <section className="px-0">
          {loading ? (
            <LoadingState />
          ) : (
            [...Array(8)].map((_, i) => (
              <div key={i}>
                  <ProductLine lineProducts={filteredProducts.slice(i * 10, (i + 1) * 10)} />
                  {i === 0 && <LaptopifyPromoBanner />}
                  {i === 3 && <BuyNowPayLater />}
                  {i === 5 && <WarrantyPromoBanner />}
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

const Login = () => (
  <div className="min-h-screen flex items-center justify-center px-6 pt-0 md:pt-20 bg-gray-50">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-white p-8 md:p-12 rounded-[32px] md:rounded-[48px] shadow-xl border border-gray-100"
    >
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-black mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-sm font-medium">Access your Laptopify account</p>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="login-email" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Email Address</label>
          <input 
            id="login-email"
            name="email"
            type="email" 
            autoComplete="email"
            placeholder="name@company.com" 
            className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none" 
          />
        </div>
        <div>
          <label htmlFor="login-password" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Password</label>
          <input 
            id="login-password"
            name="password"
            type="password" 
            autoComplete="current-password"
            placeholder="••••••••" 
            className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none" 
          />
        </div>
        <button className="w-full py-5 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 active:scale-95">
          Sign In
        </button>
      </div>
      <p className="mt-10 text-center text-sm text-gray-500 font-medium">
        Don't have an account? <Link to="/signup" className="text-purple-600 font-black hover:underline">Create one</Link>
      </p>
    </motion.div>
  </div>
);

const Signup = () => (
  <div className="min-h-screen flex items-center justify-center px-6 pt-0 md:pt-20 bg-gray-50">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-white p-8 md:p-12 rounded-[32px] md:rounded-[48px] shadow-xl border border-gray-100"
    >
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-black mb-2">Join the Core</h2>
        <p className="text-gray-500 text-sm font-medium">Start your high-performance journey</p>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
           <div>
              <label htmlFor="signup-first-name" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">First Name</label>
              <input 
                id="signup-first-name"
                name="firstName"
                type="text" 
                autoComplete="given-name"
                placeholder="John" 
                className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none" 
              />
           </div>
           <div>
              <label htmlFor="signup-last-name" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Last Name</label>
              <input 
                id="signup-last-name"
                name="lastName"
                type="text" 
                autoComplete="family-name"
                placeholder="Doe" 
                className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none" 
              />
           </div>
        </div>
        <div>
          <label htmlFor="signup-email" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Email Address</label>
          <input 
            id="signup-email"
            name="email"
            type="email" 
            autoComplete="email"
            placeholder="name@company.com" 
            className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none" 
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Password</label>
          <input 
            id="signup-password"
            name="password"
            type="password" 
            autoComplete="new-password"
            placeholder="••••••••" 
            className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none" 
          />
        </div>
        <button className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-xl active:scale-95">
          Create Account
        </button>
      </div>
      <p className="mt-10 text-center text-sm text-gray-500 font-medium">
        Already have an account? <Link to="/login" className="text-purple-600 font-black hover:underline">Sign in</Link>
      </p>
    </motion.div>
  </div>
);

const Contact = () => (
  <div className="pt-20 md:pt-16 pb-16 md:pb-12 px-6 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-purple-600 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3 md:mb-4 block">Get in Touch</span>
        <h2 className="text-4xl md:text-6xl font-black mb-4 md:mb-8 leading-[0.9]">We're here <br /> to help.</h2>
        <p className="text-sm md:text-xl text-gray-500 font-medium mb-8 md:mb-12 max-w-md">Our specialist team is available 24/7 to assist with your performance needs.</p>
        
        <div className="space-y-6 md:space-y-8">
           <div className="flex items-center gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-purple-50 rounded-xl md:rounded-2xl flex items-center justify-center text-purple-600"><Mail className="w-5 h-5 md:w-6 md:h-6" /></div>
              <div>
                 <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400">Email Us</p>
                 <p className="text-sm md:text-lg font-bold">rohail123@gmail.com</p>
              </div>
           </div>
           <div className="flex items-center gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-cyan-50 rounded-xl md:rounded-2xl flex items-center justify-center text-cyan-600"><Phone className="w-5 h-5 md:w-6 md:h-6" /></div>
              <div>
                 <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400">Call Us</p>
                 <p className="text-sm md:text-lg font-bold">0300 0000000</p>
              </div>
           </div>
           <div className="flex items-center gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600"><MapPin className="w-5 h-5 md:w-6 md:h-6" /></div>
              <div>
                 <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400">Visit Us</p>
                 <p className="text-sm md:text-lg font-bold">laptopify inc, ISB</p>
              </div>
           </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-gray-50 p-12 rounded-[48px] border border-gray-100"
      >
         <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="contact-first-name" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">First Name</label>
                    <input 
                      id="contact-first-name"
                      name="firstName"
                      type="text" 
                      autoComplete="given-name"
                      className="w-full px-6 py-4 bg-white border-transparent rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none" 
                    />
                 </div>
                 <div>
                    <label htmlFor="contact-last-name" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Last Name</label>
                    <input 
                      id="contact-last-name"
                      name="lastName"
                      type="text" 
                      autoComplete="family-name"
                      className="w-full px-6 py-4 bg-white border-transparent rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none" 
                    />
                 </div>
            </div>
            <div>
               <label htmlFor="contact-inquiry-type" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Inquiry Type</label>
               <select 
                 id="contact-inquiry-type"
                 name="inquiryType"
                 className="w-full px-6 py-4 bg-white border-transparent rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none appearance-none"
               >
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="warranty">Warranty Claim</option>
               </select>
            </div>
            <div>
               <label htmlFor="contact-message" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Message</label>
               <textarea 
                 id="contact-message"
                 name="message"
                 rows={4} 
                 className="w-full px-6 py-4 bg-white border-transparent rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none"
               ></textarea>
            </div>
            <button className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group">
               Send Message <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
               <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4">Internal Access Only</p>
               <Link to="/admin" className="text-sm font-bold text-gray-400 hover:text-purple-600 transition-colors">Staff Portal</Link>
            </div>
         </div>
      </motion.div>
    </div>
  </div>
);

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "Gaming",
    image: "",
    description: "",
    rating: "4.5",
    discount: 15
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate auth check delay
    setTimeout(() => {
      if (username === "user" && password === "user123") {
        setIsLoggedIn(true);
        setError("");
        fetchProducts();
      } else {
        setError("Unauthorized access. Please check your credentials.");
      }
      setIsSubmitting(false);
    }, 800);
  };

  const fetchProducts = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this machine?")) {
      setIsSubmitting(true);
      await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
      setIsSubmitting(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = editingProduct ? `${import.meta.env.VITE_API_URL}/api/products/${editingProduct._id}` : `${import.meta.env.VITE_API_URL}/api/products`;
    const method = editingProduct ? "PUT" : "POST";
    const body = editingProduct ? editingProduct : newProduct;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      setEditingProduct(null);
      setShowAddForm(false);
      setNewProduct({ name: "", price: 0, category: "Gaming", image: "", description: "", rating: "4.5", discount: 15 });
      fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white p-12 rounded-[48px] shadow-2xl border border-gray-100">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl mx-auto flex items-center justify-center text-white mb-6 shadow-xl shadow-purple-200">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black mb-2">Staff Access</h2>
            <p className="text-gray-500 font-medium text-sm text-balance">Personnel only. Please provide your secure credentials.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block px-2">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-medium" placeholder="ID Number" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block px-2">Keycode</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-medium" placeholder="••••••••" />
            </div>
            {error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-3 rounded-xl border border-red-100">{error}</p>}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={cn(
                "w-full py-5 text-white font-black rounded-2xl hover:bg-purple-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2",
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
                </>
              ) : (
                "Verify & Enter"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <span className="text-purple-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">Command Center</span>
            <h1 className="text-4xl md:text-6xl font-black">Spec Inventory.</h1>
          </div>
          <div className="flex gap-4">
             <button onClick={() => setShowAddForm(true)} className="px-8 py-4 bg-purple-600 text-white font-black rounded-2xl shadow-xl shadow-purple-100 hover:bg-purple-700 active:scale-95 transition-all text-sm flex items-center gap-2">
               <Plus className="w-5 h-5" /> New Machine
             </button>
             <button onClick={() => setIsLoggedIn(false)} className="px-8 py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 active:scale-95 transition-all text-sm">Lock Session</button>
          </div>
        </header>

        {loading ? (
          <LoadingState />
        ) : (
          <>
            {/* Filters/Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
               <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Total Fleet</p>
                  <p className="text-3xl font-black">{products.length} Units</p>
               </div>
               <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Gaming Tier</p>
                  <p className="text-3xl font-black">{products.filter(p => p.category === 'Gaming').length}</p>
               </div>
               <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Studio Tier</p>
                  <p className="text-3xl font-black">{products.filter(p => p.category === 'Professional' || p.category === 'Ultraportable').length}</p>
               </div>
               <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Average Value</p>
                  <p className="text-3xl font-black">${Math.round(products.reduce((acc, p) => acc + p.price, 0) / (products.length || 1)).toLocaleString()}</p>
               </div>
            </div>

            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <th className="px-8 py-6">Machine Detail</th>
                    <th className="px-8 py-6 text-center">Category</th>
                    <th className="px-8 py-6 text-right">MSRP</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map(p => (
                    <tr key={p._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                            <img src={p.image} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{p.name}</p>
                            <p className="text-xs text-gray-400 font-medium">ID: {p._id.slice(-8).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-[10px] font-black uppercase px-3 py-1 bg-purple-50 text-purple-600 rounded-full">{p.category}</span>
                      </td>
                      <td className="px-8 py-6 text-right font-black text-gray-900">${p.price.toLocaleString()}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditingProduct(p)} className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-gray-900 hover:text-white transition-all shadow-sm">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            disabled={isSubmitting}
                            onClick={() => handleDelete(p._id)} 
                            className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Product Form Modal (Shared for Add/Edit) */}
      <AnimatePresence>
        {(showAddForm || editingProduct) && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setShowAddForm(false); setEditingProduct(null); }} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]" />
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="fixed bottom-0 md:top-1/2 md:bottom-auto left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-full max-w-2xl bg-white md:rounded-[48px] rounded-t-[48px] shadow-2xl z-[210] p-8 md:p-12">
              <h2 className="text-3xl font-black mb-10">{editingProduct ? 'Update System' : 'Provision Hardware'}</h2>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Product Name</label>
                    <input type="text" required value={editingProduct ? editingProduct.name : newProduct.name} onChange={e => editingProduct ? setEditingProduct({...editingProduct, name: e.target.value}) : setNewProduct({...newProduct, name: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Category</label>
                    <select value={editingProduct ? editingProduct.category : newProduct.category} onChange={e => editingProduct ? setEditingProduct({...editingProduct, category: e.target.value}) : setNewProduct({...newProduct, category: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none appearance-none font-bold">
                       <option>Gaming</option>
                       <option>Professional</option>
                       <option>Ultraportable</option>
                       <option>Workstation</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Price ($)</label>
                    <input type="number" required value={editingProduct ? editingProduct.price : newProduct.price} onChange={e => editingProduct ? setEditingProduct({...editingProduct, price: parseInt(e.target.value)}) : setNewProduct({...newProduct, price: parseInt(e.target.value)})} className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Discount (%)</label>
                    <input type="number" required value={editingProduct ? editingProduct.discount : newProduct.discount} onChange={e => editingProduct ? setEditingProduct({...editingProduct, discount: parseInt(e.target.value)}) : setNewProduct({...newProduct, discount: parseInt(e.target.value)})} className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-bold" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Image URL</label>
                  <input type="text" required value={editingProduct ? editingProduct.image : newProduct.image} onChange={e => editingProduct ? setEditingProduct({...editingProduct, image: e.target.value}) : setNewProduct({...newProduct, image: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-medium text-xs text-gray-400" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Core Description</label>
                  <textarea rows={3} required value={editingProduct ? editingProduct.description : newProduct.description} onChange={e => editingProduct ? setEditingProduct({...editingProduct, description: e.target.value}) : setNewProduct({...newProduct, description: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-medium text-sm resize-none" />
                </div>
                <div className="flex gap-4 pt-6">
                   <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className={cn(
                       "flex-1 py-5 text-white font-black rounded-2xl hover:bg-purple-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2",
                       isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900"
                     )}
                   >
                     {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Provisioning...
                        </>
                     ) : (
                        "Commit Changes"
                     )}
                   </button>
                   <button type="button" onClick={() => { setShowAddForm(false); setEditingProduct(null); }} className="px-10 py-5 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all">Cancel</button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- App Layout ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <Router>
        <CartProvider>
          <ScrollToTop />
          <div className="font-sans text-gray-900">
            <Navbar />
            <CartDrawer />
            <div>
               <main className="min-h-screen">
                 <Routes>
                   <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<Home />} />
                   <Route path="/products" element={<ProductList />} />
                   <Route path="/product/:productId" element={<ProductDetail />} />
                   <Route path="/login" element={<Login />} />
                   <Route path="/signup" element={<Signup />} />
                   <Route path="/contact" element={<Contact />} />
                 </Routes>
               </main>
            </div>
            <Footer />
          </div>
        </CartProvider>
      </Router>
    </SearchContext.Provider>
  );
}
