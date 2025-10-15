import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DonateModal from "./DonateModal";
import {
  ArrowRight,
  Star,
  Target,
  Eye,
  Users,
  BookOpen,
  Briefcase,
  Award,
  Shield,
  CheckCircle,
  Heart,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Tailoring Graduate", 
    image: "https://res.cloudinary.com/disgj6wx5/image/upload/v1749241604/peuvl3iqqojffmjxa5wt.png",
    quote: "The foundation gave me hope when I had none. Today, I run my own tailoring business and support my family with dignity."
  },
  {
    name: "Grace K.",
    role: "Digital Literacy Graduate",
    image: "https://res.cloudinary.com/disgj6wx5/image/upload/v1749241604/peuvl3iqqojffmjxa5wt.png", 
    quote: "Learning computer skills opened doors I never knew existed. I now work as a data entry specialist and am pursuing further education."
  },
  {
    name: "Mary J.",
    role: "Baking Program Graduate",
    image: "https://res.cloudinary.com/disgj6wx5/image/upload/v1749241604/peuvl3iqqojffmjxa5wt.png",
    quote: "From struggling single mother to successful bakery owner. The foundation believed in me when I couldn't believe in myself."
  }
];

import { useEffect, useState } from "react";
import useContactMessage from "@/hooks/use-contact";
import { useGetProcessedDonations } from "@/hooks/use-donation";
import toast from "react-hot-toast";

