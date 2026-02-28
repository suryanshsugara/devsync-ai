import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

export function CreateRoomModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-[#2D3748] bg-[#1F2937] p-6 shadow-2xl rounded-[16px] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-xl font-semibold leading-none tracking-tight font-heading text-[#F9FAFB]">
              Create New Room
            </Dialog.Title>
            <Dialog.Description className="text-sm text-[#9CA3AF]">
              Set up a collaborative environment for your team.
            </Dialog.Description>
          </div>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium text-[#F9FAFB]">Room Name</label>
              <input id="name" className="flex h-10 w-full rounded-md border border-[#2D3748] bg-[#111827] px-3 py-2 text-sm ring-offset-[#0B0F1A] placeholder:text-[#6B7280] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-[#F9FAFB]" placeholder="e.g. Frontend Squad" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="stack" className="text-sm font-medium text-[#F9FAFB]">Tech Stack</label>
              <select id="stack" className="flex h-10 w-full rounded-md border border-[#2D3748] bg-[#111827] px-3 py-2 text-sm ring-offset-[#0B0F1A] placeholder:text-[#6B7280] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-[#F9FAFB]">
                <option>React + TypeScript</option>
                <option>Next.js</option>
                <option>Vue.js</option>
                <option>Python / Django</option>
              </select>
            </div>
             <div className="grid gap-2">
              <label htmlFor="privacy" className="text-sm font-medium text-[#F9FAFB]">Privacy</label>
              <div className="flex items-center gap-4">
                 <label className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                   <input type="radio" name="privacy" className="accent-[#F5C542]" defaultChecked /> Public
                 </label>
                 <label className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                   <input type="radio" name="privacy" className="accent-[#F5C542]" /> Private
                 </label>
              </div>
            </div>
          </div>

          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[#0B0F1A] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[#2D3748] data-[state=open]:text-[#9CA3AF]">
            <X className="h-4 w-4 text-[#F9FAFB]" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
          
          <div className="flex justify-end gap-3">
             <Dialog.Close asChild>
                <Button variant="ghost">Cancel</Button>
             </Dialog.Close>
             <Button variant="primary" onClick={() => onOpenChange(false)}>Create Room</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
