"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface UploadImageProfileProps {
  open: boolean;
  onClose: () => void;
  onCapture: (imgBase64: string) => void;
}

const UploadImageProfile = ({
  open,
  onClose,
  // onCapture,
}: UploadImageProfileProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg"></DialogContent>
    </Dialog>
  );
};

export default UploadImageProfile;
