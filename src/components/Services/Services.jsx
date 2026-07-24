
import React from "react";
import {
  Code2,
  Palette,
  Smartphone,
  Database,
  Globe,
  Rocket,
  ArrowUpRight,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Code2 size={28} />,
      title: "Web Development",
      description:
        "We build fast, scalable, and modern websites using the latest web technologies.",
    },
    {
      icon: <Palette size={28} />,
      title: "UI/UX Design",
      description:
        "Beautiful and user-focused interfaces designed to create memorable digital experiences.",
    },
    {
      icon: <Smartphone size={28} />,
      title: "Responsive Design",
      description:
        "Fully responsive websites that look amazing on mobile, tablet, and desktop devices.",
    },
    {
      icon: <Database size={28} />,
      title: "Backend Development",
      description:
        "Secure and scalable backend systems designed to handle your business requirements.",
    },
    {
      icon: <Globe size={28} />,
      title: "Web Applications",
      description:
        "Powerful web applications with smooth performance and seamless user experiences.",
    },
    {
      icon: <Rocket size={28} />,
      title: "Performance Optimization",
      description:
        "We optimize websites for speed, performance, SEO, and better user experience.",
    },
  ];

  return (
    <section className="min-h-screen bg-white py-16 md:py-24">
      <div className="w-[92%] max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
            What We Offer
          </span>

          <h1 className="mt-5 text-4xl md:text-5xl font-bold text-gray-900">
            Our Premium Services
          </h1>

          <p className="mt-5 text-gray-600 text-lg leading-8">
            From strategy and design to development and optimization, we
            provide everything you need to build a powerful digital presence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                {service.icon}
              </div>

              <h3 className="mt-7 text-xl font-bold text-gray-900">
                {service.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {service.description}
              </p>

              <button className="mt-7 flex items-center gap-2 text-blue-600 font-semibold">
                Explore Service
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                />
              </button>
            </div>
          ))}

        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl bg-gray-900 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Have a project in mind?
            </h2>

            <p className="mt-3 text-gray-400">
              Let's create something amazing together.
            </p>
          </div>

          <button className="px-7 py-3.5 bg-white text-gray-900 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition duration-300">
            Start a Project
          </button>
        </div>

      </div>
    </section>
  );
};

export default Services;

