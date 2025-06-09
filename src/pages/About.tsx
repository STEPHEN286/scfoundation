import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Target, Eye, Users, BookOpen, Briefcase, Award, Shield, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
     

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">About Second Chance Foundation</h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Dedicated to empowering young girls who have dropped out of school due to various circumstances,
                providing them with education, skills, and opportunities to build a better future.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749455055/jxgmt5fbckjjkdughszs.png"
                alt="About our foundation"
                className="rounded-lg shadow-xl "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749455946/rnd6ifx1to7t6xt7l80s.png"
                alt="Our mission in action"
                className="rounded-lg shadow-lg "
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The Second Chance Foundation is a nonprofit organization dedicated to empowering young girls who have
                dropped out of school due to various circumstances, including teenage pregnancy, financial difficulties,
                or lack of family support.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our goal is to provide them with the education, skills and opportunities they need to build a better
                future for themselves and their families.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="text-gray-700">Comprehensive educational support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="text-gray-700">Practical skills training</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="text-gray-700">Ongoing mentorship and support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Motto Section */}
      <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-white shadow-lg border-t-4 border-t-blue-600">
              <CardContent className="p-12 text-center">
                <Eye className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Creating a world where every girl has access to education, skills, and opportunities to achieve her
                  dreams and become strong independent ladies regardless of circumstances.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-600 text-white shadow-lg">
              <CardContent className="p-12 text-center">
                <Target className="h-16 w-16 text-white mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-6">Our Motto</h3>
                <p className="text-2xl font-semibold mb-4">"Be the girl that never backed down"</p>
                <p className="text-xl text-blue-100">Believe it, Live it and Love it.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Objectives</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Five key objectives guide our mission to empower young women and create lasting change
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749456531/oosxdzmlgxkwknuwljea.jpg"
                alt="Training programs"
                className="rounded-lg shadow-lg "
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Support System</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our objectives are carefully designed to address the unique challenges faced by young women who have
                experienced educational disruption. We provide holistic support that goes beyond traditional education.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Vocational Training</h3>
                <p className="text-gray-600 leading-relaxed">
                  Offer comprehensive vocational training programs that equip young girls with practical, marketable
                  skills for employment and entrepreneurship opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Educational Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Provide personalized educational support and dedicated mentorship to encourage personal growth,
                  self-reliance, and academic achievement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Safe Environment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create a safe, supportive, and nurturing environment where young mothers can focus on learning while
                  receiving professional childcare assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Entrepreneurship</h3>
                <p className="text-gray-600 leading-relaxed">
                  Empower girls with comprehensive entrepreneurship training and financial literacy skills to help them
                  become economically independent and self-sufficient.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Advocacy</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advocate for the rights of young women and raise community awareness on critical issues affecting
                  their education, well-being, and future opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Aims Section */}
      <section className="py-24 bg-blue-600 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Strategic Aims</h2>
            <p className="text-xl text-blue-100">Specific, measurable goals we work towards every day</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold mb-6">Creating Measurable Impact</h3>
              <p className="text-lg text-blue-100 leading-relaxed">
                Our aims are designed to create tangible, lasting change in the lives of young women and their
                communities. We focus on measurable outcomes that demonstrate real progress toward our vision.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749456244/f3atcnnsvffc3ynhcdwb.png"
                alt="Strategic planning"
                className="rounded-lg shadow-xl "
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Reduce Educational Gaps</h3>
                <p className="text-blue-100 leading-relaxed">
                  Significantly reduce the number of young girls who remain uneducated due to early pregnancy, financial
                  constraints, or other societal challenges through targeted intervention programs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Practical Skills Development</h3>
                <p className="text-blue-100 leading-relaxed">
                  Equip young women with high-demand, hands-on skills including tailoring, commercial baking,
                  professional hairdressing, and comprehensive digital literacy for the modern workforce.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Economic Empowerment</h3>
                <p className="text-blue-100 leading-relaxed">
                  Help young mothers achieve sustainable economic stability through strategic business development
                  opportunities, employment placement, and ongoing financial mentorship.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Build Confidence & Leadership</h3>
                <p className="text-blue-100 leading-relaxed">
                  Promote self-confidence, self-worth, self-love, and strong leadership skills among young women to
                  create positive role models in their communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                   src="https://res.cloudinary.com/disgj6wx5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749456793/oosf7ja3zb9o50lamgqn.png"
                alt="Join our mission"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Together, we can create more opportunities for young women to achieve their dreams and build
                independent, successful lives. Your support makes a real difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/donate">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                    Support Our Cause
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-4 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Get Involved
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  )
}
