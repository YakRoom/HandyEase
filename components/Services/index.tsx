import { FC, memo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { ArrowRight, Wrench, Zap, Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  name: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const services: Service[] = [
  {
    name: "Plumbing",
    description:
      "Repairs, installations, and maintenance for all plumbing needs",
    icon: <Wrench className="h-5 w-5" />,
    image: "/images/service.svg",
  },
  {
    name: "Electrician",
    description:
      "Electrical repairs, wiring, and installations by certified experts",
    icon: <Zap className="h-5 w-5" />,
    image: "/images/service.svg",
  },
  {
    name: "Carpenter",
    description: "Custom woodwork, repairs, and furniture assembly services",
    icon: <Zap className="h-5 w-5" />,
    image: "/images/service.svg",
  },
  {
    name: "Painter",
    description: "Interior and exterior painting with professional finish",
    icon: <Paintbrush className="h-5 w-5" />,
    image: "/images/service.svg",
  },
];

interface ServicesProps {
  className?: string;
}

const Services: FC<ServicesProps> = ({ className }) => {
  return (
    <section
      className={cn("py-8 px-4 md:px-6", className)}
      aria-labelledby="services-title"
    >
      <h2
        id="services-title"
        className="text-2xl font-semibold text-neutral-900 mb-6"
      >
        Services
      </h2>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="group relative flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-200 hover:shadow-md transition-shadow"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-primary">{service.icon}</span>
                <h3 className="text-lg font-medium text-neutral-900">
                  {service.name}
                </h3>
              </div>

              <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
                {service.description}
              </p>

              <Button variant="outline" size="sm" className="group/button">
                View Details
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/button:translate-x-1" />
              </Button>
            </div>

            <div className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32">
              <Image
                src={service.image}
                alt={`${service.name} service illustration`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(Services);
