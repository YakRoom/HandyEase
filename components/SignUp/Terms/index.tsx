import { Button, Checkbox } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { FC, memo, useState } from "react";

const TermsConditions: FC<{setStep: any}> = ({ setStep }) => {
    const [agreeChecked, setAgreeChecked] = useState<boolean | 'indeterminate'>(false);
  return (
    <div className="bg-gray-50 m-4 rounded-xl p-8 h-full">
      <div className="text-3xl font-bold">
        Accept Handymate’s Terms & Review Privacy Notice
      </div>
      <div className="mt-8">
        By selecting 'I Agree' below, I have reviewed and agree to the Terms of
        Use and acknowledge the Privacy Notice. I am at least 18 years of age.
      </div>
      <div className="flex justify-center my-8">
        _______________________________________
      </div>
    <div className="flex flex-row justify-between">
        <div>
        I agree
        </div>
        <Checkbox onCheckedChange={(e) => setAgreeChecked(e)} checked={agreeChecked} />
    </div>
    <div className="flex flex-col items-end mt-16">
          <Button
            disabled={!agreeChecked}
            onClick={() => {
              setStep((prev: number) => prev + 1);
            }}
            variant={!agreeChecked ? "outline" : "default"}
            className={
              !agreeChecked
                ? "w-20 bg-gray-50 font-bold rounded-3xl text-xs"
                : "w-20 font-bold rounded-3xl text-xs"
            }
          >
            Next
            <ArrowRight />
          </Button>
        </div>
    </div>
  );
};

export default memo(TermsConditions);
