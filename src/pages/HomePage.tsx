import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  
  Star,

} from "lucide-react";
// import React from 'react'
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Tailoring Graduate",
    image: "/placeholder.svg?height=60&width=60",
    quote: "The foundation gave me hope when I had none. Today, I run my own tailoring business and support my family with dignity."
  },
  {
    name: "Grace K.", 
    role: "Digital Literacy Graduate",
    image: "/placeholder.svg?height=60&width=60",
    quote: "Learning computer skills opened doors I never knew existed. I now work as a data entry specialist and am pursuing further education."
  },
  {
    name: "Mary J.",
    role: "Baking Program Graduate", 
    image: "/placeholder.svg?height=60&width=60",
    quote: "From struggling single mother to successful bakery owner. The foundation believed in me when I couldn't believe in myself."
  }
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden  text-white">
        <div className=" relative z-30  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="  max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering Young Women to
              <span className="text-blue-300 block">Build Their Future</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Creating a world where every girl has access to education, skills,
              and opportunities to achieve her dreams and become strong
              independent women regardless of circumstances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
              >
                Support Our Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-blue-800 hover:bg-white hover:text-blue-900 text-lg px-8 py-4"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/60 z-20"></div>
          <img
            src="https://res.cloudinary.com/disgj6wx5/image/upload/v1749235145/td80nf4n2iznc8eez5r7.png"
            alt="Young women in educational setting"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg ">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600 font-medium">Young Women Empowered</p>
            </div>
            <div className="bg-white p-6 rounded-lg ">
              <div className="text-4xl font-bold text-blue-600 mb-2">15</div>
              <p className="text-gray-600 font-medium">
                Skill Programs Offered
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <p className="text-gray-600 font-medium">
                Employment Success Rate
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg ">
              <div className="text-4xl font-bold text-blue-600 mb-2">10</div>
              <p className="text-gray-600 font-medium">Years of Impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of sections... */}

      {/* Success Stories Section */}
      <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real transformations from our program graduates
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-none border-1">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}'s story`}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Help Us Empower More Young Women
              </h2>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Your support can transform lives and create opportunities for
                young girls to build their dreams and become independent. Join
                us in making a lasting impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/donate">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
                  >
                    Donate Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
                  >
                    Get Involved
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749242966/js0m06pw6uudeyau9mv9.jpg"
                alt="Community support"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
