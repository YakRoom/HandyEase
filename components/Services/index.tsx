import { Button } from "../ui";
import Image from "next/image";
import Service from "@/public/images/service.svg"; 

const Services: FC = () => {
    return (
        <div className="m-6">
        <div className="text-2xl font-bold">Services</div>
        <div className="mt-4">
          {["Plumbing", "Electrician", "Carpenter", "Painter"].map(
            (service, index) => {
              return (
                <div
                  className="flex flex-row p-3 mb-4 bg-gray-50 rounded-2xl gap-4"
                  key={index}
                >
                  <div>
                    <span className="font-bold">{service}</span>
                    <div>Deep Clean, Move ot cleaning, Window Cleaning </div>
                    <Button
                      className="bg-white text-black mt-4 font-bold"
                      size="lg"
                    >
                      Details
                    </Button>
                  </div>
                  <Image
                    src={Service}
                    alt="thumbnail"
                    height={"100"}
                    width={"100"}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
    )
}