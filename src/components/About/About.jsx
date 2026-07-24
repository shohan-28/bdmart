
import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Target,
  Award,
  Sparkles,
} from "lucide-react";

const About = () => {
  return (
    <section className="min-h-screen bg-white py-16 md:py-24">
      <div className="w-[92%] max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
              <Sparkles size={16} />
              About Our Company
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              We Build Digital
              <span className="text-blue-600"> Experiences </span>
              That Matter.
            </h1>

            <p className="mt-6 text-gray-600 text-base md:text-lg leading-8 max-w-xl">
              We are a passionate team focused on creating modern, innovative,
              and user-friendly digital experiences. Our goal is to help
              businesses grow through smart design and powerful technology.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-blue-600 transition duration-300">
                Learn More
                <ArrowRight size={18} />
              </button>

              <button className="px-6 py-3.5 rounded-xl border border-gray-200 text-gray-800 font-semibold hover:border-blue-600 hover:text-blue-600 transition duration-300">
                Our Journey
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-70"></div>

            <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="Our Team"
                className="w-full h-[450px] object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-5 md:left-8 bg-white shadow-xl border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Users size={24} />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">50+</h3>
                <p className="text-sm text-gray-500">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-6">

          <div className="p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target size={28} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Our Mission
            </h3>

            <p className="mt-3 text-gray-600 leading-7">
              To create meaningful digital solutions that solve real problems
              and deliver exceptional value to our clients.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award size={28} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Our Vision
            </h3>

            <p className="mt-3 text-gray-600 leading-7">
              To become a trusted digital partner by combining creativity,
              technology, and innovation.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Our Values
            </h3>

            <p className="mt-3 text-gray-600 leading-7">
              We believe in quality, transparency, creativity, teamwork, and
              building long-term relationships.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