export default function SinglePageApp() {
  const [isMobile, setIsMobile] = useState(false);
  const [notificationIndex, setNotificationIndex] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Contact form submission state
  const contactMutation = useContactMessage();
  const isSendingMessage = contactMutation.isPending as boolean;

  // Donation notifications
  const { data: processedDonations, isLoading, error } = useGetProcessedDonations();
  
  // Debug logging
  console.log("Processed donations:", processedDonations);
  console.log("Is loading:", isLoading);
  console.log("Error:", error);
  
  const donations =
    Array.isArray(processedDonations) && processedDonations.length > 0
      ? [...processedDonations]
          .sort(
            (a, b) =>
              new Date(b.updated_at || b.created_at).getTime() -
              new Date(a.updated_at || a.created_at).getTime()
          )
          .map((d) => ({
            donorName: d.full_name || "Anonymous",
            amount: Number(parseFloat(d.amount)),
            message: "",
          }))
      : [];

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Advance index on an interval, stop at last donation
  useEffect(() => {
    if (donations.length === 0) return;
    const interval = setInterval(() => {
      setNotificationIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= donations.length ? prev : nextIndex; // Stop at last donation
      });
    }, isMobile ? 5000 : 7000); // Slightly longer intervals for smoother transitions
    return () => clearInterval(interval);
  }, [donations.length, isMobile]);

  // Show toast whenever the index or list changes
  useEffect(() => {
    // console.log("Toast effect triggered:", { donationsLength: donations.length, notificationIndex });
    
    if (donations.length === 0) {
      console.log("No donations available");
      return;
    }
    
    const donation = donations[notificationIndex % donations.length];
    console.log("Showing donation toast:", donation);
    
    toast.dismiss();
    toast.custom(
      (t) => (
        <div
          className={`toast-enter ${
            isMobile ? "max-w-[280px] w-[280px]" : "max-w-sm w-80"
          } official-notification rounded-lg pointer-events-auto toast-item`}
          style={{
            transform: t.visible ? 'translateX(0)' : 'translateX(-100%)',
            opacity: t.visible ? 1 : 0,
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <div className={isMobile ? "p-3" : "p-4"}>
            <div
              className={`flex items-center justify-between ${
                isMobile ? "mb-1.5" : "mb-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`${
                    isMobile ? "w-1.5 h-1.5" : "w-2 h-2"
                  } bg-green-500 rounded-full`}
                />
                <span
                  className={`${
                    isMobile ? "text-xs" : "text-sm"
                  } font-semibold text-gray-800 truncate max-w-[120px]`}
                >
                  {donation.donorName}
                </span>
              </div>
              <span
                className={`${
                  isMobile ? "text-sm" : "text-lg"
                } font-bold text-green-600`}
              >
                ${donation.amount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        duration: isMobile ? 4000 : 6000,
        position: "bottom-left",
        style: { 
          margin: "0", 
          padding: "0",
          background: "transparent",
          boxShadow: "none",
        },
        className: "donation-toast",
      }
    );
  }, [donations, notificationIndex, isMobile]);


  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !subject || !message) {
      toast.error('Please complete required fields.');
      return;
    }

    contactMutation.mutate({ name, email, phone, subject, message } , {
      onSuccess: (data) => {
        toast.success( data.message || 'Message sent successfully.');
        e.currentTarget?.reset();
      },
      onError: (data) => {
        toast.error(data.message || 'Failed to send message. Please try again.');
      }
    });
      e.currentTarget?.reset();
   
  };

  // Scroll to section if hash is present (supports navigating from other routes like /gallery#contact)
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Small timeout to ensure content is rendered before scrolling
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  // Test toast on component mount


  return (
    <div className="min-h-screen bg-white">
      {/* Toast Test Component */}
      {/* <ToastTest /> */}
      
      {/* Hero Section */}
      <section 
        id="home" 
        className="relative h-fit overflow-hidden text-white "
        style={{
          backgroundImage: "url('https://res.cloudinary.com/disgj6wx5/image/upload/v1749235145/td80nf4n2iznc8eez5r7.png')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-pink-600/80 z-20"></div>
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Empowering Young Women to
              <span className="text-pink-300 block">Build Their Future</span>
            </h1>
            <p className="text-base sm:text-xl mb-6 sm:mb-8 text-pink-100 leading-relaxed">
              Creating a world where every girl has access to education, skills,
              and opportunities to achieve her dreams and become strong
              independent women regardless of circumstances.
            </p>
                     <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                       <DonateModal
                         trigger={
                           <Button
                             size="default"
                             className="bg-pink-600 hover:bg-pink-700 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-4"
                           >
                             Support Our Mission
                             <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                           </Button>
                         }
                       />
                       <Button
                         size="default"
                         variant="outline"
                         className="border-white text-pink-800 hover:bg-white hover:text-pink-900 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-4"
                         onClick={() => scrollToSection('about')}
                       >
                         Learn More
                       </Button>
                       
                     </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8  sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="bg-white p-4 sm:p-6 rounded-lg">
              <div className="text-2xl sm:text-4xl font-bold text-pink-600 mb-1 sm:mb-2">500+</div>
              <p className="text-sm sm:text-base text-gray-600 font-medium">Young Women Empowered</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg">
              <div className="text-2xl sm:text-4xl font-bold text-pink-600 mb-1 sm:mb-2">15</div>
              <p className="text-sm sm:text-base text-gray-600 font-medium">Skill Programs Offered</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg">
              <div className="text-2xl sm:text-4xl font-bold text-pink-600 mb-1 sm:mb-2">85%</div>
              <p className="text-sm sm:text-base text-gray-600 font-medium">Employment Success Rate</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg">
              <div className="text-2xl sm:text-4xl font-bold text-pink-600 mb-1 sm:mb-2">10</div>
              <p className="text-sm sm:text-base text-gray-600 font-medium">Years of Impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-12 sm:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-6">
              Success Stories
            </h2>
            <p className="text-base sm:text-xl text-gray-600">
              Real transformations from our program graduates
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-none border-1">
                <CardContent className="p-4 sm:p-8">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}'s story`}
                      width={50}
                      height={50}
                      className="rounded-full mr-3 sm:mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-sm sm:text-base">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="py-12 relative sm:py-24 text-white px-4 sm:px-6 lg:px-8 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749455055/jxgmt5fbckjjkdughszs.png')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 to-pink-800/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">About Second Chance Foundation</h1>
              <p className="text-base sm:text-xl text-pink-100 leading-relaxed">
                The Second Chance Foundation is a nonprofit organization dedicated to empowering young girls who have dropped out of school due to various circumstances, including teenage pregnancy, financial difficulties, or lack of family support. The goal is to provide them with the education, skills and opportunities they need to build a better future for themselves and their families.
              </p>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img
                src="https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749455055/jxgmt5fbckjjkdughszs.png"
                alt="About our foundation"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-24 relative px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749455946/rnd6ifx1to7t6xt7l80s.png"
                alt="Our mission in action"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Our Mission</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                The Second Chance Foundation is a nonprofit organization dedicated to empowering young girls who have
                dropped out of school due to various circumstances, including teenage pregnancy, financial difficulties,
                or lack of family support.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Our goal is to provide them with the education, skills and opportunities they need to build a better
                future for themselves and their families.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600 mr-3" />
                  <span className="text-sm sm:text-base text-gray-700">Comprehensive educational support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600 mr-3" />
                  <span className="text-sm sm:text-base text-gray-700">Practical skills training</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600 mr-3" />
                  <span className="text-sm sm:text-base text-gray-700">Ongoing mentorship and support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Motto Section */}
      <section className="py-12 sm:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8 bg-fixed bg-cover bg-center">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12">
            <Card className="bg-white shadow-lg border-t-4 border-t-pink-600">
              <CardContent className="p-6 sm:p-12 text-center">
                <Eye className="h-12 w-12 sm:h-16 sm:w-16 text-pink-600 mx-auto mb-4 sm:mb-6" />
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Vision</h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  EMPOWER EVERY GIRL WITH EDUCATION, SKILLS, AND OPPORTUNITIES TO ACHIEVE HER FULL POTENTIAL
                </p>
                <div className="mt-4 text-sm text-gray-500 italic">
                  Empowerment | Resilience | Education | Sustainability
                </div>
              </CardContent>
            </Card>

            <Card className="bg-pink-600 text-white shadow-lg">
              <CardContent className="p-6 sm:p-12 text-center">
                <Target className="h-12 w-12 sm:h-16 sm:w-16 text-white mx-auto mb-4 sm:mb-6" />
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Our Motto</h3>
                <p className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">"Be the girl that never backed down"</p>
                <p className="text-lg sm:text-xl text-pink-100">Believe it, Live it and Love it.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Objectives</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Five key objectives guide our mission to empower young women and create lasting change
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-16">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749456531/oosxdzmlgxkwknuwljea.jpg"
                alt="Training programs"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Comprehensive Support System</h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Our objectives are carefully designed to address the unique challenges faced by young women who have
                experienced educational disruption. We provide holistic support that goes beyond traditional education.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Vocational Training</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Offer vocational programs to build practical skills.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Educational Support</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Provide educational support and mentorship.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Safe Environment</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Create a safe and supportive environment and childcare assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Entrepreneurship</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Empower girls with entrepreneurship and financial literacy skills.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="bg-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Advocacy</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Advocate for the rights of young women, their education and wellbeing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Aims Section */}
      <section 
        className="py-12 relative sm:py-24 text-white px-4 sm:px-6 lg:px-8 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749456244/f3atcnnsvffc3ynhcdwb.png')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-pink-600/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Our Strategic Aims</h2>
            <p className="text-lg sm:text-xl text-pink-100">Specific, measurable goals we work towards every day</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-16">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Creating Measurable Impact</h3>
              <p className="text-base sm:text-lg text-pink-100 leading-relaxed">
                Our aims are designed to create tangible, lasting change in the lives of young women and their
                communities. We focus on measurable outcomes that demonstrate real progress toward our vision.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749456244/f3atcnnsvffc3ynhcdwb.png"
                alt="Strategic planning"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <Card className="bg-white/50 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Reduce Educational Gaps</h3>
                <p className="text-sm sm:text-base text-pink-100 leading-relaxed">
                  Significantly reduce the number of young girls who remain uneducated due to early pregnancy, financial
                  constraints, or other societal challenges through targeted intervention programs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Practical Skills Development</h3>
                <p className="text-pink-100 leading-relaxed">
                  Equip young women with high-demand, hands-on skills including tailoring, commercial baking,
                  professional hairdressing, and comprehensive digital literacy for the modern workforce.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Economic Empowerment</h3>
                <p className="text-pink-100 leading-relaxed">
                  Help young mothers achieve sustainable economic stability through strategic business development
                  opportunities, employment placement, and ongoing financial mentorship.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Build Confidence & Leadership</h3>
                <p className="text-pink-100 leading-relaxed">
                  Promote self-confidence, self-worth, self-love, and strong leadership skills among young women to
                  create positive role models in their communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="py-12 relative sm:py-24 text-white px-4 sm:px-6 lg:px-8 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749457655/w4ypy2ysrle7ftvitfan.png')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-800/80 to-pink-700/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">Get in Touch</h1>
              <p className="text-base sm:text-xl text-pink-100 leading-relaxed">
                Ready to make a difference? Contact us to learn more about our programs, volunteer opportunities, or how
                you can support our mission to empower young women.
              </p>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img
                src="https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749457655/w4ypy2ysrle7ftvitfan.png"
                alt="Contact us"
                className="rounded-lg shadow-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Send us a Message</h2>
              <Card className="shadow-md border-t-2 border-t-pink-500">
                <CardContent className="p-4 sm:p-8">
                  <form className="space-y-4 sm:space-y-6" onSubmit={handleContactSubmit}>
                      <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                        Name
                        </Label>
                      <Input id="name" name="name" placeholder="Your full name" className="h-10 sm:h-12" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email Address
                      </Label>
                      <Input id="email" name="email" type="email" placeholder="your.email@example.com" className="h-10 sm:h-12" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                        Phone Number
                      </Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" className="h-10 sm:h-12" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                        Subject
                      </Label>
                      <Input id="subject" name="subject" placeholder="How can we help you?" className="h-10 sm:h-12" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry or how you'd like to get involved..."
                        className="min-h-[120px] sm:min-h-[150px] resize-none"
                      />
                    </div>

                    <Button disabled={isSendingMessage} className="w-full bg-pink-500 hover:bg-pink-600 h-10 sm:h-12 text-base sm:text-lg">
                      <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      {isSendingMessage ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Contact Information</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                We'd love to hear from you. Whether you're interested in volunteering, partnering with us, or learning
                more about our programs, don't hesitate to reach out.
              </p>

              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <Card className="border-l-2 border-l-pink-500 shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-pink-50 p-2 sm:p-3 rounded-full">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                        <p className="text-sm sm:text-base text-gray-600">johnsonblessings56@gmail.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-2 border-l-pink-500 shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-pink-50 p-2 sm:p-3 rounded-full">
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
                        <p className="text-sm sm:text-base text-gray-600">+233269472383</p>
                        <p className="text-sm sm:text-base text-gray-600">+233502187357</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-2 border-l-pink-500 shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-pink-50 p-2 sm:p-3 rounded-full">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          Sierra Leone, Bo
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-2 border-l-pink-500 shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-pink-50 p-2 sm:p-3 rounded-full">
                        <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Office Hours</h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          Monday - Friday: 9:00 AM - 5:00 PM
                          <br />
                          Saturday: 10:00 AM - 2:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Help Section */}
      <section className="py-12 sm:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Ways to Support</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              There are many meaningful ways you can support our mission and make a lasting difference in young women's
              lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center shadow-md hover:shadow-lg transition-all duration-300 border-t-2 border-t-pink-500">
              <CardContent className="p-6 sm:p-8">
                <div className="bg-pink-50 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-pink-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Financial Investment</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Help us invest in the lives of these young girls and build a center to sustain our efforts. No amount is too small.
                </p>
                <DonateModal 
                  trigger={
                    <Button className="bg-pink-500 hover:bg-pink-600 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                      Donate Now
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            <Card className="text-center shadow-md hover:shadow-lg transition-all duration-300 border-t-2 border-t-pink-500">
              <CardContent className="p-6 sm:p-8">
                <div className="bg-pink-50 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-pink-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Mentorship</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Godly mentorship and life-coaching of young girls to encourage personal growth and self-reliance—and promote a support system.
                </p>
                {/* <Button
                  variant="outline"
                  className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                >
                  Learn More
                </Button> */}
              </CardContent>
            </Card>

            <Card className="text-center shadow-md hover:shadow-lg transition-all duration-300 border-t-2 border-t-pink-500">
              <CardContent className="p-6 sm:p-8">
                <div className="bg-pink-50 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Award className="h-8 w-8 sm:h-10 sm:w-10 text-pink-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Program Planning</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Planning support with vocational training financial literacy programs and empowering workshops and/or volunteer to lead a session.
                </p>
                {/* <Button
                  variant="outline"
                  className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                >
                  Contact Us
                </Button> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        className="py-12 relative sm:py-24 text-white px-4 sm:px-6 lg:px-8 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749242966/js0m06pw6uudeyau9mv9.jpg')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-pink-600/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
                Help Us Empower More Young Women
              </h2>
              <p className="text-base sm:text-xl mb-6 sm:mb-8 text-pink-100 leading-relaxed">
                Your support can transform lives and create opportunities for
                young girls to build their dreams and become independent. Join
                us in making a lasting impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <DonateModal 
                  trigger={
                    <Button
                      size="default"
                      className="bg-white text-pink-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-4 w-full sm:w-auto"
                    >
                      Donate Today
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  }
                />
                <Button
                  size="default"
                  variant="outline"
                  className="border-white text-pink-600 hover:bg-white hover:text-pink-600 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-4 w-full sm:w-auto"
                  onClick={() => scrollToSection('contact')}
                >
                  Get Involved
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749242966/js0m06pw6uudeyau9mv9.jpg"
                alt="Community support"
                width={500}
                height={400}
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
           </div>
         </section>


       </div>
     );
   }
