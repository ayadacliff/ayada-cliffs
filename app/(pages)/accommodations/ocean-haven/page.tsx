"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause, MapPin, Waves, Users, Coffee, Home, Bath, Bed, Eye, Utensils, Droplets } from 'lucide-react';
import Header from '@/app/components/sections/Header';
import ImageLightbox from '@/app/components/ui/ImageLightbox';
import MobileBookingBar from '@/app/components/ui/MobileBookingBar';

export default function OceanHavenPoolVilla() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Optimized scroll handler with throttling
    const handleScroll = useCallback(() => {
        setScrollY(window.scrollY);
    }, []);

    useEffect(() => {
        const throttledScroll = () => {
            requestAnimationFrame(handleScroll);
        };
        window.addEventListener("scroll", throttledScroll, { passive: true });
        return () => window.removeEventListener("scroll", throttledScroll);
    }, [handleScroll]);

    // Gallery images data
    const galleryImages = useMemo(() => [
        { src: "/images/ocean-haven/ocean-haven-exterior.webp", alt: "Ocean Haven Villa Exterior" },
        { src: "/images/ocean-haven/arabian-sea-view.webp", alt: "View of the Arabian Sea from the villa" },
        { src: "/images/ocean-haven/villa-bedroom-open.webp", alt: "Villa bedroom with open folding doors" },
        { src: "/images/ocean-haven/sky-view-shower.webp", alt: "Bathroom with sky view rain shower" },
        { src: "/images/ocean-haven/private-pool-deck.webp", alt: "Private pool with deckside dining" },
        { src: "/images/ocean-haven/gallery/1.webp", alt: "Ocean Haven Villa Interior View 1" },
        { src: "/images/ocean-haven/gallery/2.webp", alt: "Ocean Haven Villa Interior View 2" },
        { src: "/images/ocean-haven/gallery/3.webp", alt: "Ocean Haven Villa Interior View 3" },
        { src: "/images/ocean-haven/gallery/4.webp", alt: "Ocean Haven Villa Interior View 4" },
        { src: "/images/ocean-haven/gallery/5.webp", alt: "Ocean Haven Villa Interior View 5" },
        { src: "/images/ocean-haven/gallery/6.webp", alt: "Ocean Haven Villa Interior View 6" }
    ], []);

    // Auto-play functionality for gallery
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentGalleryIndex(prev => 
                prev === galleryImages.length - 1 ? 0 : prev + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, galleryImages.length]);

    const nextImage = useCallback(() => {
        setCurrentGalleryIndex(prev => 
            prev === galleryImages.length - 1 ? 0 : prev + 1
        );
    }, [galleryImages.length]);

    const prevImage = useCallback(() => {
        setCurrentGalleryIndex(prev => 
            prev === 0 ? galleryImages.length - 1 : prev - 1
        );
    }, [galleryImages.length]);

    // Villa features organized by category
  const villaFeatures = useMemo(() => [
        { icon: <Waves className="w-5 h-5" />, text: "Spacious private pool with dedicated filtration system" },
        { icon: <Home className="w-5 h-5" />, text: "Traditional Kerala Padipura entrance to villa compound" },
        { icon: <Eye className="w-5 h-5" />, text: "Full-length folding doors for seamless indoor-outdoor living" },
        { icon: <Coffee className="w-5 h-5" />, text: "Pool deck dining area for romantic or private meals" },
        { icon: <Bath className="w-5 h-5" />, text: "Private garden sanctuary with total privacy" },
        { icon: <Droplets className="w-5 h-5" />, text: "Barefoot open-sky shower in the garden" },
        { icon: <Eye className="w-5 h-5" />, text: "Bathroom with oval glass skylight for natural sunlight" },
        { icon: <MapPin className="w-5 h-5" />, text: "Just steps from beach - watch fishermen & surfers daily" },
        { icon: <Home className="w-5 h-5" />, text: "ABB intercom system for seamless communication" }
    ], []);

    const interiorFeatures = useMemo(() => [
        { icon: <Home className="w-5 h-5" />, text: "Natural wooden ceiling & flooring with coastal furniture" },
        { icon: <Home className="w-5 h-5" />, text: "Warm traditional lighting for comfort and ambience" },
        { icon: <Bed className="w-5 h-5" />, text: "Generously sized master bedroom with luxury king-size bed" },
        { icon: <Bath className="w-5 h-5" />, text: "Elegant bathroom with high-end fittings & rain shower" },
        { icon: <Eye className="w-5 h-5" />, text: "50-inch Google Smart TV with streaming capabilities" },
        { icon: <Coffee className="w-5 h-5" />, text: "Mitsubishi AC, mini-bar fridge & modern electric kettle" }
    ], []);

    const guestServices = useMemo(() => [
        { icon: <Users className="w-5 h-5" />, text: "Dedicated villa host for discreet personalised service" },
        { icon: <Utensils className="w-5 h-5" />, text: "Private chef & cooking classes available on request" },
        { icon: <Home className="w-5 h-5" />, text: "Daily housekeeping service & premium toiletries" },
        { icon: <Coffee className="w-5 h-5" />, text: "Complimentary high-speed Wi-Fi & plush bath linens" },
        { icon: <Home className="w-5 h-5" />, text: "In-room safe for valuables & hot & cold water" },
        { icon: <Eye className="w-5 h-5" />, text: "Total privacy with lush garden surroundings" }
    ], []);
    
    return (
        <>
            {/* Header */}
            <Header
                scrollY={scrollY}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />

            <div className="page-content min-h-screen bg-stone-50 text-stone-800">

            {/* Hero Section with Parallax Effect */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/ocean-haven/arabian-sea-view.webp"
                    alt="View of the Arabian Sea from the villa"
                    fill
                    className="object-cover"
                    style={{
                        backgroundAttachment: 'fixed'
                    }}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/40" />
                
                <div 
                    className="text-center text-white px-6 max-w-5xl z-10 relative"
                    style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                >
                    <h1 className="text-5xl md:text-7xl mb-6 font-light tracking-wide">
                        Ocean Haven Pool Villa
                    </h1>
                    <p className="text-xl md:text-2xl font-light mb-8 max-w-4xl mx-auto leading-relaxed">
                        A peaceful escape with unmatched ocean views, where traditional coastal charm meets modern luxury
                    </p>
                    <button className="bg-white text-stone-800 px-8 py-3 rounded-full hover:bg-stone-100 transition-all duration-300 transform hover:scale-105">
                        Discover Haven
                    </button>
                </div>
                
                {/* Peaceful haven indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Waves className="w-5 h-5" />
                        <span className="text-sm font-light">Peaceful Ocean Haven</span>
                    </div>
                    <div className="w-0.5 h-8 bg-white/50 mx-auto animate-pulse"></div>
                </div>
            </section>

            {/* Villa Experience Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-light text-center mb-16 border-b border-stone-200 pb-4">
                        The Haven Experience
                    </h2>

                    <div className="space-y-24">
                        {/* Indoor-Outdoor Living */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-light mb-6 text-stone-700">Seamless Indoor-Outdoor Living</h3>
                                <p className="text-stone-600 mb-6 leading-relaxed text-lg">
                                    Full-length folding doors open completely, inviting fresh ocean air and natural light into your peaceful sanctuary.
                                </p>
                                <p className="text-stone-600 leading-relaxed text-lg">
                                    Natural wood flooring and traditional coastal furniture create a warm, inviting atmosphere that celebrates local craftsmanship and heritage.
                                </p>
                                <div className="mt-6 flex items-center gap-4 text-stone-500">
                                    <div className="flex items-center gap-2">
                                        <Home className="w-4 h-4" />
                                        <span className="text-sm">Folding Doors</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Eye className="w-4 h-4" />
                                        <span className="text-sm">Natural Light</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl group">
                                <Image
                                    src="/images/ocean-haven/villa-bedroom-open.webp"
                                    alt="Villa bedroom with open folding doors"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>

                        {/* Sky-View Bathroom */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 relative h-96 rounded-lg overflow-hidden shadow-xl group">
                                <Image
                                    src="/images/ocean-haven/sky-view-shower.webp"
                                    alt="Bathroom with sky view rain shower"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            <div className="order-1 md:order-2">
                                <h3 className="text-3xl font-light mb-6 text-stone-700">Luxurious Sky-View Bathroom</h3>
                                <p className="text-stone-600 mb-6 leading-relaxed text-lg">
                                    Indulge in the unique sky-view glass rain shower, where you can gaze at the open sky while maintaining complete privacy.
                                </p>
                                <p className="text-stone-600 leading-relaxed text-lg">
                                    Thoughtfully placed windows connect you with nature&apos;s beauty while ensuring your intimate moments remain secluded and serene.
                                </p>
                                <div className="mt-6 flex items-center gap-4 text-stone-500">
                                    <div className="flex items-center gap-2">
                                        <Droplets className="w-4 h-4" />
                                        <span className="text-sm">Sky-View Shower</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Eye className="w-4 h-4" />
                                        <span className="text-sm">Complete Privacy</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Private Pool */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-light mb-6 text-stone-700">Private Pool & Garden Oasis</h3>
                                <p className="text-stone-600 mb-6 leading-relaxed text-lg">
                                    Your pool awaits with a barefoot open-sky shower and elegant deckside dining area for unforgettable moments.
                                </p>
                                <p className="text-stone-600 leading-relaxed text-lg">
                                    The landscaped garden features a traditional &lsquo;padipura&rsquo; entrance with modern intercom system for seamless, discreet service.
                                </p>
                                <div className="mt-6 flex items-center gap-4 text-stone-500">
                                    <div className="flex items-center gap-2">
                                        <Waves className="w-4 h-4" />
                                        <span className="text-sm">Private Pool</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Home className="w-4 h-4" />
                                        <span className="text-sm">Padipura Entrance</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl group">
                                <Image
                                    src="/images/ocean-haven/private-pool-deck.webp"
                                    alt="Private pool with deckside dining"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Gallery with Lightbox */}
            <section className="py-20 px-6 bg-stone-100">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-16">
                        <h2 className="text-4xl font-light border-b border-stone-200 pb-4">
                            Experience the Haven
                        </h2>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors"
                            >
                                {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                {isAutoPlaying ? 'Pause' : 'Auto Play'}
                            </button>
                        </div>
                    </div>

                    {/* Main Gallery Display */}
                    <div className="relative mb-8">
                        <div 
                            className="relative h-96 md:h-[500px] rounded-lg overflow-hidden cursor-zoom-in group"
                            onClick={() => setIsLightboxOpen(true)}
                            role="button"
                            tabIndex={0}
                            aria-label="Open fullscreen image view"
                        >
                            <Image
                                src={galleryImages[currentGalleryIndex]?.src}
                                alt={galleryImages[currentGalleryIndex]?.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                                priority={currentGalleryIndex === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                            
                            {/* Navigation Arrows */}
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-all z-10"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-all z-10"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-10">
                                {currentGalleryIndex + 1} / {galleryImages.length}
                            </div>

                            {/* Image Description */}
                            <div className="absolute bottom-4 left-4 text-white max-w-md z-10">
                                <p className="text-sm bg-black/60 px-3 py-1 rounded-full">
                                    {galleryImages[currentGalleryIndex]?.alt}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                        {galleryImages.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentGalleryIndex(index)}
                                className={`relative h-20 rounded overflow-hidden transition-all ${
                                    index === currentGalleryIndex 
                                        ? 'ring-2 ring-stone-800 scale-105' 
                                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                                }`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 200px"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Features & Services */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-light text-center mb-16 border-b border-stone-200 pb-4">
                        Features & Guest Services
                    </h2>
                    
                    <div className="grid lg:grid-cols-3 gap-16">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="bg-stone-100 p-3 rounded-full">
                                    <Home className="w-6 h-6 text-stone-600" />
                                </div>
                                <h3 className="text-2xl font-light text-stone-700">In-Villa Features & Amenities</h3>
                            </div>
                            <div className="space-y-4">
                                {villaFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-stone-50 transition-colors">
                                        <div className="text-stone-600 mt-0.5">{feature.icon}</div>
                                        <span className="text-stone-700">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="bg-stone-100 p-3 rounded-full">
                                    <Eye className="w-6 h-6 text-stone-600" />
                                </div>
                                <h3 className="text-2xl font-light text-stone-700">Interiors & Design</h3>
                            </div>
                            <div className="space-y-4">
                                {interiorFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-stone-50 transition-colors">
                                        <div className="text-stone-600 mt-0.5">{feature.icon}</div>
                                        <span className="text-stone-700">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="bg-stone-100 p-3 rounded-full">
                                    <Users className="w-6 h-6 text-stone-600" />
                                </div>
                                <h3 className="text-2xl font-light text-stone-700">Service & Guest Experience</h3>
                            </div>
                            <div className="space-y-4">
                                {guestServices.map((service, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-stone-50 transition-colors">
                                        <div className="text-stone-600 mt-0.5">{service.icon}</div>
                                        <span className="text-stone-700">{service.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Unique Ocean Haven Highlight Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-stone-800 to-stone-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <Waves className="w-16 h-16 mx-auto mb-8 text-stone-300" />
                    <h2 className="text-4xl font-light mb-6">The Ultimate Ocean Haven</h2>
                    <p className="text-xl mb-8 text-stone-300 max-w-3xl mx-auto leading-relaxed">
                        Discover your peaceful retreat where gentle ocean breezes meet traditional Kerala hospitality. Watch local fishermen at work while enjoying unmatched privacy and luxury in your oceanfront sanctuary.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        <div className="text-center">
                            <Eye className="w-10 h-10 mx-auto mb-4 text-stone-300" />
                            <h3 className="text-lg font-light mb-2">Ocean Views</h3>
                            <p className="text-stone-400 text-sm">Direct views of the Arabian Sea</p>
                        </div>
                        <div className="text-center">
                            <Droplets className="w-10 h-10 mx-auto mb-4 text-stone-300" />
                            <h3 className="text-lg font-light mb-2">Sky Shower</h3>
                            <p className="text-stone-400 text-sm">Unique open-sky bathing experience</p>
                        </div>
                        <div className="text-center">
                            <Home className="w-10 h-10 mx-auto mb-4 text-stone-300" />
                            <h3 className="text-lg font-light mb-2">Coastal Heritage</h3>
                            <p className="text-stone-400 text-sm">Traditional Kerala design elements</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-stone-900 text-stone-300">
                <div className="max-w-6xl mx-auto text-center">
                    <p>&copy; Ayada Cliff. All rights reserved.</p>
                </div>
            </footer>

            {/* Fullscreen Ambient Lightbox */}
            <ImageLightbox
                isOpen={isLightboxOpen}
                images={galleryImages}
                currentIndex={currentGalleryIndex}
                onClose={() => setIsLightboxOpen(false)}
                onNavigate={(idx) => setCurrentGalleryIndex(idx)}
            />

            {/* Mobile Booking Bar */}
            <MobileBookingBar villaName="Ocean Haven Pool Villa" reserveUrl="/reserve" />
        </div>
        </>
    );
}