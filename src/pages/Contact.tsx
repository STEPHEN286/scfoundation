import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Mail, Phone, MapPin, Clock, Users, Award, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
   
      {/* Hero Section */}
      <section className="py-12 sm:py-24 bg-gradient-to-r from-blue-800 to-blue-700 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">Get in Touch</h1>
              <p className="text-base sm:text-xl text-blue-100 leading-relaxed">
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

      {/* Contact Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Send us a Message</h2>
              <Card className="shadow-md border-t-2 border-t-blue-500">
                <CardContent className="p-4 sm:p-8">
                  <form className="space-y-4 sm:space-y-6">
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                          First Name
                        </Label>
                        <Input id="firstName" placeholder="Your first name" className="h-10 sm:h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                          Last Name
                        </Label>
                        <Input id="lastName" placeholder="Your last name" className="h-10 sm:h-12" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email Address
                      </Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" className="h-10 sm:h-12" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                        Phone Number
                      </Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="h-10 sm:h-12" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                        Subject
                      </Label>
                      <Input id="subject" placeholder="How can we help you?" className="h-10 sm:h-12" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry or how you'd like to get involved..."
                        className="min-h-[120px] sm:min-h-[150px] resize-none"
                      />
                    </div>

                    <Button className="w-full bg-blue-500 hover:bg-blue-600 h-10 sm:h-12 text-base sm:text-lg">
                      <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Send Message
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
                <Card className="border-l-2 border-l-blue-500 shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-50 p-2 sm:p-3 rounded-full">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                        <p className="text-sm sm:text-base text-gray-600">info@secondchancefoundation.org</p>
                        <p className="text-sm sm:text-base text-gray-600">programs@secondchancefoundation.org</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-2 border-l-blue-500 shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-50 p-2 sm:p-3 rounded-full">
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
                        <p className="text-sm sm:text-base text-gray-600">+1 (555) 123-4567 (Main Office)</p>
                        <p className="text-sm sm:text-base text-gray-600">+1 (555) 987-6543 (Programs)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-2 border-l-blue-500 shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-50 p-2 sm:p-3 rounded-full">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          123 Hope Street
                          <br />
                          Community Center Building
                          <br />
                          Your City, State 12345
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-2 border-l-blue-500 shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-50 p-2 sm:p-3 rounded-full">
                        <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
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
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Ways to Get Involved</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              There are many meaningful ways you can support our mission and make a lasting difference in young women's
              lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center shadow-md hover:shadow-lg transition-all duration-300 border-t-2 border-t-blue-500">
              <CardContent className="p-6 sm:p-8">
                <div className="bg-blue-50 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Donate</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Support our programs with a financial contribution that directly impacts young women's lives and
                  creates lasting change.
                </p>
                <Link to="/donate">
                  <Button className="bg-blue-500 hover:bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">Donate Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center shadow-md hover:shadow-lg transition-all duration-300 border-t-2 border-t-blue-500">
              <CardContent className="p-6 sm:p-8">
                <div className="bg-blue-50 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Volunteer</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Share your skills and time to mentor, teach, or support our programs and help young women achieve
                  their goals.
                </p>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center shadow-md hover:shadow-lg transition-all duration-300 border-t-2 border-t-blue-500">
              <CardContent className="p-6 sm:p-8">
                <div className="bg-blue-50 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Award className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Partner</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Collaborate with us as an organization to expand our reach and create greater impact in the community.
                </p>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    
    </div>
  )
}
