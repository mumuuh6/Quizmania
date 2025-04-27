import { use, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // or use your button
import { toast } from "react-toastify"; // optional for showing "Copied!" message
import { on } from "events";
import { useRouter } from "next/navigation";

interface GlassModalProps {
  isOpen: boolean;
  link: string;
}

const GlassModal = ({ isOpen, link }: GlassModalProps) => {
  const [copied, setCopied] = useState(false);
const router=useRouter();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleclose = () => {
    router.push("/teacher/quizzes");
  }
  if (!isOpen) return null;
 

  return (
    <div className="fixed inset-0 bg-[8B5CF6]/30 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-[90%] max-w-md text-center shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">Share Link</h2>
        
        <div className="bg-white/20 backdrop-blur-md rounded-md p-4 text-white text-sm mb-6 break-all">
          {link}
        </div>
        
        <div className="flex justify-center gap-4">
          <Button onClick={handleCopy} className="bg-white/20 hover:bg-white/30 text-white">
            {copied ? "Copied!" : "Copy Link"}
          </Button>
          <Button onClick={handleclose} variant="outline" className="border-white/30 text-white hover:bg-white/20">
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default GlassModal;
